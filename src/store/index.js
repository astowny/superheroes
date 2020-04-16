import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import md5 from 'blueimp-md5'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes:[],
    locale: "fr"
  },
  mutations: {
    setHeroes(state, {heroes}){
      state.heroes = heroes
    },
    setLang(state,lang){
      state.locale = lang
    }
  },
  actions: {
    // call the api to fill the store
    getHeroes(context){
      let uri = "https://cors-anywhere.herokuapp.com/https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json"
      uri = "https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters"
        let apiKey = "71ec8973d57482113929b8e07a0d45cf"
        // let hash= "f50508978f0a50a26020a0f499e05133"
        let ts = Date.now()
      let privateKey = "5007391bce7a52493cdefb88bf31d6fd78309f7d"
      let hash = md5(ts + privateKey + apiKey)
      axios.get(uri,{
            params: {
              apikey: apiKey,
              ts:ts,
              hash:hash,
              limit: 8
            }
          })
          .then(response => {
            if (response.status === 200) {
              context.commit("setHeroes", {heroes:response.data.data.results})
            } else {
              console.log("No status 200 but error : " + response.status)
            }

            })
    }
  },
  modules: {
  }
})
