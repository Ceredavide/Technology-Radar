const express = require("express")

const { getPublishedTechnologies } = require("../../controllers/technology");

const router = express.Router();

router.get('/technology', getPublishedTechnologies);

module.exports = router;