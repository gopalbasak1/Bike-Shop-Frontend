import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// Assuming you have SurjoPay integration

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  //const [placeOrder] = usePlaceOrderMutation();

  if (!product) {
    return <p className="text-center text-red-500">No product selected.</p>;
  }

  const totalPrice = product.price * quantity;

  const handleOrder = async () => {
    if (quantity > product.quantity) {
      alert("Ordered quantity exceeds stock availability.");
      return;
    }

    const orderData = {
      productId: product._id,
      quantity,
      totalPrice,
      paymentMethod: "SurjoPay",
    };

    try {
      await placeOrder(orderData);
      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <div className="flex gap-4 mt-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>Price: ${product.price}</p>
          <label className="block mt-2">Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 w-20"
          />
          <p className="mt-2 font-semibold">Total: ${totalPrice}</p>
        </div>
      </div>
      {/* <SurjoPay total={totalPrice} /> Payment Integration Component */}
      <button
        onClick={handleOrder}
        className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        Order Now
      </button>
    </div>
  );
};

export default Checkout;
