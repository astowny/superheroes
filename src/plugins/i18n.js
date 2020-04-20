import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


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

export const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})
