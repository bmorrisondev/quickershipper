import axios from 'axios'
import ConfigurationBuilder from '@/helpers/configurationBuilder'

let config = ConfigurationBuilder.getConfig()
let addressApiBase = `${config.apiBase}/addresses`
let parcelApiBase = `${config.apiBase}/parcels`
let shipmentsApiBase = `${config.apiBase}/shipments`

export default {
    async validateSingleAddress (address) {
        let addresses = await this.validateAddresses([address])
        return addresses[0]
    },

    async validateAddresses (addresses) {
        let axiosOptions = {
            method: 'post',
            url: addressApiBase,
            headers: {
                'Content-Type': 'application/json'
            },
            data: addresses
        }

        let res = await axios(axiosOptions)
        return res.data
    },

    async createSingleParcel (parcel) {
        let parcelsArray = [
            parcel
        ]
        let createdParcels = await this.createParcels(parcelsArray)
        return createdParcels[0]
    },

    async createParcels (parcels) {
        let axiosOptions = {
            method: 'post',
            url: parcelApiBase,
            headers: {
                'Content-Type': 'application/json'
            },
            data: parcels
        }
        let res = await axios(axiosOptions)
        return res.data
    },

    async createSingleShipment (shipment) {
        let shipmentsArray = [
            shipment
        ]
        let createdShipments = await this.createShipments(shipmentsArray)
        return createdShipments[0]
    },

    async createShipments (shipments) {
        console.log(shipments)
        let axiosOptions = {
            method: 'post',
            url: shipmentsApiBase,
            headers: {
                'Content-Type': 'application/json'
            },
            data: shipments
        }
        let res = await axios(axiosOptions)
        return res.data
    },

    async purchaseShipments (shipments, cardTokenId) {
        let requestBody = {
            'shipments': shipments,
            'cardToken': cardTokenId
        }
        let axiosOptions = {
            method: 'post',
            url: `${shipmentsApiBase}/purchase`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestBody
        }
        let res = await axios(axiosOptions)
        return res.data
    },

    async purchaseSingleShipment (shipment, cardToken) {
        let purchasedShipments = await this.purchaseShipments([shipment], cardToken)
        return purchasedShipments[0]
    }
}
