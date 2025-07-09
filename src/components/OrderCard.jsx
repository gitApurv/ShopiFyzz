import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
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
      <Grid container sx={{ display: "flex", justifyContent: "space-around" }}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            pl: 3,
          }}
        >
          <Typography variant="h5">Order # {order._id}</Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            flexDirection: "column",
            wordBreak: "break-word",
          }}
        >
          {order.products.map((product) => (
            <Typography component="div" variant="h5">
              {product.title}
            </Typography>
          ))}
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            pl: 10,
            pb: 1,
          }}
        >
          <Typography component="div" variant="h5">
            Total: Rs. {order.totalPrice}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "25%",
            pl: 10,
            pb: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/orders/${order._id}`)}
          >
            View Details
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
