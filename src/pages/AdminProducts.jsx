import { Box, Container, Grid, Typography } from "@mui/material";
import AdminProductCard from "../components/AdminProductCard";
import { useSnackbar } from "notistack";
import { getProducts } from "../api/admin";
import { deleteProduct } from "../api/admin";

const products = Array(2).fill({
  _id: 1,
  imageUrl:
    "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
  title: "Book",
  price: 23,
  user: {
    _id: 1,
  },
});

export default function AdminProducts() {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    loadProducts();
  }, [products]);

  const showAlert = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      style: {
        backgroundColor: variant === "error" ? "red" : "#1976d2",
      },
    });
  };

  const delProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (!response.ok) {
        throw new Error("Failed to Delete Product");
      }
      showAlert("Product Deleted", "success");
      loadProducts();
    } catch (err) {
      showAlert(err.message, "error");
    }
  };

  return (
    <Container sx={{ py: 4, maxWidth: "xl" }}>
      {products.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <AdminProductCard product={product} deleteProduct={delProduct} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            width: "450px",
            p: 4,
          }}
        >
          <Typography variant="h3">
            No Products <span style={{ color: "red" }}>Found!</span>
          </Typography>
        </Box>
      )}
    </Container>
  );
}
