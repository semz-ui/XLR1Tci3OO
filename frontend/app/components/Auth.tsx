"use client";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [screen, setScreen] = useState("Login");

  const toggleScreen = () => {
    setScreen(screen === "Login" ? "Signup" : "Login");
  };
  return (
    <>
      {screen === "Login" ? (
        <Login toggleScreen={toggleScreen} />
      ) : (
        <Register toggleScreen={toggleScreen} />
      )}
    </>
  );
};

export default Auth;
