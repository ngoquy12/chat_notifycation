import { Button, Input, Radio, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "./../api/apiConfig";

export default function Register() {
  const navigate = useNavigate();
  const [gender, setGender] = useState(0);
  const [user, setUser] = useState({
    UserName: "",
    DateOfBirth: "",
    Email: "",
    Password: "",
  });

  // Lấy giá trị từ ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Láy giá trị từ radio
  const handleChecked = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        ...user,
        Gender: gender,
        Image:
          "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg",
      };

      // Call API
      const response = await instance.post("auth/register", newUser);
      if (response.data.status === 201) {
        navigate("/");

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
          description: "Lỗi hệ thống.",
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-7 rounded shadow-md w-96 border flex flex-col gap-2"
        >
          <h3 className="font-bold text-2xl text-center my-3">
            Đăng ký tài khoản
          </h3>
          <div>
            <label htmlFor="name">Tên</label>
            <Input
              onChange={handleChange}
              name="UserName"
              className="mt-1"
              id="name"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div className="mt-1">
            <label htmlFor="gender">Giới tính</label>
            <div>
              <Radio.Group onChange={handleChecked} value={gender}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
                <Radio value={2}>Khác</Radio>
              </Radio.Group>
            </div>
          </div>
          <div>
            <label htmlFor="date">Ngày sinh</label>
            <Input
              onChange={handleChange}
              name="DateOfBirth"
              className="mt-1"
              id="date"
              type="date"
            />
          </div>
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
              Đăng ký
            </Button>
          </div>
          <p className="text-center ">
            Bạn đã có tài khoản?{" "}
            <Link className="text-blue-600  " to="/">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
