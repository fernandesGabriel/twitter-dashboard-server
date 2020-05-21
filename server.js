'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Backend');
});

app.listen(8080)