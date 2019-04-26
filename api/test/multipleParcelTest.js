const parcelsController = require('../src/controllers/parcelsController');

async function run() {
let request = {
        body: [
            {
                formOz: 5,
                formLbs: 5,
                heightIn: 9,
                widthIn: 4,
                lengthIn: 1,
                weightOz: 8
            }
        ]
    }
    let response = await parcelsController.createParcels(request);
    
    console.log(response);
}

run();