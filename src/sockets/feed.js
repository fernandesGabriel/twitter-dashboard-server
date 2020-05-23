'use strict';

let interval;

const emit = (socket) => {
  socket.emit('feed', Math.floor(new Date() / 1000));
};

module.exports = (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => emit(socket), 1000);

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
}
