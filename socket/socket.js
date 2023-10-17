const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// on: Dùng để lắng nghe sự kiện của công mà socket.io đang nghe
// emit: Dùng để bắn đi một sự kiện (Sự kiện được gửi từ on)
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Lắng nghe sự kiện gửi tin nhắn
  socket.on("sendMessage", (response) => {
    const { UserSendId, UserReceiverId, Content } = response;

    const newResponse = { UserSendId, UserReceiverId, Content };
    // Đẩy ra ngoài thông qua emit
    io.emit("getMessage", newResponse);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Lắng nghe cổng
io.listen(3000);
