import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  removeProductFromCart,
  addProductToCart,
  deleteProductFromCart,
} from "../api/cart";

export default function CartCard({ cartProduct, loadCart }) {
  const handleRemove = async () => {
    const response = await removeProductFromCart(cartProduct.product._id);
    loadCart();
  };

  const handleAdd = async () => {
    const response = await addProductToCart(cartProduct.product._id);
    loadCart();
  };

  const handleDelete = async () => {
    const response = await deleteProductFromCart(cartProduct.product._id);
    loadCart();
  };

  return (
    <Card
      sx={{
        display: "flex",
        border: "2px solid #1976d2",
        borderLeft: "15px solid #1976d2",
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
        sx={{ width: 200 }}
        image={cartProduct.product.image}
        alt={cartProduct.product.title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
          wordBreak: "break-word",
        }}
      >
        <CardContent>
          <Typography component="div" variant="h5">
            {cartProduct.product.title}
          </Typography>
          <Typography variant="h6" component="div">
            Rs. {cartProduct.product.price}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 4,
        }}
      >
        <ButtonGroup variant="contained">
          <Button
            disabled={cartProduct.quantity == 1}
            sx={{ bgcolor: "grey" }}
            onClick={handleRemove}
          >
            <RemoveIcon />
          </Button>
          <Button sx={{ cursor: "default" }}>{cartProduct.quantity}</Button>
          <Button sx={{ bgcolor: "grey" }} onClick={handleAdd}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        <Button onClick={handleDelete}>
          <DeleteIcon sx={{ color: "red", fontSize: 50 }} />
        </Button>
      </Box>
    </Card>
  );
}
