import Router from 'vue-router'

import Home from '../pages/Home.vue'

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
  next();
})

function getRoutes() {
  const routes = [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: "Home",
    component: Home
  }]

  Object.keys(Catalog).forEach(k => {
    Object.keys(Catalog[k]).forEach(p => {
      const item = Catalog[k][p]
      if (!item.component) {
        return
      }
      const route = {
        path: item.path || '/' + k.toLowerCase() + '/' + p.toLowerCase(),
        name: k + '-' + p,
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
