import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/Login";

export default function ProductDetails() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {}, [productId]);

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
            src="https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY="
            alt="Product"
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
            Book
          </Typography>
          <Typography variant="h5" gutterBottom>
            Rs. Price
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, et?
            Doloribus consectetur ex sit reiciendis eveniet tempora repellendus
            amet accusamus veritatis cupiditate! Aliquam recusandae voluptatem
            accusantium dolor eos! Atque, provident!
          </Typography>
          <Typography variant="body1" color="text.primary">
            Seller: Apurv
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
