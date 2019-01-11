// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import Velocity from 'velocity-animate' //animate动画
import moment from 'moment' //时间格式化

import 'common/css/index.css'
import 'common/css/public.scss'
import 'common/iconfont/iconfont.css'

import {getCookie} from 'common/js/util'

import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 20000;
if (process.env.NODE_ENV == 'development') { //开发环境
  axios.defaults.baseURL = '/api'; //这是调用数据接口
} else {
  axios.defaults.baseURL = '/api'; //这是调用数据接口
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http response 拦截器
axios.interceptors.response.use(
  response => {
    //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    if (response.data.code == 505) {
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
      })
    }
    // console.log(response)
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  }
);
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;

/*import axios from 'axios'
import {post,fetch,patch,put} from 'common/js/http'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;*/

Vue.config.productionTip = false

//处理是否登录
/*router.beforeEach((to, from, next) => {
  let isLogin = getCookie('admin_token')
  if (!isLogin && to.name !== 'login') {  // 未登录且要跳转的页面不是登录页
    next('/login')
  } else if (!isLogin && to.name === 'login') {  // 未登陆且要跳转的页面是登录页
    next()
  } else if (isLogin && to.name === 'login') { // 已登录且要跳转的页面是登录页
    next('/')
  } else {
    next()
  }
})*/

//处理用户权限
var permissionList = []
function initRoute(router){
    return new Promise((resolve) => {
        if(permissionList.length == 0){
            store.dispatch('getNavList').then(() => {
                store.dispatch('getPermissionList').then((res) => {
                    permissionList = res
                    
                    res.forEach(function(v){
                        let routeItem = router.match(v.path)
                        if(routeItem){
                            routeItem.meta.permission = v.child ? v.child : []
                            // routeItem.meta.name = v.name
                        }
                    })
                    resolve()
                })
            })
        } else{
            // console.log("已有权限数据")
            resolve()
        }
    })
}
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
      next()
    } else {
      initRoute(router).then(() => {
          let isPermission = false
          // console.log(permissionList)
          permissionList.forEach((v) => {
              // 判断跳转的页面是否在权限列表中
              if(v.path == to.path){
                  isPermission = true
              }
          })
          
          // 没有权限时跳转到404页面
          if(!isPermission){
              if (to.path == '/404') {
                next()
              } else {
                next({path: "/404", replace: true})
              }
          } else {
              next()
          }
      })
    }
    // next()
})

//控制按钮权限的自定义指令
Vue.directive('hasPermission', {
    bind(el, binding, vnode){
        let permissionList = vnode.context.$route.meta.permission
        if(permissionList && permissionList.length){
            let isShow = permissionList.findIndex(item => {
              return item.id == binding.value
            })
            if (isShow == -1) {
              el.parentNode.removeChild(el)
            }
        } else {
          el.parentNode.removeChild(el)
        }
    }
})

Vue.use(ElementUI);

//全局格式化过滤器
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})