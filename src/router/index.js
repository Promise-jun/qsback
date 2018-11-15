import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Role from 'components/role/role'
import Login from 'components/login/login'
import ChangePass from 'components/change-pass/change-pass'
import UserList from 'components/user-list/user-list'

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
      path: '/role',  //角色管理
      name: 'role',
      component: Role
    },
    {
      path: '/userlist', //用户列表
      name: 'userlist',
      component: UserList
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/changePass', //修改密码
      name: 'changePass',
      component: ChangePass
    },
    {
        path: '*',
        redirect: '/404'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})