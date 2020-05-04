import { GET_HERO_BY_ID, GET_FILTERED_HEROES } from "./types/getters-types"

export default {
  [GET_HERO_BY_ID]: (state) => (id) => {
    return state.heroes.find(h => h.id == id)
  },
  [GET_FILTERED_HEROES]: (state) => {
    let s = state.search.toUpperCase()
    return state.heroes.filter(hero => {
      return hero.name.toUpperCase().match(s) || hero.id.toString().toUpperCase().match(s) || hero.description.toUpperCase().match(s)
    })
  }
}