import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/Login";
import { getProduct } from "../api/products";

const product = {
  _id: 1,
  title: "Book",
  price: 23,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam necessitatibus, odio eligendi quisquam debitis omnis voluptas labore officiis excepturi suscipit accusamus deleniti iusto inventore! Sunt eum architecto asperiores tempora commodi!",
  imageUrl:
    "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
  user: {
    _id: 1,
    name: "Apurv",
  },
};

export default function ProductDetails() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const loadProduct = async (productId) => {
    const product = getProduct(productId);
    setProduct(product);
  };

  useEffect(() => {
    loadProduct(productId);
  }, [productId]);

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
    showAlert("Product added to cart", "success");
  };

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={product.imageUrl}
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
            Seller: {product.user.name}
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
