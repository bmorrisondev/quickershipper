<template>
    <v-layout row wrap>
        <v-flex>
            <v-form ref="parcelForm" v-model="dataSource.isFormValid">
                <v-container>
                    <v-layout row wrap>
                        <h3 class="headline mb-0" v-if="parcelSizeTitle">{{ parcelSizeTitle }}</h3>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex sm4>
                            <v-text-field v-model="dataSource.heightIn"
                                type="tel"
                                pattern="[0-9]*"
                                label="Height"
                                :disabled="disabled"
                                mask="##"
                                :rules="[v => !!v || 'Height is required']"
                                suffix="in"
                                required></v-text-field>
                        </v-flex>

                        <v-flex sm4>
                            <v-text-field v-model="dataSource.widthIn"
                                type="tel"
                                pattern="[0-9]*"
                                label="Width"
                                :disabled="disabled"
                                mask="##"
                                :rules="[v => !!v || 'Width is required']"
                                suffix="in"
                                required></v-text-field>
                        </v-flex>

                        <v-flex sm4>
                            <v-text-field v-model="dataSource.lengthIn"
                                type="tel"
                                pattern="[0-9]*"
                                label="Length"
                                :disabled="disabled"
                                mask="##"
                                :rules="[v => !!v || 'Length is required']"
                                suffix="in"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <h3 class="headline mb-0" v-if="parcelWeightTitle">{{ parcelWeightTitle }}</h3>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex sm6>
                            <v-text-field v-model="dataSource.formLbs"
                                type="tel"
                                pattern="[0-9]*"
                                label="Pounds"
                                :disabled="disabled"
                                mask="##"
                                :rules="[v => validateLbsAndOz() || 'Total weight cannot be 0oz']"
                                suffix="lbs"
                                @input="$refs.parcelForm.validate()"></v-text-field>
                        </v-flex>

                        <v-flex sm6>
                            <v-text-field v-model="dataSource.formOz"
                                type="tel"
                                pattern="[0-9]*"
                                label="Ounces"
                                :disabled="disabled"
                                mask="##"
                                :rules="[v => validateLbsAndOz() || 'Total weight cannot be 0oz']"
                                suffix="oz"
                                @input="$refs.parcelForm.validate()"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'ParcelForm',
    props: {
        dataSource: Object,
        parcelSizeTitle: String,
        parcelWeightTitle: String,
        disabled: Boolean
    },
    methods: {
        // validateForm: function() {
        //     $refs.parcelForm.validate()
        // },
        validateLbsAndOz: function () {
            let lbs = 0
            let oz = 0
            if (this.dataSource.formOz) {
                oz = parseInt(this.dataSource.formOz)
            }
            if (this.dataSource.formLbs) {
                lbs = parseInt(this.dataSource.formLbs)
            }

            return lbs + oz > 0
        }
    }
}
</script>

<style>

</style>
