import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts, getProductsCount } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handlePageChange = async (event, page) => {
    setPage(page);
  };

  const loadProducts = async () => {
    const products = await getProducts(page);
    setProducts(products);
    setLoading(false);
  };

  const loadPageCount = async () => {
    const { pageCount } = await getProductsCount();
    setPageCount(pageCount);
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    loadPageCount();
  }, []);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box sx={{ py: 4 }}>
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {products.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
            <Pagination
              shape="rounded"
              variant="outlined"
              color="primary"
              size="medium"
              defaultPage={1}
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
