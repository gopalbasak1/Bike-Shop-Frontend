import { useGetAllProductQuery } from "@/redux/features/admin/admin.api";
import { Spin } from "antd";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Removed Navigation
import "swiper/css";
import "swiper/css/pagination";

const ProductSection = () => {
  // Fetch all products
  const { data: productData, isFetching } = useGetAllProductQuery(undefined);
  const featuredProducts = productData?.data?.slice(0, 6) || [];

  return (
    <div className="my-10 px-4">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Featured Products
      </h2>

      {/* Loading State */}
      {isFetching ? (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      ) : (
        <div className="relative">
          {/* Swiper Container */}
          <Swiper
            modules={[Pagination, Autoplay]} // ✅ Removed Navigation Module
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="my-10"
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="w-[350] h-auto shadow-md dark:bg-gray-50 dark:text-gray-800 rounded-2xl">
                    {/* Image */}
                    <div className="relative w-full h-[230px] overflow-hidden rounded-t-2xl">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex flex-col justify-between p-6 space-y-8">
                      <div className="space-y-2 h-[110px]">
                        <hr />

                        <h2 className="text-2xl font-semibold tracking-wide font-serif">
                          {item.name}
                        </h2>
                        <h2 className="text-xl font-semibold tracking-wide font-serif">
                          Brand: {item.brand}
                        </h2>

                        <div className="flex gap-8">
                          <p className="flex items-center gap-3 font-semibold">
                            <a> Price</a>
                            <a>
                              <MdArrowRightAlt />
                            </a>
                          </p>
                          <p className="text-red-500 font-semibold">
                            $ {item.price}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/products/${item._id}`}
                        type="button"
                        className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-3">
                No products available.
              </div>
            )}
          </Swiper>
        </div>
      )}

      {/* View All Button */}
      <div className="flex justify-center mt-6">
        <Link
          to="/all-product"
          className="px-4 py-3 rounded-xl font-semibold text-white bg-blue-400  hover:bg-blue-700 shadow-lg transition-transform duration-300 hover:scale-105"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
