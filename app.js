const express = require("express");
const bodyParser = require("body-parser")
const http = require("http");
require('dotenv').config();
const app = express();
const server = http.Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const routes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const taskRoutes = require('./routes/task.route');
const commonRoutes = require('./routes/common.route');
var cors = require("cors");
const port = process.env.PORT || 3000;
require("./connection/connection");

app.use(cors({ origin: "http://localhost:4200" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

io.on("connection", (socket) => {
  socket.on("join", function (data) {
    socket.join(data.room);
    socket.broadcast
      .to(data.room)
      .emit("new user joined", { user: data.user, message: "has joined room" });
  });

  socket.on("leave", function (data) {
    socket.broadcast
      .to(data.room)
      .emit("left room", { user: data.user, message: "has left room" });
    socket.leave(data.room);
  });

  socket.on("message", function (data) {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

app.use("/api/post", routes);
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/common", commonRoutes);
server.listen(port, (req, res) => {
  console.log(`listeing in ${port}`);
});
