
const event = {
    list: 'entries',
    item: {
        userName: 'PartitionKey._',
        id: 'RowKey._',
        time: 'eventTime._',
        userEmail: 'userEmail._',
        appName: 'appName._',
        ipAddress: 'ipAddress._',
        city: 'city._',
        state: 'state._',
        country: 'country._',
        latitude: 'latitude._',
        longitude: 'longitude._'
    }
}

const toDelete = {
    list: 'entries',
    item: {
        PartitionKey: 'PartitionKey',
        RowKey: 'RowKey',
        eventTime: 'eventTime'
    }
}

module.exports = {
    event,
    toDelete
}