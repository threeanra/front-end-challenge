import Container from "@/components/Container";
import DataTable from "@/components/DataTable";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function User() {
  const router = useRouter();
  return (
    <Container>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/")}
        className="md:hidden w-max"
      >
        Go Back
      </Button>
      <span className="font-bold text-4xl">List Users</span>
      <DataTable />
    </Container>
  );
}
