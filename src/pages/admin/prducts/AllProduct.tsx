/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableColumnsType, Image } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/index";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/features/admin/admin.api";
import { useNavigate } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "sonner";

const AllProduct = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const navigate = useNavigate();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const {
    data: productData,
    refetch,
    isFetching,
  } = useGetAllProductQuery(params);

  console.log(productData);

  const tableData = productData?.data?.map(
    ({ _id, name, brand, category, price, quantity, image }) => ({
      key: _id, // Ensure this matches the backend `_id`
      name,
      brand,
      category,
      price,
      quantity,
      image,
    })
  );

  const handleDelete = async (_id: string) => {
    if (!_id) {
      toast.error("Invalid product ID.");
      return;
    }

    try {
      const result = await deleteProduct({ id: _id }).unwrap();

      console.log("Delete Response:", result);
      refetch();
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete product.");
    }
  };

  // ✅ Define responsive table columns
  const columns: TableColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      responsive: ["sm", "md", "lg", "xl"],
      render: (image) => <Image width={50} src={image} alt="Product Image" />,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg", "xl"], // ✅ Show on all devices
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      responsive: ["sm", "md", "lg", "xl"], // ❌ Hide on extra-small screens
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md", "lg", "xl"], // ❌ Hide on small screens
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (price) => `$${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["sm", "md", "lg", "xl"],
    },

    {
      title: "Action",
      key: "action",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (item) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            className="border-none"
            onClick={() => navigate(`/admin/update-product/${item.key}`)}
          >
            <FaPenToSquare className="hover:text-green-500" />
          </Button>

          <Button
            className="outline-none border-none"
            loading={isDeleting}
            onClick={() => handleDelete(item.key)}
          >
            <MdOutlineDelete className="hover:text-red-500" />
          </Button>
          {/* <Button loading={isDeleting} onClick={() => console.log(item.key)}>
            <MdOutlineDelete />
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ overflowX: "auto", padding: "10px" }}>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        scroll={{ x: "max-content" }} // ✅ Enables horizontal scroll if needed
        pagination={{ pageSize: 10 }} // ✅ Limit items per page for better UX
      />
    </div>
  );
};

export default AllProduct;
