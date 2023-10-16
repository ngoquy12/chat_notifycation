const express = require("express");
const friendController = require("../controllers/friend.controller");

const friendRouter = express.Router();
// Lấy danh sách yêu cầu kết bạn
friendRouter.get("/list-requets/:id", friendController.listFriendRequest);

// Xóa yêu cầu kết bạn
friendRouter.delete("/:id", friendController.deleteRequest);

// Gửi lời mời kết bạn
friendRouter.post("/send-friend-request", friendController.sendFriendRequest);

// Lấy danh sách bạn bè gợi ý (Trừ những người đã là bạn bè, đã gửi lời mời và user đang đăng nhập)
friendRouter.get(
  "/list-friend-suggest/:id",
  friendController.listFriendSuggest
);

// Lấy danh sách những người đã là bạn bè
friendRouter.get("/friended/:id", friendController.getFrinded);
module.exports = friendRouter;

// Cập nhật trạng thái chấp nhận kết bạn
friendRouter.put(
  "/update_status_request/:id",
  friendController.updateStatusRequest
);

// Xác nhận đã là bạn bè giữa 2 user
friendRouter.post("/confirm_friend", friendController.addFriend);

// Sau khi xác nhận là bạn bè thì xóa trong danh sách yêu cầu
friendRouter.delete("/delete_request/:id", friendController.deleteRequestOld);

// Hiển thị những người đã là bạn bè và có thể thêm vào nhóm chát
friendRouter.get("/list_friended/:id", friendController.listFriended);

// Thêm bạn bè vào nhóm chát
friendRouter.post("/add_friend_on_chat", friendController.addFriendOnChat);

// Lấy tin nhắn giữa 2 user
friendRouter.post("/list_chat-user", friendController.listChatUserWithFriend);

// Thêm tin nhắn giữa 2 user
friendRouter.post(
  "/add_chat_userWithFriend",
  friendController.addChatUserWithFriend
);

module.exports = friendRouter;
