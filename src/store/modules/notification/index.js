export default {
  state: {
    notify: false,
    text: '',
    color: 'secondary'
  },
  mutations: {
    setNotification(state, notif) {
      state.notify = notif
    },
    setText(state, text) {
      state.text = text
    },
    setColor(state, color) {
      state.color = color
    }
  }
}