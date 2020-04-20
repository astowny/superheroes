import { GET_HERO_BY_ID } from "./getters-type"

export default {
  [GET_HERO_BY_ID]: (state) => (id) => {
    return state.heroes.find(h => h.id === id)
  }
}