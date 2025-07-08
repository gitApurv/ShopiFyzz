import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SnackbarProvider } from "notistack";
import { LoginProvider } from "./context/Login.jsx";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddProduct from "./pages/AddProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", Component: Home },
      {
        path: "/product/:productId",
        Component: ProductDetails,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "/add-product",
        Component: AddProduct,
      },
      {
        path: "/add-product/:productId",
        Component: AddProduct,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <LoginProvider>
        <RouterProvider router={router}></RouterProvider>
      </LoginProvider>
    </SnackbarProvider>
  </StrictMode>
);
