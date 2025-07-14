import { Box, Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

export default function OrderCard({ order }) {
  console.log(order);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        border: "2px solid #1976d2",
        borderLeft: "8px solid #1976d2",
        borderRadius: 2,
        boxShadow: 4,
        p: 3,
        gap: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          sx={{ wordBreak: "break-word" }}
        >
          Order #{order._id}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 2,
          minWidth: 0,
        }}
      >
        {order.products.map((product) => (
          <Typography
            variant="body1"
            fontWeight={"bold"}
            sx={{
              whiteSpace: "normal",
              wordWrap: "break-word",
              lineHeight: 1.4,
            }}
          >
            • {product.product.title}
          </Typography>
        ))}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body1" fontWeight={"bold"}>
          Total: Rs. {order.totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          pl: { md: 2 },
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(`/orders/${order._id}`)}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}
