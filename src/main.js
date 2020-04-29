import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import { i18n } from './plugins/i18n'
import { ADD_TO_FAVORITES } from './store/types/mutations-types'

Vue.config.productionTip = false


new Vue({
  store,
  vuetify,
  i18n,
  mounted() {
    this.$store.dispatch('getMoreHeroes')
    this.$store.commit(ADD_TO_FAVORITES, 1009165) // Avengers
    this.$store.commit(ADD_TO_FAVORITES, 1011334)
    this.$store.commit(ADD_TO_FAVORITES, 1017100)
    this.$store.commit(ADD_TO_FAVORITES, 1009144)
    this.$store.commit(ADD_TO_FAVORITES, 1009146)
    this.$store.commit(ADD_TO_FAVORITES, 1009149)
  },
  render: h => h(App),
}).$mount('#app')
