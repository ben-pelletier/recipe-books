const getDefaultState = () => {
    return {
        text: '',
        results: []
    }
}

export const state = () => (getDefaultState())

export const actions = {
    set ({commit, store}, payload) {
        commit('setText', payload)
    },
    async getRecipes ({commit, state}) {
        
        // run query on fauna
        const q = this._vm.$q
        const getRecipes = await this._vm.$db.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index("get_recipes_by_text"), state.text)
                ),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )
        
        // I want to reset the books to default state before importing new ones
        commit('resetSearchResults')
         
         // default struct to push to mutation
        let currentPayload = {}
         
         // loop over data returned from db
        for (let i = 0; i < getRecipes.data.length; i++) {
            currentPayload = {
                book:  getRecipes.data[i].data.book,
                image:  getRecipes.data[i].data.image,
                ref: getRecipes.data[i].ref.value.id,
                title: getRecipes.data[i].data.title

            }
            commit('addResult', currentPayload)
        }
      
    }
}
export const mutations = {
    addResult (state, result) {
        state.results.push(result)
    },
    resetSearchResults (state) {
        state.results = getDefaultState().results
    },
    resetSearchText (state) {
        state.text = getDefaultState().text
    },
    setText (state, payload) {
        state.text = payload
    }
}