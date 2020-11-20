export const state = {
  user: null,
}

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },

  UNSET_USER(state) {
    state.user = null
  },
}

export const actions = {
  set_user({ commit }, payload) {
    commit('SET_USER', payload)
  },

  unset_user({ commit }) {
    commit('UNSET_USER')
  },
}

export const getters = {
  user: (state) => state.user,
}
