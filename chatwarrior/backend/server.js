const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("join", username => {
    socket.username = username;
    io.emit("message", {
      user: "System",
      text: `${username} joined the chat`
    });
  });

  socket.on("sendMessage", msg => {
    io.emit("message", {
      user: socket.username,
      text: msg
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("message", {
        user: "System",
        text: `${socket.username} left the chat`
      });
    }
  });
});

server.listen(5001, () => {
  console.log("Chat server running on port 5001");
});
