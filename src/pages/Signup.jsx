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
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { signUpUser } from "../api/auth";
import { LoginContext } from "../context/Login";

export default function Signup() {
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
          SignUp
        </Typography>
      </Box>
      <Box
        sx={{
          width: "500px",
          mt: 5,
        }}
      >
        <form onSubmit={handleSubmit(handleSignup)}>
          <Stack spacing={2}>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                id="name"
                variant="outlined"
                required
                {...register("name")}
              ></TextField>
            </FormControl>
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
              {loading ? <CircularProgress size={20} /> : "Signup"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
