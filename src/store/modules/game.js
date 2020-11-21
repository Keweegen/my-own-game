import { getQuestions } from '@/api/questions.api'
import { getAllCategories } from '@/api/categories.api'

export const state = {
  fetchingQuestions: false,
  fetchingThemes: false,
  isPlayed: false,
  pointsPerGame: 0,
  themes: [],
  questions: [],
  answeredThemes: [],
  answeredQuestions: [],
}

export const mutations = {
  SET_GAME(state, status) {
    state.isPlayed = status
  },

  SET_THEMES(state, questions) {
    state.themes = questions
  },

  SET_QUESTIONS(state, questions) {
    state.questions = questions
  },

  ADD_ANSWERED_QUESTION(state, { id, status }) {
    state.answeredQuestions.push({ id, status: status ? 'correct' : 'wrong' })
  },

  ADD_ANSWERED_THEME(state, id) {
    state.answeredThemes.push(id)
  },

  CLEAR(state) {
    state.themes = []
    state.questions = []
    state.pointsPerGame = 0
    state.answeredThemes = []
    state.answeredQuestions = []
  },

  SET_POINTS(state, { status, value }) {
    state.pointsPerGame = status ? state.pointsPerGame + value : state.pointsPerGame - value
  },

  SET_FETCHING_QUESTIONS(state, status) {
    state.fetchingQuestions = status
  },

  SET_FETCHING_THEMES(state, status) {
    state.fetchingThemes = status
  },
}

export const actions = {
  async get_themes({ dispatch, commit }, payload) {
    dispatch('set_fetching_themes', true)
    const count = payload?.count || 5
    const options = { ...payload, count }

    await getAllCategories(options)
      .then((response) => commit('SET_THEMES', response.data))
      .finally(() => dispatch('set_fetching_themes', false))
  },

  async get_questions({ dispatch, commit }, payload) {
    dispatch('set_fetching_questions', true)
    const count = payload?.count || 5
    const options = { ...payload, count }

    await getQuestions(options)
      .then((response) => commit('SET_QUESTIONS', response.data))
      .finally(() => dispatch('set_fetching_questions', false))
  },

  start_game({ commit, dispatch }) {
    commit('SET_GAME', true)
    dispatch('statistic/add_games', null, { root: true })
  },

  stop_game({ commit }) {
    commit('SET_GAME', false)
    commit('CLEAR')
  },

  add_answered_question({ commit, dispatch, getters }, { id, status }) {
    commit('ADD_ANSWERED_QUESTION', { id, status })

    const { category: theme } = getters.question(id)
    const answeredThemeQuestions = getters.is_answered_theme_questions(theme.id)

    answeredThemeQuestions.length >= getters.count_questions &&
      dispatch('add_answered_theme', theme.id)
  },

  add_answered_theme({ commit, dispatch, state }, id) {
    commit('ADD_ANSWERED_THEME', id)

    state.answeredThemes.length >= state.themes.length && dispatch('stop_game')
  },

  set_points({ commit, dispatch }, { status, value }) {
    commit('SET_POINTS', { status, value })
    dispatch('statistic/set_points', { status, value }, { root: true })
  },

  set_fetching_questions({ commit }, status) {
    commit('SET_FETCHING_QUESTIONS', status)
  },

  set_fetching_themes({ commit }, status) {
    commit('SET_FETCHING_THEMES', status)
  },
}

export const getters = {
  fetching_questions: (state) => state.fetchingQuestions,

  fetching_themes: (state) => state.fetchingThemes,

  themes: (state, getters) => state.themes.filter((theme) => !getters.is_answered_theme(theme.id)),

  theme: (state) => (id) => state.themes.find((theme) => theme.id === id),

  questions: (state, getters) =>
    state.questions.filter(
      (question) => !getters.is_answered_question(question.id) && !!question.value
    ),

  count_questions: (state) => state.questions.filter((question) => !!question.value).length,

  question: (state) => (id) => state.questions.find((question) => question.id === id),

  status_game: (state) => state.isPlayed,

  points_per_game: (state) => state.pointsPerGame,

  is_answered_theme: (state) => (id) => state.answeredThemes.includes(id),

  is_answered_question: (state) => (id) =>
    state.answeredQuestions.find((question) => question.id === id),

  is_answered_theme_questions: (state, getters) => (id) =>
    state.answeredQuestions.filter((question) => getters.question(question.id)?.category.id === id),
}
