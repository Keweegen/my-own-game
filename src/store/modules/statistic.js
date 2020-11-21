export const state = {
  info: {
    username: null,
    count_games: 0,
    count_correct_answers: 0,
    count_wrong_answers: 0,
    points: 0,
  },
}

export const mutations = {
  SET_INFO(state, payload) {
    state.info = {
      ...state.info,
      ...payload,
    }
  },

  SET_POINTS(state, { status, value }) {
    const points = status ? state.info.points + value : state.info.points - value

    state.info = {
      ...state.info,
      points,
    }
  },
}

export const actions = {
  set_info({ commit }, payload) {
    commit('SET_INFO', payload)
  },

  add_correct_answer({ commit, state }) {
    commit('SET_INFO', { count_correct_answers: state.info.count_correct_answers + 1 })
  },

  add_wrong_answer({ commit, state }) {
    commit('SET_INFO', { count_wrong_answers: state.info.count_wrong_answers + 1 })
  },

  add_games({ commit, state }) {
    commit('SET_INFO', { count_games: state.info.count_games + 1 })
  },

  set_points({ commit }, { status, value }) {
    commit('SET_POINTS', { status, value })
  },
}

export const getters = {
  info: (state) => state.info,

  output_data: ({ info }) => [
    { label: 'Имя', value: info.username },
    { label: 'Всего игр', value: info.count_games },
    { label: 'Правильных ответов', value: info.count_correct_answers },
    { label: 'Неправильных ответов', value: info.count_wrong_answers },
    { label: 'Баллы', value: info.points },
  ],
}
