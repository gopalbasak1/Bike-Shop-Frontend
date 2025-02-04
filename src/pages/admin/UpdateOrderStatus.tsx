import {
  useGetAllOrderQuery,
  useOrderStatusUpdateMutation,
} from "@/redux/features/Orders/Order.api";
import { TQueryParam } from "@/types";
import { TOrder } from "@/types/product";
import {
  Button,
  DatePicker,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Defines the structure for order table data.
 */
export type TTableData = Pick<TOrder, "user" | "_id" | "product" | "status"> & {
  userId: string;
  status: string;
  serial: number;
  key: string;
};

const UpdateOrderStatus = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [estimatedDelivery, setEstimatedDelivery] = useState({});

  const {
    data: orderData,
    isFetching,
    refetch,
  } = useGetAllOrderQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const [updateStatus] = useOrderStatusUpdateMutation();
  const metaData = orderData?.meta;

  const tableData = orderData?.data?.map(
    (
      {
        _id,
        user,
        orderStatus,
        product,
        estimatedDeliveryDate,
        totalPrice,
        quantity,
      },
      index
    ) => ({
      key: _id,
      userName: user?.fullName,
      userEmail: user?.email,
      productName: product?.name,
      orderStatus,
      userId: user?._id,
      totalPrice,
      quantity,
      estimatedDeliveryDate,
      serial: (page - 1) * (metaData?.limit || 10) + index + 1,
    })
  );

  /**
   * Handles order status update
   */
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      console.log("Updating Order ID:", orderId, newStatus); // Debugging Log

      const response = await updateStatus({
        id: orderId,
        data: {
          orderStatus: newStatus,
          estimatedDeliveryDate: estimatedDelivery[orderId] || null,
        },
      }).unwrap();
      console.log(newStatus);
      console.log(response);
      toast.success(`Status updated to "${newStatus}"`);

      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  /**
   * Determines the next status in the order workflow.
   */
  const confirmStatusChange = (orderId: string, currentStatus: string) => {
    let nextStatus = "";

    switch (currentStatus) {
      case "Pending":
        nextStatus = "Processing";
        break;
      case "Processing":
        nextStatus = "Shipped";
        break;
      case "Shipped":
        nextStatus = "Delivered";
        break;
      case "Delivered":
        toast.info("Order is already delivered.");
        return;
      default:
        nextStatus = "Pending";
    }

    Modal.confirm({
      title: `Change order status to "${nextStatus}"?`,
      content: `Are you sure you want to update this order's status to "${nextStatus}"?`,
      okText: "Yes",
      cancelText: "No",
      onOk: () => handleStatusChange(orderId, nextStatus),
    });
  };

  const handleDateChange = (orderId: string, date: any) => {
    setEstimatedDelivery((prev) => ({ ...prev, [orderId]: date }));
  };

  /**
   * Defines table columns with actions and status color coding.
   */
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Sl",
      dataIndex: "serial",
      responsive: ["md"],
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Order ID",
      key: "key",
      dataIndex: "key",
      render: (text) => {
        const shortId = text.slice(0, 8);
        return (
          <Tooltip title={text}>
            <span>{shortId}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "Product",
      key: "productName",
      dataIndex: "productName",
    },
    {
      title: "Customer",
      key: "userName",
      dataIndex: "userName",
      responsive: ["sm"],
    },
    {
      title: "Email",
      key: "userEmail",
      dataIndex: "userEmail",
      responsive: ["md"],
    },
    {
      title: "Qty",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total Price",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Est. Delivery",
      dataIndex: "estimatedDeliveryDate",
      render: (_, record) => (
        <DatePicker
          value={
            estimatedDelivery[record.key]
              ? dayjs(estimatedDelivery[record.key])
              : dayjs(record.estimatedDeliveryDate)
          }
          onChange={(date) => handleDateChange(record.key, date)}
        />
      ),
      responsive: ["lg"],
    },
    {
      title: "Status",
      key: "orderStatus",
      dataIndex: "orderStatus",
      render: (status) => {
        const statusColors = {
          Pending: "orange",
          Processing: "blue",
          Shipped: "purple",
          Delivered: "green",
        };
        return (
          <span
            style={{
              color: statusColors[status] || "gray",
              fontWeight: "bold",
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space>
          <Button
            onClick={() => confirmStatusChange(item.key, item.orderStatus)}
            type="primary"
            disabled={item.orderStatus === "Delivered"}
          >
            {item.orderStatus === "Delivered" ? "Completed" : "Next Status"}
          </Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        scroll={{ x: "max-content" }} // Enables horizontal scrolling on small screens
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default UpdateOrderStatus;
