export const state = () => ({
  session: null,
  profile: null,
  modal: null,
  cart: null,
  fruits: null,
})

export const mutations = {
  authListener(state, payload) {
    state.session = payload
  },
  profileUpdate(state, payload) {
    state.profile = payload
  },
  modalUpdate(state, payload) {
    state.modal = payload
  },
  cartUpdate(state, payload) {
    state.cart = payload
  },
  fruitsUpdate(state, payload) {
    state.fruits = payload
  },
}

export const actions = {
  modalSubmit({ commit }, payload) {
    commit('modalUpdate', payload)
    setTimeout(() => {
      commit('modalUpdate', null)
    }, 8000)
  }
}
