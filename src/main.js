import Vue from 'vue'
import Vuesax from 'vuesax'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false

Vue.use(Vuesax, {})
Vue.use(Vuelidate, {})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
