import BackendService from '@/services/BackendService.js'
import RatesHelper from '@/helpers/RatesHelper.js'
import Utilities from '@/helpers/Utilities.js'

export default {
    namespaced: true,
    state: {
        viewModels: {
            parcelForm: {
                heightIn: null,
                widthIn: null,
                lengthIn: null,
                weightOz: null,
                formLbs: null,
                formOz: null
            },
            destinationAddressForm: {
                name: null,
                street1: null,
                street2: null,
                city: null,
                state: null,
                zip: null
            },
            ratesReviewForm: {
                selectedRateId: null
            }
        },
        shipments: [],
        selectedRateMaps: [],
        isPurchasing: false,
        isAddingShipment: false
    },
    getters: {
        sourceAddress: (state) => state.sourceAddress,
        shipments: (state) => state.shipments,
        destinationAddressFormViewModel: (state) => state.viewModels.destinationAddressForm,
        parcelFormViewModel: (state) => state.viewModels.parcelForm,
        ratesReviewFormViewModel: (state) => state.viewModels.ratesReviewForm,
        isPurchasing: (state) => state.isPurchasing,
        isAddingShipment: state => state.isAddingShipment
    },
    mutations: {
        addShipment: (state, shipment) => state.shipments.push(shipment),
        clearShipments: (state) => (state.shipments = []),
        setShipments: (state, shipments) => (state.shipments = shipments),
        updateShipment: (state, shipment) => {
            var key = { ref: shipment.ref }
            Utilities.upsertItemIntoArray(shipment, key, state.shipments)
        },
        removeShipment: (state, shipment) => {
            var key = { ref: shipment.ref }
            Utilities.removeItemFromArray(key, state.shipments)
        },
        setIsPurchasing: (state, isPurchasing) => (state.isPurchasing = isPurchasing),
        setIsAddingShipment: (state, isAddingShipment) => (state.isAddingShipment = isAddingShipment),
        setParcelForm: (state, parcelForm) => (state.viewModels.parcelForm = parcelForm),
        setDestinationAddressForm: (state, destinationAddressForm) => (state.viewModels.destinationAddressForm = destinationAddressForm)
    },
    actions: {
        updateShipmentData: async function ({ commit }, shipment) {
            try {
                shipment.destinationAddress = await BackendService.validateSingleAddress(shipment.destinationAddress)
                shipment.parcel = await BackendService.createSingleParcel(shipment.parcel)
                shipment = await BackendService.createSingleShipment(shipment)

                let lowestRate = await RatesHelper.getLowestRate(shipment.epShipment.rates)
                shipment.selectedRateId = lowestRate.id
                shipment.isLoading = false
                commit('updateShipment', shipment)
            } catch (err) {
                console.log(err)
                alert(err)
            }
        },

        purchaseShipments: async function ({ commit, state, rootState }) {
            try {
                console.log('called')
                let purchasedShipments = await BackendService.purchaseShipments(state.shipments, rootState.cardToken)
                console.log(purchasedShipments)
                for (let i = 0; i < purchasedShipments.length; i++) {
                    purchasedShipments[0].isPurchaseComplete = true
                    commit('updateShipment', purchasedShipments[0])
                }
            } catch (err) {
                // TODO: Handle this
                alert(err)
            }
        },

        resetFormData: async function ({ commit }) {
            let parcelFormData = {
                heightIn: null,
                widthIn: null,
                lengthIn: null,
                weightOz: null,
                formLbs: null,
                formOz: null
            }

            let destinationAddressForm = {
                name: null,
                street1: null,
                street2: null,
                city: null,
                state: null,
                zip: null
            }

            commit('setParcelForm', parcelFormData)
            commit('setDestinationAddressForm', destinationAddressForm)
        }
    }
}
