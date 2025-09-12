import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SnackbarProvider } from "notistack";
import { LoginProvider } from "./context/Login.jsx";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Forgot from "./pages/Forgot.jsx";
import Reset from "./pages/Reset.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import EditProduct from "./pages/EditProduct.jsx";

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
        path: "/orders",
        Component: Order,
      },
      {
        path: "/orders/:orderId",
        Component: OrderDetails,
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
        path: "/reset",
        Component: Forgot,
      },
      {
        path: "reset/:token",
        Component: Reset,
      },
      {
        path: "/admin/add-product",
        Component: AddProduct,
      },
      {
        path: "/admin/edit-product/:productId",
        Component: EditProduct,
      },
      {
        path: "/admin/products",
        Component: AdminProducts,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
    <LoginProvider>
      <RouterProvider router={router}></RouterProvider>
    </LoginProvider>
  </SnackbarProvider>
);
