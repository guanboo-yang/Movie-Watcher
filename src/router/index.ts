import { createRouter as createVueRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    alias: '/home',
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
  },
  {
    path: '/:type(movie|tv)/:tmdb(\\d+)',
    name: 'Watch',
    component: () => import('@/views/Watch.vue'),
    sensitive: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createVueRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

router.afterEach(to => {
  if (to.name === 'Watch') window.dispatchEvent(new HashChangeEvent('hashchange'))
  if (to.name === 'Home') document.title = 'Movie+'
  else document.title = `${String(to.name)} | Movie+`
})

export const createRouter = () => router
