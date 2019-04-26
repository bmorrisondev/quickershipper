<template>
    <div>
        <!-- TODO: Form validation -->
        <!-- <v-layout row wrap>
            <v-flex md6>
                <h2>Destination</h2>
                <AddressForm :address="destinationAddressFormViewModel"/>
            </v-flex>
            <v-flex md6>
                <h2>Package Size</h2>
                <ParcelForm :dataSource="parcelFormViewModel" />
                <v-layout row>
                    <v-flex>
                        <v-spacer></v-spacer>
                        <v-btn class="info" @click="addShipmentClick">Add</v-btn>
                         TODO: Enable only when shipments > 0
                        <v-btn @click="purchaseClick">Purchase</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout> -->

        <v-layout row wrap v-if="shipments">
            <v-flex sm4 class="pa-2"
                v-for="shipment in shipments"
                v-bind:key="shipment.shipmentRef">
                <ShipmentCard :shipment="shipment"
                    :disabled="false"/>
            </v-flex>
        </v-layout>

        <!-- <v-layout row wrap>
            <v-flex md12>
                <h2>Shipments</h2>

                <MultishipTable :shipments="shipments"/>
            </v-flex>
        </v-layout> -->

        <!-- Source Address Dialog -->
        <!-- TODO: Break into component -->
        <!-- TODO: Display loading better... -->
        <v-dialog v-model="isSourceAddressRequired" width="500" persistent>
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Enter Your Info
                </v-card-title>
                <v-progress-linear :indeterminate="isLoading" class="ma-0"></v-progress-linear>

                <v-card-text>
                    <AddressForm :address="sourceAddress"
                        :isEmailRequired="true"
                        :isEditing="true"
                        :disabled="isLoading" />
                    <v-checkbox :label="'Save Address?'" v-model="sourceAddress.shouldSaveSourceAddress" />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer> </v-spacer>
                    <v-btn :color="'#FF9833'"
                        :loading="isLoading"
                        :dark="!isLoading"
                        :disabled="isLoading"
                        round
                        @click="updateSourceAddressClick">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-btn color="primary"
            @click="setIsAddingShipment(true)"
            dark
            medium
            fixed
            bottom
            right
            fab><v-icon>add</v-icon>
        </v-btn>

        <ShipmentFormDialog :isDisplayed="isAddingShipment"></ShipmentFormDialog>

        <!-- TODO: Display loading better... -->
        <PaymentDialog :cardTokenizedCb="cardTokenizedCb"
            :cancelClick="paymentDialogCancelClick"
            :isDisplayed="isPurchasing" />

        <!-- <SourceAddressSnackbar :okClick=""
            :changeInfoClick=""
            :isDisplayed=""></SourceAddressSnackbar> -->


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
import uuidv4 from 'uuid/v4'

import AddressForm from '@/components/Forms/AddressForm.vue'
import ParcelForm from '@/components/Forms/ParcelForm.vue'
import MultishipTable from '@/components/MultishipTable.vue'
import PaymentDialog from '@/components/Payments/PaymentDialog.vue'
import ShipmentCard from './ShipmentCard.vue'
import ShipmentFormDialog from './ShipmentFormDialog.vue'

export default {
    name: 'MultishipIndex',
    components: {
        AddressForm,
        ParcelForm,
        MultishipTable,
        PaymentDialog,
        ShipmentCard,
        ShipmentFormDialog
    },
    data: function () {
        return {
            isSourceAddressRequired: false,
            isSnackbarDisplayed: false
        }
    },
    computed: {
        ...mapGetters({
            cardToken: 'cardToken',
            sourceAddress: 'SourceAddressModule/sourceAddress',
            isLoading: 'LoadingModule/isLoading',
            isSourceAddressSet: 'SourceAddressModule/isSourceAddressSet',
            isPurchasing: 'MultishipModule/isPurchasing',
            destinationAddressFormViewModel: 'MultishipModule/destinationAddressFormViewModel',
            parcelFormViewModel: 'MultishipModule/parcelFormViewModel',
            shipments: 'MultishipModule/shipments',
            isAddingShipment: 'MultishipModule/isAddingShipment'
        })
    },
    created: function () {
        this.checkIsSourceAddressRequired()
    },
    watch: {
        isSourceAddressSet: function () {
            this.checkIsSourceAddressRequired()
        }
    },
    methods: {
        ...mapMutations(moduleName, [
            'addShipment',
            'setIsPurchasing',
            'setIsAddingShipment'
        ]),

        ...mapActions({
            clearSourceAddress: 'SourceAddressModule/clearSourceAddress',
            updateSourceAddress: 'SourceAddressModule/updateSourceAddress',
            updateShipmentData: 'MultishipModule/updateShipmentData',
            purchaseShipments: 'MultishipModule/purchaseShipments'
        }),

        checkIsSourceAddressRequired: function () {
            this.isSourceAddressRequired = !(this.isSourceAddressSet)
            if (this.isSourceAddressSet) {
                this.isSnackbarDisplayed = true
            }
        },

        addShipmentClick: function () {
            let shipment = this.buildShipment(this.parcelFormViewModel, this.sourceAddress, this.destinationAddressFormViewModel)

            this.addShipment(shipment) // Mutation

            this.updateShipmentData(shipment) // Action

            this.scrollToTop()
        },

        purchaseClick: function () {
            this.setIsPurchasing(true)
        },

        paymentDialogCancelClick: function () {
            this.setIsPurchasing(false)
        },

        cardTokenizedCb: function () {
            this.purchaseShipments()
        },

        buildShipment: function (parcelFormViewModel, sourceAddress, destinationAddressFormViewModel) {
            let shipmentRef = uuidv4()

            let weightOz = (parseInt(parcelFormViewModel.formLbs) * 16) + parseInt(parcelFormViewModel.formOz)

            let parcel = {
                weightOz: weightOz,
                heightIn: parseInt(parcelFormViewModel.heightIn),
                lengthIn: parseInt(parcelFormViewModel.lengthIn),
                widthIn: parseInt(parcelFormViewModel.widthIn)
            }

            let shipment = {
                ref: shipmentRef,
                isLoading: true,
                sourceAddress: sourceAddress,
                destinationAddress: destinationAddressFormViewModel,
                parcel: parcel
            }

            return shipment
        },

        changeInfoClick: function () {
            this.clearSourceAddress
            this.isSourceAddressRequired = true
            this.isSnackbarDisplayed = false
        },

        scrollToTop: function () {
            let options = {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic'
            }
            this.$vuetify.goTo(0, options)
        },

        updateSourceAddressClick: async function() {
            try {
                await this.updateSourceAddress()
                this.isSourceAddressRequired = !(this.isSourceAddressSet)
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
