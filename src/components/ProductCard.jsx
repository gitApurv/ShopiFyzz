import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/Login";
import { useSnackbar } from "notistack";
import { addProductToCart } from "../api/cart";
import { Box } from "@mui/material";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const { enqueueSnackbar } = useSnackbar();
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

  const addToCart = async () => {
    if (!isLoggedIn) {
      showAlert("Unauthorized : Login First", "error");
      return;
    }
    const productId = product._id;
    addProductToCart(productId);
    showAlert("Product added to cart", "success");
  };

  return (
    <Card
      sx={{
        width: 268,
        height: 360,
        border: "2px solid #1976d2",
        borderRadius: 2,
        boxShadow: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ height: 240, width: "100%", overflow: "hidden" }}>
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            backgroundColor: "#f8f8f8",
          }}
        />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="body1"
          fontWeight="bold"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "48px",
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Rs. {product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          Details
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
