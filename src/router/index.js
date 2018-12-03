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
const UserDetail = resolve => { //用户详情
  import('components/user-list/user-detail').then(comp => {
    resolve(comp)
  })
}
import UserOperate from 'components/user-list/user-operate' //新增用户、编辑用户
import MentorList from 'components/mentor/mentor-list'
import MentorAudit from 'components/mentor/mentor-audit'
import AnchorList from 'components/anchor/anchor-list'
import AnchorAudit from 'components/anchor/anchor-audit'
import GroupList from 'components/group/group-list'
import OperatorList from 'components/operator/operator-list'
import ServiceGroup from 'components/service-group/service-group'
// 咨询订单
const PlatformOrder = resolve => { //平台订单
  import('components/consult-order/platform-order').then(comp => {
    resolve(comp)
  })
}
const KefuIntervene = resolve => { //客服介入订单
  import('components/consult-order/kefu-intervene').then(comp => {
    resolve(comp)
  })
}
const FormalOrder = resolve => { //正式订单
  import('components/consult-order/formal-order').then(comp => {
    resolve(comp)
  })
}
const ExperienceOrder = resolve => { //体验订单
  import('components/consult-order/experience-order').then(comp => {
    resolve(comp)
  })
}
const UnderLineOrder = resolve => { //线下订单
  import('components/consult-order/underLine-order').then(comp => {
    resolve(comp)
  })
}
// 课程订单
const CourseOrderList = resolve => { //订单列表
  import('components/course-order/courseOrder-list').then(comp => {
    resolve(comp)
  })
}
// 咨询管理
import MentalCategory from 'components/consult-supervise/mental-category'  //心理分类
import PersonalityLabel from 'components/consult-supervise/personality-label' //个性化标签
import AtionMenuList from 'components/consult-supervise/ationMenu-list' //套餐列表
import AtionMenuAuditing from 'components/consult-supervise/ationMenu-auditing' //套餐审核
// 运营管理
const BannerList = resolve => { //binner图管理
  import('components/business-supervise/banner-list').then((comp) => {
    resolve(comp)
  })
}
const BannerOperate = resolve => { //添加banner，编辑banner
  import('components/business-supervise/banner-operate').then((comp) => {
    resolve(comp)
  })
}
const CoverList = resolve => { //app启动图管理
  import('components/business-supervise/cover-list').then((comp) => {
    resolve(comp)
  })
}
const CoverOperate = resolve => { //添加启动图，编辑启动图
  import('components/business-supervise/cover-operate').then((comp) => {
    resolve(comp)
  })
}
const KeyWords = resolve => { //互动管理 关键词
  import('components/business-supervise/key-words').then((comp) => {
    resolve(comp)
  })
}
const AudioChat = resolve => { //音频聊天记录
  import('components/business-supervise/audio-chat').then(comp => {
    resolve(comp)
  })
}
const TextChat = resolve => { //图文聊天记录
  import('components/business-supervise/text-chat').then(comp => {
    resolve(comp)
  })
}
const KefuStatistics = resolve => { //客服统计
  import('components/business-supervise/kefu-statistics').then(comp => {
    resolve(comp)
  })
}
const MentorStatistics = resolve => { //咨询师统计
  import('components/business-supervise/mentor-statistics').then(comp => {
    resolve(comp)
  })
}
const MagazineClassify = resolve => { //杂志分类
  import('components/business-supervise/magazine-classify').then(comp => {
    resolve(comp)
  })
}
const MagazineList = resolve => { //杂志列表
  import('components/business-supervise/magazine-list').then(comp => {
    resolve(comp)
  })
}
const MagazineAuditing = resolve => { //杂志审核
  import('components/business-supervise/magazine-auditing').then(comp => {
    resolve(comp)
  })
}
const ReportInfo = resolve => { //举报信息
  import('components/business-supervise/report-info').then(comp => {
    resolve(comp)
  })
}
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
// 课程管理
import TopicColumnList from 'components/course-supervise/topicColumn-list' //音频课程列表
import SeeCourse from 'components/course-supervise/see-course' //查看课程
import ColumnOperate from 'components/course-supervise/column-operate' //添加专栏，编辑专栏
import CourseOperate from 'components/course-supervise/course-operate' //添加课程，编辑课程
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
      meta: {
        title: '个人中心',
        goto: ''
      },
      children: [
        {
          path: '/changePass', //修改密码
          name: 'changePass',
          component: ChangePass,
          meta: {
            title: '修改密码',
            goto: '/changePass'
          }
        },
      ]
    },
    {
      path: '/',
      component: Index,
      meta: {
        title: '首页',
        goto: ''
      },
      children: [
        {
          path: '/role',  //角色管理
          name: 'role',
          component: Role,
          meta: {
            title: '角色管理',
            goto: '/role'
          }
        },
      ]
    },
    {
      path: '/',
      component: Index,
      meta: {
        title: '首页',
        goto: ''
      },
      children: [
        {
          path: '/function',  //功能管理
          name: 'func',
          component: Func,
          meta: {
            title: '功能管理',
            goto: '/function'
          }
        },
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'authority',  //权限管理
      meta: {
        title: '权限管理',
        goto: ''
      },
      children: [
        {
          path: '/authority/role', //角色权限管理
          name: 'authorityRole',
          component: AuthorityRole,
          meta: {
            title: '角色权限管理',
            goto: '/authority/role'
          }
        },
        {
          path: '/authority/user', //用户权限管理
          name: 'authorityUser',
          component: AuthorityUser,
          meta: {
            title: '用户权限管理',
            goto: '/authority/user'
          }
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'userManage', //用户管理
      meta: {
        title: '用户管理',
        goto: ''
      },
      children: [
          {
            path: 'userlist', //用户列表
            name: 'userlist',
            component: UserList,
            meta: {
              title: '用户列表',
              goto: '/userlist'
            },
            children: [
                {
                  path: 'userDetail', //用户详情
                  name: 'userDetail',
                  component: UserDetail,
                  meta: {
                    title: '用户详情',
                    goto: '/userlist/userDetail'
                  }
                },
                {
                  path: 'addUser',
                  name: 'addUser', //新增用户
                  component: UserOperate,
                  meta: {
                    title: '新增用户',
                    goto: '/userlist/addUser'
                  }
                },
                {
                  path: 'editUser/:id',
                  name: 'editUser', //编辑用户
                  component: UserOperate,
                  meta: {
                    title: '编辑用户',
                    goto: '/userlist/editUser/:id'
                  }
                }
            ]
          },
          {
            path: 'mentor', //导师管理
            name: 'mentorManage',
            redirect: 'mentor/list',
            component: ParentView,
            meta: {
              title: '导师管理',
              goto: ''
            },
            children: [
                {
                  path: 'list', //导师列表
                  name: 'mentorlist',
                  component: MentorList,
                  meta: {
                    title: '导师列表',
                    goto: '/mentor/list'
                  }
                },
                {
                  path: 'audit', //导师审核
                  name: 'mentoraudit',
                  component: MentorAudit,
                  meta: {
                    title: '导师审核',
                    goto: '/mentor/audit'
                  }
                }
            ]
          },
          {
            path: 'anchor', //主播管理
            name: 'anchorManage',
            redirect: 'anchor/list',
            component: ParentView,
            meta: {
              title: '主播管理',
              goto: ''
            },
            children: [
                {
                  path: 'list', //主播列表
                  name: 'anchorlist',
                  component: AnchorList,
                  meta: {
                    title: '主播列表',
                    goto: '/anchor/list'
                  }
                },
                {
                  path: 'audit', //主播审核
                  name: 'anchoraudit',
                  component: AnchorAudit,
                  meta: {
                    title: '主播审核',
                    goto: '/anchor/audit'
                  }
                }
            ]
          },    
          {
            path: '/group/list', //群组管理列表
            name: 'grouplist',
            component: GroupList,
            meta: {
              title: '群组管理',
              goto: '/group/list'
            }
          },
          {
            path: '/operator/list', //后台用户列表
            name: 'operatorlist',
            component: OperatorList,
            meta: {
              title: '后台用户管理',
              goto: '/operator/list'
            }
          },
          {
            path: '/servicegroup', //客服组管理
            name: 'servicegroup',
            component: ServiceGroup,
            meta: {
              title: '客服组管理',
              goto: '/servicegroup'
            }
          }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'consultOrder', //咨询订单
      meta: {
        title: '咨询订单',
        goto: ''
      },
      children: [
        {
          path: 'applicationConsultation', //平台订单管理
          component: ParentView,
          meta: {
            title: '平台订单管理',
            goto: ''
          },
          children: [
              {
                path: 'platformOrder', //平台订单
                name: 'platformOrder',
                component: PlatformOrder,
                meta: {
                  title: '平台订单',
                  goto: '/applicationConsultation/platformOrder'
                }
              },
              {
                path: 'kefuIntervene', //客服介入订单
                name: 'kefuIntervene',
                component: KefuIntervene,
                meta: {
                  title: '客服介入订单',
                  goto: '/applicationConsultation/kefuIntervene'
                }
              }
          ]
        },
        {
          path: 'dreamCube', //梦立方
          component: ParentView,
          meta: {
            title: '梦立方',
            goto: ''
          },
          children: [
              {
                path: 'formalOrder', //正式订单
                name: 'dreamCubeFormalOrder',
                component: FormalOrder,
                meta: {
                  type: 'dreamCube',
                  title: '正式订单',
                  goto: '/dreamCube/formalOrder'
                }
              },
              {
                path: 'experienceOrder', //体验订单
                name: 'dreamCubeExperienceOrder',
                component: ExperienceOrder,
                meta: {
                  type: 'dreamCube',
                  title: '体验订单',
                  goto: '/dreamCube/experienceOrder'
                }
              }
          ]
        },
        {
          path: 'pleasantHeart', //悦然一心
          component: ParentView,
          meta: {
            title: '悦然一心',
            goto: ''
          },
          children: [
              {
                path: 'formalOrder', //正式订单
                name: 'pleasantHeartFormalOrder',
                component: FormalOrder,
                meta: {
                  type: 'pleasantHeart',
                  title: '正式订单',
                  goto: '/pleasantHeart/formalOrder'
                }
              },
              {
                path: 'experienceOrder', //体验订单
                name: 'pleasantHeartExperienceOrder',
                component: ExperienceOrder,
                meta: {
                  type: 'pleasantHeart',
                  title: '体验订单',
                  goto: '/pleasantHeart/experienceOrder'
                }
              }
          ]
        },
        {
          path: 'underLineOrder', //线下订单
          name: 'underLineOrder',
          component: UnderLineOrder,
          meta: {
            title: '线下订单',
            goto: '/underLineOrder'
          }
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'courseOrder', //课程订单
      meta: {
        title: '课程订单',
        goto: ''
      },
      children: [
        {
          path: 'courseOrder/list', //订单列表
          name: 'courseOrderList',
          component: CourseOrderList,
          meta: {
            title: '订单列表',
            goto: '/courseOrder/list'
          }
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'consultManage', //咨询管理
      meta: {
        title: '咨询管理',
        goto: ''
      },
      children: [
        {
          path: 'consultSet', //咨询设置
          redirect: 'consultSet/mentalCategory',
          component: ParentView,
          meta: {
            title: '咨询设置',
            goto: ''
          },
          children: [
              {
                path: 'mentalCategory', //心理分类
                name: 'mentalCategory',
                component: MentalCategory,
                meta: {
                  title: '心理分类',
                  goto: '/consultSet/mentalCategory'
                }
              },
              {
                path: 'personalityLabel', //个性化标签
                name: 'personalityLabel',
                component: PersonalityLabel,
                meta: {
                  title: '个性化标签',
                  goto: '/consultSet/personalityLabel'
                }
              }
          ]
        },
        {
          path: 'consultationMenu', //咨询套餐
          component: ParentView,
          meta: {
            title: '咨询套餐',
            goto: ''
          },
          children: [
              {
                path: 'list', //套餐列表
                name: 'ationMenuList',
                component: AtionMenuList,
                meta: {
                  title: '套餐列表',
                  goto: '/consultationMenu/list'
                }
              },
              {
                path: 'auditing', //套餐审核
                name: 'ationMenuAuditing',
                component: AtionMenuAuditing,
                meta: {
                  title: '套餐审核',
                  goto: '/consultationMenu/auditing'
                }
              }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'businessManage', //运营管理
      meta: {
        title: '运营管理',
        goto: ''
      },
      children: [
        {
          path: 'advertisement', //广告管理
          component: ParentView,
          meta: {
            title: '广告管理',
            goto: ''
          },
          children: [
              {
                path: 'banner', //banner图列表
                name: 'bannerList', 
                component: BannerList,
                meta: {
                  title: 'banner图管理',
                  goto: '/advertisement/banner'
                },
                children: [
                  {
                    path: 'addBanner', //添加banner
                    name: 'addBanner',
                    component: BannerOperate,
                    meta: {
                      title: '添加页面',
                      goto: '/advertisement/banner/addBanner'
                    },
                  }
                ]
              },
              {
                path: 'cover', //APP启动图列表
                name: 'coverList',
                component: CoverList,
                meta: {
                  title: 'APP启动图管理',
                  goto: '/advertisement/cover'
                },
                children: [
                  {
                    path: 'addCover', //添加启动图
                    name: 'addCover',
                    component: CoverOperate,
                    meta: {
                      title: '添加启动图',
                      goto: '/advertisement/cover/addCover'
                    },
                  }
                ]
              }
          ]
        },
        {
          path: 'interaction', //互动管理
          component: ParentView,
          meta: {
            title: '互动管理',
            goto: ''
          },
          children: [
              {
                path: 'keyWords', //关键词
                name: 'keyWords',
                component: KeyWords,
                meta: {
                  title: '关键词管理',
                  goto: '/interaction/keyWords'
                }
              },
              {
                path: 'audioChat', //音频聊天记录
                name: 'audioChat',
                component: AudioChat,
                meta: {
                  title: '音频聊天记录',
                  goto: '/interaction/audioChat'
                }
              },
              {
                path: 'textChat', //图文聊天记录
                name: 'textChat',
                component: TextChat,
                meta: {
                  title: '图文聊天记录',
                  goto: '/interaction/textChat'
                }
              }
          ]
        },
        {
          path: 'statistics', //数据统计
          component: ParentView,
          meta: {
            title: '数据统计',
            goto: ''
          },
          children: [
              {
                path: 'kefu', //客服统计
                name: 'kefuStatistics',
                component: KefuStatistics,
                meta: {
                  title: '客服统计',
                  goto: '/statistics/kefu'
                }
              },
              {
                path: 'mentor', //咨询师统计
                name: 'mentorStatistics',
                component: MentorStatistics,
                meta: {
                  title: '咨询师统计',
                  goto: '/statistics/mentor'
                }
              }
          ]
        },
        {
          path: 'magazine', //杂志管理
          component: ParentView,
          meta: {
            title: '杂志管理',
            goto: ''
          },
          children: [
              {
                path: 'classify', //杂志分类
                name: 'magazineClassify',
                component: MagazineClassify,
                meta: {
                  title: '杂志分类',
                  goto: '/magazine/classify'
                }
              },
              {
                path: 'list', //杂志列表
                name: 'magazineList',
                component: MagazineList,
                meta: {
                  title: '杂志列表',
                  goto: '/magazine/list'
                }
              },
              {
                path: 'auditing', //杂志审核
                name: 'magazineAuditing',
                component: MagazineAuditing,
                meta: {
                  title: '杂志审核',
                  goto: '/magazine/auditing'
                }
              }
          ]
        },
        {
          path: 'reportInfo', //举报信息
          name: 'reportInfo',
          component: ReportInfo,
          meta: {
            title: '举报信息',
            goto: '/reportInfo'
          },
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'liveManage', //直播管理
      meta: {
        title: '直播管理',
        goto: ''
      },
      children: [
        {
          path: 'liveSet', //直播设置
          component: ParentView,
          meta: {
            title: '直播设置',
            goto: ''
          },
          children: [
              {
                path: 'gallery', //图库管理
                name: 'galleryList',
                component: GalleryList,
                meta: {
                  title: '图库管理',
                  goto: '/liveSet/gallery'
                },
                children: [
                  {
                    path: 'addGallery', //新增图片
                    name: 'addGallery',
                    component: GalleryOperate,
                    meta: {
                      title: '新增图片',
                      goto: '/liveSet/gallery/addGallery'
                    }
                  }
                ]
              },
              {
                path: 'gift', //礼物管理
                name: 'giftList',
                component: GiftList,
                meta: {
                  title: '礼物管理',
                  goto: '/liveSet/gift'
                },
                children: [
                  {
                    path: 'addGift', //新增礼物
                    name: 'addGift',
                    component: GiftOperate,
                    meta: {
                      title: '新增礼物',
                      goto: '/liveSet/gift/addGift'
                    }
                  }
                ]
              }
          ]
        },
        {
          path: 'liveForeshow', //直播预告
          name: 'foreshowList',
          component: ForeshowList,
          meta: {
            title: '直播预告',
            goto: '/liveForeshow'
          }
        },
        {
          path: 'liveRoom', //直播间管理
          name: 'liveRoomList',
          component: LiveRoomList,
          meta: {
            title: '直播间管理',
            goto: '/liveRoom'
          }
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'radioManage', //电台管理
      meta: {
        title: '电台管理',
        goto: ''
      },
      children: [
        {
          path: 'radioSet', //电台设置
          component: ParentView,
          meta: {
            title: '电台设置',
            goto: ''
          },
          children: [
              {
                path: 'list', //电台分类
                name: 'radioList',
                component: RadioList,
                meta: {
                  title: '电台分类',
                  goto: '/radioSet/list'
                }
              }
          ]
        },
        {
          path: 'program', //专辑管理
          component: ParentView,
          meta: {
            title: '专辑管理',
            goto: ''
          },
          children: [
              {
                path: 'list', //专辑列表
                name: 'programList', 
                component: ProgramList,
                meta: {
                  title: '专辑列表',
                  goto: '/program/list'
                },
                children: [
                  {
                    path: 'addProgram', //添加专辑
                    name: 'addProgram',
                    component: ProgramOperate,
                    meta: {
                      title: '添加专辑',
                      goto: '/program/list/addProgram'
                    }
                  }
                ]
              },
              {
                path: 'anchorRadio', //节目列表
                name: 'anchorRadio',
                component: AnchorRadio,
                meta: {
                  title: '节目列表',
                  goto: '/program/anchorRadio'
                }
              },
              {
                path: 'radioCount', //节目统计
                name: 'radioCount',
                component: RadioCount,
                meta: {
                  title: '节目统计',
                  goto: '/program/radioCount'
                }
              }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'courseManage', //课程管理
      meta: {
        title: '课程管理',
        goto: ''
      },
      children: [
        {
          path: 'topicColumn', //音频课程
          name: 'topicColumnList',
          component: TopicColumnList,
          meta: {
            title: '音频课程',
            goto: '/topicColumn'
          },
          children: [
              {
                path: 'addColumn', //添加专栏
                name: 'addColumn', 
                component: ColumnOperate,
                meta: {
                  title: '添加专栏',
                  goto: '/topicColumn/addColumn'
                },
              },
              {
                path: ':id', //查看课程
                name: 'seeCourse',
                component: SeeCourse,
                meta: {
                  title: '查看课程',
                  goto: ''
                },
                children: [
                    {
                      path: 'addCourse', //添加课程
                      name: 'addCourse',
                      component: CourseOperate,
                      meta: {
                        title: '添加课程',
                        goto: ''
                      },
                    }
                ]
              }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Index,
      meta: {
        title: '首页',
        goto: ''
      },
      children: [
          {
            path: '/dataDictionary', //数据字典
            name: 'dataDictionary',
            component: DataDictionary,
            meta: {
              title: '数据字典',
              goto: '/dataDictionary'
            },
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