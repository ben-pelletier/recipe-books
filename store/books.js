// put default state in function for easy reference 
const getDefaultState = () => {
    return {
        books: [],
        form: {
            id: 0,
            title: '',
            image: ''
        },
        add: false
    }
}

// declare default state
export const state = () => (getDefaultState())
export const getters = {
    getBookById: (state) => (id) => {
        return state.books.find(book => book.ref === id)
    }
}
export const actions = {

    // Fetch all books
    async getBooks ({commit, state}) {

        // run query on fauna
        const q = this._vm.$q
        
        const getBooks = await this._vm.$db.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index("allbooks"))
                ),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )
        // I want to reset the books to default state before importing new ones
        commit('resetBooks')
        
        // default struct to push to mutation
        let currentPayload = {}
        
        // loop over data returned from db
        for (let i = 0; i < getBooks.data.length; i++) {
            currentPayload = {
                ref: getBooks.data[i].ref.value.id,
                title: getBooks.data[i].data.title,
                image: getBooks.data[i].data.image
            }
            commit('addBook', currentPayload)
        }
    },

    // Create new book
    async createBook ({commit, dispatch, state}) {
        // run query on fauna
        const q = this._vm.$q
        
        const setBook = await this._vm.$db.query(
            q.Create(
                q.Collection("books"),
                {
                    data: {
                        "title": state.form.title,
                        "image": state.form.image
                    }
                }
            )
        )
        dispatch('application/snackbar', {text: 'Book has been created successfully!', color: 'green'}, { root: true })
        dispatch('getBooks')
        commit('addStatus', false)
    },

    async removeBook ({dispatch}, id) {
        // run query on fauna
        const q = this._vm.$q
            
        const deleteBook = await this._vm.$db.query(
            q.Delete(
                q.Ref(q.Collection("books"), id)
            )
        )
        dispatch('application/snackbar', {text: 'Book has been deleted successfully.', color: 'red'}, { root: true })
        dispatch('getBooks')
    },
    async updateBook ({state, dispatch}) {
        // run query on fauna
        const q = this._vm.$q
    
        const updateBook = await this._vm.$db.query(

            q.Replace(
                q.Ref(q.Collection("books"), state.form.id),
                {
                    data: {
                        title: state.form.title,
                        image: state.form.image
                    }
                }
            )    
        )

        dispatch('getBooks')
        dispatch('application/snackbar', {text: 'Book has been updated successfully!', color: 'green'}, { root: true })
    }
}
export const mutations = {
    addBook (state, payload) {
        state.books.push(payload)
    },
    resetBooks (state) {
        state.books = getDefaultState().books
    },
    resetForm (state) {
        state.form = getDefaultState().form
    },
    title (state, title) {
        state.form.title = title
    },
    image (state, image) {
        state.form.image = image
    },
    addStatus(state, boolean) {
        state.add = boolean
    },
    setId (state, id) {
        state.form.id = id
    }
}