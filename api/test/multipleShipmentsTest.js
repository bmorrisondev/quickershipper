const addressController = require('../src/controllers/addressesController');

async function run() {
let request = {
        body: [
                {
                    "name": "Willis Tower",
                    "street1": "233 S Wacker Dr",
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60606",
                    "ref": "f8f6235d-7261-4ccb-af3b-d70bd7e0df75"
                },
                {
                    "name": "John Hancock",
                    "street1": "875 N Michigan Ave",
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611"
                }
            ]
    }
    let response = await addressController.validateAddresses(request);

    console.log(response);
}

run();