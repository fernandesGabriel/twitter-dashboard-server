'use strict';

const router = require('express').Router();

router.get('/socket/feed/twitter', require('./socket/twitter').openSocket);

module.exports = router;
