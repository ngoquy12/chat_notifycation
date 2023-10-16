const chatService = require("../services/chat.service");

module.exports.getMessageByRoom = async (req, res) => {
  const { id } = req.params;

  const result = await chatService.getMessageByRoom(res, id);
  return result;
};

module.exports.createMessage = async (req, res) => {
  const { RoomId, UserId, Content } = req.body;

  await chatService.createMessage(res, RoomId, UserId, Content);
};
