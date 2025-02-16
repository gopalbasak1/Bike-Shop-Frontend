/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableColumnsType, Image, Pagination } from "antd";
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
  const [page, setPage] = useState(1);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const {
    data: productData,
    refetch,
    isFetching,
  } = useGetAllProductQuery([{ name: "page", value: page }, params], {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const metaData = productData?.meta;

  console.log(productData);

  const tableData = productData?.data?.map(
    ({ _id, name, brand, category, price, totalQuantity, image }, index) => ({
      key: _id, // Ensure this matches the backend `_id`
      name,
      brand,
      category,
      price,
      totalQuantity,
      image,
      serial: (page - 1) * (metaData?.limit || 10) + index + 1,
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
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (serial) => serial, // Serial number column
    },
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
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
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

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };

  return (
    <div style={{ overflowX: "auto", padding: "10px" }}>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        scroll={{ x: "max-content" }} // ✅ Enables horizontal scroll if needed
        pagination={false} // ✅ Limit items per page for better UX
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default AllProduct;
