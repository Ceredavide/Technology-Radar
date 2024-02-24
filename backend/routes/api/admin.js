const express = require("express")

const { getTechnologyById, getAllTechnologies, createTechnology, publishTechnology, editTechnologyRing } = require("../../controllers/technology");

const router = express.Router();

router.get('/technology/:id', getTechnologyById);

router.get('/technology', getAllTechnologies);

router.post('/technology', createTechnology);

router.put('/technology/publish/:id', publishTechnology);

router.put('/technology/ring/:id', editTechnologyRing);

module.exports = router