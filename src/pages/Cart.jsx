import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CartCard from "../components/CartCard";
import { useEffect, useState } from "react";

const cartProducts = Array(8).fill({
  _id: 1,
  title: "Book",
  price: 23,
  imageUrl:
    "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
  quantity: 1,
});

export default function Home() {
  // const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  // useEffect(() => {}, []);

  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cartProducts.map((cartProduct, index) => (
              <Box item key={index}>
                <CartCard key={index} cartProduct={cartProduct} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              boxShadow: 1,
              position: { md: "sticky" },
              top: { md: 100 },
              width: "250px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" mb={2}>
              Total : Rs. {total}
            </Typography>
            <Button disabled={total == 0} variant="contained">
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
