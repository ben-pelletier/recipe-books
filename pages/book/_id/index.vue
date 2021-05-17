<template>
    <div>
        <v-row>
            <v-col md="3">
                <h1 class="mb-2">{{bookTitle.title}}</h1>
                <div class="recipe-list-bg">
                    <div v-for="recipe in recipes" :key="recipe.ref">
                        <recipeTile :id="recipe.ref" :title="recipe.title" :image="recipe.image" @openRecipe="openRecipe(recipe.ref)"/>
                        <br>
                    </div>
                    <!-- add new -->
                    <v-btn color="success" width="100%" @click="newRecipe()">
                        Add a Recipe
                    </v-btn>
                </div>
            </v-col>
            <!-- right side -->
            <v-col class="recipe-bg" md="9">
                <!-- if recipe is open -->
                <div v-if ="recipeOpen">
                    <recipe/>
                </div>
                <div v-else>
                    <div v-if="recipes.length > 0">
                        <center>
                            <div class="helper-text-bg mt-10">
                                <span class="helper-text"> Click a recipe on the left </span>
                            </div>
                            <img class="arrow" src="~/assets/recipe-arrow.png">
                        </center>
                    </div>
                    <div v-else>
                        <center> 
                            <span class="helper-text">Their are no recipes in this book yet </span>
                        </center>
                    </div>
                </div>       
            </v-col>
        </v-row>
    </div>
</template>
<script>
import recipeTile from '~/components/recipe-tile.vue'
import recipe from '~/components/open-recipe.vue'

export default {
    components: {
        recipeTile,
        recipe
    },
    data () {
        return {
            recipeOpen: false
        }
    },
    async beforeMount () {
        await this.$store.dispatch('recipes/getRecipes', this.bookId)
        this.recipeOpen = false
        if (Object.entries(this.$store.state.recipes.open).length > 0) {
            this.recipeOpen = true
        }
    },
    beforeDestroy  () {
        this.$store.commit('application/toggleMenu', false)
        this.recipeOpen = false
        this.$store.commit('recipes/setOpen', [])
    },
    computed: {
        bookTitle () {
            return this.$store.getters['books/getBookById'](this.$route.params.id)  
        },
        bookId () { return this.$route.params.id},
        recipes () { return this.$store.state.recipes.recipes },
        open () { return this.$store.state.recipes.open }
    },
    methods: {
        newRecipe () {
            this.$store.commit('recipes/resetForm')
            this.$router.push({ path: `/book/${this.$route.params.id}/form` }) 
        },
        openRecipe (id) {
            this.recipeOpen = true
            this.$store.dispatch('recipes/openRecipe', id)
        }
    }
}
</script>
<style scoped>
img {
  margin-top: 50px;
  margin-left:50px;
  opacity: .5;
  width: 255px;
}

.helper-text-bg {
    background: #121212;
}
.recipe-bg {
}
.recipe-list-bg {
}
.helper-text {
    opacity: .5;
    font-size: 35px;
    margin-top: -40px;
}
.arrow {
    transform: rotate(-30deg);
    margin-left: -20px;
    margin-top: -20px;
}

</style>