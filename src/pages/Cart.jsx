import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CartCard from "../components/CartCard";
import { getCart } from "../api/cart";
import { createOrder } from "../api/orders";
import { LoginContext } from "../context/Login";

export default function Cart() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const cart = await getCart();
    let totalPrice = 0;
    cart.forEach((cp) => {
      totalPrice += cp.product.price * cp.quantity;
    });
    totalPrice = Math.round(totalPrice);
    setTotalPrice(totalPrice);
    setCart(cart);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handlePlaceOrder = async () => {
    await createOrder();
    navigate("/orders");
  };

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : isLoggedIn && cart.length > 0 ? (
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 4,
              textAlign: "center",
              color: "#1976d2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <LocalMallIcon sx={{ fontSize: 35 }} />
            Cart
          </Typography>
          <Fade in={true}>
            <Box
              sx={{
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={4}>
                <Grid item sx={{ sm: 12, md: 8 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      animation: "fadeIn 0.5s ease-in",
                    }}
                  >
                    {cart.map((cartProduct, index) => (
                      <Fade in={true} timeout={500 * (index + 1)} key={index}>
                        <Box>
                          <CartCard
                            cartProduct={cartProduct}
                            loadCart={loadCart}
                          />
                        </Box>
                      </Fade>
                    ))}
                  </Box>
                </Grid>
                <Grid item sx={{ sm: 12, md: 4 }}>
                  <Box
                    sx={{
                      position: {
                        md: "sticky",
                      },
                      top: 20,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      border: "2px solid #1976d2",
                      borderLeft: "8px solid #1976d2",
                      p: 3,
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Cart Summary
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="h6" fontWeight="bold">
                        Total Amount: ₹{totalPrice}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      size="large"
                      startIcon={<LocalMallIcon />}
                      sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        borderRadius: 2,
                        boxShadow: 2,
                        "&:hover": {
                          boxShadow: 4,
                        },
                      }}
                    >
                      Place Order
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
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
            Your Cart is Empty!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            startIcon={<LocalMallIcon />}
          >
            Start Shopping
          </Button>
        </Box>
      )}
    </Container>
  );
}
