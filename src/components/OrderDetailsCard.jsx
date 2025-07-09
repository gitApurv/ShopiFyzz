import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function OrderDetailsCard({ product }) {
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
        image={product.imageUrl}
        alt={product.title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "230px",
          wordBreak: "break-word",
        }}
      >
        <CardContent>
          <Typography component="div" variant="h5">
            {product.title}
          </Typography>
          <Typography variant="h6" component="div">
            Rs. {product.price}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 5,
          pr: 5,
        }}
      >
        <CardContent>
          <Typography component="div" variant="h5">
            Quantity : {product.quantity}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
