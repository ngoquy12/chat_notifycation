import { CloseOutlined } from "@ant-design/icons";
import { Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../api/apiConfig";
import moment from "moment";

export default function Popup_Update_User({ close, userId }) {
  const [user, setUser] = useState({
    UserName: "",
    Gender: "",
    DateOfBirth: "",
  });
  const [gender, setGender] = useState(user.Gender);

  console.log("gender", gender);

  // Lấy thông tin một user theo id
  useEffect(() => {
    instance
      .get(`users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setUser(res.data.Gender);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChecked = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <div className="z-50 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
        <div className="bg-white p-6 px-2 rounded w-[450px]">
          <div className="flex justify-between items-center ">
            <h3 className="font-semibold text-xl">Cập nhật thông tin</h3>
            <CloseOutlined onClick={close} className="cursor-pointer" />
          </div>
          <div className="relative py-4 flex-col flex items-center gap-8 mb-14">
            <img
              className="h-[200px] w-full object-cover relative"
              src="https://s1.img.yan.vn/YanNews/2167221/201405/20140525-1027-55028_951226_697658.jpg"
              alt=""
            />
            <div className="absolute bottom-[-37px]">
              <label htmlFor="avatar">
                <img
                  className="h-28 w-28 rounded-full cursor-pointer"
                  src="https://s1.img.yan.vn/YanNews/2167221/201405/20140525-1027-55028_951226_697658.jpg"
                  alt=""
                />
              </label>
              <input id="avatar" type="file" hidden />
            </div>
          </div>
          <form className="flex flex-col gap-3 px-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Họ và tên
              </label>
              <Input
                onChange={handleChange}
                name="UserName"
                value={user.UserName}
                className="h-9"
                id="name"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="border"></div>
            <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Giới tính
              </label>
              <Radio.Group value={gender} onChange={handleChecked}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
              </Radio.Group>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Ngày sinh
              </label>
              <Input
                onChange={handleChange}
                name="DateOfBirth"
                type="date"
                value={moment().format("YYYY-MM-DD", user.DateOfBirth)}
                placeholder="Chọn ngày sinh"
              />
            </div>
          </form>
          {/* Infor start */}

          {/* Infor end */}
          <div className="border my-4"></div>
          <div className="flex justify-end items-center gap-2">
            <button className="flex justify-center items-center gap-2 border h-9 px-4 rounded hover:bg-slate-200">
              Hủy
            </button>
            <button className=" bg-blue-600 text-white hover:bg-blue-400 flex justify-center items-center gap-2 border h-9 px-4 rounded">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
