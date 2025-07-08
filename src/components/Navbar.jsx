import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { AccountBox, MenuOpen } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/Login";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop */}
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <LocalMallIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            ShopiFyzz
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            <Button
              key={0}
              onClick={() => navigate("/cart")}
              sx={{
                my: 1,
                color: "white",
                display: "block",
                position: "ml",
                fontSize: 18,
              }}
            >
              Cart
            </Button>
            <Button
              key={1}
              onClick={() => navigate("/orders")}
              sx={{
                my: 1,
                color: "white",
                display: "block",
                position: "ml",
                fontSize: 18,
              }}
            >
              Orders
            </Button>
          </Box>
          {!isLoggedIn && (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
                gap: 2,
                marginLeft: "auto",
              }}
            >
              <Button
                key={2}
                onClick={() => navigate("/login")}
                sx={{
                  display: "block",
                  my: 1,
                  color: "white",
                  position: "ml",
                  fontSize: 18,
                }}
              >
                Login
              </Button>
              <Button
                key={3}
                onClick={() => navigate("/signup")}
                sx={{
                  my: 1,
                  color: "white",
                  display: "block",
                  position: "ml",
                  fontSize: 18,
                }}
              >
                Signup
              </Button>
            </Box>
          )}
          {isLoggedIn && (
            <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0 }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountBox sx={{ color: "white", fontSize: 30 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={0} onClick={() => navigate("add-product")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Add Product
                  </Typography>
                </MenuItem>
                <MenuItem key={1} onClick={() => navigate("products")}>
                  <Typography sx={{ textAlign: "center" }} href="/products">
                    Admin Products
                  </Typography>
                </MenuItem>
                <MenuItem key={2} onClick>
                  <Typography sx={{ textAlign: "center" }}>LogOut</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {/* Mobile  */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem key={0} onClick={() => navigate("cart")}>
                <Typography sx={{ textAlign: "center" }}>Cart</Typography>
              </MenuItem>
              <MenuItem key={1} onClick={() => navigate("orders")}>
                <Typography sx={{ textAlign: "center" }}>Orders</Typography>
              </MenuItem>
              {!isLoggedIn && (
                <MenuItem key={2} onClick={() => navigate("login")}>
                  <Typography sx={{ textAlign: "center" }}>Login</Typography>
                </MenuItem>
              )}
              {!isLoggedIn && (
                <MenuItem key={3} onClick={() => navigate("signup")}>
                  <Typography sx={{ textAlign: "center" }}>Signup</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <LocalMallIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            ShopiFyzz
          </Typography>
          {isLoggedIn && (
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 0 }}>
              <Tooltip>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <MenuOpen />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={0} onClick={() => navigate("add-product")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Add Product
                  </Typography>
                </MenuItem>
                <MenuItem key={1} onClick={() => navigate("products")}>
                  <Typography sx={{ textAlign: "center" }} href="/products">
                    Admin Products
                  </Typography>
                </MenuItem>
                <MenuItem key={2} onClick>
                  <Typography sx={{ textAlign: "center" }}>LogOut</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
