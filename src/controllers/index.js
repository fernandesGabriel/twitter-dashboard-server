'use strict';

const router = require('express').Router();

router.get('/socket/feed', require('./socket/feed'));

module.exports = router;