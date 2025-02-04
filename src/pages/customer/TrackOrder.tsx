"use client";

import { useState } from "react";

import { TOrder } from "@/types/product";
import { useGetMyOrdersQuery } from "@/redux/features/Orders/Order.api";

const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];

const TrackOrder = () => {
  const { data, isLoading, error } = useGetMyOrdersQuery(undefined);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders</p>;

  const orders: TOrder[] = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Track My Order</h2>

      {/* Order Selection Dropdown */}
      <select
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setSelectedOrder(
            orders.find((order) => order._id === e.target.value) || null
          )
        }
      >
        <option value="">Select an Order</option>
        {orders.map((order) => (
          <option key={order._id} value={order._id}>
            {order?.product?.name}
          </option>
        ))}
      </select>

      {/* Order Details & Tracking */}
      {selectedOrder && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Order Details</h3>
          <p>
            <strong>Order ID:</strong> {selectedOrder._id}
          </p>
          <p>
            <strong>Product:</strong> {selectedOrder.product.name}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedOrder.quantity}
          </p>
          <p>
            <strong>Total Price:</strong> ${selectedOrder.totalPrice}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {selectedOrder.estimatedDeliveryDate
              ? new Date(selectedOrder.estimatedDeliveryDate).toDateString()
              : "Not Available"}
          </p>

          {/* Order Status Progress Bar */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Order Status</h3>
          <div className="flex items-center justify-between w-full">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    statusSteps.indexOf(selectedOrder.orderStatus) >= index
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm mt-1">{step}</span>
              </div>
            ))}
          </div>

          {/* Connecting Progress Line */}
          <div className="flex w-full items-center mt-2">
            {statusSteps.map((_, index) =>
              index < statusSteps.length - 1 ? (
                <div
                  key={index}
                  className={`flex-1 h-1 ${
                    statusSteps.indexOf(selectedOrder.orderStatus) > index
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
