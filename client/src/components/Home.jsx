import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { UserAddOutlined } from "@ant-design/icons";
import instance from "../api/apiConfig";
import { notification } from "antd";

export default function Home() {
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  const [friends, setFriends] = useState([]);

  const loadListFriend = () => {
    instance
      .get(`users/list-friend/${userLocal.UserId}`)
      .then((res) => setFriends(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadListFriend();
  }, []);

  // Lấy id của friend
  const getFriendId = (id) => {
    instance
      .post("users/send-request", {
        UserSendId: userLocal.UserId,
        UserReceiverId: id,
        Status: 0,
      })
      .then((res) => {
        if (res.data.status === 201) {
          notification.success({
            message: "Thành công",
            description: res.data.message,
          });
          loadListFriend();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-[300px] max-h-[100vh] overflow-auto border">
          <h3 className="p-3 border font-semibold text-xl">
            Danh sách bạn bè gợi ý
          </h3>
          <ul>
            {friends.map((friend) => (
              <li
                key={friend.UserId}
                className="flex  items-center justify-between p-3 cursor-pointer hover:bg-[#E9F2FD]"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="h-10 rounded-full"
                    src={friend.Image}
                    alt=""
                  />
                  <span>{friend.UserName}</span>
                </div>
                <UserAddOutlined
                  onClick={() => getFriendId(friend.UserId)}
                  className="hover:bg-slate-300 p-2 rounded-full"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
