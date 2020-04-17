import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.prototype.$http = axios
Vue.config.productionTip = false

const messages = {
  en: {
    title: "Supeeeeer Heroes !!!",
    details: "{name} Details"
  },
  ja: {
    title: 'スーパーヒーロー !!!',
    details: "{name}の詳細"
  },
  fr: {
    title: "Supeeeeer Héros !!!",
    details: "Détails de {name}"
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: store.state.locale, // set locale
  messages, // set locale messages
})

new Vue({
  store,
  vuetify,
  i18n,
  mounted() {
    this.$store.dispatch('getMoreHeroes')
  },
  render: h => h(App),
}).$mount('#app')
