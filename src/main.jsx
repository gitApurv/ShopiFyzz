import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "../src/components/home.jsx";
import Login from "../src/components/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <App />
  </StrictMode>
);
