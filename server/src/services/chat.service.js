const pool = require("../config/database");

module.exports.getMessageByRoom = async (res, id) => {
  try {
    const [messages] = await pool.execute(
      "SELECT * FROM messages WHERE RoomId = ?",
      [id]
    );
    return res.status(200).json({
      status: 200,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

module.exports.createMessage = async (res, roomId, userId, content) => {
  try {
    await pool.execute(
      "INSERT INTO messages(RoomId, UserId, Content) VALUES (?,?,?)",
      [roomId, userId, content]
    );
    return res.status(201).json({
      status: 201,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
