import {
  ADD_HEROES, 
  UPDATE_HERO, 
  DELETE_HERO,
  IS_ADDING_HERO,
  IS_NOT_ADDING_HERO
} from './types/mutations-types'
import Vue from 'vue'

export default {
  [ADD_HEROES](state, { heroes }) {
    state.heroes = state.heroes.concat(heroes)
  },
  [UPDATE_HERO](state, hero) {
    let heroIndex = state.heroes.findIndex(h => h.id === hero.id)

    state.heroes[heroIndex] = JSON.parse(JSON.stringify(hero))
    Vue.set(state.heroes, heroIndex, hero)
  },
  [DELETE_HERO](state, heroId) {
    let heroIndex = state.heroes.findIndex(h => h.id === heroId)

    state.heroes.splice(heroIndex, 1)
  },
  [IS_ADDING_HERO] (state){
    state.isAddingHero = true
  },
  [IS_NOT_ADDING_HERO](state) {
    state.isAddingHero = false
  }
}