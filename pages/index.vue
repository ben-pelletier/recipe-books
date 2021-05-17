<template>
  <div>
    <v-alert type="info">PRO TIP! Click the plus button on recipes to add them to your shopping list. Than you can compile a full list of ingredients you need to buy.</v-alert>
    
    <search/>

    <v-row>
      <v-col xs="12" align="center">
        <h1>Open a recipe book</h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="book in books" :key="book.id">
        <bookTile :id="book.ref" :title="book.title" :image="book.image"/>
      </v-col>
      <!--- add new square --->
      <v-col cols="12" sm="6" md="3">
        <bookTile :addSquare="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import bookTile from '~/components/book-tile.vue'
import search from '~/components/search.vue'

export default {
  computed: {
    books () { return this.$store.state.books.books }
  },
  async beforeMount () {
    this.$store.dispatch('books/getBooks')
    this.$store.commit('search/resetSearchText')
  },
  components: {
    bookTile,
    search
  }
}
</script>
