import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/Login";
import { getProduct } from "../api/products";
import { addProductToCart } from "../api/cart";

export default function ProductDetails() {
  const { enqueueSnackbar } = useSnackbar();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const loadProduct = async (productId) => {
    const product = await getProduct(productId);
    console.log(product);
    setProduct(product);
    setLoading(false);
  };

  useEffect(() => {
    loadProduct(productId);
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

  const addToCart = async () => {
    if (!isLoggedIn) {
      showAlert("Unauthorized : Login First", "error");
      return;
    }
    addProductToCart(productId);
    showAlert("Product added to cart", "success");
  };

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            py: 4,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: { xs: 250, md: 500 },
                  height: { xs: 250, md: 500 },
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 2,
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Rs. {product.price}
                </Typography>
                <Chip
                  label={`Seller: ${product.user?.name}`}
                  variant="contained"
                  sx={{
                    alignSelf: "flex-start",
                    mb: 2,
                    fontSize: 15,
                    color: "white",
                    bgcolor: "#1976d2",
                  }}
                />
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    mb: 3,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={addToCart}
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
