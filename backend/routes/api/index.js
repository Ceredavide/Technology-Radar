const express = require('express');
const router = express.Router();

router.use('/technology', require('./technology'));

module.exports = router;