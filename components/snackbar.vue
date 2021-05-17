<template>
    <div>
        <v-snackbar
            :color="color"
            v-model="active"
            :timeout="timeout"
        >
        {{text}}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>

export default {
   data () {
       return {
           timeout: 3000
       }
   },
   computed: {
       text () {
            return this.$store.state.application.snackbar.text
       },
       color () {
            return this.$store.state.application.snackbar.color
       },
       active: {
           get () {
               return this.$store.state.application.snackbar.active
           },
           set (val) {
               this.$store.commit('application/setSnackbarStatus', val)
           }
       }
   }
}
</script>
