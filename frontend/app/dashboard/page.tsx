"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.replace("/auth");
  };
  return (
    <>
      <p onClick={handleLogout} className="cursor-pointer text-right">
        logout
      </p>
      <div className="w-full h-[100vh] flex items-center justify-center">
        Welcome {user?.email}
      </div>
    </>
  );
};

export default Dashboard;
