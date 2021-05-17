<template>
    <div>
        <v-row>
        <v-col xs="12" align="center">
            <h1>Search Recipes</h1>
        </v-col>
        </v-row>
        <v-row>
        <v-col xs="12" align="center">
            <v-text-field 
                v-model="search"
                @keyup.enter="doSearch()" 
                label="Search all recipes across multiple books..." 
                solo>
            </v-text-field>
        </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    computed:{
        search: {
            get () {
                 return this.$store.state.search.text 
            },
            set (value) { 
                this.$store.dispatch('search/set', value) 
            }
        }
    },
    methods: {
        doSearch () {
            if (this.$route.path !== '/search') {
                this.$router.push({ path: 'search' })       
            }
            this.$store.dispatch('search/getRecipes')
        }
    }
}
</script>