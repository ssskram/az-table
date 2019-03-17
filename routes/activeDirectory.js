const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const refreshToken = require('../refresh')
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// get events
router.get('/allEvents',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            // get all events from az table here
        } else res.status(403).end()
    }
)

// post new event
router.post('/newEvent',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            // post new event to table here
        } else res.status(403).end()
    }
)

module.exports = router