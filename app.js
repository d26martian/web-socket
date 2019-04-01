const express = require("express");
const socket = require("socket.io");

const app = express();
var server = app.listen(4000, function() {
  console.log("listening for requests on port 4000,");
});

app.use(express.static("public"));

//socket setup

const io = socket(server);

io.on("connection", socket => {
  console.log("mode socket conniction", socket.id);

  //handle chat event
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
