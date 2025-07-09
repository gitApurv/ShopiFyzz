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

export default function AdminProductCard({ product, deleteProduct }) {
  const navigate = useNavigate();
  const handleDeleteProduct = async () => {
    const id = product._id;
    deleteProduct(id);
  };

  return (
    <Card
      sx={{
        width: 268,
        height: 300,
        m: 3,
        border: "2px solid #1976d2",
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
      <CardActions sx={{ paddingLeft: 2 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/admin/edit-product/${product._id}`)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleDeleteProduct}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
