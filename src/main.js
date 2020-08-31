import Vue from 'vue'
import App from './App.vue'
import router from './router'
import emitter from './event/event.js'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.prototype.$emitter = emitter;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
