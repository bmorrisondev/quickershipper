export default {
    getLowestRate (epRates) {
        return new Promise((resolve, reject) => {
            // Trick to get lowest rate by int
            try {
                let rates = []
                for (let i = 0; i < epRates.length; i++) {
                    let rate = {
                        calculatedRate: epRates[i].rate * 100,
                        id: epRates[i].id
                    }
                    rates.push(rate)
                }

                // Get lowest rate
                let lowestRate = rates.reduce(function (prev, curr) {
                    return prev.calculatedRate < curr.calculatedRate ? prev : curr
                })

                resolve(lowestRate)
            } catch (err) {
                reject(err)
            }
        })
    },

    getMarkedUpRate (rate) {
        let parsedRate = parseFloat(rate.rate) * 100
        let markup = parseInt('22')
        return parsedRate + markup
    }
}
