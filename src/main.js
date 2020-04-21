import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import { i18n } from './plugins/i18n'
import {GET_MORE_HEROES} from './store/types/actions-types'

Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  store,
  vuetify,
  i18n,
  mounted() {
    this.$store.dispatch(GET_MORE_HEROES)
  },
  render: h => h(App),
}).$mount('#app')
