import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import ParentView from 'components/parent-view/parent-view'
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
import AtionMenuList from 'components/consult-supervise/ationMenu-list' //套餐列表
import AtionMenuAuditing from 'components/consult-supervise/ationMenu-auditing' //套餐审核
// 直播管理
import GalleryList from 'components/live-supervise/gallery-list' //图库管理
import GalleryOperate from 'components/live-supervise/gallery-operate' //新增图片， 编辑图片
import GiftList from 'components/live-supervise/gift-list' //礼物管理
import GiftOperate from 'components/live-supervise/gift-operate' //新增礼物， 编辑礼物
import ForeshowList from 'components/live-supervise/foreshow-list' //直播预告列表
import LiveRoomList from 'components/live-supervise/liveRoom-list' //直播间列表
// 电台管理
import RadioList from 'components/radio-supervise/radio-list' //电台分类
import ProgramList from 'components/radio-supervise/program-list' //专辑列表
import ProgramOperate from 'components/radio-supervise/program-operate' //添加专辑
import AnchorRadio from 'components/radio-supervise/anchor-radio' //节目列表
import RadioCount from 'components/radio-supervise/radio-count' //节目统计
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
      path: '/',
      name: 'individualCenter', //个人中心
      component: Index,
      children: [
        {
          path: '/changePass', //修改密码
          name: 'changePass',
          component: ChangePass
        },
      ]
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/role',  //角色管理
          name: 'role',
          component: Role
        },
      ]
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/function',  //功能管理
          name: 'func',
          component: Func
        },
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'authority',  //权限管理
      children: [
        {
          path: '/authority/role', //角色权限管理
          name: 'authorityRole',
          component: AuthorityRole
        },
        {
          path: '/authority/user', //用户权限管理
          name: 'authorityUser',
          component: AuthorityUser
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'userManage', //用户管理
      children: [
          {
            path: 'userlist', //用户列表
            name: 'userlist',
            component: UserList,
            children: [
                {
                  path: 'addUser',
                  name: 'addUser', //新增用户
                  component: UserOperate
                },
                {
                  path: 'editUser/:id',
                  name: 'editUser', //编辑用户
                  component: UserOperate
                }
            ]
          },
          {
            path: 'mentor', //导师管理
            name: 'mentorManage',
            redirect: 'mentor/list',
            component: ParentView,
            children: [
                {
                  path: 'list', //导师列表
                  name: 'mentorlist',
                  component: MentorList
                },
                {
                  path: 'audit', //导师审核
                  name: 'mentoraudit',
                  component: MentorAudit
                }
            ]
          },
          {
            path: 'anchor', //主播管理
            name: 'anchorManage',
            redirect: 'anchor/list',
            component: ParentView,
            children: [
                {
                  path: 'list', //主播列表
                  name: 'anchorlist',
                  component: AnchorList
                },
                {
                  path: 'audit', //主播审核
                  name: 'anchoraudit',
                  component: AnchorAudit
                }
            ]
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
          }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'consultManage', //咨询管理
      children: [
        {
          path: 'consultSet', //咨询设置
          redirect: 'consultSet/mentalCategory',
          component: ParentView,
          children: [
              {
                path: 'mentalCategory', //心理分类
                name: 'mentalCategory',
                component: MentalCategory
              },
              {
                path: 'personalityLabel', //个性化标签
                name: 'personalityLabel',
                component: PersonalityLabel
              }
          ]
        },
        {
          path: 'consultationMenu', //咨询套餐
          component: ParentView,
          children: [
              {
                path: 'list', //套餐列表
                name: 'ationMenuList',
                component: AtionMenuList
              },
              {
                path: 'auditing', //套餐审核
                name: 'ationMenuAuditing',
                component: AtionMenuAuditing
              }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'liveManage', //直播管理
      children: [
        {
          path: 'liveSet', //直播设置
          component: ParentView,
          children: [
              {
                path: 'gallery', //图库管理
                name: 'galleryList',
                component: GalleryList,
                children: [
                  {
                    path: 'addGallery', //新增图片
                    name: 'addGallery',
                    component: GalleryOperate
                  }
                ]
              },
              {
                path: 'gift', //礼物管理
                name: 'giftList',
                component: GiftList,
                children: [
                  {
                    path: 'addGift', //新增礼物
                    name: 'addGift',
                    component: GiftOperate
                  }
                ]
              }
          ]
        },
        {
          path: 'liveForeshow', //直播预告
          component: ParentView,
          children: [
              {
                path: 'list', //列表
                name: 'foreshowList',
                component: ForeshowList
              }
          ]
        },
        {
          path: 'liveRoom', //直播间管理
          component: ParentView,
          children: [
              {
                path: 'list', //列表
                name: 'liveRoomList',
                component: LiveRoomList
              }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'radioManage', //电台管理
      children: [
        {
          path: 'radioSet', //电台设置
          component: ParentView,
          children: [
              {
                path: 'list', //电台分类
                name: 'radioList',
                component: RadioList
              }
          ]
        },
        {
          path: 'program', //专辑管理
          component: ParentView,
          children: [
              {
                path: 'list', //专辑列表
                name: 'programList', 
                component: ProgramList,
                children: [
                  {
                    path: 'addProgram', //添加专辑
                    name: 'addProgram',
                    component: ProgramOperate
                  }
                ]
              },
              {
                path: 'anchorRadio', //节目列表
                name: 'anchorRadio',
                component: AnchorRadio
              },
              {
                path: 'radioCount', //节目统计
                name: 'radioCount',
                component: RadioCount
              }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Index,
      children: [
          {
            path: '/dataDictionary', //数据字典
            name: 'dataDictionary',
            component: DataDictionary
          }
      ]
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