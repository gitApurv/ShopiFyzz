import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/Login";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  return (
    <Card
      sx={{
        width: 268,
        height: 300,
        m: 2,
        borderRadius: 3,
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
          onClick={() => navigate(`/product/${product._id}`)}
        >
          Details
        </Button>
        {isLoggedIn && <Button size="small">Add to Cart</Button>}
      </CardActions>
    </Card>
  );
}
