const express = require("express")

const { getTechnologyById, getAllTechnologies, createTechnology, publishTechnology } = require("../../controllers/technology");

const router = express.Router();

router.get('/technology/:id', getTechnologyById);

router.get('/technology', getAllTechnologies);

router.post('/technology', createTechnology);

router.put('/technology/publish/:id', publishTechnology);

module.exports = router