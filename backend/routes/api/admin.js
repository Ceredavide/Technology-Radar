const express = require("express")

const checkRole = require('../../middlewares/checkRole');
const ROLES = require('../../constants/ROLES');

const { getTechnologyById, getAllTechnologies, createTechnology, publishTechnology, editTechnologyRing, editTechnology } = require("../../controllers/technology");

const router = express.Router();

router.get('/technology', getAllTechnologies);

router.get('/technology/:id', checkRole([ROLES.CTO]), getTechnologyById);

router.post('/technology', checkRole([ROLES.CTO]), createTechnology);

router.put('/technology/publish/:id', checkRole([ROLES.CTO]), publishTechnology);

router.put('/technology/ring/:id', checkRole([ROLES.CTO]), editTechnologyRing);

router.put('/technology/:id', checkRole([ROLES.CTO]), editTechnology);

module.exports = router