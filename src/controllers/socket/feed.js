'use strict';

module.exports = (req, res) => {  
  const socketConfig = { path: req.route.path, serveClient: false };
  const io = require('socket.io')(req.connection.server, socketConfig);

  io.on('connection', require('../../sockets/feed'));

  res.status(200);
  res.send();
}