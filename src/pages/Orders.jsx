import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Fade,
} from "@mui/material";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const orders = await getOrders();
      setOrders(orders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : orders.length > 0 ? (
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
                  <Fade in={true} timeout={500 * (index + 1)} key={order._id}>
                    <Box>
                      <OrderCard order={order} />
                    </Box>
                  </Fade>
                ))}
              </Box>
            </Fade>
          </>
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
      </Box>
    </Container>
  );
}
