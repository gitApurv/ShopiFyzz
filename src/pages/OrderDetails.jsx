import { Box, Button, Container, Grid, Typography } from "@mui/material";
import OrderDetailsCard from "../components/OrderDetailsCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const order = {
  _id: 1,
  totalPrice: 250,
  products: Array(5).fill({
    _id: 1,
    title: "Book",
    price: 23,
    imageUrl:
      "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
    quantity: 1,
  }),
  createdAt: "12/7/2025",
};

export default function OrderDetails() {
  // const { orderId } = useParams();
  // const [order, setOrder] = useState([]);
  // useEffect(() => {}, [orderId]);

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
            {order.products.map((product, index) => (
              <Box item key={index}>
                <OrderDetailsCard key={index} product={product} />
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
            <Button variant="contained">Generate Receipt</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
