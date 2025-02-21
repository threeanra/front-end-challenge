import Container from "@/components/Container";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import { useRouter } from "next/router";
import CardPost, { CardPostProps } from "../components/CardPost";
import { useState } from "react";
import { getPosts } from "@/services/post";

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

  console.log(posts);

  if (isError) console.error("Error fetching posts : ", isError);

  return (
    <Container>
      <span className="font-bold text-6xl">
        Blog <span>Verse</span>
      </span>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            router.push("/user");
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
        {posts?.map((post: CardPostProps) => (
          <div key={post.id} className="mb-5">
            <CardPost
              id={post.id}
              user_id={post.user_id}
              title={post.title}
              body={post.body}
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
          onChange={(page) => setPage(page)}
          total={2000}
        />
      </div>
    </Container>
  );
}
