import { Box, Container, Grid, Typography } from "@mui/material";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const orders = await getOrders();
    setOrders(orders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Container
      sx={{
        py: 4,
        width: "100vw",
      }}
    >
      {orders.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orders.map((order, index) => (
            <Box item key={index}>
              <OrderCard order={order} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            width: "415px",
            p: 4,
          }}
        >
          <Typography variant="h3">
            No Orders <span style={{ color: "red" }}>Found!</span>
          </Typography>
        </Box>
      )}
    </Container>
  );
}
