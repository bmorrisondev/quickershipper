const addressController = require('../src/controllers/addressesController');

async function run() {
let request = {
        body: [
                {
                    "name": "Brian Morrison II",
                    "street1": "25608 W Cerena Cir",
                    "city": "Plainfield",
                    "state": "IL",
                    "zip": "60586",
                    "ref": "f8f6235d-7261-4ccb-af3b-d70bd7e0df75"
                },
                {
                    "name": "Luca Morrison",
                    "street1": "259 Sunshine Dr",
                    "city": "Bolingbrook",
                    "state": "IL",
                    "zip": "60440"
                }
            ]
    }
    let response = await addressController.validateAddresses(request);
    
    console.log(response);
}

run();