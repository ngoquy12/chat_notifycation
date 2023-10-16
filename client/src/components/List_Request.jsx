import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Button, Input, Modal, notification, message } from "antd";
import instance from "../api/apiConfig";
import { UserAddOutlined } from "@ant-design/icons";
// import { io } from "socket.io-client";

export default function List_Request() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [userLocal, setUserLocal] = useState(
    JSON.parse(localStorage.getItem("userLocal"))
  );
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [friendSuggest, setFriendSuggest] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    instance
      .post("rooms", {
        RoomName: nameRoom,
        CreatedByUserId: userLocal.UserId,
      })
      .then((res) => {
        if (res.data.status === 201) {
          notification.success({
            message: "Thành công",
            description: res.data.message,
          });
          setIsModalOpen(false);
          setError("");
          setNameRoom("");
        }
      })
      .catch((err) => {
        if (err.response.data.status === 400) {
          setError(err.response.data.message);
        } else {
          setError("");
        }
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Danh sach lời mời kết bạn
  const listFriendRequest = () => {
    instance
      .get(`friends/list-requets/${userLocal.UserId}`)
      .then((res) => setRequests(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listFriendRequest();
  }, []);

  // Hủy yêu cầu
  const handleDeleteRequest = (id) => {
    instance
      .delete(`friends/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          listFriendRequest();
        }
      })
      .catch((err) => console.log(err));
  };

  // Danh sách bạn bè gợi ý
  const getFriendSuggest = () => {
    instance
      .get(`friends/list-friend-suggest/${userLocal.UserId}`)
      .then((res) => setFriendSuggest(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFriendSuggest();
  }, []);

  // Gửi lời mời kết bạn
  const handleAddFriend = (id) => {
    instance
      .post("friends/send-friend-request", {
        UserSendId: userLocal.UserId,
        UserReceiverId: id,
      })
      .then(() => {
        getFriendSuggest();
        messageApi.open({
          type: "success",
          content: "Gửi lời mời thành công.",
        });
      })
      .catch((err) => console.log(err));
  };

  // Xác nhận lời mời kết bạn
  const handleCofirmRequest = async (id, userId) => {
    try {
      await instance.put(`friends/update_status_request/${id}`);

      await instance.post(`friends/confirm_friend`, {
        UserId1: userLocal.UserId,
        UserId2: userId,
      });

      await instance.delete(`friends/delete_request/${id}`);

      listFriendRequest();
      messageApi.open({
        type: "success",
        content: "Đã chấp nhận lời mời kết bạn.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      {/* Modal tạo phòng */}
      <Modal
        title="Tạo phòng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        maskClosable={false}
      >
        <Input
          onChange={(e) => setNameRoom(e.target.value)}
          value={nameRoom}
          placeholder="Nhập tên phòng..."
        />
        <p className="mt-1 text-red-500">{error}</p>
        <div className="flex justify-end gap-3 mt-3 p-0">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button onClick={handleOk} className="bg-blue-600" type="primary">
            Tạo
          </Button>
        </div>
      </Modal>

      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-80 border">
          <div className="p-2 flex justify-center">
            <Button onClick={showModal} className="bg-blue-600" type="primary">
              Tạo phòng
            </Button>
          </div>
          <hr />
          <div className="py-3 px-2 text-center font-semibold border">
            Danh sách yêu cầu
          </div>
          {friendSuggest.map((fr) => (
            <div
              key={fr.FriendId}
              className="flex justify-between items-center cursor-pointer py-3 px-5 hover:bg-[#E9F2FD]"
            >
              {fr.UserName}
              <UserAddOutlined
                onClick={() => handleAddFriend(fr.UserId)}
                className="cursor-pointer hover:bg-slate-200 p-2 rounded-full"
              />
            </div>
          ))}
        </div>
        <div className="w-full h-screen bg-slate-200">
          <h3 className="px-10 py-3 bg-white">
            Lời mời kết bạn({requests.length})
          </h3>
          <hr />
          <div className="flex flex-wrap gap-4 p-8 ">
            {requests.map((req) => (
              <div key={req.RequestId} className="bg-white rounded-md p-2 w-80">
                <div className="flex gap-2 items-center mb-3">
                  <img
                    className="h-14 w-14 rounded-full"
                    src="https://s75-ava-talk.zadn.vn/f/2/a/9/1/75/e6f993810f8dbba14a84b382dc473dbb.jpg"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{}</span>
                    <span className="text-sm">Người mới quen</span>
                  </div>
                </div>
                <div className="border px-3 py-4 mb-3">
                  Xin chào bạn, mình là {req.UserName}. Kết bạn nha
                </div>
                <div className="flex justify-center gap-3">
                  <Button onClick={() => handleDeleteRequest(req.RequestId)}>
                    Từ chối
                  </Button>
                  <Button
                    onClick={() =>
                      handleCofirmRequest(req.RequestId, req.UserId)
                    }
                    className="bg-blue-600"
                    type="primary"
                  >
                    Đồng ý
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
