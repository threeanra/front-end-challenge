import Container from "@/components/Container";
import DataTable from "@/components/DataTable";
import React from "react";

export default function User() {
  return (
    <Container>
      <span className="font-bold text-4xl">List Users</span>
      <DataTable />
    </Container>
  );
}
