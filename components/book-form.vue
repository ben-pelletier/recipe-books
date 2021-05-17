<template>
    <v-card class="card" elevation="2" align="center">
        <v-img
            class="default-img"
            height="50"
            :src="image"
            ></v-img>
        <v-row class="ml-1 mr-1">
            <v-col class="mt-2" md="12">
                <v-text-field
                    height="12"
                    class="small-text-field"
                    v-model="title"
                    label="Title"
                    required
                ></v-text-field>
                <v-text-field
                    height="12"
                    class="small-text-field"
                    v-model="image"
                    label="Image"
                    required
                ></v-text-field>
                <v-btn v-if="factor == 'new'" @click="close()">close</v-btn>
                <v-btn v-else-if="factor == 'edit'" color="error" @click="remove()">delete</v-btn>
                <v-btn @click="save()" color="success">save</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    props: {
      factor: String,
    },
    computed: {
        title: {
            get () {
                return this.$store.state.books.form.title
            },
            set (val) {
                this.$store.commit('books/title', val)
            }
        },
        image: {
            get () {
                return this.$store.state.books.form.image
            },
            set (val) {
                this.$store.commit('books/image', val)
            }
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        remove () {
            let confirm = window.confirm("Are you sure you want to delete this book and all of it's recipes.");
        
            if (confirm) {
                this.$emit('remove')
            }
        },
        save () {
            if (this.factor == 'new') {
                this.$store.dispatch('books/createBook')
            } else {
                this.$store.dispatch('books/updateBook')
                this.close()
            }
        }
    }
}
</script>
<style scoped>
.card {
    margin: 2px;
}
.default-img  {
    background: url('https://i.stack.imgur.com/y9DpT.jpg');
    background-position: center;
}
.small-text-field {
    /* height: 30px;
    font-size: 20pt;
    */
}
</style>