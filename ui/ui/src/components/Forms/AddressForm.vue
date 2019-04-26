<template>
    <v-layout row wrap>
        <v-flex>
            <v-form v-model="valid" :ref="formRef">
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="address.name"
                                label="Name"
                                :disabled="disabled"
                                :color="'#FF9833'"
                                :rules="[v => !!v || 'Name is required']"
                                required></v-text-field>
                        </v-flex>

                        <v-flex xs12 v-if="isEmailRequired">
                            <v-text-field
                                v-model="address.emailAddress"
                                label="Email Address"
                                :disabled="disabled"
                                :color="'#FF9833'"
                                :rules="emailRules"
                                required></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                v-model="address.street1"
                                label="Street Address"
                                :disabled="disabled"
                                :color="'#FF9833'"
                                :rules="[v => !!v || 'Street Address is required']"
                                required></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                v-model="address.street2"
                                label="Apartment, studio, or floor"
                                :disabled="disabled"
                                :color="'#FF9833'"></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-text-field
                                v-model="address.city"
                                label="City"
                                :disabled="disabled"
                                :color="'#FF9833'"
                                :rules="[v => !!v || 'City is required']"
                                required></v-text-field>
                        </v-flex>

                        <v-flex sm2>
                            <v-autocomplete
                                v-model="address.state"
                                :items="states"
                                label="State"
                                :disabled="disabled"
                                :color="'#FF9833'"
                                :rules="[v => !!v || 'State is required']"
                                required>
                                    <v-slide-x-reverse-transition
                                        slot="append-outer"
                                        mode="out-in">
                                    </v-slide-x-reverse-transition>
                            </v-autocomplete>
                        </v-flex>

                        <v-flex sm4>
                            <v-text-field
                                v-model="address.zip"
                                type="tel"
                                pattern="[0-9]*"
                                label="Zip"
                                :disabled="disabled"
                                :color="'#FF9833'"
                                :rules="[v => !!v || 'Zip Code is required']"
                                mask="#####"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import UsStates from '@/resources/usStates.json'

export default {
    name: 'AddressForm',
    props: {
        address: Object,
        disabled: Boolean,
        isEmailRequired: Boolean,
        formRef: String
    },
    data: function () {
        return {
            states: [],
            valid: true,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    created: function () {
        this.loadStates()
    },
    methods: {
        loadStates: async function () {
            for (let i = 0; i < UsStates.length; i++) {
                this.states.push(UsStates[i].alphacode)
            }
        }
    }
}
</script>
