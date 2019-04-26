<template>
    <v-navigation-drawer v-model="isDrawerVisible" absolute temporary>
        <v-list class="pa-1">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>John Leider</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile v-for="item in items" :key="item.title" @click="">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "Drawer",
    data () {
        return {
            drawerState: null,
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'isDrawerVisible'
        ])
    },
    watch: {
        drawerState: {
            handler: function(newValue, currentValue) {
                console.log(newValue, oldValue)
                this.setIsDrawerVisible(newValue)
            }
        }
    },
    methods: {
        ...mapMutations([
            'setIsDrawerVisible'
        ])
    }
}
</script>

<style>

</style>
