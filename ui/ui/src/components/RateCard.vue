<template>
    <v-card>
        <v-card-title primary-title>
            <div>
            <div class="headline">{{ rate.carrier }} {{ rate.service }}</div>
            <div>Cost: <strong>{{ cost }}</strong></div>
            <div><span v-html="friendlyEstDeliveryDateHtml"></span></div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat color="#FF9833" v-on:click.native="onSelectedClick(rate)">Select</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import Utilities from '@/helpers/Utilities'

export default {
    name: 'RateCard',
    props: {
        rate: Object,
        onSelectedClick: Function
    },
    computed: {
        cost: function () {
            let parsedRate = parseFloat(this.rate.rate) * 100
            let markup = parseInt('22')
            let markedUpRate = parsedRate + markup
            return Utilities.formatIntAsUsd(markedUpRate)
        },

        friendlyEstDeliveryDateHtml: function () {
            if(!(this.rate.est_delivery_days)) {
                return "<i>No Est Delivery Date...</i>"
            }
            let addDays = function (date, days) {
                var result = new Date(date)
                result.setDate(result.getDate() + days)
                return result
            }
            let today = new Date()
            let estDeliveryDate = addDays(today, this.rate.est_delivery_days)
            let getDayOfWeek = function(dayNum) {
                switch(dayNum) {
                    case 0:
                        return "Sun"
                    case 1:
                        return "Mon"
                    case 2:
                        return "Tue"
                    case 3:
                        return "Wed"
                    case 4:
                        return "Thu"
                    case 5:
                        return "Fri"
                    case 6:
                        return "Sat"
                }
            }
            // Get month
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]

            return `Est Delivery: <strong>${getDayOfWeek(estDeliveryDate.getDay())}, ${months[estDeliveryDate.getMonth()]} ${estDeliveryDate.getDate()}</strong>`
        }
    }
}
</script>

<style>

</style>
