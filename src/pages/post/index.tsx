import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { addPost } from "@/services/post";

type FieldType = {
  title?: string;
  post?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Post() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [userId, setUserId] = useState<string>("123456");

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      try {
        const data = JSON.parse(userData);
        setUserId(data.id as string);
      } catch (error) {
        // console.log("Error parsing session storage:", error);
      }
    }
  }, []);

  const { mutate: createPost, isPending: loadingCreatePost } = addPost({
    onSuccess: () => {
      message.success("Added Post Successfully");
      router.back();
    },
    onError: (error: any) => {
      console.error("Failed to create post :", error.response.status);

      if (error.response.status === 422) {
        message.info("Please create user first");
        router.push("/user/adduser");
      }
    },
  });

  const handleCreatePost = () => {
    createPost({ userId, data: form.getFieldsValue() });
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
        <h1 className="mb-5 text-xl font-bold">Add Post</h1>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={handleCreatePost}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="post" label="Post" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingCreatePost}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
