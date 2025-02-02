import App from "@/App";
import Main from "@/components/layout/Main";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "@/utils/routesGenerator";
import { customerPaths } from "./customer.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <Products />,
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
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: <App />,
    children: routeGenerator(customerPaths),
  },
]);

export default router;
