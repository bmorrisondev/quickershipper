import LocalDataService from '@/services/LocalDataService'
import BackendService from '@/services/BackendService'

export default {
    namespaced: true,
    state: {
        sourceAddress: {
            name: '',
            emailAddress: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            shouldSaveSourceAddress: false
        },
        isSourceAddressSet: false
    },
    getters: {
        sourceAddress: state => state.sourceAddress,
        isSourceAddressSet: state => state.isSourceAddressSet
    },
    mutations: {
        setSourceAddress: (state, sourceAddress) => (state.sourceAddress = sourceAddress),
        setIsSourceAddressSet: (state, isSourceAddressSet) => (state.isSourceAddressSet = isSourceAddressSet)
    },
    actions: {
        importSourceAddress: async function ({ commit }) {
            if (LocalDataService.doesSourceAddressExist()) {
                let sourceAddress = LocalDataService.loadSourceAddress()
                commit('setSourceAddress', sourceAddress)
                commit('setIsSourceAddressSet', true)
                commit('setIsSnackbarDisplayed', true, { root: true })
            }
        },

        updateSourceAddress: async function ({ commit, state }, payload) {
            try {
                commit('LoadingModule/setIsLoading', true, { root: true })
                let validatedAddress = await BackendService.validateSingleAddress(state.sourceAddress)
                if (!(validatedAddress.epAddress.verifications.delivery.success)) {
                    // TODO: Map error codes to messages to be passed into ErrorComponent
                    throw validatedAddress.epAddress.verifications.delivery.errors[0].code
                } else {
                    commit('setSourceAddress', validatedAddress)
                    commit('setIsSourceAddressSet', true)
                    if (state.sourceAddress.shouldSaveSourceAddress) {
                        LocalDataService.saveSourceAddress(validatedAddress)
                    }
                    if (payload) {
                        payload.callback(payload.vars)
                    }
                }
            } catch (err) {
                // TODO: Pass this to an Error Component for handling display to the user
                alert(err)
            } finally {
                commit('LoadingModule/setIsLoading', false, { root: true })
            }
        },

        clearSourceAddress: async function ({ commit, state }, callback) {
            try {
                LocalDataService.clearSourceAddress()
                if (callback) {
                    callback()
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
