const express = require('express');
// const cors = require('cors');
const socketio = require('socket.io');
const socketService = require('./services/socket');

const app = express();
const port = 8080;
// const corsOptions = {
//   origin: 'http://localhost:3001',
//   credentials: true,
// };

// app.use(cors(corsOptions));

const server = app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
const io = socketio.listen(server);

socketService.set(io);

module.exports = app;
