const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const fetch = require('node-fetch')
const azure = require('azure-storage')
const tableService = azure.createTableService()
const dt = require('node-json-transform').DataTransform
const models = require('../models/activeDirectory')
global.Headers = fetch.Headers

// get events generated from outside PA
router.get('/riskEvents',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            const query = new azure.TableQuery()
                .where('state ne ?', 'Pennsylvania')
            tableService.queryEntities('adEvents', query, null, function (error, result, response) {
                if (!error) {
                    res.status(200).send(dt(result, models.event).transform())
                } else res.status(500).send()
            })
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
            tableService.insertOrReplaceEntity('adEvents', entity, function (error, result, response) {
                if (!error) {
                    res.status(200).send()
                } else res.status(500).send()
            });
        } else res.status(403).end()
    }
)

module.exports = router