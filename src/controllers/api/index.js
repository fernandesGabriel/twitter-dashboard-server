'use strict';

const controller = (req, res) => {
  res.send({ response: 'Twitter Dashboard Backend' }).status(200);
}

module.exports = controller;