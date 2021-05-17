<template>
    <div>   
        <!--- add square --->
        <div v-if="addSquare || edit">
            <div v-if="edit">
                <bookForm factor="edit" @remove="remove()" @close="toggleEdit()"/>
            </div>
            <div v-else-if="!addActive">
                <v-card elevation="2" align="center" v-ripple>
                    <div class="add-new-card pt-5" @click="toggleAddNew()">
                        <v-icon size="100">mdi-plus</v-icon>
                        <p>Add New Book</p>
                    </div>
                </v-card>
            </div>
            <div v-else>
                <bookForm factor="new" @close="toggleAddNew()"/>
            </div>
        </div>
        <!-- content square -->
        <div v-else>
            <v-card elevation="2" align="center" v-ripple>
                <v-img
                class="pointer"
                @click="goToBook(id)"
                height="140"
                :src="image"
                ></v-img>
                <v-row class="mt-1">
                    <v-btn
                        class="mt-2"
                        icon
                        color="white"
                        @click="editBook(id)"
                        >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <p @click="goToBook(id)" class="mt-3 pointer" align="center">{{cutOff(title, 20)}}</p>
                </v-row>
            </v-card>
        </div>
        
    </div>
</template>
<script>

import bookForm from '~/components/book-form.vue'
export default {
    data () {
        return {
            edit: false
        }
    },
    components: {
        bookForm
    },
    props: {
        addSquare: Boolean,
        title: String,
        id: String,
        image: String
    },
    computed: {
        addActive: {
             get () {
                return this.$store.state.books.add
            }, 
            set (val) {
                this.$store.commit('books/addStatus', val)
            }
        }
    },
    methods: {
        toggleAddNew () {
            this.$store.commit('books/resetForm')
            this.addActive = !this.addActive
        },
        toggleEdit () {
            this.edit = !this.edit
        }, 
        editBook () {
            this.$store.commit('books/title', this.title)
            this.$store.commit('books/image', this.image)
            this.$store.commit('books/setId', this.id)
            this.toggleEdit()
        },
        goToBook (id) {
            this.$router.push({ path: `/book/${id}` })       
        },
        remove () {
            this.$store.dispatch('books/removeBook', this.id)
            this.toggleEdit()
        }
    }
}
</script>
<style scoped>
div {
    width: 100%;
    height: 200px;
}
.add-new-card {
    opacity: .25;
    cursor: pointer;
}
p {
    font-size: 16pt;
}
</style>