const express = require('express');
const router = express.Router();

router.use('/technology', require('./technology'));

router.use('/options', require('./options'));

module.exports = router;