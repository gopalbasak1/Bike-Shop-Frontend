import { useEffect, useState } from "react";
import { useGetSingleProductQuery } from "@/redux/features/admin/admin.api";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message } from "antd";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToCart, updateQuantity } from "@/redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch product details
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetSingleProductQuery(id ? { _id: id } : skipToken);

  // Get product from Redux cart (if already added)
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.product === id)
  );

  // Initialize quantity (but don't override user changes)
  const [orderQuantity, setOrderQuantity] = useState(
    cartItem?.orderQuantity || 1
  );

  useEffect(() => {
    if (cartItem && !orderQuantity) {
      setOrderQuantity(cartItem.orderQuantity);
    }
  }, [cartItem]);

  if (!id) {
    return <p className="text-center text-red-500">Invalid product ID</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !productData?.data) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Product not found.
      </p>
    );
  }

  const {
    _id,
    name,
    image,
    brand,
    price,
    description,
    totalQuantity,
    model,
    category,
    inStock,
  } = productData.data;

  // Handle manual input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    if (value > inStock) value = inStock;
    setOrderQuantity(value);
    dispatch(updateQuantity({ id: _id, quantity: value }));
  };

  // Handle Buy Now Click
  const handleBuyNow = () => {
    if (inStock === false) {
      message.error("This product is out of stock!");
      return;
    }

    const selectedProduct = {
      product: _id,
      name,
      price,
      orderQuantity,
      stock: inStock,
      imageUrl: image,
    };

    dispatch(addToCart(selectedProduct));
    message.success("Product added to cart!");
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white shadow-lg rounded-xl p-6">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-[230px] object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 text-lg mt-2">
            Brand: <span className="font-semibold">{brand}</span>
          </p>
          <p className="text-gray-500 text-md mt-2">{description}</p>
          <div className="mt-4 text-gray-700 space-y-2">
            <p>
              <strong>Model:</strong> {model}
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>
          </div>
          <p className="text-xl font-bold text-red-500 mt-4">Price: ${price}</p>
          <p
            className={`mt-2 text-lg font-semibold ${
              inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {inStock ? "✔ In Stock" : "❌ Out of Stock"}
          </p>
          <p className="mt-2 text-lg font-semibold">
            Total Quantity: {totalQuantity}
          </p>

          {/* ✅ Quantity Input Field */}
          {totalQuantity > 0 && (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() =>
                  setOrderQuantity((prev) => Math.max(1, prev - 1))
                }
                className="w-8 h-8 bg-gray-200 text-black rounded hover:bg-gray-300"
                disabled={orderQuantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                value={orderQuantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border-2 border-gray-400 rounded px-2 py-1"
              />
              <button
                onClick={() =>
                  setOrderQuantity((prev) => Math.min(totalQuantity, prev + 1))
                }
                className="w-8 h-8 bg-gray-200 text-black rounded hover:bg-gray-300"
                disabled={orderQuantity >= totalQuantity}
              >
                +
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-4">
            <button
              className={`px-4 py-3 text-white font-semibold rounded-2xl transition ${
                inStock
                  ? "bg-blue-600 hover:bg-blue-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleBuyNow}
              disabled={inStock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
