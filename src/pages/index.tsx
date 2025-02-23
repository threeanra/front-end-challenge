import Container from "@/components/Container";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import { useRouter } from "next/router";
import CardPost, { CardPostProps } from "../components/CardPost";
import { useState } from "react";
import { getPosts } from "@/services/post";
import CardPostSkeleton from "@/components/CardPostSkeleton";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const perPage = 5;
  const {
    data: posts,
    isLoading,
    isError,
  } = getPosts({
    page,
    perPage,
  });

  // if (isError) console.error("Error fetching posts : ", isError);

  return (
    <Container>
      <span className="font-bold text-4xl md:text-5xl lg:text-6xl">
        Blog{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Verse
        </span>
      </span>

      <div className="flex gap-3 mt-2">
        <Button
          onClick={() => {
            router.push("/post");
          }}
          icon={<PlusOutlined />}
          type="primary"
        >
          Create Post
        </Button>
        <Button
          onClick={() => {
            router.push("/user");
          }}
          icon={<UserOutlined />}
          type="default"
        >
          List Users
        </Button>
      </div>
      <div className="mt-5 w-full">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <div key={index} className="mb-5">
                <CardPostSkeleton />
              </div>
            ))
          : posts?.map((post: CardPostProps) => (
              <div key={post.id} className="mb-5">
                <CardPost
                  id={post.id}
                  user_id={post.user_id}
                  title={post.title}
                  body={post.body}
                  showSendComment={true}
                />
              </div>
            ))}
      </div>

      <div className="-mt-5">
        <Pagination
          align="center"
          defaultCurrent={page}
          pageSize={perPage}
          showSizeChanger={false}
          onChange={(page) => {
            setPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          total={2000}
        />
      </div>
    </Container>
  );
}
