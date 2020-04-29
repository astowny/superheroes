import axios from 'axios'
import md5 from 'blueimp-md5'

export default function ( offset = 0) {
  let uri = "https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters"
  let apiKey = "71ec8973d57482113929b8e07a0d45cf"
  // let hash= "f50508978f0a50a26020a0f499e05133"
  let ts = Date.now()
  let privateKey = "5007391bce7a52493cdefb88bf31d6fd78309f7d"
  let hash = md5(ts + privateKey + apiKey)
  let limit = 100

  // call api
  return axios.get(uri, {
    params: {
      apikey: apiKey,
      ts: ts,
      hash: hash,
      limit: limit,
      offset: offset
    }
  })
}