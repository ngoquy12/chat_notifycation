const pool = require("../config/database");

module.exports.listFriendRequest = async (res, id) => {
  try {
    const [requests] = await pool.execute(
      "SELECT * FROM friend_request f JOIN users u on u.UserId = f.UserSendId WHERE UserReceiverId = ?",
      [id]
    );
    return res.status(200).json({
      data: requests,
    });
  } catch (error) {
    return error;
  }
};

module.exports.deleteRequest = async (res, id) => {
  try {
    await pool.execute("DELETE FROM friend_request WHERE RequestId = ?", [id]);
    return res.status(200).json({
      status: 200,
      message: "Đã xóa lời mời kết bạn.",
    });
  } catch (error) {
    return error;
  }
};

module.exports.sendFriendRequest = async (res, userSendId, userReceiverId) => {
  try {
    await pool.execute(
      "INSERT INTO friend_request (UserSendId, UserReceiverId, Status) VALUES (?, ?, ?)",
      [userSendId, userReceiverId, 0]
    );

    return res.status(201).json({
      status: 201,
      message: "Gửi lời mời kết bạn thành công.",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.listFriendSuggest = async (res, id) => {
  try {
    const [friends] = await pool.execute(
      "SELECT * FROM users WHERE UserId != ? AND UserId NOT IN (SELECT UserId2 FROM friends WHERE UserId1 = ?) AND UserId NOT IN (SELECT UserReceiverId FROM friend_request WHERE UserSendId = ?) AND UserId NOT IN (SELECT UserSendId FROM friend_request WHERE UserReceiverId = ?)",
      [id, id, id, id]
    );
    return res.status(200).json({
      status: 200,
      data: friends,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.getFrinded = async (res, id) => {
  try {
    const [friends] = await pool.execute(
      "SELECT * FROM friends as f INNER JOIN users as u ON (f.UserId1 = u.UserId OR f.UserId2 = u.UserId) WHERE (f.UserId1 = ? OR f.UserId2 = ?)",
      [id, id]
    );
    return res.status(200).json({
      status: 200,
      data: friends,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.updateStatusRequest = async (res, id) => {
  try {
    const [friends] = await pool.execute(
      "UPDATE friend_request SET Status = 1 WHERE RequestId = ?",
      [id]
    );
    return res.status(200).json({
      status: 200,
      message: "Đã chấp nhận lời mời kết bạn.",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.addFriend = async (res, UserId1, UserId2) => {
  try {
    const [friends] = await pool.execute(
      "INSERT INTO friends (UserId1, UserId2) VALUES (?, ?)",
      [UserId1, UserId2]
    );
    return res.status(201).json({
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.deleteRequestOld = async (res, id) => {
  try {
    await pool.execute("DELETE FROM friend_request WHERE RequestId = ?", [id]);
    return res.status(200).json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.listFriended = async (res, id) => {
  try {
    const [friends] = await pool.execute(
      "SELECT * FROM friends f JOIN users u ON (u.UserId = f.UserId1 OR u.UserId = f.UserId2) WHERE (UserId1 = ? OR UserId2 = ?) AND u.UserId != ?",
      [id, id, id]
    );
    return res.status(200).json({
      status: 200,
      data: friends,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.addFriendOnChat = async (res, UserIds, RoomId) => {
  try {
    // Tiến hành thêm người dùng vào phòng chat
    const insertSql = "INSERT INTO user_room (UserId, RoomId) VALUES (?, ?)";

    await Promise.all(
      UserIds.map((userId) => {
        return pool.execute(insertSql, [userId, RoomId]);
      })
    );

    return res.status(201).json({
      status: 201,
      message: "Thêm thành viên vào nhóm thành công",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.listChatUserWithFriend = async (
  res,
  UserSendId,
  UserReceiverId
) => {
  console.log("UserSendId,UserReceiverId ", UserSendId, UserReceiverId);
  try {
    const [friends] = await pool.execute(
      "SELECT UserSendId, UserReceiverId, Content, CreatedDate FROM private_chats WHERE (UserSendId = ? AND UserReceiverId = ?) OR (UserSendId = ? AND UserReceiverId = ?) ORDER BY CreatedDate",
      [UserSendId, UserReceiverId, UserReceiverId, UserSendId]
    );
    return res.status(200).json({
      status: 200,
      data: friends,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.addChatUserWithFriend = async (
  res,
  UserSendId,
  UserReceiverId,
  Content
) => {
  try {
    await pool.execute(
      "INSERT INTO private_chats (UserSendId, UserReceiverId, Content) VALUES (?,?,?)",
      [UserSendId, UserReceiverId, Content]
    );
    return res.status(201).json({
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
