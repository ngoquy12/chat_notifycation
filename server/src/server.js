const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// user library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

// Import router
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const roomRouter = require("./routes/room.routes");
const chatRouter = require("./routes/chat.routes");
const friendRouter = require("./routes/friend.routes");

// use router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/friends", friendRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
