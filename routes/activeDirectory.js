const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const refreshToken = require('../refresh')
const fetch = require('node-fetch')
const dt = require('node-json-transform').DataTransform


global.Headers = fetch.Headers

// requests on
router.get('/allEvents',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            const time = await getSpan(req.query.minutes)
            fetch("https://management.usgovcloudapi.net/subscriptions/" + process.env.SUBSCRIPTION + "/resourceGroups/" + req.query.resourceGroup + "/providers/Microsoft.Web/sites/" + req.query.appName + "/metrics?$filter=(name.value eq 'Requests') and startTime eq '" + time.from + "' and endTime eq '" + time.to + "'&api-version=2016-08-01", {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + await refreshToken(),
                    'Accept': 'application/json'
                })
            })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, metrics.metric).transform())
                })
                .catch(err => res.status(500).send(err))
        } else res.status(403).end()
    }
)

module.exports = router