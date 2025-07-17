import { Box, Card, CardMedia, Typography, Divider } from "@mui/material";

export default function OrderDetailsCard({ product }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        gap: 3,
        p: { xs: 2, sm: 3 },
        border: "2px solid #1976d2",
        borderLeft: "6px solid #1976d2",
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          borderColor: "#1976d2",
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.product.image}
        alt={product.product.title}
        sx={{
          width: { xs: 200, sm: 180 },
          height: { xs: 200, sm: 180 },
          objectFit: "contain",
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
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
          {product.product.title}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="600">
              Rs. {product.product.price}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="600">
              Quantity: {product.quantity}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            mt: 1,
          }}
        >
          Subtotal: ₹{product.product.price * product.quantity}
        </Typography>
      </Box>
    </Card>
  );
}
