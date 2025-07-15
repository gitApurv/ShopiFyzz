import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Title, CurrencyRupee, Description, Image } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getProduct, editProduct } from "../api/admin";

export default function EditProduct() {
  const { productId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, setValue, handleSubmit } = useForm();

  const laodProduct = async (productId) => {
    const product = await getProduct(productId);
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("description", product.description);
  };

  useEffect(() => {
    if (productId) {
      laodProduct(productId);
    }
  }, []);

  const showAlert = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      style: {
        backgroundColor: variant === "error" ? "red" : "#1976d2",
      },
    });
  };

  const handleImageUpload = async (image) => {
    setLoading(true);
    try {
      if (image == undefined) {
        throw new Error("Please select an Image");
      }
      if (image.size > 1024 * 1024 * 10) {
        throw new Error("Image size must be less than 10MB");
      }
      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/png" &&
        image.type !== "image/jpg"
      ) {
        throw new Error("Image must be a JPEG, PNG or JPG");
      }
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ShopiFyzz");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) throw new Error("Error uploading Image");
      const jsonRes = await res.json();
      const url = jsonRes.secure_url;
      setValue("image", url);
    } catch (err) {
      showAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (product) => {
    setLoading(true);
    try {
      const response = await editProduct(productId, product);
      if (!response.ok) {
        throw new Error(response.message);
      }
      showAlert("Product Edited", "success");
      navigate("/admin/products");
    } catch (err) {
      showAlert(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit(handleEditProduct)}>
          <Stack spacing={2}>
            <FormControl required variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Title
              </FormLabel>
              <TextField
                {...register("title")}
                required
                placeholder="Enter product title"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Title color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl required variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Price
              </FormLabel>
              <TextField
                {...register("price")}
                required
                placeholder="Enter product price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl required variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Description
              </FormLabel>
              <TextField
                {...register("description")}
                required
                multiline
                rows={4}
                placeholder="Enter product description"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Image
              </FormLabel>
              <TextField
                onChange={(e) => handleImageUpload(e.target.files[0])}
                type="file"
                required
                placeholder="Upload product image"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              type="submit"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: 2,
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: 3,
                },
              }}
            >
              {loading ? <CircularProgress size={20} /> : "Edit Product"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
