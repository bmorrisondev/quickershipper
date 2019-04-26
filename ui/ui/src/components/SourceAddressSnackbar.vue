<template>
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
                @click="okClick">OK</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: 'SourceAddressSnackbar',
    props: {
        isSnackbarDisplayed: Boolean,
        changeInfoClick: Function,
        okClick: Function
    }
}
</script>

<style>

</style>
