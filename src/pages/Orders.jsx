import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Fade,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useContext, useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import OrderCard from "../components/OrderCard";
import { LoginContext } from "../context/Login";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const orders = await getOrders();
    setOrders(orders);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : orders.length > 0 ? (
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
            Orders
          </Typography>
          <Fade in={true}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: "lg",
                mx: "auto",
              }}
            >
              {orders.map((order, index) => (
                <Fade in={true} timeout={500 * (index + 1)} key={index}>
                  <Box>
                    <OrderCard order={order} />
                  </Box>
                </Fade>
              ))}
            </Box>
          </Fade>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
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
            No Orders Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start shopping to see your orders here!
          </Typography>
        </Box>
      )}
    </Container>
  );
}
