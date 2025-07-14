import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

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
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: { xs: 2, md: 2 },
        p: { xs: 2, md: 3 },
        border: "2px solid #1976d2",
        borderLeft: "6px solid #1976d2",
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{ flex: "0 0 120px", display: "flex", justifyContent: "center" }}
      >
        <CardMedia
          component="img"
          image={cartProduct.product.image}
          alt={cartProduct.product.title}
          sx={{
            width: { xs: 180, md: 100 },
            height: { xs: 180, md: 100 },
            objectFit: "contain",
            borderRadius: 1,
            backgroundColor: "#f8f8f8",
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.4,
          }}
        >
          {cartProduct.product.title}
        </Typography>
        <Typography variant="h6" fontWeight="600">
          Rs. {cartProduct.product.price}
        </Typography>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" } }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <ButtonGroup variant="outlined">
          <Button
            onClick={handleRemove}
            disabled={cartProduct.quantity === 1}
            sx={{
              bgcolor: "#e0e0e0",
            }}
          >
            <RemoveIcon />
          </Button>
          <Button
            sx={{
              cursor: "default",
            }}
          >
            <Typography fontWeight="bold">{cartProduct.quantity}</Typography>
          </Button>
          <Button
            onClick={handleAdd}
            sx={{
              bgcolor: "#e0e0e0",
            }}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
        <IconButton
          onClick={handleDelete}
          sx={{
            color: "red",
            fontSize: 28,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
