import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Select } from "antd";
import { addUser, editUser, getUserById } from "@/services/user";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";

type FieldType = {
  name?: string;
  email?: string;
  gender?: string;
  status?: string;
};

const { Option } = Select;

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Page() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { mutate: createUser, isPending } = addUser({
    onSuccess: (data: any) => {
      message.success("Added User Successfully");
      sessionStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userUpdated"));
      router.back();
    },
    onError: (error: any) => {
      console.error("Failed to update user:", error);
    },
  });

  const handleCreateUser = (values: FieldType) => {
    createUser({ data: values });
  };

  return (
    <main className="flex flex-col px-3 md:px-[400px] 2xl:px-[600px] justify-center mt-10 md:mt-16 md:mt-22 pb-10">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={router.back}
        className="mb-5 w-max"
      >
        Go Back
      </Button>
      <div className="p-10 border rounded-md border-gray-300 w-full">
        <h1 className="mb-5 text-xl font-bold">Add User</h1>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleCreateUser}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
