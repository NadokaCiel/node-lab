import Router from 'vue-router'

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

import Catalog from './catalog'

const router = new Router({
  // mode: 'history',
  base: 'vue-lab',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: getRoutes()
})
router.beforeEach((to, from, next) => {
  // const auth = router.app.$cookie.get('auth')
  // if(!auth && to.name != "Login"){
  //   next({name:"Login"})
  // }else{
    next()
  // }
})

function getRoutes() {
  const routes = [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: "Home",
    component: Home
  }, {
    path: '/login',
    name: "Login",
    component: Login
  }]

  Object.keys(Catalog).forEach(k => {
    Object.keys(Catalog[k]).forEach(p => {
      const item = Catalog[k][p]
      if (!item.component) {
        return
      }
      const route = {
        path: item.path || '/' + k.toLowerCase() + '/' + p.toLowerCase(),
        name: p == 'self' ? k : k + '-' + p,
        component: item.component
      }

      routes.push(route)
    })
  })

  routes.push({
    path: '*',
    redirect: '/home'
  })

  return routes
}

export default router
