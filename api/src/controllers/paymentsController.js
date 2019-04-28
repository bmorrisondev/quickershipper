const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.createCharge = async(cardToken, amount, description) => {
    console.log('paymentsController.createCharge start ')

    return new Promise((resolve, reject) => {
        let theCharge = {
            amount: amount,
            currency: 'usd',
            source: cardToken,
            description: description
        }

        console.log('Charging card: ' + JSON.stringify(theCharge))
        stripe.charges.create(theCharge, (err, x) => {
            if(err) {
                console.log('err on payments controller: ' + JSON.stringify(err))
                reject(err)
            } else {
                console.log('payment completed successfully!')
                resolve(x)
            }
        })
    })
}