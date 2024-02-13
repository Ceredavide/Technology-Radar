const express = require('express');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();

if (process.env.NODE_ENV === "test") {
    router.get('/test-route', (req, res) => {
        res.status(200).json("It works!")
    })
    router.post('/test-route', (req, res) => {
        res.status(201).json(req.body)
    })
}

router.use('/auth', require('./auth'));

router.use('/api', checkAuth ,require('./api'));

module.exports = router;