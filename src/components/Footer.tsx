import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-16">
      © 2025{" "}
      <Link href="https://github.com/threeanra" className="underline mx-1">
        Trian
      </Link>
      all rights reserved.
    </footer>
  );
}
