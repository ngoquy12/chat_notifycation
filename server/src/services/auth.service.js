const bcrypt = require("bcrypt");
const { pool } = require("../config/database");
const { findByEmail } = require("./user.service");

module.exports.register = async (user) => {
  // Kết nối vào database
  // Max hóa mật khẩu
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(user.Password, salt);

  await pool.execute(
    "INSERT INTO users(UserName, Gender, DateOfBirth, Image, Email, Password) VALUES (?,?,?,?,?,?)",
    [
      user.UserName,
      user.Gender,
      user.DateOfBirth,
      user.Image,
      user.Email,
      hashPassword,
    ]
  );

  return {
    status: 201,
    message: "Đăng ký tài khoản thành công.",
  };
};

module.exports.login = async (res, user) => {
  // Lấy email để kiểm tra xem có trong db?
  const findUser = await findByEmail(user.Email);
  if (!findUser) {
    return res.status(400).json({
      status: 400,
      message: "Email nhập vào không đúng.",
    });
  } else {
    // Dịch mật khẩu
    const comparePassword = bcrypt.compareSync(
      user.Password,
      findUser.Password
    );

    if (!comparePassword) {
      return res.status(400).json({
        status: 400,
        message: "Mật khẩu không đúng.",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Đăng nhập thành công",
        data: {
          UserId: findUser.UserId,
        },
      });
    }
  }
};
