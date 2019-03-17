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
                PartitionKey: entGen.String('part2'),
                RowKey: entGen.String('row1'),
                boolValueTrue: entGen.Boolean(true),
                boolValueFalse: entGen.Boolean(false),
                intValue: entGen.Int32(42),
                dateValue: entGen.DateTime(new Date(Date.UTC(2011, 10, 25))),
                complexDateValue: entGen.DateTime(new Date(Date.UTC(2013, 02, 16, 01, 46, 20)))
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