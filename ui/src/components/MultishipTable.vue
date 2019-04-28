<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="shipments"
            :rows-per-page-items="[100,250,500]"
            class="elevation-1">
            <template slot="items" slot-scope="props">
                <MultishipTableRow :shipment="props.item"/>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MultishipTableRow from '@/components/MultishipTableRow.vue'

export default {
    name: "MultishipTable",
    components: {
        MultishipTableRow
    },
    props: {
        shipments: Array,
        disabled: Boolean
    },
    data: () => {
        return {
            headers: [
                { text: 'Description', value: 'description' },
                { text: 'Dims', value: 'dims' },
                { text: 'Rate', value: 'rate', sortable: false},
                { text: 'Actions', value: 'actions', sortable: false}
            ]
        }
    }
    // computed: {
    //     ...mapGetters(moduleName, [
    //         'shipments'
    //     ])
    // }
}
</script>
