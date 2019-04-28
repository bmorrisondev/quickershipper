<template>
    <tr>
        <td>{{ descriptionCol }}</td>
        <td> {{ dimsCol }}</td>

        <td v-if="shipment.isLoading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </td>
        <td v-else>{{ rateCol }}: ${{ selectedRate.rate }}</td>

        <!-- <td v-if="shipment.isLoading">

        </td> -->

        <td v-if="shipment.isLoading">
            <a href="#" class="disabled-link">Rm</a> |
            <a href="#" class="disabled-link">Ed</a> |
            <a href="#" class="disabled-link">Dl</a>
        </td>

        <td v-else-if="shipment.isPurchaseComplete">
            <a href="#" class="disabled-link">Rm</a> |
            <a href="#" class="disabled-link">Ed</a> |
            <a href="#" @click="downloadLabel">Dl</a>
        </td>

        <td v-else>
            <a href="#" @click="onRemove_Click()">Rm</a> |
            <a href="#" @click="onEdit_Click()">Ed</a> |
            <a href="#" class="disabled-link">Dl</a>
        </td>

        <!-- Remove User Dialog -->
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
                    <v-btn color="primary" flat @click="onRemoveShipmentDialog_Cancel()">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" flat @click="onRemoveShipmentDialog_Remove()">
                        Remove
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Edit User Dialog -->
        <!-- <v-dialog v-model="isEditing" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Edit User
                </v-card-title>

                <v-card-text>
                    <UserForm :user="user" :isEditing="true" />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer> </v-spacer>
                    <v-btn color="primary" flat @click="onEditUserDialog_Cancel()">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" flat @click="onEditUserDialog_Save()">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </tr>
</template>

<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'
import Utilities from '@/helpers/Utilities.js'
// import UserForm from '@/components/UserForm.vue'

let moduleName = 'MultishipModule'

export default {
    name: 'MultishipTableRow',
    props: {
        shipment: Object,
        disabled: Boolean
    },
    components: {
        // UserForm
    },
    data: () => {
        return {
            isRemoving: false,
            isEditing: false
        }
    },
    computed: {
        descriptionCol: function () {
            return `${this.shipment.destinationAddress.name} @ ${this.shipment.destinationAddress.city}, ${this.shipment.destinationAddress.state}`
        },

        dimsCol: function () {
            let dimensions = ''
            dimensions += `${this.shipment.parcel.heightIn}in x `
            dimensions += `${this.shipment.parcel.widthIn}in x `
            dimensions += `${this.shipment.parcel.lengthIn}in, `

            let lbsAndOz = Utilities.ozToLbsAndOz(this.shipment.parcel.weightOz)
            dimensions += `${lbsAndOz.lbs}lbs `
            dimensions += `${lbsAndOz.oz}oz `

            return dimensions
        },

        rateCol: function () {
            let simpleRateString = `${this.selectedRate.carrier} ${this.selectedRate.service}`
            return simpleRateString
        },

        selectedRate: function () {
            var key = { id: this.shipment.selectedRateId }
            return _.find(this.shipment.epShipment.rates, key)
        }
    },
    methods: {
        ...mapMutations({
            removeShipment: `${moduleName}/removeShipment`
        }),

        downloadLabel: function () {
            window.open(this.shipment.epShipment.postage_label.label_url, '_blank')
        },

        onRemove_Click: function () {
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
    // methods: {
    //     ...mapMutations(moduleName, [
    //         'removeUser',
    //         'updateUser'
    //     ]),

    //     onEdit_Click: function() {
    //         this.isEditing = true;
    //     },

    //     onEditUserDialog_Cancel: function() {
    //         this.isEditing = false;
    //     },

    //     onEditUserDialog_Save: function() {
    //         this.isEditing = false;
    //         this.updateUser(this.user);
    //     }
    // }
}
</script>

<style>
.disabled-link {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>
