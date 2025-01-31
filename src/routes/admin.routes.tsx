import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllProduct from "@/pages/admin/AllProduct";
import CreateProduct from "@/pages/admin/CreateProduct";
import UpdateOrderStatus from "@/pages/admin/UpdateOrderStatus";

export const adminPaths = [
  {
    path: "true",
    element: <AdminDashboard />,
  },
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "create-product",
    element: <CreateProduct />,
  },
  {
    path: "all-product",
    element: <AllProduct />,
  },
  {
    path: "update-status",
    element: <UpdateOrderStatus />,
  },
];
