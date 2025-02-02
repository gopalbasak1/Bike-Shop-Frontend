import AllProduct from "@/pages/admin/AllProduct";
import CreateProduct from "@/pages/admin/CreateProduct";
import UpdateOrderStatus from "@/pages/admin/UpdateOrderStatus";
import AllUser from "@/pages/admin/Users/AllUser";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "ADMIN_DASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Product",
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        name: "All Product",
        path: "all-product",
        element: <AllProduct />,
      },
      {
        name: "Update Status",
        path: "update-status",
        element: <UpdateOrderStatus />,
      },
      {
        name: "All User",
        path: "all-user",
        element: <AllUser />,
      },
    ],
  },
];
