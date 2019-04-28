<template>
    <v-dialog v-model="isDisplayed"
        persistent
        scrollable
        max-width="500">
         <v-card>
            <v-card-title primary-title>
                Add Shipment
            </v-card-title>

            <v-card-text>
                <h2>Destination</h2>
                <AddressForm :address="destinationAddressFormViewModel" formRef="addressForm"/>
                <h2>Package Size</h2>
                <ParcelForm :dataSource="parcelFormViewModel" />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="closeClick">
                    Close
                </v-btn>
                <v-btn color="primary" flat @click="saveAndNewClick">
                    Save & New
                </v-btn>
                <v-btn color="primary" flat @click="saveAndCloseClick">
                    Save & Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AddressForm from '@/components/Forms/AddressForm.vue'
import ParcelForm from '@/components/Forms/ParcelForm.vue'
import ShipmentHelper from '@/helpers/ShipmentHelper'

export default {
    name: 'ShipmentFormDialog',
    props: {
        isDisplayed: Boolean
    },
    components: {
        AddressForm,
        ParcelForm
    },
    mounted: function () {
        this.resetFormData()
    },
    computed: {
        ...mapGetters({
            sourceAddress: 'sourceAddress',
            destinationAddressFormViewModel: 'MultishipModule/destinationAddressFormViewModel',
            parcelFormViewModel: 'MultishipModule/parcelFormViewModel'
        })
    },
    methods: {
        ...mapMutations({
            addShipment: 'MultishipModule/addShipment',
            setIsAddingShipment: 'MultishipModule/setIsAddingShipment'
        }),

        ...mapActions({
            updateShipmentData: 'MultishipModule/updateShipmentData',
            resetFormData: 'MultishipModule/resetFormData'
        }),

        closeClick: function () {
            this.closeDialog()
        },

        saveAndNewClick: function () {
            this.processShipment()
            this.resetForms()
        },

        saveAndCloseClick: function () {
            this.processShipment()
            this.closeDialog()
        },

        resetForms: function () {
            this.resetFormData()
            this.$refs.addressForm.reset()
        },

        processShipment: function () {
            let shipment = ShipmentHelper.buildShipment(this.parcelFormViewModel, this.sourceAddress, this.destinationAddressFormViewModel)
            this.addShipment(shipment) // Mutation
            this.updateShipmentData(shipment) // Action
            this.scrollToTop()
        },

        closeDialog: function () {
            this.setIsAddingShipment(false)
        },

        scrollToTop: function () {
            let options = {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic'
            }
            this.$vuetify.goTo(0, options)
        }
    }
}
</script>

<style>

</style>
