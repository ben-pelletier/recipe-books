const getDefaultState = () => {
    return {
        open: false,
        recipes: [],
        list: []
    }
}

export const state = () => (getDefaultState())

export const actions = {
    async add ({commit, dispatch, rootGetters}, recipeId) {
        let recipe = rootGetters["recipes/getRecipeById"](recipeId)
        commit('resetList')
        commit('addRecipe', recipe)
        dispatch('application/snackbar', {text: 'Recipe added to shoping list.', color: 'green'}, { root: true })
    },
    removeRecipe ({dispatch, commit}, id) {
        commit('resetList')
        commit('removeRecipe', id)
        dispatch('application/snackbar', {text: 'Recipe removed from shopping list', color: 'red'}, { root: true })
    },
    generateList ({state, dispatch, commit}) {
        let combined = []
        for (let i=0; i < state.recipes.length; i ++) {
            let currentingredients = state.recipes[i].ingredients.split(', ')
            combined = combined.concat(currentingredients)
        }
        const list = [...new Set([...combined])]
        commit('setShoppingList', list)
        dispatch('application/snackbar', {text: 'Shopping list has been generated successfully!', color: 'green'}, { root: true })
    }
}
export const mutations = {
    addRecipe (state, recipe) {
        state.recipes.push(recipe)
    },
    setShoppingList (state, list) {
        state.list = list
    },
    toggleOpen (state, val) {
        state.open = val
    },
    resetList (state) {
        state.list = []
    },
    removeRecipe (state, id) {
        state.recipes.splice(id, 1);
    },
}