import { Box, Button, Container, Grid, Typography } from "@mui/material";
import OrderDetailsCard from "../components/OrderDetailsCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOrder } from "../api/orders";
import { downloadReceipt } from "../api/orders";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({ items: [] });

  const loadOrder = async (orderId) => {
    const order = await getOrder(orderId);
    setOrder(order);
  };

  useEffect(() => {
    loadOrder(orderId);
  }, []);

  const handleDownloadReceipt = () => {
    downloadReceipt(orderId);
  };

  return (
    <Container
      sx={{
        py: 4,
        maxWidth: "xl",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {order.items.map((item, index) => (
              <Box item key={index}>
                <OrderDetailsCard key={index} item={item} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 100 },
              width: "375px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
              Order # {order._id}
            </Typography>
            <Typography variant="h6" mb={2}>
              Order Date : {order.createdAt}
            </Typography>
            <Typography variant="h6" mb={2}>
              Total : Rs. {order.totalPrice}
            </Typography>
            <Button variant="contained" onClick={handleDownloadReceipt}>
              Download Receipt
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
