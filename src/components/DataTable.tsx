import React, { useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { getUsers } from "@/services/user";
import { useRouter } from "next/router";

interface DataType {
  key: number;
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function DataTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data: users, isLoading } = getUsers({
    page,
    perPage,
    onError: () => {
      console.error("Error fetching users");
    },
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        const color = status === "active" ? "green" : "volcano";

        return (
          <Tag color={color} key={status}>
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className="cursor-pointer" onClick={() => handleUpdate(record)}>
            <EditTwoTone twoToneColor="#0000FF" />
          </div>
          <div className="cursor-pointer">
            <DeleteTwoTone twoToneColor="#FF0000" />
          </div>
        </Space>
      ),
    },
  ];

  const handleUpdate = (user: any) => {
    router.push(`/user/${user.id}`);
  };

  const data: DataType[] = users?.map((user: DataType) => ({
    key: user.id,
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
    status: user.status,
  }));

  return (
    <div className="w-full">
      <Button
        className="mb-4"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => router.push("/user")}
      >
        Add New User
      </Button>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: perPage,
          total: 3000,
          showSizeChanger: false,
          onChange: (newPage) => setPage(newPage),
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
