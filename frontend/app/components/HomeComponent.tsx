"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const HomeComponent = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return <div>Home</div>;
};

export default HomeComponent;
