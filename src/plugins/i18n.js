import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLang from '../lang/en.json'
import frLang from '../lang/fr.json'
import jaLang from '../lang/ja.json'

Vue.use(VueI18n)


const messages = {
  en: enLang,
  fr: frLang,
  ja: jaLang,
}

export const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

