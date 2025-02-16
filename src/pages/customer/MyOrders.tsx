"use client";

import { useState } from "react";

import { TOrder } from "@/types/product";
import { useGetMyOrdersQuery } from "@/redux/features/Orders/Order.api";

const MyOrders = () => {
  const { data, isLoading, error } = useGetMyOrdersQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders</p>;

  const orders: TOrder[] = data?.data || [];

  // Filter orders based on search input
  const filteredOrders = orders.filter((order) =>
    order.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="border p-2 w-full mb-4 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table Wrapper for Scrollable on Small Screens */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-sm">
                <th className="p-2">Product</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b text-sm">
                  <td className="p-2">{order.product.name}</td>
                  <td className="p-2">{order.orderQuantity}</td>
                  <td className="p-2">${order.totalPrice}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500 text-white"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-500 text-white"
                          : order.orderStatus === "Processing"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-2">
                    {new Date(order.createdAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
