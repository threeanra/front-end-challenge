import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/router";
import { editUser, getUserById } from "@/services/user";
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
  const { slug } = router.query;
  const [form] = Form.useForm();

  const {
    data: user,
    isLoading: loadingGetUser,
    isError: isErrorGetUser,
  } = getUserById({
    id: slug as string,
  });

  // if (isErrorGetUser) console.error("Error fetching users:", isErrorGetUser);

  const { mutate: updateUser, isPending: loadingUpdateUser } = editUser({
    onSuccess: () => {
      message.success("Updated User Successfully");
      router.back();
    },
    onError: (error: any) => {
      console.error("Failed to update user:", error);
    },
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      });
    }
  }, [user, form]);

  const handleUpdateUser = () => {
    updateUser({
      id: Number(slug),
      data: form.getFieldsValue(),
    });
  };

  return (
    <main className="flex mt-10 md:mt-16 md:mt-22 pb-10 flex-col px-5 md:px-[400px] 2xl:px-[600px] justify-center">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={router.back}
        className="mb-5 w-max"
      >
        Go Back
      </Button>
      <div className="p-10 border rounded-md border-gray-300 w-full">
        <h1 className="mb-5 text-xl font-bold">Edit User</h1>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleUpdateUser}
              loading={loadingUpdateUser}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
