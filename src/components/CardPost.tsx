import React, { useEffect, useState } from "react";
import { Button, Card, Input, message, Tag } from "antd";
import { MessageOutlined, SendOutlined } from "@ant-design/icons";
import { getUserById } from "@/services/user";
import { getComments, postComment } from "@/services/comments";

export type CardPostProps = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type User = {
  name: string;
  email: string;
};

export default function CardPost(data: CardPostProps) {
  const userId = data?.user_id;
  const [comment, setComment] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    email: "",
  });

  useEffect(() => {
    const currentUserData = sessionStorage.getItem("user");
    if (currentUserData) {
      try {
        const data = JSON.parse(currentUserData);
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        console.log("Error parsing session storage:", error);
      }
    }
  }, []);

  const {
    data: user,
    isLoading: loadingGetUser,
    error: errorGetUser,
  } = getUserById({
    id: userId?.toString(),
  });

  const color = user?.status === "active" ? "green" : "volcano";

  const {
    data: comments,
    isLoading: loadingGetComments,
    error: errorGetComments,
  } = getComments({ postId: data.id.toString() });

  const { mutate: addComment, isPending: loadingPostComment } = postComment({
    onSuccess: () => {
      message.success("Added Comment Successfully");
      setComment("");
    },
    onError: (error: any) => {
      console.error("Failed to add comment : ", error);
      if (error.response.status === 422) {
        message.info("Please create user first to add comment");
      }
    },
  });

  // if (errorGetUser) console.error("Error fetching users:", errorGetUser);
  // if (errorGetComments)
  //   console.error("Error fetching comments:", errorGetComments);

  const handleAddComment = () => {
    if (!comment.trim()) return;

    addComment({
      postId: data.id.toString(),
      data: {
        name: currentUser?.name,
        email: currentUser?.email,
        body: comment,
      },
    });
  };

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
        <div className="flex items-center justify-center gap-2">
          <MessageOutlined
            className="
          -mt-1 opacity-40"
          />
          <p className="text-[11px] -mt-1 font-light">Comment</p>
          <hr className="flex-1 border-t border-gray-300" />
        </div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments
            .slice()
            .reverse()
            .map((comment: { name: string; body: string }, index: number) => (
              <div key={index} className="-mb-3">
                <p className="font-bold">
                  {comment.name} :{" "}
                  <span className="font-normal">{comment.body}</span>
                </p>
              </div>
            ))
        ) : (
          <p className="text-center font-light text-sm">No comments yet</p>
        )}

        <div className="flex gap-2 mt-3">
          <Input
            placeholder="Add comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleAddComment}
            disabled={!comment.trim() || loadingPostComment}
            loading={loadingPostComment}
          />
        </div>
      </div>
    </Card>
  );
}
