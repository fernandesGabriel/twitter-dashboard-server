'use strict';

let interval;

const getApiAndEmit = require('../sockets/api')

const onConnect = socket => {
  if (interval) {
    clearInterval(interval);
  }
  
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
}

module.exports = onConnect;