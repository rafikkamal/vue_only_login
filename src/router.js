import Vue from 'vue'
import Router from 'vue-router'
import store from './store';

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  console.log("from: "+from.fullPath);
  console.log("to: "+to.fullPath);
  if (to.fullPath === '/users') {
    if (!store.state.accessToken) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    console.log("checking login")
    if (store.state.accessToken) {
      console.log("has accessToken")
      next('/users');
    }
  }
  next();
});

export default router;