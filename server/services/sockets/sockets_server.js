const ioApp = require("http").createServer();
const io = require("socket.io")(ioApp);
const ioPort = 3100;

module.exports = app => {
  let socketCount = 0;
  io.on("connection", socket => {
    socketCount++;
    console.log(`Socket opened: ${socket.id} Socket count: ${socketCount}`);
    socket.on("message", body => {
      socket.broadcast.emit("message", {
        body,
        from: socket.id.slice(8)
      });
    });
  });
  io.listen(ioPort);
  console.log(`Sockets listening on port ${ioPort}`);
};
