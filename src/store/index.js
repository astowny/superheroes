import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import md5 from 'blueimp-md5'

Vue.use(Vuex)

var callApi = async function (contexte,offset = 0) {
    let uri = "https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters"
    let apiKey = "71ec8973d57482113929b8e07a0d45cf"
    // let hash= "f50508978f0a50a26020a0f499e05133"
    let ts = Date.now()
    let privateKey = "5007391bce7a52493cdefb88bf31d6fd78309f7d"
    let hash = md5(ts + privateKey + apiKey)
    let limit = 100

  // call api
  let response = await axios.get(uri,{
      params: {
        apikey: apiKey,
        ts:ts,
        hash:hash,
        limit: limit,
        offset: offset
      }
    })

  if (response.status === 200 && response.data.data && response.data.data.count > 0) {
    contexte.commit("addHeroes", {heroes:response.data.data.results})
    // console.log(response.data)
  } else {
    console.log("No status 200 but error : " + response.status)
  }
}

export default new Vuex.Store({
  state: {
    heroes:[],
    locale: "en"
  },
  getters: {
    getHeroById: (state) => (id) => {
      return state.heroes.find(h => h.id === id)
    }
  },
  mutations: {
    addHeroes(state, {heroes}){
      state.heroes = state.heroes.concat(heroes)
    },
    setLang(state,lang){
      state.locale = lang
    },
    updateHero(state, hero){
      let heroIndex = state.heroes.findIndex(h => h.id === hero.id)
      // console.log(hero);
      // console.log(heroIndex);
      
      state.heroes[heroIndex] = JSON.parse(JSON.stringify(hero))
      Vue.set(state.heroes, heroIndex, hero)
    }
  },
  actions: {
    // call the api to fill the store
    getMoreHeroes(context, offset=0){
      callApi(context, offset)
    }
  },
  modules: {
    pagination: {
      state: {
        visibleItemsPerPageCount: 8,
        currentPage: 1
      },
      mutations: {
        setCurrentPage(state, page) {
          state.currentPage = page
        }
      }
    }
  }
})