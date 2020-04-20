import axios from 'axios'
import md5 from 'blueimp-md5'
import {ADD_HEROES} from '../store/mutations-types'

export default async function (contexte, offset = 0) {
  let uri = "https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters"
  let apiKey = "71ec8973d57482113929b8e07a0d45cf"
  // let hash= "f50508978f0a50a26020a0f499e05133"
  let ts = Date.now()
  let privateKey = "5007391bce7a52493cdefb88bf31d6fd78309f7d"
  let hash = md5(ts + privateKey + apiKey)
  let limit = 100

  // call api
  let response = await axios.get(uri, {
    params: {
      apikey: apiKey,
      ts: ts,
      hash: hash,
      limit: limit,
      offset: offset
    }
  })

  if (response.status === 200 && response.data.data && response.data.data.count > 0) {
    let heroestmp = [];

    response.data.data.results.forEach(hero => {
      // has
      let herotmp = {
        id: hero.id,
        name: hero.name,
        description: hero.description ? hero.description : '',
        imgUrl: hero.thumbnail ? hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension : ''
      }

      heroestmp.push(herotmp)
    });

    contexte.commit(ADD_HEROES, { heroes: heroestmp })
    // console.log(response.data)
  } else {
    console.log("No status 200 but error : " + response.status)
  }
}