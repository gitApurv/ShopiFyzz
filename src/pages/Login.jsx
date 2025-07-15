import {
  Visibility,
  VisibilityOff,
  MailOutline,
  Password,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { loginUser } from "../api/auth";
import { LoginContext } from "../context/Login";

export default function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const showAlert = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      style: {
        backgroundColor: "red",
      },
    });
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (!response.ok) throw new Error(response.message);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      showAlert(err.message);
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
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
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
            <FormControl required variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Password
              </FormLabel>
              <TextField
                {...register("password")}
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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
                "Login"
              )}
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              Don't have an account?
              <Button
                color="primary"
                onClick={() => navigate("/signup")}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  p: 0,
                  ml: 0.5,
                }}
              >
                SignUp
              </Button>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
