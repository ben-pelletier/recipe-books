const getDefaultState = () => {
    return {
        recipes: [],
        form: {
            id: 0,
            book: 0,
            title: '',
            image: '',
            content: '',
            ingredients: []
        },
        open: []
    }
}

export const state = () => (getDefaultState())

export const getters = {
    getRecipeById: (state) => (id) => {
        return state.recipes.find(recipe => recipe.ref === id)
    }
}

export const actions = {
    async getRecipes ({commit, state}, ref) {
       // run query on fauna
       const q = this._vm.$q
       const getRecipes = await this._vm.$db.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index("get_recipes_by_book"), ref)
                ),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )
        // I want to reset the books to default state before importing new ones
        commit('resetRecipes')
        
        // default struct to push to mutation
        let currentPayload = {}
        
        // loop over data returned from db
        for (let i = 0; i < getRecipes.data.length; i++) {
            currentPayload = {
                ref: getRecipes.data[i].ref.value.id,
                book: ref,
                title: getRecipes.data[i].data.title,
                image: getRecipes.data[i].data.image,
                content: getRecipes.data[i].data.content,
                ingredients: getRecipes.data[i].data.ingredients
                
            }
            
            commit('addRecipe', currentPayload)
        }
    },
    async createRecipe ({dispatch, commit, state}) {
        const q = this._vm.$q

        const create = await this._vm.$db.query(
            q.Create(
                q.Collection("recipes"),
                {
                    data: {
                        "book": state.form.book,
                        "title": state.form.title,
                        "image": state.form.image,
                        "content": state.form.content,
                        "ingredients": state.form.ingredients
                    }
                }
            )
        )
        dispatch('getRecipes', state.form.book)
        dispatch('application/snackbar', {text: 'Recipe has been created successfully!', color: 'green'}, { root: true })
        commit('resetForm')
    },
    async updateRecipe ({state, commit, dispatch}) {
        // run query on fauna
        const q = this._vm.$q
    
        const updateBook = await this._vm.$db.query(

            q.Replace(
                q.Ref(q.Collection("recipes"), state.form.id),
                {
                    data: {
                        book: state.form.book,
                        title: state.form.title,
                        image: state.form.image,
                        content: state.form.content,
                        ingredients: state.form.ingredients
                    }
                }
            )    
        )
        await dispatch('getRecipes', state.form.book)
        dispatch('application/snackbar', {text: 'Recipe has been updated successfully!', color: 'green'}, { root: true })
        const recipe = await dispatch('getRecipeById', state.form.id)
        commit('setOpen', recipe)


    },
    async removeRecipe ({dispatch, state}, id) {
        // run query on fauna
        const q = this._vm.$q
            
        const deleteRecipe = await this._vm.$db.query(
            q.Delete(
                q.Ref(q.Collection("recipes"), id)
            )
        )
        dispatch('application/snackbar', {text: 'Recipe has been deleted successfully.', color: 'red'}, { root: true })
        dispatch('getRecipes', state.form.book)
    },

    async getRecipeById ({state}, id) {
        const index = state.recipes.findIndex(recipe => recipe.ref == id)
        const recipe = state.recipes[index]
        return recipe
    },
    async openRecipe ({dispatch, commit}, id) {  
        const recipe = await dispatch('getRecipeById', id)
        commit('setOpen', recipe)
    },
    async openRecipeSearch ({dispatch, commit}, payload) {  
        await dispatch('getRecipes', payload.book)
        const recipe = await dispatch('getRecipeById', payload.id)
        commit('setOpen', recipe)
    },
    async editRecipe ({dispatch, commit}, id) {
        const recipe = await dispatch('getRecipeById', id)
        commit('setTitle', recipe.title)
        commit('setImage', recipe.image)
        commit('setContent', recipe.content)
        commit('setBook', recipe.book)
        commit('setIngredients', recipe.ingredients)
    }
}
export const mutations = {
    addRecipe (state, payload) {
        state.recipes.push(payload)
    },
    setId (state, id) {
        state.form.id = id
    },
    setTitle (state, payload) {
        state.form.title = payload
    },
    setBook (state, payload) {
        state.form.book = payload
    },
    setContent (state, payload) {
        state.form.content = payload
    },
    setImage (state, payload) {
        state.form.image = payload
    },  
    setIngredients (state, payload) {
        state.form.ingredients = payload
    },
    resetForm (state) {
        state.form = getDefaultState().form
    },
    resetRecipes (state) {
        state.recipes = getDefaultState().recipes
    },
    setOpen (state, payload) {
        state.open = payload
    }
}
