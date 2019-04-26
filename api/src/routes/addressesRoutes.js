const addressesController = require('../controllers/addressesController');
const responseBuilder = require('../utilities/responseBuilder');

const basePath = "/addresses";

exports.router = async(event, context) => {
    try {
        switch(event.httpMethod) {
            case "POST":
                return post(event, context);
            default:
                return responseBuilder.error("Method not allowed");
        }
    } catch (err) {
        return responseBuilder.error(err);
    }
}

async function post(event, context) {
    switch(event.path) {
        case basePath:
            let responseBody = await addressesController.validateAddresses(event);
            let response = await responseBuilder.build(200, responseBody);
            return response;
        default:
            return responseBuilder.error("Resource not available");
    }
}

