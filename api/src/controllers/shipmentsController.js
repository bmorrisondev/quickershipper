const _ = require('underscore')
const Easypost = require('@easypost/api')
const easypostApi = new Easypost(process.env.EASYPOST_KEY)
const requestBodyParser = require('../utilities/requestBodyParser')
const paymentsController = require('./paymentsController')

exports.createShipments = async(event) => {
    console.log('shipmentsControlleer.createShipments start ')

    let requestBody = await requestBodyParser.validateEventBodyType(event.body)

    console.log(`createParcels requestBody: ${JSON.stringify(requestBody)}`)

    let promises = []

    for(let i = 0; i < requestBody.length; i++) {
        let shipment = requestBody[i]
        let createShipmentPromise = createShipment(shipment)
        promises.push(createShipmentPromise)
    }

    return await Promise.all(promises)
}

function createShipment(shipment) {
    return new Promise((resolve, reject) => {
        let easypostShipment = new easypostApi.Shipment({
            from_address: shipment.sourceAddress.epAddress.id,
            to_address: shipment.destinationAddress.epAddress.id,
            parcel: shipment.parcel.epParcel.id
        })

        console.log(JSON.stringify(easypostShipment))

        easypostShipment.save()
            .then((data) => {
                shipment.epShipment = data
                resolve(shipment)
            })
            .catch((err) => {
                shipment.error = err
                reject(shipment)
            })
    })
}

exports.purchaseShipments = async(event) => {
    console.log('purchaseShipments starting...')

    let requestBody = await requestBodyParser.validateEventBodyType(event.body)

    console.log('requestBody: ' + JSON.stringify(requestBody))

    let retrieveShipmentPromises = []
    let shipments = []

    // Retrieve Easypost shipment objects to parse the rate
    console.log('Starting to retrieve shipments from ep')
    for(let i = 0; i < requestBody.shipments.length; i++) {
        let shipment = requestBody.shipments[i]
        let retrieveShipmentPromise = retrieveShipment(shipment)
        retrieveShipmentPromises.push(retrieveShipmentPromise)
    }

    shipments = await Promise.all(retrieveShipmentPromises)
    console.log('after shipments: ' + JSON.stringify(shipments))

    // Parse the rate of all shipments
    console.log('Starting to parse the rates of all selected to get a total')
    let totalEasypostCharges = 0
    for(let i = 0; i < shipments.length; i++) {
        let selectedRate = _.find(shipments[i].epShipment.rates, function(item) {
            return item.id == shipments[i].selectedRateId
        })
        let amountWithoutDecimal = selectedRate.rate * 100
        totalEasypostCharges += amountWithoutDecimal
    }

    await paymentsController.createCharge(requestBody.cardToken, totalEasypostCharges, 'QuickerShipper Label Purchase')

    // Process easypost purchases
    console.log('Processing easypost purchases')
    let easypostPurchasePromises = []
    for(let i = 0; i < shipments.length; i++) {
        let shipment = shipments[i]
        let processEasypostPurchasePromise = processEasypostPurchase(shipment)
        easypostPurchasePromises.push(processEasypostPurchasePromise)
    }
    return await Promise.all(easypostPurchasePromises)
}

function retrieveShipment(shipment) {
    return new Promise((resolve, reject) => {
        console.log('Retrieving shipment: ' + JSON.stringify(shipment))
        easypostApi.Shipment.retrieve(shipment.epShipment.id)
            .then((data) => {
                shipment.epShipment = data
                resolve(shipment)
            })
            .catch((err) => {
                shipment.error = err
                reject(shipment)
            })
    })
}

function processEasypostPurchase(shipment) {
    console.log('Processing shipment purchase: ' + JSON.stringify(shipment))
    return new Promise((resolve, reject) => {
        shipment.epShipment.buy(shipment.selectedRateId)
            .then((data) => {
                shipment.epShipment = data
                resolve(shipment)
            })
            .catch((err) => {
                shipment.error = err
                reject(shipment)
            })
    })
}
