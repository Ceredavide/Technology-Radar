const express = require("express")

const {
    create
} = require("../../controllers/technology");

const router = express.Router();


router.post('/', create);

module.exports = router;