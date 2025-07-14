import { Box, Container, Grid, Typography } from "@mui/material";
import AdminProductCard from "../components/AdminProductCard";
import { useSnackbar } from "notistack";
import { getProducts } from "../api/admin";
import { deleteProduct } from "../api/admin";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const products = await getProducts();
    setProducts(products);
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {products.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <Grid
              item
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              sx={{ m: 2 }}
            >
              <AdminProductCard product={product} deleteProduct={delProduct} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            width: "450px",
            p: 4,
          }}
        >
          <Typography variant="h3">
            No Products <span style={{ color: "red" }}>Found!</span>
          </Typography>
        </Box>
      )}
    </Container>
  );
}
