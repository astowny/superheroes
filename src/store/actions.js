import {GET_MORE_HEROES} from './actions-types'
import callApi from '../api/api'

export default {
  // call the api to fill the store
  [GET_MORE_HEROES](context, offset = 0) {
    callApi(context, offset)
  }
}