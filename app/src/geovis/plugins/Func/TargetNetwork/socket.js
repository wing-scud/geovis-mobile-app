const server = require("http").createServer();
const io = require("socket.io")(server);
io.on("connection", client => {
  client.on("toLeftSubMarineCable", data => {
    io.sockets.emit('toLeftSubMarineCable', data);
  });
  client.on("toLeftNetwork", data => {
    io.sockets.emit('toLeftNetwork', data);
  });
  client.on("toRight", data => {
    io.broadcast.emit('toRight', data);
  });
  client.on("disconnect", () => {
    /* … */
  });
});
server.listen(3003);
