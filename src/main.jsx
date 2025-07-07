import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { UserProvider } from "./context/user.jsx";
import App from "./App.jsx";
import Login from "../src/components/login.jsx";
import Navbar from "./components/Navbar.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/login", Component: Login },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </StrictMode>
);
