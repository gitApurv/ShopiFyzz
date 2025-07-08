import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SnackbarProvider } from "notistack";
import { LoginProvider } from "./context/Login.jsx";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";

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
        path: "/cart",
        Component: Cart,
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
        path: "/admin/add-product",
        Component: AddProduct,
      },
      {
        path: "/admin/add-product/:productId",
        Component: AddProduct,
      },
      {
        path: "/admin/products",
        Component: AdminProducts,
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
