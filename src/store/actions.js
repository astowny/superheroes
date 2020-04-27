import { GET_MORE_HEROES, PUSH_NOTIFICATION } from './types/actions-types'
import callApi from '../api/api'

export default {
  // call the api to fill the store
  [GET_MORE_HEROES](context, offset = 0) {
    callApi(context, offset)
  },
  [PUSH_NOTIFICATION](context, {text, color}) {
    context.commit("setNotification", true);
    context.commit("setText", text);
    context.commit("setColor", color);
  }
}