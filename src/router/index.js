import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Login from 'components/login/login'
import ChangePass from 'components/change-pass/change-pass'
import NotFound from 'components/not-found/not-found'
import Role from 'components/role/role'
import UserList from 'components/user-list/user-list'
import MentorList from 'components/mentor/mentor-list'
import MentorAudit from 'components/mentor/mentor-audit'
import AnchorList from 'components/anchor/anchor-list'
import AnchorAudit from 'components/anchor/anchor-audit'
import GroupList from 'components/group/group-list'
import OperatorList from 'components/operator/operator-list'

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
      path: '/changePass', //修改密码
      name: 'changePass',
      component: ChangePass
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
      path: '/mentor/list', //导师列表
      name: 'mentorlist',
      component: MentorList
    },
    {
      path: '/mentor/audit', //导师审核
      name: 'mentoraudit',
      component: MentorAudit
    },
    {
      path: '/anchor/list', //主播列表
      name: 'anchorlist',
      component: AnchorList
    },
    {
      path: '/anchor/audit', //主播审核
      name: 'anchoraudit',
      component: AnchorAudit
    },
    {
      path: '/group/list', //群组管理列表
      name: 'grouplist',
      component: GroupList
    },
    {
      path: '/operator/list', //后台用户列表
      name: 'operatorlist',
      component: OperatorList
    },
    {
      path: '/404',
      name: "notfound",
      component: NotFound
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