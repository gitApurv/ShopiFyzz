import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import AdminProductCard from "../components/AdminProductCard";
import { getProducts } from "../api/admin";
import { deleteProduct } from "../api/admin";

export default function AdminProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    const products = await getProducts();
    setProducts(products);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showAlert = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      style: {
        backgroundColor: variant === "error" ? "red" : "#1976d2",
      },
    });
  };

  const delProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (!response.ok) {
        throw new Error("Failed to Delete Product");
      }
      showAlert("Product Deleted", "success");
      loadProducts();
    } catch (err) {
      showAlert(err.message, "error");
    }
  };

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : products.length > 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                <AdminProductCard
                  product={product}
                  deleteProduct={delProduct}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            p: 4,
          }}
        >
          <LocalMallIcon
            sx={{
              fontSize: 80,
              color: "text.secondary",
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            No Products Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Looks like you haven't added any products!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/admin/add-product")}
            startIcon={<LocalMallIcon />}
          >
            Add Products
          </Button>
        </Box>
      )}
    </Container>
  );
}
