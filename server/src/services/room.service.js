const pool = require("../config/database");

module.exports.create = async (res, roomName, CreatedByUserId) => {
  try {
    await pool.execute(
      "INSERT INTO rooms (RoomName, CreatedByUserId) VALUES (?, ?)",
      [roomName, CreatedByUserId]
    );
    return res.status(201).json({
      status: 201,
      message: "Thêm phòng chat thành công.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

module.exports.findRoomByName = async (roomName) => {
  try {
    const [[room]] = await pool.execute(
      "SELECT * FROM rooms WHERE RoomName = ?",
      [roomName]
    );
    return room;
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

module.exports.findRoomByUserId = async (res, id) => {
  try {
    const [room] = await pool.execute(
      "SELECT * FROM rooms WHERE CreatedByUserId  = ?",
      [id]
    );

    return res.status(200).json({
      status: 200,
      data: room,
    });
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};
