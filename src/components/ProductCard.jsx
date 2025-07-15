import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip, Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/Login";
import { addProductToCart } from "../api/cart";

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
        width: 325,
        height: 420,
        border: "2px solid #1976d2",
        borderRadius: 2,
        boxShadow: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          height: 260,
          width: "100%",
          overflow: "hidden",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <CardMedia
          component="img"
          alt={product.title}
          image={product.image}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3.6rem",
            fontWeight: "bold",
          }}
        >
          {product.title}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          Rs. {product.price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: 2,
          gap: 1,
          borderTop: "1px solid #eee",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate(`/product/${product._id}`)}
          startIcon={<InfoOutlinedIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Details
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={addToCart}
          startIcon={<ShoppingCartIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
