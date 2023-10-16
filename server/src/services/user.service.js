const pool = require("../config/database");

module.exports.findByEmail = async (email) => {
  try {
    const [[user]] = await pool.execute("SELECT * from users WHERE Email = ?", [
      email,
    ]);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports.findOne = async (id) => {
  try {
    const [[user]] = await pool.execute(
      "SELECT * from users WHERE UserId = ?",
      [id]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllFriend = async (id) => {
  try {
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE UserId NOT IN ( SELECT UserId2 FROM friends WHERE UserId1 = ? UNION SELECT UserId1 FROM friends WHERE UserId2 = ?)AND UserId != ?",
      [id, id, id]
    );
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendRequest = async (
  res,
  UserSendId,
  UserReceiverId,
  Status
) => {
  try {
    await pool.execute(
      "INSERT INTO friend_request(UserSendId, UserReceiverId, Status) VALUES (?,?,?)",
      [UserSendId, UserReceiverId, Status]
    );
    return res.status(201).json({
      status: 201,
      message: "Gửi yêu cầu thành công.",
    });
  } catch (error) {
    console.log(error);
  }
};
