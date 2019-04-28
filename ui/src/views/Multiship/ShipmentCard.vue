<template>
    <v-card>
        <!-- <v-card-title primary-title>
            <div class="headline">
                {{ shipment.destinationAddress.name }}
            </div>
        </v-card-title> -->

        <v-card-text>
            <div class="headline">
                {{ shipment.destinationAddress.name }}
            </div>
            <div>{{ friendlyDimensions }}</div>
            <div v-if="!(shipment.isLoading)">
                {{ selectedRate.carrier }} {{ selectedRate.service }}: ${{ selectedRate.rate }}
            </div>
        </v-card-text>

        <v-card-actions>
            <span v-if="shipment.isLoading">
                <v-progress-circular :size="20" indeterminate color="primary"></v-progress-circular>
            </span>
            <span v-if="shipment.isPurchaseComplete">
                <v-icon color="green">check_circle_outline</v-icon>
            </span>
            <v-spacer></v-spacer>
            <v-btn v-if="!shipment.isPurchaseComplete" icon @click="removeClick()">
                <v-icon medium >cancel</v-icon>
            </v-btn>
            <v-btn v-if="!shipment.isPurchaseComplete" icon @click="alert('edit')">
                <v-icon medium >edit</v-icon>
            </v-btn>
            <v-btn v-if="!shipment.isPurchaseComplete" icon @click="downloadLabel()">
                <v-icon medium >save_alt</v-icon>
            </v-btn>
        </v-card-actions>

        <!-- Remove Shipment Dialog -->
        <v-dialog v-model="isRemoving" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Remove Shipment
                </v-card-title>

                <v-card-text>
                    Shipment to <b>{{shipment.destinationAddress.name}}</b> will be removed from the batch. There is no undo for this action. Are you sure?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer> </v-spacer>
                    <v-btn color="primary" flat @click="onRemoveShipmentDialog_Cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" flat @click="onRemoveShipmentDialog_Remove">
                        Remove
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import Utilities from "@/helpers/Utilities"

export default {
    name: 'ShipmentCard',
    props: {
        shipment: Object,
        disabled: Boolean
    },
    data: function () {
        return {
            isRemoving: false,
            isEditing: false
        }
    },
    computed: {
        friendlyShipmentDesc: function () {
            return `${this.shipment.destinationAddress.name} @ ${this.shipment.destinationAddress.city}, ${this.shipment.destinationAddress.state}`
        },

        friendlyDimensions: function () {
            let dimensions = ''
            dimensions += `${this.shipment.parcel.heightIn}in x `
            dimensions += `${this.shipment.parcel.widthIn}in x `
            dimensions += `${this.shipment.parcel.lengthIn}in, `

            let lbsAndOz = Utilities.ozToLbsAndOz(this.shipment.parcel.weightOz)
            dimensions += `${lbsAndOz.lbs}lbs `
            dimensions += `${lbsAndOz.oz}oz `

            return dimensions
        },

        selectedRate: function () {
            var key = { id: this.shipment.selectedRateId }
            return _.find(this.shipment.epShipment.rates, key)
        }
    },
    methods: {
        ...mapMutations({
            removeShipment: 'MultishipModule/removeShipment'
        }),

        downloadLabel: function () {
            window.open(this.shipment.epShipment.postage_label.label_url, '_blank')
        },

        removeClick: function () {
            this.isRemoving = true
        },

        onRemoveShipmentDialog_Cancel: function () {
            this.isRemoving = false
        },

        onRemoveShipmentDialog_Remove: function () {
            this.isRemoving = false
            this.removeShipment(this.shipment)
        }
    }
}
</script>

<style>

</style>
