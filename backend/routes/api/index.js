const express = require('express');

const checkRole = require('../../middlewares/checkRole');
const ROLES = require('../../constants/ROLES');

const router = express.Router();

router.use('/home', require('./home'));

router.use('/options', require('./options'));

router.use('/admin', checkRole([ROLES.CTO]), require('./admin'))

module.exports = router;