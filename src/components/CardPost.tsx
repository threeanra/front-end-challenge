import React from "react";
import { Button, Card, Input, Tag } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { getUserById } from "@/services/user";
import { getComments } from "@/services/comments";

export type CardPostProps = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export default function CardPost(data: CardPostProps) {
  const userId = data?.user_id;
  const {
    data: user,
    isLoading: loadingGetUser,
    error: errorGetUser,
  } = getUserById({
    id: userId?.toString(),
  });

  const {
    data: comments,
    isLoading: loadingGetComments,
    error: errorGetComments,
  } = getComments({ post_id: data.id });

  // if (errorGetUser) console.error("Error fetching users:", errorGetUser);
  // if (errorGetComments)
  //   console.error("Error fetching comments:", errorGetComments);

  const color = user?.status === "active" ? "green" : "volcano";

  return (
    <Card
      title={
        <div className="font-bold flex gap-2">
          Author :{" "}
          <span
            className={user?.name ? "font-normal" : "font-normal text-red-500"}
          >
            {user?.name ?? "User not found"}
          </span>
        </div>
      }
      extra={
        <div className="font-bold flex gap-2">
          Status :{" "}
          <Tag color={color}>{user?.status.toUpperCase() ?? "INACTIVE"}</Tag>
        </div>
      }
      style={{ width: "100%" }}
    >
      <div className="flex flex-col gap-5 pb-2">
        <p className="font-medium text-xl">{data.title}</p>
        <p className="text-lg">{data.body}</p>
        <hr className="border-t border-gray-300" />

        {Array.isArray(comments) &&
          comments.length > 0 &&
          comments.map(
            (comment: { name: string; body: string }, index: number) => (
              <div key={index} className="-mb-3">
                <p className="font-bold">
                  {comment.name} :{" "}
                  <span className="font-normal">{comment.body}</span>
                </p>
              </div>
            )
          )}

        <div className="flex gap-2 mt-3">
          <Input placeholder="Add comment..." />
          <Button type="primary" icon={<SendOutlined />} />
        </div>
      </div>
    </Card>
  );
}
