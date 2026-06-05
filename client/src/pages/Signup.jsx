import {
  Visibility,
  VisibilityOff,
  Password,
  PersonOutlined,
  MailOutlined,
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
import { signUpUser } from "../api/auth";
import { LoginContext } from "../context/LoginContext";

export default function Signup() {
  const { setIsLoggedIn } = useContext(LoginContext);
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

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      const response = await signUpUser(data);
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
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ mb: 4, textAlign: "center" }}
        >
          SignUp
        </Typography>
        <form onSubmit={handleSubmit(handleSignup)}>
          <Stack spacing={3}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Full Name
              </FormLabel>
              <TextField
                {...register("name")}
                required
                placeholder="Enter your name"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined color="primary" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                Email Address
              </FormLabel>
              <TextField
                {...register("email")}
                required
                type="email"
                placeholder="Enter your email"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlined color="primary" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
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
                placeholder="Create a password"
                slotProps={{
                  input: {
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
                  },
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
                "SignUp"
              )}
            </Button>
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}
            >
              Already have an account?
              <Button
                color="primary"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  p: 0,
                  ml: 0.5,
                }}
              >
                Login
              </Button>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
