import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api/auth";

export default function Login() {
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
      navigate("/");
    } catch (err) {
      showAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" fontFamily="Work sans">
          Login
        </Typography>
      </Box>
      <Box
        sx={{
          width: "500px",
          mt: 5,
        }}
      >
        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack spacing={2}>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                variant="outlined"
                required
                {...register("email")}
              ></TextField>
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                required
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onMouseDown={handleMouseDownPassword}
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button variant="contained" disabled={loading} type="submit">
              {loading ? <CircularProgress size={20} /> : "Login"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
