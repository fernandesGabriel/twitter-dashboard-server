'use strict';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// define routes
app.use(require('./routes/api'));

// boot server
const server = http.createServer(app);

// boot socket server
const io = socketIo(server);

// define sockets
io.on('connection', require('./services/socket'));

// listen for requests
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});