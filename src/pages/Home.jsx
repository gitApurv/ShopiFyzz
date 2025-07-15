import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
    setLoading(false);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
