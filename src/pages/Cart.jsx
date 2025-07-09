import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CartCard from "../components/CartCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCart } from "../api/cart";
import { createOrder } from "../api/orders";

const cart = {
  _id: 1,
  totalPrice: 0,
  products: Array(0).fill({
    _id: 1,
    title: "Book",
    price: 23,
    imageUrl:
      "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
    quantity: 1,
  }),
  user: {
    _id: 1,
  },
};

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  const loadCart = async () => {
    const cart = await getCart();
    setCart(cart);
  };

  useEffect(() => {
    loadCart();
  }, [cart]);

  const handlePlaceOrder = () => {
    createOrder();
    navigate("/orders");
  };

  return (
    <Container
      sx={{
        py: 4,
        maxWidth: "xl",
      }}
    >
      {cart.products.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cart.products.map((cartProduct, index) => (
                <Box item key={index}>
                  <CartCard key={index} cartProduct={cartProduct} />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: { md: "sticky" },
                width: "250px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                top: { md: 100 },
                p: 3,
                border: "2px solid #1976d2",
                borderLeft: "15px solid #1976d2",
                borderRadius: 1,
                boxShadow: 4,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" mb={2}>
                Total : Rs. {cart.totalPrice}
              </Typography>
              <Button variant="contained" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            width: "415px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
          }}
        >
          <Typography variant="h3">
            Your Cart is <span style={{ color: "red" }}>Empty!</span>
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Add Products
          </Button>
        </Box>
      )}
    </Container>
  );
}
