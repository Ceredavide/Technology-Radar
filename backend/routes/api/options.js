const express = require("express")

const {
    getCategories,
    getRings
} = require("../../controllers/options");

const router = express.Router();

router.get('/categories', getCategories);
router.get('/rings', getRings);

module.exports = router;