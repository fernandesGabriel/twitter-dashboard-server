'use strict';

const getApiAndEmit = socket => {
    socket.emit('FromAPI', new Date());
};
  
module.exports = getApiAndEmit;