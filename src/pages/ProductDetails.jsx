import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/Login";
import { getProduct } from "../api/products";
import { addProductToCart } from "../api/cart";

export default function ProductDetails() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const loadProduct = async (productId) => {
    const product = await getProduct(productId);
    console.log(product);
    setProduct(product);
  };

  useEffect(() => {
    loadProduct(productId);
  }, []);

  const { enqueueSnackbar } = useSnackbar();
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

  const addToCart = async () => {
    if (!isLoggedIn) {
      showAlert("Unauthorized : Login First", "error");
      return;
    }
    addProductToCart(productId);
    showAlert("Product added to cart", "success");
  };

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 1,
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Rs. {product.price}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {product.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Seller: {product.user?.name}
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
