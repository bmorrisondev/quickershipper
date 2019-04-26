const shipmentsController = require('../controllers/shipmentsController');
const responseBuilder = require('../utilities/responseBuilder');

const basePath = "/shipments";

exports.router = async(event, context) => {
    try {
        switch(event.httpMethod) {
            case "POST":
                return post(event, context);
            default:
                return responseBuilder.error("Method not allowed");
        }
    } catch (err) {
        console.log(err);
        return responseBuilder.error(err);
    }
}

async function post(event, context) {
    let responseBody = {};
    let response = {};

    console.log(event.path);
    
    switch(event.path) {
        case basePath:
            responseBody = await shipmentsController.createShipments(event);
            response = await responseBuilder.build(200, responseBody);
            return response;
        case `${basePath}/purchase`:
            responseBody = await shipmentsController.purchaseShipments(event);
            response = await responseBuilder.build(200, responseBody);
            return response;
        default:
            return responseBuilder.error("Resource not available");
    }
}