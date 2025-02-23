import CardPost, { CardPostProps } from "@/components/CardPost";
import CardPostSkeleton from "@/components/CardPostSkeleton";
import Container from "@/components/Container";
import { getUserPosts } from "@/services/post";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug?.[0];
  const name = slug?.[1];

  const { data: userPosts, isLoading } = getUserPosts({
    userId: Number(id),
  });

  return (
    <Container>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={router.back}
        className="w-max"
      >
        Go Back
      </Button>

      <span className="font-bold text-4xl">{name}&apos;s Post</span>

      {isLoading ? (
        [...Array(10)].map((_, index) => (
          <div key={index} className="mb-5">
            <CardPostSkeleton />
          </div>
        ))
      ) : userPosts && userPosts.length > 0 ? (
        userPosts.map((post: CardPostProps) => (
          <div key={post.id} className="mb-5">
            <CardPost
              id={post.id}
              user_id={post.user_id}
              title={post.title}
              body={post.body}
              showSendComment={false}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-400">{name} hasn&apos;t posted anything yet.</p>
      )}
    </Container>
  );
}
