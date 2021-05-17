<template>
  <v-app id="inspire" dark>
    <v-app-bar
      app
      flat
    >
      <v-container class="py-0 fill-height">
        
        <v-icon @click="goHome()" class="mr-2">mdi-home</v-icon>
        
        <v-toolbar-title v-text="title" />

        <v-spacer></v-spacer>
        <v-badge
          :value="(shoppingLength > 0)"
          color="blue"
          :content="shoppingLength"
        >
          <v-icon @click="open = !open" class="mr-2">mdi-cart</v-icon>
        </v-badge>
        
        
        <!-- <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
      </v-container>
      
    </v-app-bar>
    <shoppingList />
    <v-main>

      <v-container>
        <nuxt />
        <br>
        <br>
        <br>
        <snackbar />
      </v-container>
    </v-main>
  <!-- <v-bottom-navigation align="left" class="shopping-bar" fixed>
      <recipeTile tid="2" title="Tet" />
  </v-bottom-navigation> -->
  
  
  </v-app>
</template>

<script>
import recipeTile from '~/components/recipe-tile.vue'
import shoppingList from '~/components/shopping-list.vue'
import snackbar from '~/components/snackbar.vue'

export default {
  components: {
    recipeTile,
    shoppingList,
    snackbar
  },
  data () {
    return {
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'My Recipe Collection'
    }
  },
  computed: {
    leftMenu: { 
      get () { return this.$store.state.application.leftMenu },
      set () {
      }
    },
    open: {
      get () {
        return this.$store.state.shopping.open
      },
      set (val) {
        this.$store.commit('shopping/toggleOpen', val)
      }
    },
    shoppingLength () { return this.$store.state.shopping.recipes.length }
  },
  methods: {
    goHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
body {
  background: #121212;
}
.shopping-bar {
  height: 120px !important;
}
</style>