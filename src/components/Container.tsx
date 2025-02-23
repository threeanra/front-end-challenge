import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 md:px-[250px] 2xl:px-[450px] flex flex-col gap-8 pt-10 pb-6s">
      {children}
    </div>
  );
}
