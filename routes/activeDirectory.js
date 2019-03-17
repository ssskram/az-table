const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const fetch = require('node-fetch')
const azure = require('azure-storage')
const tableService = azure.createTableService()

global.Headers = fetch.Headers

// get events
router.get('/allEvents',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            // get all events from table here
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