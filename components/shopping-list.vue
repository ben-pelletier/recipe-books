<template>
    <v-navigation-drawer
      disable-resize-watcher
      app
      right
      v-model="open"
    >
      <v-list>
         <v-list-item>
          <v-list-item-content>
            <h1>Selected Recipes</h1>
            <p v-if="recipes.length == 0"> To add recipes click the "+" button on a recipe tile.</p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(recipe, i) in recipes"
          :key="recipe.id"
          link
        >
          <v-list-item-icon>
              <v-btn @click="remove(i)" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{recipe.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
           <v-btn v-if="recipes.length > 0" @click="generateList()" width="100%" color="info">Generate List</v-btn>
        </v-list-item>
        <v-list-item class="mt-8" v-if="recipes.length > 0">
          <v-list-item-content>
             <h1>Shopping List</h1>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-row>
        <v-col class="ml-2" md="12">
          <div>
            <ul>
              <li v-for="item in shoppingList" :key="item.id">{{item}}</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-navigation-drawer>
</template>

<script>
export default {
  /* watch: {
    shoppingList () {
      if (this.shoppingList.length > 0) {
        this.open = true
      } else {
        this.open = false
      }
    } 
  }, */
  computed: {
    open: {
      get () {
        return this.$store.state.shopping.open
      },
      set (val) {
        this.$store.commit('shopping/toggleOpen', val)
      }
    },
    recipes () {
        return this.$store.state.shopping.recipes
    },
    shoppingList () {
      return this.$store.state.shopping.list
    }
  },
  methods: {
    generateList () {
      this.$store.dispatch('shopping/generateList')
    },
    remove (id) {
      this.$store.dispatch('shopping/removeRecipe', id)
    }
  }
}
</script>
