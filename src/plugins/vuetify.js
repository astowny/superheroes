import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#729c00',
        secondary: '#0057a3',
        accent: '#45db00',
        error: '#ab0000',
        info: '#6c00ab',
        success: '#46a049',
        warning: '#e6ac00',
      },
    },
  },
  icons: {
    iconfont: 'fa'
  }
});
