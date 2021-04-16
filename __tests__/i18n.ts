import { VueConstructor } from 'vue'
import VueI18n, {LocaleMessages } from "vue-i18n";

function loadLocaleMessages(): LocaleMessages {
  const messages = require("@/lang/en.json")

  return {
    en: messages
  }
}

export function setupI18n (vueInstance: VueConstructor) {
  vueInstance.use(VueI18n)

  return new VueI18n({
    locale: 'en',
    messages: loadLocaleMessages()
  })
}