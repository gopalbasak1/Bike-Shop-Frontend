import { useState } from "react";
import { useGetAllProductQuery } from "@/redux/features/admin/admin.api";
import { Pagination, Input, Spin, Select } from "antd";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

const AllProduct = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // Search input
  const [brand, setBrand] = useState(""); // Brand filter
  const [category, setCategory] = useState(""); // Category filter
  const [inStock, setInStock] = useState(""); // Stock filter: "true" | "false" | ""

  // Construct query parameters dynamically
  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: "10" },
    { name: "sort", value: "_id" },
    ...(search ? [{ name: "searchTerm", value: search }] : []),
    ...(brand ? [{ name: "brand", value: brand }] : []),
    ...(category ? [{ name: "category", value: category }] : []),
  ];

  // Fetch all products with filters applied
  const { data: productData, isFetching } = useGetAllProductQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  const metaData = productData?.meta;

  // Extract unique brands and categories for filtering dropdown
  const brands = [...new Set(productData?.data?.map((p) => p.brand))];
  const categories = [...new Set(productData?.data?.map((a) => a.category))];

  // Apply stock filter dynamically on frontend
  const filteredProducts = productData?.data?.filter((item) => {
    if (inStock === "true") return item.inStock === true;
    if (inStock === "false") return item.inStock === false;
    return true; // Show all if no filter is selected
  });

  return (
    <div className="my-10 px-4">
      {/* Filters Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Search Field */}
        <Search
          placeholder="Search by product name"
          allowClear
          onSearch={(value) => setSearch(value)}
          className="w-72"
        />

        {/* Brand Filter */}
        <Select
          placeholder="Filter by Brand"
          className="w-56"
          onChange={setBrand}
          allowClear
        >
          {brands.map((b) => (
            <Option key={b} value={b}>
              {b}
            </Option>
          ))}
        </Select>

        {/* Category Filter */}
        <Select
          placeholder="Filter by Category"
          className="w-56"
          onChange={setCategory}
          allowClear
        >
          {categories.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>

        {/* Stock Availability Filter */}
        <Select
          placeholder="Stock Availability"
          className="w-56"
          onChange={(value) => setInStock(value)}
          allowClear
        >
          <Option value="true">In Stock</Option>
          <Option value="false">Out of Stock</Option>
        </Select>
      </div>

      {/* Loading State */}
      {isFetching && (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      )}

      {/* Product Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10">
        {filteredProducts && filteredProducts?.length > 0
          ? filteredProducts?.map((item) => (
              <div
                key={item._id}
                className="w-[350] h-auto shadow-md dark:bg-gray-50 dark:text-gray-800 rounded-2xl"
              >
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
            ))
          : !isFetching && (
              <div className="text-center text-gray-500">
                No products found. Try a different search or filter.
              </div>
            )}
      </div>

      {/* Pagination */}
      {metaData && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </div>
      )}
    </div>
  );
};

export default AllProduct;
