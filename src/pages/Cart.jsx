import {
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import CartCard from "../components/CartCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCart } from "../api/cart";
import { createOrder } from "../api/orders";
import { LoginContext } from "../context/Login";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export default function Cart() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [loadingData, setLoadingData] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const cart = await getCart();
    let totalPrice = 0;
    cart.forEach((cp) => {
      totalPrice += cp.product.price * cp.quantity;
    });
    setTotalPrice(totalPrice);
    setCart(cart);
    setLoadingData(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handlePlaceOrder = async () => {
    await createOrder();
    navigate("/orders");
  };
  if (!loadingData) {
    return (
      <Container sx={{ py: 4, maxWidth: "xl" }}>
        {isLoggedIn && cart.length > 0 ? (
          <>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 4,
                textAlign: "center",
                color: "primary.main",
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
              <Grid container spacing={4} sx={{ position: "relative" }}>
                <Grid item xs={12} md={8}>
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
                        <div>
                          <CartCard
                            cartProduct={cartProduct}
                            loadCart={loadCart}
                          />
                        </div>
                      </Fade>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      position: {
                        xs: "static",
                        md: "sticky",
                      },
                      top: 20,
                      alignSelf: "flex-start",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: { xs: 4.5, md: 3 },
                      border: "2px solid #1976d2",
                      borderLeft: "8px solid #1976d2",
                      boxShadow: 3,
                      transition: "all 0.3s ease",
                      backgroundColor: "#fff",
                      zIndex: 1,
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="primary"
                      >
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
                        width: "100%",
                        py: 1.5,
                        fontWeight: "bold",
                      }}
                    >
                      Place Order
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Fade>
          </>
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

  return null;
}
