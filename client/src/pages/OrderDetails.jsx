import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Fade,
  Divider,
  CircularProgress,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderDetailsCard from "../components/OrderDetailsCard";
import { getOrder } from "../api/orders";
import { downloadReceipt } from "../api/orders";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({ products: [] });
  const [loading, setLoading] = useState(true);

  const loadOrder = async (orderId) => {
    const order = await getOrder(orderId);
    setOrder(order);
    setLoading(false);
  };

  useEffect(() => {
    loadOrder(orderId);
  }, []);

  const handleDownloadReceipt = async () => {
    await downloadReceipt(orderId);
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            py: 4,
            width: "100%",
            maxWidth: "lg",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
            <ReceiptLongIcon sx={{ fontSize: 35 }} />
            Order Details
          </Typography>

          <Fade in={true}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    animation: "fadeIn 0.5s ease-in",
                  }}
                >
                  {order.products.map((product, index) => (
                    <Fade in={true} timeout={500 * (index + 1)} key={index}>
                      <div>
                        <OrderDetailsCard product={product} />
                      </div>
                    </Fade>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    position: { md: "sticky" },
                    top: { md: 100 },
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 0.5, md: 3 },
                    border: "2px solid #1976d2",
                    borderLeft: "8px solid #1976d2",
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
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      <strong>Order ID: </strong> {order._id}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      <strong>Order Date: </strong>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                      Total Amount: Rs. {order.totalPrice}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleDownloadReceipt}
                    startIcon={<DownloadIcon />}
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
                    Download Receipt
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      )}
    </Container>
  );
}
