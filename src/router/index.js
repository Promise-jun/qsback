import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Login from 'components/login/login'
import ChangePass from 'components/change-pass/change-pass'
import NotFound from 'components/not-found/not-found'
import Role from 'components/role/role'
import Func from 'components/func/func'
import AuthorityRole from 'components/authority/authority-role'
import AuthorityUser from 'components/authority/authority-user'
// 用户管理
import UserList from 'components/user-list/user-list' //用户列表
import UserOperate from 'components/user-list/user-operate' //新增用户、编辑用户
import MentorList from 'components/mentor/mentor-list'
import MentorAudit from 'components/mentor/mentor-audit'
import AnchorList from 'components/anchor/anchor-list'
import AnchorAudit from 'components/anchor/anchor-audit'
import GroupList from 'components/group/group-list'
import OperatorList from 'components/operator/operator-list'
import ServiceGroup from 'components/service-group/service-group'
// 咨询管理
import MentalCategory from 'components/consult-supervise/mental-category'  //心理分类
import PersonalityLabel from 'components/consult-supervise/personality-label' //个性化标签
// 数据字典
import DataDictionary from 'components/data-dictionary/data-dictionary'

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
      path: '/function',  //功能管理
      name: 'func',
      component: Func
    },
    {
      path: '/authority/role', //角色权限管理
      name: 'authorityRole',
      component: AuthorityRole
    },
    {
      path: '/authority/user', //用户权限管理
      name: 'authorityUser',
      component: AuthorityUser
    },
    {
      path: '/userlist', //用户列表
      name: 'userlist',
      component: UserList,
      children: [
        {
          path: 'addUser',
          name: 'userOperate',
          component: UserOperate
        }
      ]
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
      path: '/servicegroup', //客服组管理
      name: 'servicegroup',
      component: ServiceGroup
    },
    {
      path: '/mentalCategory/list', //心理分类
      name: 'mentalCategory',
      component: MentalCategory
    },
    {
      path: '/personalityLabel/list', //个性化标签
      name: 'personalityLabel',
      component: PersonalityLabel
    },
    {
      path: '/dataDictionary', //数据字典
      name: 'dataDictionary',
      component: DataDictionary
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