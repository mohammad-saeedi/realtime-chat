// modules
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

// confgis
app.use(cors());

// create server
const server = createServer(app);

// socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data);
  });
  socket.on("recive" , data => {
    socket.to(data.id).emit("send" , data.text)
  })
});

// set port
server.listen(5000);
