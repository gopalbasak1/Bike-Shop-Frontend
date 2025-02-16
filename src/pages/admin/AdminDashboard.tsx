import { useEffect, useState } from "react";
import { useGetAllOrderQuery } from "@/redux/features/Orders/Order.api";
import { useGetAllUserQuery } from "@/redux/features/Users/users.api";
import { useGetAllProductQuery } from "@/redux/features/admin/admin.api";
import { Card, Col, Row, Statistic } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import Skeleton from "@/components/Shared/Skeleton/Skeleton";

const AdminDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshInterval, _setRefreshInterval] = useState(5000);

  // Fetch all users
  const {
    data: usersData,
    refetch: refetchUsers,
    isLoading: isLoadingUsers,
  } = useGetAllUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  console.log(usersData); // Check if the response contains all users
  console.log(usersData?.data?.length); // This should print 16
  // Fetch all orders
  const {
    data: ordersData,
    refetch: refetchOrders,
    isLoading: isLoadingOrders,
  } = useGetAllOrderQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  // Fetch all products
  const {
    data: productData,
    refetch: refetchProducts,
    isLoading: isLoadingProduct,
  } = useGetAllProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  console.log(productData); // Check if the response contains all productData
  console.log(productData?.data?.length); // This should print 16

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchUsers();
      refetchOrders();
      refetchProducts();
    }, refreshInterval);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [refreshInterval, refetchUsers, refetchOrders, refetchProducts]);

  if (isLoadingUsers || isLoadingOrders || isLoadingProduct) {
    return <Skeleton />;
  }
  //console.log(usersData.data);
  const totalUsers = usersData?.data?.length || 0;
  const totalOrders = ordersData?.data?.length || 0;
  const totalProduct = productData?.data?.length || 0;
  console.log(totalUsers);
  // Calculate total revenue
  const totalRevenue =
    ordersData?.data?.reduce(
      (acc, order) => acc + (order.totalPrice || 0),
      0
    ) || 0;

  // Group orders by month and calculate revenue
  const revenueByMonth: { [key: string]: number } = {};

  ordersData?.data?.forEach((order) => {
    if (order.transaction?.date_time) {
      const month = dayjs(order.transaction.date_time).format("MMMM");
      revenueByMonth[month] = (revenueByMonth[month] || 0) + order.totalPrice;
    }
  });

  const revenueData = Object.keys(revenueByMonth).map((month) => ({
    month,
    revenue: revenueByMonth[month],
  }));

  return (
    <div className="p-4 md:p-6 lg:p-8 font-sans">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="text-center rounded-lg shadow-lg">
            <Statistic title="Total Users" value={totalUsers} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="text-center rounded-lg shadow-lg">
            <Statistic title="Total Products" value={totalProduct} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="text-center rounded-lg shadow-lg">
            <Statistic title="Total Orders" value={totalOrders} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="text-center rounded-lg shadow-lg">
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="$"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-10">
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-4">
          Monthly Revenue Trend
        </h2>
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={revenueData}
              margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#007bff"
                strokeWidth={3}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
