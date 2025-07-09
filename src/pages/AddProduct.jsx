import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export default function AddProduct() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, setValue, handleSubmit } = useForm();

  const showAlert = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      style: {
        backgroundColor: "#1976d2",
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

  const handleAddProduct = async (data) => {
    setLoading(true);
    showAlert("Product Added");
    navigate("/admin/products");
    setLoading(false);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" fontFamily="Work sans">
          Add Product
        </Typography>
      </Box>
      <Box
        sx={{
          width: "500px",
          mt: 5,
        }}
      >
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <Stack spacing={2}>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                id="title"
                variant="outlined"
                required
                {...register("title")}
              ></TextField>
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="price">Price</FormLabel>
              <TextField
                id="price"
                variant="outlined"
                required
                {...register("price")}
              ></TextField>
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                id="description"
                variant="outlined"
                required
                {...register("description")}
              ></TextField>
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="image">Image</FormLabel>
              <TextField
                id="image"
                variant="outlined"
                required
                type="file"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              ></TextField>
            </FormControl>
            <Button variant="contained" disabled={loading} type="submit">
              {loading ? <CircularProgress size={20} /> : "Add Product"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
