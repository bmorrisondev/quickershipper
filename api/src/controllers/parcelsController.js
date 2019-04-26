const Easypost = require('@easypost/api');
const easypostApi = new Easypost(process.env.EASYPOST_KEY);
const requestBodyParser = require('../utilities/requestBodyParser');

exports.createParcels = async(event, context) => {
    let requestBody = await requestBodyParser.validateEventBodyType(event.body);

    let parcelPromises = [];
    
    for(let i = 0; i < requestBody.length; i++) {
        parcelPromises.push(createParcel(requestBody[i]));
    }
    
    return await Promise.all(parcelPromises);
}

function createParcel(parcel) {
    return new Promise((resolve, reject) => {
        let easypostParcel = new easypostApi.Parcel({
            length: parcel.lengthIn,
            width: parcel.widthIn,
            height: parcel.heightIn,
            weight: parcel.weightOz
          });
          
          easypostParcel.save()
            .then((data) => {
                parcel.epParcel = data;
                resolve(parcel);
            })
            .catch((err) => {
                parcel.error = err; 
                reject(parcel);
            });
    })
}