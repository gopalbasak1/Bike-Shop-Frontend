"use client";

import { useState } from "react";

import { TOrder } from "@/types/product";
import { useGetMyOrdersQuery } from "@/redux/features/Orders/Order.api";

const statusSteps = ["Pending", "Paid", "Processing", "Shipped", "Delivered"];

const TrackOrder = () => {
  const { data, isLoading, error } = useGetMyOrdersQuery(undefined);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  if (isLoading) return <p className="text-center">Loading orders...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching orders</p>;

  const orders: TOrder[] = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Track My Order</h2>

      {/* Order Selection Dropdown */}
      <div className="mb-6">
        <select
          className="border p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      {/* Order Details & Tracking */}
      {selectedOrder && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Order Details
          </h3>
          <div className="space-y-2">
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Product:</strong> {selectedOrder.product.name}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.orderQuantity}
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
          </div>

          {/* Order Status Progress Bar */}
          <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-800">
            Order Status
          </h3>
          <div className="flex items-center justify-between overflow-x-auto w-full space-x-2">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                    statusSteps.indexOf(selectedOrder.orderStatus) >= index
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm mt-2 text-center">{step}</span>
              </div>
            ))}
          </div>

          {/* Connecting Progress Line */}
          <div className="flex w-full items-center mt-4">
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
