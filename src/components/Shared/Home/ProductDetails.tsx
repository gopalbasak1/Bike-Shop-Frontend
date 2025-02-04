import { useGetSingleProductQuery } from "@/redux/features/admin/admin.api";
import { Link, useParams } from "react-router-dom";
import { Spin } from "antd";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("Product ID:", id);

  // Fetch product details
  const { data: productData, isLoading } = useGetSingleProductQuery({
    _id: id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (!productData)
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Product not found.
      </p>
    );

  const {
    name,
    image,
    brand,
    price,
    description,
    model,
    category,
    inStock,
    quantity,
  } = productData?.data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white shadow-lg rounded-xl p-6">
        {/* Left: Image */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-[230px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right: Product Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 text-lg mt-2">
            Brand: <span className="font-semibold">{brand}</span>
          </p>
          <p className="text-gray-500 text-md mt-2">{description}</p>

          {/* Product Information */}
          <div className="mt-4 text-gray-700 space-y-2">
            <p>
              <strong>Model:</strong> {model}
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>
          </div>

          {/* Price & Availability */}
          <p className="text-xl font-bold text-red-500 mt-4">Price: ${price}</p>
          <p className="text-xl font-bold text-yellow-500">
            Quantity: {quantity}
          </p>
          <p
            className={`mt-2 text-lg font-semibold ${
              inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {inStock ? "✔ In Stock" : "❌ Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Link
              to="/checkout"
              className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-800 transition "
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
