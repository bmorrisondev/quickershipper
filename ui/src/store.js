import Vue from 'vue'
import Vuex from 'vuex'
import SingleshipModule from '@/views/Singleship/Module'
import MultishipModule from '@/views/Multiship/Module'
import LoadingModule from '@/components/SharedModules/LoadingModule'
import SourceAddressModule from '@/components/SharedModules/SourceAddressModule'

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {
        cardToken: null,
        isDrawerVisible: false,
        isSnackbarDisplayed: false,
        isBetaVersion: true
    },
    getters: {
        cardToken: state => state.cardToken,
        isDrawerVisible: state => state.isDrawerVisible,
        isSnackbarDisplayed: (state) => state.isSnackbarDisplayed,
        isBetaVersion: (state) => state.isBetaVersion
    },
    mutations: {
        setCardToken: (state, cardToken) => (state.cardToken = cardToken),
        setIsDrawerVisible: (state, isDrawerVisible) => (state.isDrawerVisible = isDrawerVisible),
        setIsSnackbarDisplayed: (state, isSnackbarDisplayed) => (state.isSnackbarDisplayed = isSnackbarDisplayed)
    },
    actions: {
        toggleDrawer: function ({ commit, state }) {
            let currentDrawerState = state.isDrawerVisible
            commit('setIsDrawerVisible', !currentDrawerState)
        }
    },
    modules: {
        SingleshipModule,
        MultishipModule,
        LoadingModule,
        SourceAddressModule
    }
})
