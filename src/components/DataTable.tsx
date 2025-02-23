import React, { useState } from "react";
import { message, Button, Modal, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import {
  PlusOutlined,
  EditTwoTone,
  DeleteTwoTone,
  ArrowLeftOutlined,
  FormOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { deleteUser, getUsers } from "@/services/user";
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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const {
    data: users,
    isLoading,
    isError,
  } = getUsers({
    page,
    perPage,
  });

  if (isError) console.error("Error fetching users : ", isError);

  const { mutate: delUser, isPending: loadingDeleteUser } = deleteUser({
    onSuccess: () => {
      message.success("Deleted User Successfully");
    },
    onError: (error: any) => {
      console.error("Failed to delete user:", error);
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
      render: (text) => <a>{text}</a>,
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
          <div
            className="cursor-pointer"
            onClick={() => handleShowPosts(record)}
          >
            <Tooltip title={`See ${record.name}'s posts`}>
              <ContainerOutlined />
            </Tooltip>
          </div>
          <div className="cursor-pointer" onClick={() => handleUpdate(record)}>
            <Tooltip title="Edit User">
              <EditTwoTone twoToneColor="#0000FF" />
            </Tooltip>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => showDeleteModal(record)}
          >
            <Tooltip title="Delete User">
              <DeleteTwoTone twoToneColor="#FF0000" />
            </Tooltip>
          </div>
        </Space>
      ),
    },
  ];

  const handleShowPosts = (record: any) => {
    router.push(`/post/${record.id}/${record.name}`);
  };

  const handleUpdate = (record: any) => {
    router.push(`/user/${record.id}`);
  };

  const showDeleteModal = (record: any) => {
    setSelectedId(record.id);
    setOpenModal(true);
  };

  const handleDeleteUser = (id: number) => {
    delUser({
      id: id,
    });
    setOpenModal(false);
  };

  const data: DataType[] = users?.map((user: DataType) => ({
    key: user?.id,
    id: user?.id,
    name: user?.name,
    email: user?.email,
    gender: user?.gender?.charAt(0).toUpperCase() + user?.gender?.slice(1),
    status: user?.status,
  }));

  return (
    <div className="w-full">
      <div className="mb-3 flex gap-3">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
        >
          Go Back
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/user/adduser")}
        >
          Add New User
        </Button>
        <Button
          color="default"
          variant="solid"
          icon={<PlusOutlined />}
          onClick={() => router.push("/post")}
        >
          Create Post
        </Button>
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: perPage,
          total: 3000,
          showSizeChanger: false,
          position: ["bottomCenter"],
          onChange: (newPage) => setPage(newPage),
        }}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="Delete User"
        centered
        open={openModal}
        onOk={() => selectedId !== null && handleDeleteUser(selectedId)}
        onCancel={() => setOpenModal(false)}
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure want to delete this user?</p>
      </Modal>
    </div>
  );
}
