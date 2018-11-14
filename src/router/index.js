import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Login from 'components/login/login'
import ChangePass from 'components/change-pass/change-pass'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/changePass',
      name: 'changePass',
      component: ChangePass
    }
    /*{
        path: '*',
        redirect: '/404'
    }*/
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})