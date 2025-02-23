import React from "react";
import { Card, Skeleton } from "antd";

export default function CardPostSkeleton() {
  return (
    <Card
      title={<Skeleton active paragraph={false} title={{ width: 150 }} />}
      extra={<Skeleton active paragraph={false} title={{ width: 100 }} />}
      style={{ width: "100%" }}
    >
      <div className="flex flex-col gap-5 pb-2">
        <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 2 }} />
        <hr className="border-t border-gray-300" />

        {[...Array(3)].map((_, index) => (
          <div key={index} className="-mb-3">
            <Skeleton active paragraph={false} title={{ width: "60%" }} />
          </div>
        ))}
      </div>
    </Card>
  );
}
