const Easypost = require('@easypost/api');
const easypostApi = new Easypost(process.env.EASYPOST_KEY);
const requestBodyParser = require('../utilities/requestBodyParser');

exports.validateAddresses = async(event, context) => {
    let requestBody = await requestBodyParser.validateEventBodyType(event.body);
    
    let addressPromises = [];
    
    for(let i = 0; i < requestBody.length; i++) {
        addressPromises.push(validateAddress(requestBody[i]));
    }
    
    return await Promise.all(addressPromises);
}

function validateAddress(address) {
    return new Promise((resolve, reject) => {
        let easypostAddress = new easypostApi.Address({
            verify: ['delivery'],
            street1: address.street1,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: 'US',
            name: address.name
        });

        easypostAddress.save()
            .then((addr) => {
                address.epAddress = addr;
                resolve(address);
            })
            .catch((err) => {
                address.error = err; 
                reject(address);
            })
    })
}