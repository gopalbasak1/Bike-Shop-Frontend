import AllOrders from "@/pages/customer/AllOrders";
import Profile from "@/pages/customer/Profile";

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
        name: "All Order",
        path: "all-order",
        element: <AllOrders />,
      },
      {
        name: "Profile",
        path: "Profile",
        element: <Profile />,
      },
    ],
  },
];
