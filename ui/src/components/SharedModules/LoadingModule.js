export default {
    namespaced: true,
    state: {
        isLoading: false
    },
    getters: {
        isLoading: state => state.isLoading
    },
    mutations: {
        setIsLoading: (state, isLoading) => (state.isLoading = isLoading)
    },
    actions: {

    }
}
