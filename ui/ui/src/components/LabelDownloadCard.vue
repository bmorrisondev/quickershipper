<template>
    <div>
        <v-layout>
            <v-flex>
                <v-card class="remove-shadow">
                    <v-layout row wrap v-if="$vuetify.breakpoint.mdAndUp">
                        <v-flex md6 offset-md1>
                            <v-img :src="shipment.epShipment.postage_label.label_url"
                                class="img-label"
                                contain></v-img>
                        </v-flex>
                        <v-flex md4>
                            <v-layout column>
                                <v-btn color="info" @click.native="downloadLabel">Download</v-btn>
                                <!-- <v-btn flat>Email to Me</v-btn>
                                <v-btn flat>Send to Printer</v-btn> -->
                                <v-btn flat>Start Over</v-btn>
                                <v-btn flat>Create Multiple Labels</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap v-if="$vuetify.breakpoint.smAndDown">
                        <v-layout column>
                            <v-btn color="info" @click.native="downloadLabel">Download</v-btn>
                            <!-- <v-btn flat>Email to Me</v-btn>
                            <v-btn flat>Send to Printer</v-btn> -->
                            <v-btn flat>Start Over</v-btn>
                            <v-btn flat>Create Multiple Labels</v-btn>
                        </v-layout>
                    </v-layout>
                    <v-layout row wrap  v-if="$vuetify.breakpoint.smAndDown">
                        <v-flex>
                            <v-img :src="shipment.epShipment.postage_label.label_url"
                                class="img-label"
                                contain></v-img>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

let moduleName = 'SingleshipModule'

export default {
    name: 'LabelDownloadCard',
    computed: {
        ...mapGetters(moduleName, [
            'shipment'
        ]),
        labelDownloadName: function () {
            return `${this.shipment.destinationAddress.name}.png`
        }
    },
    methods: {
        downloadLabel: function () {
            window.open(this.shipment.epShipment.postage_label.label_url, '_blank')
        }
    }
}
</script>

<style>
.img-label {
    margin: 20px;
    max-height: 600px;
}
.download-label-link {
    visibility: hidden;
    height: 0;
}
.remove-shadow {
    box-shadow: none !important;
    margin-bottom: 10px !important;
}
</style>
