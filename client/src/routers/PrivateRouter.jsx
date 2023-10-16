import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouter() {
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  let isLogin;
  if (userLocal) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  return isLogin ? <Outlet /> : <Navigate to={"/"} replace />;
}
