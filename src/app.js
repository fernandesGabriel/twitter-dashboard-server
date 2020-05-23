'use strict';

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(require('./controllers'));

io.on('connection', require('./sockets'));

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`)
});