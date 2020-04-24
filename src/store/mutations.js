import {
  ADD_HEROES, 
  UPDATE_HERO, 
  DELETE_HERO,
  IS_ADDING_HERO,
  IS_NOT_ADDING_HERO,
  SORT_HEROES_BY_NAME,
  SORT_HEROES_BY_ID,
  ADD_TO_FAVORITES,
  SET_SELECTED_HERO,
  SET_STATE_APP,
  SET_SEARCH
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
  },
  [SORT_HEROES_BY_NAME](state) {
    let compare = function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }
    state.heroes.sort(compare)
  },
  [SORT_HEROES_BY_ID](state) {
    function compareId(a, b) {
      // Use toUpperCase() to ignore character casing
      const nameA = a.id;
      const nameB = b.id;

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }

    state.heroes.sort(compareId);
  },
  [ADD_TO_FAVORITES] (state, heroId) {
    if (state.favoriteHeroesId.indexOf(heroId) === -1) {
      state.favoriteHeroesId.unshift(heroId)
    }

    if (state.favoriteHeroesId.length > 6) {
      state.favoriteHeroesId.pop()
    }
  },
  [SET_SELECTED_HERO] (state, heroid) {
    state.selectedHero = heroid
  },
  [SET_STATE_APP] (state, stateApp) {
    state.stateApp = stateApp
  },
  [SET_SEARCH] (state, word){
    state.search = word
  }
}
