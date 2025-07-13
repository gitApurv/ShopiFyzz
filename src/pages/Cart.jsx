import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CartCard from "../components/CartCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCart } from "../api/cart";
import { createOrder } from "../api/orders";
import { LoginContext } from "../context/Login";

export default function Cart() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [cart, setCart] = useState({});

  const loadCart = async () => {
    const cart = await getCart();
    setCart(cart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handlePlaceOrder = async () => {
    const response = await createOrder();
    navigate("/orders");
  };

  return (
    <Container
      sx={{
        py: 4,
        maxWidth: "xl",
      }}
    >
      {isLoggedIn && cart.items?.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cart.items.map((cartProduct, index) => (
                <Box item key={index}>
                  <CartCard cartProduct={cartProduct} loadCart={loadCart} />
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
