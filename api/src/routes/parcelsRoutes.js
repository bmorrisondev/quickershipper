const parcelsController = require('../controllers/parcelsController')
const responseBuilder = require('../utilities/responseBuilder')

const basePath = '/parcels'

exports.router = async(event, context) => {
    try {
        switch(event.httpMethod) {
            case 'POST':
                return post(event, context)
            default:
                return responseBuilder.error('Method not allowed')
        }
    } catch (err) {
        return responseBuilder.error(err)
    }
}

async function post(event) {
    switch(event.path) {
        case basePath: {
            let responseBody = await parcelsController.createParcels(event)
            let response = await responseBuilder.build(200, responseBody)
            return response
        }
        default:
            return responseBuilder.error('Resource not available')
    }
}
