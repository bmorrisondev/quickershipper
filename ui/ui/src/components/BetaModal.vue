<template>
    <v-dialog v-model="isDisplayed"
        persistent
        max-width="500">
        <v-card>
            <v-card-title class="headline">Beta</v-card-title>
            <v-card-text>
                <v-container>
                    <p>{{ warningText }}</p>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="'#FF9833'"
                        round
                        dark
                        @click="isDisplayed = false">I Agree</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'BetaModal',
    data: function () {
        return {
            isDisplayed: true,
            warningText: `This software is in beta. By acknowledging this warning,
                you agree that you are using this software at your own risk and
                that the developer may not be held liable for any damages or
                unexpected outcomes of using this software. If you do not
                agree, please leave this site.`
        }
    }
}
</script>

<style>

</style>
