const { findByEmail } = require("../services/user.service");

module.exports.checkIsEmpty = (req, res, next) => {
  const { UserName, Email, Password } = req.body;

  if (!UserName) {
    return res.status(400).json({
      status: 400,
      message: "Tên không được để trống.",
    });
  }

  if (!Email) {
    return res.status(400).json({
      status: 400,
      message: "Email không được để trống.",
    });
  }
  if (!Password) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống.",
    });
  }

  next();
};

module.exports.findByEmail = async (req, res, next) => {
  // Lấy Email từ body
  const { Email } = req.body;
  // Vào service để lấy email
  const email = await findByEmail(Email);
  if (email) {
    return res.status(400).json({
      status: 400,
      message: "Email đã tồn tại.",
    });
  }

  next();
};

module.exports.validateLogin = (req, res, next) => {
  const { Email, Password } = req.body;
  if (!Email) {
    return res.status(400).json({
      status: 400,
      message: "Email không được để trống.",
    });
  }
  if (!Password) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống.",
    });
  }

  next();
};
