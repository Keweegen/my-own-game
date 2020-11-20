import Vue from 'vue'
import Vuex from 'vuex'
import loadContext from '@/utils/context'

Vue.use(Vuex)

const modules = loadContext(require.context('@/store/modules', false, /.*\.js$/), 'js')
Object.keys(modules).forEach((key) => {
  modules[key].namespaced = true
})

export default new Vuex.Store({ modules })
