import App from "@/App";
import Main from "@/components/layout/Main";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "@/utils/routesGenerator";
import { customerPaths } from "./customer.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AllProduct from "@/pages/AllProduct";
import Checkout from "@/pages/Checkout/Checkout";
import ProductDetails from "@/components/Shared/Home/ProductDetails";
import VerifyOrder from "@/pages/Checkout/VerifyOrder";
import ErrorPage from "@/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-product",
        element: <AllProduct />,
      },
      {
        path: "/products/:id",
        element: (
          <ProtectedRoute role={["admin", "customer"]}>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role={["admin", "customer"]}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders/verify",
        element: (
          <ProtectedRoute role="customer">
            <VerifyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },

  //admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: (
      <ProtectedRoute role="customer">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(customerPaths),
  },
]);

export default router;
