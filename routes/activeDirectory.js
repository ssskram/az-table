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
            const query = new azure.TableQuery()
                .top(5)
                .where('PartitionKey eq ?', 'part2')
            tableService.queryEntities('adEvents', query, null, function (error, result, response) {
                if (!error) {
                    res.status(200).send(result.entries)
                } else res.status(500).send()
            });
        } else res.status(403).end()
    }
)

// post new event
router.post('/newEvent',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            const entGen = azure.TableUtilities.entityGenerator
            const entity = {
                PartitionKey: entGen.String(req.body.userName),
                RowKey: entGen.String(req.body.id),
                eventTime: req.body.time,
                userEmail: req.body.userEmail,
                appName: req.body.appName,
                ipAddress: req.body.ipAddress,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
            tableService.insertEntity('adEvents', entity, function (error, result, response) {
                if (!error) {
                    res.status(200).send()
                } else res.status(500).send()
            });
        } else res.status(403).end()
    }
)

module.exports = router