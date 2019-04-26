<template>
    <v-toolbar color="rgb(0,0,0,0)" elevation-0 class="navbarstyle">
        <v-toolbar-side-icon @click="toggleMenu" color="white" flat></v-toolbar-side-icon>
                <img src="@/assets/temp-logo-1-light.png" class="nav-logo" />
        <v-toolbar-items>
            <!-- <v-btn flat :color="'#FF9833'" @click="$router.push('/')">Singleship</v-btn>
            <v-btn flat :color="'#FF9833'" @click="$router.push('/multiship')">Multiship</v-btn> -->
            <!-- <v-btn flat>Link Three</v-btn> -->
            <v-toolbar-title>
            </v-toolbar-title>
        </v-toolbar-items>
        <v-menu :nudge-width="100" :nudge-right="15" :nudge-bottom="55" v-model="isMenuVisible">
            <v-list two-line>
<!--                <v-subheader>Actions</v-subheader>
                <v-list-tile @click="$router.push('/')">
                    <v-list-tile-avatar>
                        <v-avatar size="32px" tile>
                            <img src="@/assets/icons/package-24.png">
                        </v-avatar>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Change My Info</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider></v-divider>

                <v-subheader>Shipping Mode</v-subheader>
                <v-list-tile @click="$router.push('/')">
                    <v-list-tile-avatar>
                        <v-avatar size="32px" tile>
                            <img src="@/assets/icons/package-24.png">
                        </v-avatar>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Singleship Mode</v-list-tile-title>
                        <v-list-tile-sub-title>The easiest way to ship a single package.</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="$router.push('/multiship')">
                    <v-list-tile-avatar>
                        <v-avatar size="32px" tile>
                            <img src="@/assets/icons/package-24.png">
                        </v-avatar>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Multiship Mode</v-list-tile-title>
                        <v-list-tile-sub-title>Create a batch of shipments quickly and easily.</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile> -->

                <!-- <v-divider></v-divider> -->

                <v-list-tile @click="$router.push('/')">
                    <v-list-tile-avatar>
                        <v-avatar size="32px" tile>
                            <img src="@/assets/icons/package-24.png">
                        </v-avatar>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Send Feedback</v-list-tile-title>
                        <v-list-tile-sub-title>We appreciate any feedback to make Quickershipper better!</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'MainNav',
    data: function() {
        return {
            isSheetVisible: false,
            isMenuVisible: false
        }
    },
    methods: {
        ...mapActions([
            'toggleDrawer'
        ]),

        toggleSheet: function() {
            this.isSheetVisible = true
        },

        toggleMenu: function() {
            this.isMenuVisible = true
        }
    }
}
</script>

<style>
.navbarstyle {
  background-image: linear-gradient(to left, #F3701E, #FF9833)
}
.nav-logo {
  max-height: 40px;
}
.remove-shadow {
    box-shadow: none !important;
    margin-bottom: 10px !important;
}
</style>
