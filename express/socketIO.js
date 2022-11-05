const { io } = require('socket.io-client');
const socket = io.connect(`https://bidding-cars-socket.herokuapp.com/`);
socket.on("connect", () => {
  console.log("Connected to websocket server");
});

module.exports = { socket };