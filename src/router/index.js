import VueRouter from 'vue-router'
import Vue from 'vue'
import Favorites from '../views/Favorites/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Favorites,
    meta: {
      title: "superheroes - favorites"
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    meta: {
      title: "superheroes - favorites"
    }
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: () => import(/* webpackChunkName: "Heroes" */"../views/Heroes/index"),
    meta: {
      title: "superheroes - all"
    }
  },
  {
    path: '/heroes/:heroId',
    props:(route) => ({ heroId: parseInt(route.params.heroId) }),
    component: () => import(/* webpackChunkName: "HeroDetails" */"../views/HeroDetails/index"),
    meta: {
      title: "superheroes - hero details"
    },
    children: [
      {
        path: '',
        name: 'heroDetails',
        props:(route) => ({ heroId: parseInt(route.params.heroId) }),
        component: () => import(/* webpackChunkName: "HeroDetailsHome" */"../views/HeroDetails/home"),
        meta: {
          title: "superheroes - hero details"
        }
      },
      {
        path: 'edit',
        name: 'editHero',
        props:(route) => ({ heroId: parseInt(route.params.heroId) }),
        component: () => import(/* webpackChunkName: "EditHero" */"../views/HeroDetails/edit"),
        meta: {
          title: "superheroes - edit hero"
        }
      },
    ]
  },

  {
    path: '/heroes/add',
    name: 'addHero',
    component: () => import(/* webpackChunkName: "AddHero" */"../views/AddHeroView/index"),
    meta: {
      title: "superheroes - add hero"
    }
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to,from,next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next()
})

export default router;