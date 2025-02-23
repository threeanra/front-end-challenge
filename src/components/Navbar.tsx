import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  const getUser = () => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    getUser();

    const handleUserUpdate = () => getUser();
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  return (
    <nav className="bg-background">
      <div className="flex items-center justify-between py-6 border-b-[1px] px-3 md:px-[250px] 2xl:px-[450px]">
        <Link href="/">
          <span className="text-2xl font-bold">
            Blog{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Verse
            </span>
          </span>
        </Link>

        <div className="flex gap-4">
          {user ? (
            <span className="text-lg ">
              Halo, <span className="font-bold">{user.name}</span>
            </span>
          ) : (
            <Button
              onClick={() => {
                router.push("/user/adduser");
              }}
              type="primary"
              icon={<UserAddOutlined />}
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
