export default {
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