<template>
    <div>
        <search/>
        <center v-if="results.length > 0"> {{results.length}} results for <i>{{searchText}}</i></center>
        <v-row>
            <v-col v-for="recipe in results" :key="recipe.ref" md="3"> 
                <recipeTile :id="recipe.id" :title="recipe.title" :image="recipe.image" @openRecipe="openRecipe(recipe)"/>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import recipeTile from '~/components/recipe-tile.vue'

export default {
    components: {
        recipeTile
    },
    mounted () {
        // this.$store.dispatch('search/getRecipes')
    },
    methods: {
        async openRecipe (recipe) {
          await this.$store.dispatch('recipes/openRecipeSearch', { book: recipe.book, id: recipe.ref })
          this.$router.push({ path: `/book/${recipe.book}` })
        }
    },
    computed: {
        searchText () { return this.$store.state.search.text },
        results () { return this.$store.state.search.results }
    }
}
</script>
