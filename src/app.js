'use strict';

const app = require('express')();
const http = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);

app.use(require('./controllers'));

http.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
});