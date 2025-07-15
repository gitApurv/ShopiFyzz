import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";

export default function AdminProductCard({ product, deleteProduct }) {
  const navigate = useNavigate();

  const handleDeleteProduct = async () => {
    const productId = product._id;
    deleteProduct(productId);
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
          onClick={() => navigate(`/admin/edit-product/${product._id}`)}
          startIcon={<EditIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Edit
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleDeleteProduct}
          startIcon={<DeleteIcon />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
