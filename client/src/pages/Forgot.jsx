import { MailOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { forgotPassword } from "../api/auth";

export default function Forgot() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const showAlert = (message, variant) => {
    enqueueSnackbar(message, {
      variant: { variant },
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      style: {
        backgroundColor: variant === "error" ? "red" : "#1976d2",
      },
    });
  };

  const handleReset = async (data) => {
    setLoading(true);
    try {
      const response = await forgotPassword(data);
      if (!response.ok) throw new Error(response.message);
      const { message } = response;
      showAlert(message, "success");
      navigate("/login");
    } catch (err) {
      showAlert(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(handleReset)}>
          <Stack spacing={3}>
            <FormControl required variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Email
              </FormLabel>
              <TextField
                {...register("email")}
                required
                type="email"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              type="submit"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: 2,
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: 3,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
