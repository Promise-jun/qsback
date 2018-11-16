// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Velocity from 'velocity-animate' //animate动画

import 'common/css/index.css'
import 'common/iconfont/iconfont.css'

import {getCookie} from 'common/js/util'

import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/api'; //这是调用数据接口
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})