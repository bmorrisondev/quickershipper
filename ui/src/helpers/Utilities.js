import find from 'lodash/find'
import indexOf from 'lodash/indexOf'

export default {
    formatIntAsUsd: function (value) {
        // return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        let valueDivided = value / 100
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        return formatter.format(valueDivided)
    },

    ozToLbsAndOz: function (value) {
        let lbs = Math.floor(value / 16)
        let oz = value % 16
        return {
            lbs,
            oz
        }
    },

    upsertItemIntoArray: function (newval, key, arr) {
        var match = find(arr, key)
        if (match) {
            var index = indexOf(arr, find(arr, key))
            arr.splice(index, 1, newval)
        } else {
            arr.push(newval)
        }
    },

    removeItemFromArray: function (key, arr) {
        var match = find(arr, key)
        if (match) {
            var index = indexOf(arr, find(arr, key))
            arr.splice(index, 1)
        }
    }
}
