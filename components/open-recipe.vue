<template>
    <div>
        <v-row>
            <v-col md="10">
                <h1>{{title}}</h1>
            </v-col> 
            <v-col md="2" align="right">
                <v-btn
                    @click="edit()"
                    icon
                    color="white"
                    >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-col> 
        </v-row>
        <v-row>    
            <v-col md="12">
                <div v-html="content" />
            </v-col> 
        </v-row>
    </div>
</template>
<script>
export default {
    computed: {
        id () { return this.$store.state.recipes.open.ref },
        title () { return this.$store.state.recipes.open.title },
        content () { return this.$store.state.recipes.open.content }
    },
    methods: {
        edit () {
            this.$store.commit('recipes/resetForm')
            this.$store.commit('recipes/setId', this.id)
            this.$store.dispatch('recipes/editRecipe', this.id)
            this.$router.push({ path: `/book/${this.$route.params.id}/form` }) 
        }
    }
}
</script>
