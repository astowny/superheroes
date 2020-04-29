import callApi from '../api/api';

export default {
  // call the api to fill the store
  getMoreHeroes(context, offset = 0) {
    callApi(context, offset)
  }
}