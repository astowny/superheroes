export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 0
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notToRemove) {
    state.notifications = state.notifications.filter(
        not => not.id !== notToRemove.id
    )
  }
}

export const actions = {
  add({commit}, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notToRemove){
    commit('DELETE', notToRemove)
  }
}