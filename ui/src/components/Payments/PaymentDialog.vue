<template>
    <v-dialog v-model="isDisplayed"
        persistent
        max-width="500">
        <v-card>
            <v-card-title class="headline">Purchase</v-card-title>
            <v-card-text class="payment-dialog-content">
                <v-container>
                    <div v-if="isFormLoading" class="text-xs-center">
                        <v-progress-circular :size="50"
                            :width="7"
                            color="#FF9833"
                            indeterminate
                            ></v-progress-circular>
                    </div>
                    <div v-else-if="cardToken">
                        <div class="StripeElement stripe-outline">
                            <v-layout justify-space-around>
                                <span>Card on file:</span>
                                <span v-html="cardNumHtml"></span>
                                <span>-</span>
                                <span>Exp: {{this.cardToken.card.exp_month}}/{{cardToken.card.exp_year}}</span>
                                <v-icon @click="editStoredCardClick">edit</v-icon>
                            </v-layout>
                        </div>
                    </div>
                    <!-- TODO: Hide this element when the form is loading -->
                    <div ref="card" :class="(isFormLoading || cardToken) ? 'payment-form-hidden' : 'stripe-outline'"></div>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn flat="flat"
                    round
                    @click="cancelClick"
                    :disabled="isFormLoading">
                    Cancel
                </v-btn>

                <v-btn :color="'#FF9833'"
                        :dark="!isFormLoading"
                        round
                        @click="purchaseClick"
                        :disabled="isFormLoading">Purchase</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

let moduleName = 'SingleshipModule'

let style = {
    base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        border: '1px solid #ccc'
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
}

export default {
    name: 'PaymentDialog',
    props: {
        cancelClick: Function,
        cardTokenizedCb: Function,
        isDisplayed: Boolean
    },
    data: function () {
        return {
            stripe: null,
            elements: null,
            card: null
        }
    },
    mounted: function () {
        if (this.cardToken == null) {
            this.setupCardForm()
        }
    },
    computed: {
        ...mapGetters({
            cardToken: 'cardToken',
            isFormLoading: 'LoadingModule/isLoading'
        }),

        cardNumHtml: function () {
            let dots = '&#9679;&#9679;&#9679;&#9679;'
            let html = `${dots} ${dots} ${dots} ${this.cardToken.card.last4}`
            return html
        }
    },
    methods: {
        ...mapMutations({
            setCardToken: 'setCardToken',
            setIsFormLoading: 'LoadingModule/setIsLoading'
        }),

        editStoredCardClick: async function () {
            this.setCardToken(null)
            this.setupCardForm()
        },

        setupCardForm: async function () {
            this.stripe = Stripe(process.env.VUE_APP_STRIPEKEY)
            this.elements = this.stripe.elements()
            this.card = this.elements.create('card', style)
            this.card.mount(this.$refs.card)
        },

        purchaseClick: async function () {
            try {
                this.setIsFormLoading(true)
                let res = await this.stripe.createToken(this.card)
                if (res.error) {
                    throw res.error
                } else {
                    this.setCardToken(res.token)
                    this.cardTokenizedCb()
                }
            } catch (err) {
                alert(err)
            } finally {
                this.setIsFormLoading(false)
            }
        }
    }
}
</script>

<style>
.payment-dialog-content {
    min-height: 100px;
}
.payment-form-hidden {
    visibility: hidden;
    height: 0px;
}
.stripe-outline {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 3px 3px 5px #eee;
    min-height: 50px;
}

.StripeElement--focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
</style>
