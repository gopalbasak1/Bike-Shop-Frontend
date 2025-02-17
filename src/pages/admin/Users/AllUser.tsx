/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useGetAllUsersQuery,
  useStatusUpdateMutation,
} from "@/redux/features/admin/admin.api";
import { TQueryParam } from "@/types";
import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = {
  key: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  serial: number;
  _id: string;
};

const AllUser = () => {
  const [params, _setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: userData,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(
    [
      { name: "page", value: page.toString() },
      { name: "limit", value: "10" },
      ...params,
    ],
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    }
  );

  const metaData = userData?.meta;

  console.log(userData, metaData);

  const [updateStatus] = useStatusUpdateMutation();

  const tableData = userData?.data?.map(
    ({ _id, id, fullName, email, role, status }, index) => ({
      key: _id, // Ensure this is used as userId in actions
      userId: id, // Include userId to avoid "undefined" error
      fullName,
      _id,
      email,
      role,
      status,
      serial: (page - 1) * (metaData?.limit || 10) + index + 1,
    })
  );

  console.log("User Data:", userData);
  console.log("Table Data:", tableData);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      if (!userId) {
        toast.error("User ID is missing. Cannot update status.");
        return;
      }

      const response = await updateStatus({
        id: userId,
        data: { status: newStatus },
      }).unwrap(); // Unwrap the promise to access the result directly

      console.log("Status Update Response:", response);
      toast.success(`Status successfully updated to "${newStatus}"`);
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const confirmStatusChange = (userId: string, currentStatus: string) => {
    if (!userId) {
      toast.error("User ID is missing. Cannot update status.");
      return;
    }

    const newStatus = currentStatus === "blocked" ? "in-progress" : "blocked";

    Modal.confirm({
      title: `Are you sure you want to ${
        newStatus === "blocked" ? "block" : "unblock"
      } this user?`,
      content: `This action will set the user's status to "${newStatus}".`,
      okText: "Yes",
      cancelText: "No",
      onOk: () => handleStatusChange(userId, newStatus),
    });
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Sl",
      dataIndex: "serial",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <span style={{ color: status === "blocked" ? "red" : "green" }}>
          {status === "blocked" ? "Blocked" : "In Progress"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        const isBlocked = item.status === "blocked";
        const buttonText = isBlocked ? "In Progress" : "Blocked";
        const buttonColor = isBlocked ? "green" : "red";

        return (
          <Space>
            <Button
              onClick={() => confirmStatusChange(item.key, item.status)}
              type="primary"
              style={{
                backgroundColor: buttonColor,
                borderColor: buttonColor,
                color: "white",
              }}
            >
              {buttonText}
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: "max-content" }}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit || 10}
        total={metaData?.total}
      />
    </>
  );
};

export default AllUser;
