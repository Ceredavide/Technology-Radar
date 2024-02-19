const express = require("express")

const {
    create,
    getPublished
} = require("../../controllers/technology");

const router = express.Router();

router.post('/', create);

router.get('/', getPublished);

module.exports = router;