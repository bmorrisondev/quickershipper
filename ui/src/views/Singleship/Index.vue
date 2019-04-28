<template>
    <div>
        <v-stepper v-model="step" class="quickershipper-stepper">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Ship From</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">Ship To</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 3" step="3">Package</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 4" step="4">Rate</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="5">Label</v-stepper-step>
            </v-stepper-header>

            <v-progress-linear :indeterminate="isFormLoading" class="ma-0"></v-progress-linear>

            <v-stepper-items>
                <!-- Step 1: Source Address -->
                <v-stepper-content step="1">
                    <v-card class="mb-5 remove-shadow">
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Your Info</h3>
                            </div>
                        </v-card-title>
                        <AddressForm :address="sourceAddress"
                            :disabled="isFormLoading"
                            :isEmailRequired="true" />
                        <v-checkbox :label="'Save Address?'" v-model="sourceAddress.shouldSaveSourceAddress" />
                    </v-card>

                    <v-layout align-end justify-end>
                        <v-btn :color="'#FF9833'"
                            :loading="isFormLoading"
                            :dark="!isFormLoading"
                            round
                            @click="sourceAddressContinueClick"
                            :disabled="isFormLoading">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>

                <!-- Step 2: Dest Address -->
                <v-stepper-content step="2">
                    <v-card class="mb-5 remove-shadow">
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Who are you sending it to?</h3>
                            </div>
                        </v-card-title>
                        <AddressForm :address="shipment.destinationAddress" :disabled="isFormLoading" />
                    </v-card>

                    <v-layout align-end justify-end>
                        <v-btn :color="'#FF9833'"
                            :loading="isFormLoading"
                            :dark="!isFormLoading"
                            round
                            @click="destinationAddressContinueClick"
                            :disabled="isFormLoading">Next</v-btn>
                    </v-layout>
                </v-stepper-content>

                <!-- Step 3: Parcel info -->
                <v-stepper-content step="3">
                    <v-card class="mb-5 remove-shadow">
                        <ParcelForm :dataSource="parcelForm"
                            :disabled="isFormLoading"
                            :parcelSizeTitle="'How big is the package?'"
                            :parcelWeightTitle="'How much does it weigh?'"/>
                    </v-card>

                    <v-layout align-end justify-end>
                        <v-btn :color="'#FF9833'"
                            :loading="isFormLoading"
                            :dark="!isFormLoading"
                            round
                            @click="parcelContinueClick"
                            :disabled="isFormLoading">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>

                <!-- Step 4: Rates Select View -->
                <v-stepper-content step="4">
                    <v-layout row wrap v-if="shipment.epShipment">
                        <v-flex sm6 class="pa-2"
                            v-for="rate in shipment.epShipment.rates"
                            v-bind:key="rate.id">
                            <RateCard :rate="rate"
                                :onSelectedClick="rateSelected"/>
                        </v-flex>
                    </v-layout>

                    <PaymentDialog v-if="isPurchasing"
                        :cardTokenizedCb="cardTokenizedCb"
                        :cancelClick="paymentDialog_cancel"
                        :isDisplayed="isPurchasing" />

                    <v-layout align-end justify-end>
                        <v-tooltip bottom>
                            <v-btn slot="activator"
                                flat
                                @click="parcelContinueClick"
                                :disabled="true">Next</v-btn>
                            <span>Select a rate to continue</span>
                        </v-tooltip>
                    </v-layout>

                    <!-- <v-tooltip bottom>
                        <v-btn slot="activator"
                            color="primary"
                            flat
                            :disabled="true">Continue</v-btn>
                        <span>Select a rate to continue</span>
                    </v-tooltip> -->
                </v-stepper-content>

                <!-- Step 5: Label Download View -->
                <v-stepper-content step="5">
                    <v-card class="mb-5 remove-shadow">
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">All set!</h3>
                            </div>
                        </v-card-title>
                        <LabelDownloadCard v-if="shipment.epShipment && shipment.epShipment.postage_label" />
                    </v-card>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <v-snackbar v-model="isSnackbarDisplayed"
            :timeout="5000"
            auto-height
            top>
                We loaded your info from last time!
                <v-btn color="#FF9833"
                    flat
                    @click="changeInfoClick">Change Info</v-btn>
                <v-btn color="#FF9833"
                    flat
                    @click="isSnackbarDisplayed = false">OK</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BackendService from '@/services/BackendService.js'
import AddressForm from '@/components/Forms/AddressForm.vue'
import ParcelForm from '@/components/Forms/ParcelForm.vue'
import RateCard from '@/components/RateCard.vue'
import LabelDownloadCard from '@/components/LabelDownloadCard.vue'
import PaymentDialog from '@/components/Payments/PaymentDialog.vue'

let moduleName = 'SingleshipModule'

export default {
    name: 'SinlgeshipIndex2',
    components: {
        AddressForm,
        ParcelForm,
        RateCard,
        PaymentDialog,
        LabelDownloadCard
    },
    data: function () {
        return {
            step: 1,
            isSnackbarDisplayed: false
        }
    },
    created: function () {
        if (this.isSourceAddressSet) {
            this.step = 2
            this.isSnackbarDisplayed = true
        }
    },
    watch: {
        step: function (newVal, oldVal) {
            this.setStep(newVal)
        },

        moduleStep: function (newVal, oldVal) {
            this.step = newVal
        },

        isSnackbarDisplayed: function (newVal, oldVal) {
            this.setIsSnackbarDisplayed(newVal)
        },

        moduleIsSnackbarDisplayed: function (newVal, oldVal) {
            this.isSnackbarDisplayed = newVal
        }
    },
    computed: {
        ...mapGetters({
            cardToken: 'cardToken',
            moduleIsSnackbarDisplayed: 'isSnackbarDisplayed',
            sourceAddress: 'SourceAddressModule/sourceAddress',
            isSourceAddressSet: 'SourceAddressModule/isSourceAddressSet',
            shipment: 'SingleshipModule/shipment',
            parcelForm: 'SingleshipModule/parcelForm',
            isFormLoading: 'SingleshipModule/isFormLoading',
            moduleStep: 'SingleshipModule/step',
            isPurchasing: 'SingleshipModule/isPurchasing'
        }),

        // ...mapGetters('SingleshipModule', [
        //     'shipment',
        //     'parcelForm',
        //     'isFormLoading',
        //     'moduleStep',
        //     'isPurchasing'
        // ])
    },
    methods: {
        ...mapMutations({
            setIsSnackbarDisplayed: 'setIsSnackbarDisplayed',
            setIsFormLoading: 'SingleshipModule/setIsFormLoading',
            setProgressBarValue: 'SingleshipModule/setProgressBarValue',
            setShipment: 'SingleshipModule/setShipment',
            setStep: 'SingleshipModule/setStep',
            setIsPurchasing: 'SingleshipModule/setIsPurchasing'
        }),
        ...mapActions({
            updateSourceAddress: 'SourceAddressModule/updateSourceAddress',
            clearSourceAddress: 'SourceAddressModule/clearSourceAddress',
            validateDestinationAddress: 'SingleshipModule/validateDestinationAddress',
            rateSelected: 'SingleshipModule/rateSelected',
            createShipment: 'SingleshipModule/createShipment'
        }),

        sourceAddressContinueClick: async function () {
            try {
                this.setIsFormLoading(true)
                let payload = {
                    callback: this.setStep,
                    vars: 2
                }
                // let callback = this.setStep(2)
                await this.updateSourceAddress(payload)
            } catch (err) {
                alert(err)
            } finally {
                this.setIsFormLoading(false)
            }
        },

        destinationAddressContinueClick: async function () {
            try {
                this.setIsFormLoading(true)
                await this.validateDestinationAddress(this.shipment.destinationAddress)
                this.setStep(3)
            } catch (err) {
                console.log(err)
            } finally {
                this.setIsFormLoading(false)
            }
        },

        parcelContinueClick: async function () {
            try {
                this.setIsFormLoading(true)
                await this.createShipment()
            } catch (err) {
                console.log(err)
            } finally {
                this.setIsFormLoading(false)
                if (this.shipment.epShipment.id) {
                    this.setStep(4)
                }
            }
        },

        paymentDialog_cancel: function () {
            this.setIsPurchasing(false)
        },

        // TODO: Move into module
        cardTokenizedCb: async function () {
            try {
                let purchasedShipment = await BackendService.purchaseSingleShipment(this.shipment, this.cardToken.id)
                this.setShipment(purchasedShipment)
                this.setStep(5)
            } catch (err) {
                // TODO: Handle this
                alert(err)
            } finally {
                if (this.shipment.epShipment.postage_label) {
                    this.setIsPurchasing(false)
                }
            }
        },

        changeInfoClick: function () {
            this.clearSourceAddress()
            this.setStep(1)
            this.isSnackbarDisplayed = false
        }
    }
}
</script>

<style>
.quickershipper-stepper {
    border-radius: 10px;
}
.remove-shadow {
    box-shadow: none !important;
    margin-bottom: 10px !important;
}
</style>
