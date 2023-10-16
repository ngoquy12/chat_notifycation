import { Button, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "./../api/apiConfig";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("auth/login", user);
      if (response.data.status === 200) {
        navigate("/chat");
        localStorage.setItem("userLocal", JSON.stringify(response.data.data));
        notification.success({
          message: "Thành công",
          description: response.data.message,
        });
      }
    } catch (error) {
      if (error.response.data.status === 400) {
        notification.error({
          message: "Cảnh báo",
          description: error.response.data.message,
        });
      } else {
        notification.error({
          message: "Cảnh báo",
          description: "Lỗi hệ thống",
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white h-[350px] p-7 rounded shadow-md w-96 border flex flex-col gap-3"
        >
          <h3 className="font-bold text-2xl text-center my-3">Đăng nhập</h3>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              onChange={handleChange}
              name="Email"
              className="mt-1"
              id="email"
              placeholder="Nhập địa chỉ email"
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <Input
              onChange={handleChange}
              name="Password"
              className="mt-1"
              id="password"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="mt-2">
            <Button
              htmlType="submit"
              className="bg-blue-600 w-full"
              type="primary"
            >
              Đăng nhập
            </Button>
          </div>
          <p className="text-center ">
            Bạn đã có tài khoản?{" "}
            <Link className="text-blue-600  " to="/register">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
