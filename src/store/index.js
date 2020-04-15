import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes:[]
  },
  mutations: {
    setHeroes(state, {heroes}){
      state.heroes = heroes
    }
  },
  actions: {
    getHeroes(){
      let uri = "https://cors-anywhere.herokuapp.com/https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json"
      axios.get(uri)
          .then(response => {
              console.log(response)
            })
    }
  },
  modules: {
  }
})
