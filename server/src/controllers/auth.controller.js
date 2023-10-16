const authService = require("../services/auth.service");

module.exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports.login = async (req, res) => {
  try {
    const result = await authService.login(res, req.body);
    return result;
  } catch (error) {
    return res.status(500).json(error);
  }
};
