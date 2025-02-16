import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import {
  clearCart,
  removeProductFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "@/redux/features/Orders/Order.api";
import { toast } from "sonner";
import { TUser } from "@/redux/features/auth/authSlice";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("SurjoPay");
  const [orderBike, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();
  const dispatch = useDispatch();

  // Get user details from Redux store
  const userInfo: TUser | null = useAppSelector((state) => state.auth.user);
  const { name, email } = userInfo || {}; // Ensure userInfo exists

  // Calculate Total Price
  const totalPrice = cartItems.items.reduce(
    (sum, item) => sum + item.price * item.orderQuantity,
    0
  );

  const handleOrder = async () => {
    if (cartItems.items.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const { product, orderQuantity } = cartItems.items[0]; // Taking the first product
    await orderBike({ product, orderQuantity });
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        // Clear the cart after successful order
        dispatch(clearCart());
        // Redirect to the payment or order confirmation URL
        setTimeout(() => {
          window.location.href = data?.data;
        }, 1000);
      }
    }

    if (isError) {
      toast.error(JSON.stringify(error), { id: toastId });
    }
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Display User Details */}
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Name:{" "}
            {`${name?.firstName || ""} ${name?.middleName || ""} ${
              name?.lastName || ""
            }`.trim()}
          </p>
          <p className="text-lg font-semibold">
            Email: {email || "Not provided"}
          </p>
        </div>

        {/* Display Cart Items */}
        {cartItems?.items?.map((item) => (
          <div
            key={item.product}
            className="flex justify-between items-center mb-4"
          >
            <p>
              {item.name} (x{item.orderQuantity})
            </p>
            <div className="flex items-center">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.product,
                      orderQuantity: Math.max(item.orderQuantity - 1, 1),
                    })
                  )
                }
                className="px-3 py-1 bg-gray-300 rounded-l"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
                {item.orderQuantity}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.product,
                      orderQuantity: item.orderQuantity + 1,
                    })
                  )
                }
                className="px-3 py-1 bg-gray-300 rounded-r"
              >
                +
              </button>
            </div>
            <p>${item.price * item.orderQuantity}</p>

            {/* Remove All of This Product */}
            <button
              onClick={() => dispatch(removeProductFromCart(item.product))}
              className="ml-4 px-4 py-1 bg-red-500 text-white rounded"
            >
              Remove All
            </button>
          </div>
        ))}

        <hr className="my-4" />
        <p className="text-lg font-bold">Total: ${totalPrice}</p>

        {/* Payment Method Selection */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">
            Payment Method:
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-2"
          >
            <option value="SurjoPay">SurjoPay</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Order Now Button */}
        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
