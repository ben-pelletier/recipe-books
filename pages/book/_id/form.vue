<template>
  <div>
    <v-row>
      <v-col md="12">
        <h1>
          <span v-if="isNew">Create New Recipe</span>
          <span v-else>Editing {{title}}</span>
        </h1>
        <br>
        <v-select
          :items="books"
          item-text="title"
          item-value="ref"
          v-model="book"
          label="Book"
          outlined>
        </v-select>
        <v-text-field
          outlined
          height="20"
          class="small-text-field"
          v-model="title"
          label="Title"
          required>
        </v-text-field>
        <v-text-field
          outlined
          height="20"
          class="small-text-field"
          v-model="image"
          label="Thumbnail Image Link"
          required>
        </v-text-field>
        <v-text-field
          outlined
          height="20"
          class="small-text-field"
          v-model="ingredients"
          label="Shopping List Ingredients"
          required>
        </v-text-field>
        <div class="example">
          <quill-editor
            class="editor"
            ref="myTextEditor"
            :content="content"
            :options="editorOption"
            @change="onEditorChange($event)"
          />
        
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12" align="right">
        <v-btn v-if="!isNew" color="error" @click="remove()">Delete</v-btn>
        <v-btn class="ml-2" color="success" @click="save()">Save</v-btn>
      </v-col>
    </v-row>
    <br /><br /><br />
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: 'newrecipe',
    title: 'Theme: bubble',
    components: {
      quillEditor
    },
    data() {
      return {
        editorOption: {
          theme: 'bubble',
          placeholder: "every contentï¼support html",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          }
        },
        contentBackup: `
          <h1 class="ql-align-center"><s class="ql-font-serif">I am bubble example!</s></h1><p><br></p><p><span class="ql-font-serif">Whenever you play the game of thrones, you either win or die. There is no middle ground.</span></p><p><strong class="ql-font-serif">Some war against sword and spear to win, and the others the crow and the paper to win.</strong></p><p><br></p><p><u class="ql-font-serif">Dead history is write in ink, the living sort in blood.</u></p><p><em class="ql-font-serif">They're only numbers. Numbers on paper. Once you understand that, it's easy to make them behave.</em></p><p><br></p><p><span class="ql-font-serif">Every time we deal with an enemy, we create two more.</span></p><p><span class="ql-font-serif">So the king has decreed. The small council consents.</span></p><p><br></p><p><span class="ql-font-serif">Chaos not is a pit, chaos is a ladder.</span></p><p><span class="ql-font-serif">A chain needs all sorts of metals, and a land needs all sorts of people.</span></p><p><br></p><p><span class="ql-font-serif">When the snows fall and the white winds blow, the lone wolf dies, but the pack survives.</span></p>
        `
      }
    },
    mounted () {
      if (this.isNew) {
        this.book = this.$route.params.id
      }
    },
    methods: {
      onEditorChange({ html, text }) {
        this.content = html
      },
      remove () {
        let confirm = window.confirm('Are you sure you want to delete this recipe?')
        if (confirm) {
          this.$store.dispatch('recipes/removeRecipe', this.id)
          this.$router.push({ path: `/book/${this.book}` })
        }
      },
      save () {
        if (this.isNew) {
          this.$store.dispatch('recipes/createRecipe')
        } else {
          this.$store.dispatch('recipes/updateRecipe')
          this.$store.dispatch('recipes/openRecipe', this.id)
        }
        this.$router.push({ path: `/book/${this.book}` })
      }
    },
    computed: {
      isNew () {
        let val = true 
        if (this.id !== 0) {
          val = false
        }
        return val
      },
      editor() {
        return this.$refs.myTextEditor.quill
      },
      books () {
        return this.$store.state.books.books
      },
      id () {
        return this.$store.state.recipes.form.id
      },
      book: {
        get () {
          return this.$store.state.recipes.form.book
        },
        set (val) {
          this.$store.commit('recipes/setBook', val)
        }
      },
      title: {
        get () {
          return this.$store.state.recipes.form.title
        },
        set (val) {
          this.$store.commit('recipes/setTitle', val)
        }
      },
      image: {
        get () {
          return this.$store.state.recipes.form.image
        },
        set (val) {
          this.$store.commit('recipes/setImage', val)
        }
      },
      content: {
        get () {
          return this.$store.state.recipes.form.content
        },
        set (val) {
          this.$store.commit('recipes/setContent', val)
        }
      },
      ingredients: {
        get () {
          return this.$store.state.recipes.form.ingredients
        },
        set (val) {
          this.$store.commit('recipes/setIngredients', val)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor,
  .output {
    height: 20rem;
    border: 1px solid #ccc;
  }

  .output {
    border-top: none;
  }
</style>