import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
