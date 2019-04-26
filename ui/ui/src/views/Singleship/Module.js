import BackendService from '@/services/BackendService.js'
import Utilities from '@/helpers/Utilities'
import RatesHelper from '@/helpers/RatesHelper.js'
import RootStore from '@/store.js'

export default {
    namespaced: true,
    state: {
        isFormLoading: false,
        progressBarValue: 0,
        progressbarStatus: 'OK',
        parcelForm: {
            formLbs: null,
            formOz: null,
            heightIn: null,
            lengthIn: null,
            widthIn: null,
            isFormValid: true
        },
        shipment: {
            sourceAddress: {},
            destinationAddress: {
                name: '',
                street1: '',
                street2: '',
                city: '',
                state: '',
                zip: ''
            },
            parcel: {
                heightIn: 0,
                widthIn: 0,
                lengthIn: 0,
                weightOz: 0
            }
        },
        paymentInfo: {},
        isPurchasing: false,
        step: 1
    },
    getters: {
        progressBarValue: (state) => state.progressBarValue,
        isFormLoading: (state) => state.isFormLoading,
        shipment: (state) => state.shipment,
        parcelForm: (state) => state.parcelForm,
        isPurchasing: (state) => state.isPurchasing,
        step: (state) => state.step
    },
    mutations: {
        setIsFormLoading: (state, loadingState) => (state.isFormLoading = loadingState),
        setProgressBarValue: (state, value) => (state.progressBarValue = value),
        setSourceAddress: (state, sourceAddress) => (state.shipment.sourceAddress = sourceAddress),
        setDestinationAddress: (state, destinationAddress) => (state.shipment.destinationAddress = destinationAddress),
        setShipment: (state, shipment) => (state.shipment = shipment),
        setSelectedRate: (state, rateId) => (state.selectedRateId = rateId),
        setPaymentInfo: (state, paymentInfo) => (state.paymentInfo = paymentInfo),
        setIsPurchasing: (state, isPurchasing) => (state.isPurchasing = isPurchasing),
        setSelectedRateId: (state, rateId) => (state.shipment.selectedRateId = rateId),
        setStep: (state, step) => (state.step = step)
    },
    actions: {
        async validateDestinationAddress ({ commit, state }) {
            try {
                let validatedAddress = await BackendService.validateSingleAddress(state.shipment.destinationAddress)
                if (!(validatedAddress.epAddress.verifications.delivery.success)) {
                    throw validatedAddress.epAddress.verifications.delivery.errors
                }
                commit('setDestinationAddress', validatedAddress)
            } catch (err) {
                // TODO: figure out a better way to handle this
                // -- alert the user
                // -- set the status bar color
                console.log('this one is called')
                console.log(err)
            } finally {

            }
        },

        async createShipment ({ commit, state, rootState }) {
            try {
                let shipment = state.shipment
                let weightOz = (parseInt(state.parcelForm.formLbs) * 16) + parseInt(state.parcelForm.formOz)

                let parcel = {
                    weightOz: weightOz,
                    heightIn: parseInt(state.parcelForm.heightIn),
                    lengthIn: parseInt(state.parcelForm.lengthIn),
                    widthIn: parseInt(state.parcelForm.widthIn)
                }
                shipment.parcel = await BackendService.createSingleParcel(parcel)
                shipment.sourceAddress = RootStore.getters['SourceAddressModule/sourceAddress']

                let createdShipment = await BackendService.createSingleShipment(shipment)
                commit('setShipment', createdShipment)
            } catch (err) {
                console.log(err)
            }
        },

        async rateSelected ({ commit }, rate) {
            commit('setSelectedRateId', rate.id)

            // TODO: Markup should all be handled on backend
            let markedUpRate = RatesHelper.getMarkedUpRate(rate)

            // Build payment info object
            let paymentInfo = {
                cost: Utilities.formatIntAsUsd(markedUpRate)
            }

            commit('setPaymentInfo', paymentInfo)
            commit('setIsPurchasing', true)
        }
    }
}
