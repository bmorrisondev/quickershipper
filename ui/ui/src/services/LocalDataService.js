export default {
    doesSourceAddressExist () {
        let cachedSourceAddress = localStorage.getItem('sourceAddress')
        if (cachedSourceAddress === null || cachedSourceAddress === undefined || cachedSourceAddress === 'undefined') {
            return false
        }
        return true
    },

    loadSourceAddress () {
        return JSON.parse(localStorage.getItem('sourceAddress'))
    },

    saveSourceAddress (address) {
        let stringified = JSON.stringify(address)
        localStorage.setItem('sourceAddress', stringified)
    },

    clearSourceAddress () {
        localStorage.clear('sourceAddress')
    }
}
