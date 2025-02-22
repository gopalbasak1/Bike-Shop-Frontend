import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllProduct from "@/pages/admin/prducts/AllProduct";
import CreateProduct from "@/pages/admin/prducts/CreateProduct";
import UpdateProduct from "@/pages/admin/prducts/UpdateProduct";
import ChangePassword from "@/pages/admin/Profile/ChangePassword";
import MyProfile from "@/pages/admin/Profile/MyProfile";
import UpdateOrderStatus from "@/pages/admin/UpdateOrderStatus";
import AllUser from "@/pages/admin/Users/AllUser";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Profile",
    children: [
      {
        name: "My Profile",
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        name: "Change Password",
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "All User",
        path: "all-user",
        element: <AllUser />,
      },
    ],
  },
  {
    name: "Product Management",
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
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "Update Order Status",
        path: "update-status",
        element: <UpdateOrderStatus />,
      },
    ],
  },
];
