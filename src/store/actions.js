import callApi from '../api/api';
import { ADD_HEROES } from "./types/mutations-types";

export default {
  // call the api to fill the store
  getMoreHeroes(context, offset = 0) {
    return new Promise((resolve) => {
      callApi(offset).then((response) => {
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

          context.commit(ADD_HEROES, { heroes: heroestmp })
        } else {
          context.dispatch('notification/add', {text: this.$t('NOTIFICATION.ERROR_GET_MORE_HEROES'), color: 'error'})
        }
        resolve()
      })
    })
  }
}