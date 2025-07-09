import { Box, Container, Grid, Typography } from "@mui/material";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

const orders = Array(0).fill({
  _id: 168987687988876,
  totalPrice: 250,
  products: Array(3).fill({
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
  createdAt: "12/7/2025",
});

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const orders = await getOrders();
    setOrders(orders);
  };

  useEffect(() => {
    loadOrders;
  }, [orders]);

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
              <OrderCard key={index} order={order} />
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
