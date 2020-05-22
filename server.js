'use strict';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// define routes
app.get('/', (req, res) => {
  res.send({ response: 'Twitter Dashboard Backend' }).status(200);
});

// boot server and socket
const server = http.createServer(app);
const io = socketIo(server);

let interval;

const getApiAndEmit = socket => {
  socket.emit('FromAPI', new Date());
};

io.on('connection', (socket) => {
  console.log('New client connected');

  if (interval) {
    clearInterval(interval);
  }
  
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// listen for requests
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});