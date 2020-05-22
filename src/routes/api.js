'use strict';

const router = require('express').Router();

router.get('/', require('../controllers/api/index'));

module.exports = router;