export const state = {
  user: null,
}

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
}

export const actions = {
  set_user({ commit }, payload) {
    commit('SET_USER', payload)
  },
}

export const getters = {
  user: (state) => state.user,
}
