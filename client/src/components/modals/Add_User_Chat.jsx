import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import instance from "../../api/apiConfig";

export default function Add_User_Chat({ close, userId, roomId }) {
  const [messageApi, contextHolder] = message.useMessage();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [friends, setFriends] = useState([]);
  const listFriend = () => {
    instance
      .get(`friends/list_friended/${userLocal.UserId}`)
      .then((res) => setFriends(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChecked = (id) => {
    // Kiểm tra xem người dùng có trong mảng đã chọn chưa
    if (selectedUsers.includes(id)) {
      // Nếu đã chọn, hãy loại bỏ khỏi mảng
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      // Nếu chưa chọn, hãy thêm vào mảng
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  useEffect(() => {
    listFriend();
  }, []);

  // Thêm thành viên vào nhóm chat
  const handleAddFriendOnChat = () => {
    if (selectedUsers.length === 0) {
      messageApi.open({
        type: "error",
        content: "Cần phải chọn ít nhất một bạn bè.",
      });
    } else {
      instance
        .post("friends/add_friend_on_chat", {
          UserIds: selectedUsers,
          RoomId: roomId,
        })
        .then(() => {
          messageApi.open({
            type: "success",
            content: "Đã chấp nhận lời mời kết bạn.",
          });
          close();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {contextHolder}
      <div className="z-50 fixed top-0 bottom-0 right-0 left-0 bg-bgc-0.5 flex justify-center items-center">
        <div className="bg-white p-6 rounded w-[450px]">
          <div className="flex justify-between items-center py-3">
            <h3 className="text-xl font-semibold">Thêm thành viên</h3>
            <CloseOutlined
              onClick={close}
              className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
            />
          </div>
          <ul className="flex flex-col gap-2 min-h-[310px] max-h-[310px] overflow-y-auto">
            {friends.map((fr) => (
              <li
                key={fr.FriendshipId}
                className="flex items-center gap-5 cursor-pointer p-2 hover:bg-[#E9F2FD] rounded-md"
              >
                <input
                  onChange={() => handleChecked(fr.UserId)}
                  checked={selectedUsers.includes(fr.UserId)}
                  className="w-5 h-5 cursor-pointer"
                  type="checkbox"
                />
                <img className="h-10 rounded-full" src={fr.Image} alt="" />
                <span>{fr.UserName}</span>
              </li>
            ))}
          </ul>
          <hr className="my-6" />
          <div className="flex justify-end gap-3">
            <Button onClick={close}>Hủy</Button>
            <Button
              onClick={handleAddFriendOnChat}
              type="primary"
              className="bg-blue-600"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
