export const state = () => ({
    snackbar: {
        active: false,
        text: '',
        color: 'green'
    }
    
})

export const actions = {
    snackbar ({commit}, payload) {
        commit('setText', payload.text)
        commit('setColor', payload.color)
        commit('setSnackbarStatus', true)
    }
}

export const mutations = {
    setSnackbarStatus (state, payload) {
        state.snackbar.active = payload
    },
    setText (state, payload) {
        state.snackbar.text = payload
    },
    setColor (state, payload) {
        state.snackbar.color = payload
    }
}