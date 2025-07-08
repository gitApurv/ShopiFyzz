import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/Login";
import { addProductToCart } from "../api/cart";
import { useSnackbar } from "notistack";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const { enqueueSnackbar } = useSnackbar();
  const showAlert = () => {
    enqueueSnackbar("Added to Cart", {
      variant: "success",
      autoHideDuration: 1000,
      style: {
        backgroundColor: "#1976d2",
      },
    });
  };

  const addToCart = (e) => {
    const id = product._id;
    showAlert();
    addProductToCart(id);
  };

  return (
    <Card
      sx={{
        width: 268,
        height: 300,
        m: 2,
        borderRadius: 1,
        boxShadow: 4,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        height="140"
        image={product.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6">Rs. {product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          Details
        </Button>
        {isLoggedIn && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
