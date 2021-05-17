<template>
    <v-card elevation="2" align="center" v-ripple>
        <v-img
            class="pointer default-img"
            @click="openRecipe()"
            height="50"
            :src="image"
        ></v-img>
        <div>
            <v-card-title>
                <div class="pointer" :title="title" @click="openRecipe()">{{cutOff(title, 17)}}</div>
                <v-spacer></v-spacer>
                <v-btn
                    class="justify-right"
                    icon
                    color="white"
                    @click="addToShoppingList()"
                    >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
               
            </v-card-title>
            <!-- <p @click="openRecipe(id)" class="mt-3 pointer" align="center">{{title}}</p> -->
           
    </div>
    </v-card>
</template>
<script>
export default {
   props: {
       title: String,
       image: String,
       id: String
   },
   methods: {
       addToShoppingList () {
           this.$store.dispatch('shopping/add', this.id)
       },
       openRecipe () {
           this.$emit('openRecipe')
       }
   }
}
</script>
<style scoped>
.default-img  {
    background: url('https://downtowncl.org/wp-content/uploads/2016/08/144_Food-Drink-Generic-Logo.jpg');
    background-position: center;
    background-size: contain;
}
</style>