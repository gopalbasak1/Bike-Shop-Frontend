import ChangePassword from "@/pages/admin/Profile/ChangePassword";
import MyProfile from "@/pages/admin/Profile/MyProfile";
import MyOrders from "@/pages/customer/MyOrders";
import TrackOrder from "@/pages/customer/TrackOrder";

export const customerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "CUSTOMER_DASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Profile",
        path: "Profile",
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
    name: "Order Management",
    children: [
      {
        name: "My Order",
        path: "my-order",
        element: <MyOrders />,
      },
      {
        name: "Track Order",
        path: "track-order",
        element: <TrackOrder />,
      },
    ],
  },
];
