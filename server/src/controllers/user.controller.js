const userService = require("../services/user.service");

module.exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOne(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.getAllFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getAllFriend(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.sendRequest = async (req, res) => {
  try {
    const { UserSendId, UserReceiverId, Status } = req.body;
    const result = await userService.sendRequest(
      res,
      UserSendId,
      UserReceiverId,
      Status
    );
    return result;
  } catch (error) {
    return res.status(500).json(error);
  }
};
