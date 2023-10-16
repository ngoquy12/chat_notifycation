const roomService = require("../services/room.service");

module.exports.create = async (req, res) => {
  const { RoomName, CreatedByUserId } = req.body;

  const result = await roomService.create(res, RoomName, CreatedByUserId);
  return result;
};

module.exports.findRoomByUserId = async (req, res) => {
  const { id } = req.params;

  const result = await roomService.findRoomByUserId(res, id);
  return result;
};
