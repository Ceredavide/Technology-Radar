const express = require("express");
const checkRole = require('../../middlewares/checkRole');
const ROLES = require('../../constants/ROLES');
const {
    getTechnologyById,
    getAllTechnologies,
    createTechnology,
    publishTechnology,
    editTechnologyRing,
    editTechnology
} = require("../../controllers/technology");

const router = express.Router();

router.get('/technology', getAllTechnologies);

router.route('/technology/:id')
    .get(checkRole([ROLES.CTO]), getTechnologyById)
    .put(checkRole([ROLES.CTO]), editTechnology);

router.post('/technology', checkRole([ROLES.CTO]), createTechnology);

router.put('/technology/publish/:id', checkRole([ROLES.CTO]), publishTechnology);
router.put('/technology/ring/:id', checkRole([ROLES.CTO]), editTechnologyRing);

module.exports = router;
