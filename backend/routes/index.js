const express = require('express');

const router = express.Router();

router.use('/api', require('./api'));

if (process.env.NODE_ENV === "test") {
    router.get('/test-route', (req, res) => {
        res.status(200).json("It works!")
    })
    router.post('/test-route', (req, res) => {
        res.status(201).json(req.body)
    })
}

module.exports = router;