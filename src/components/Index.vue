<template>
  <el-container>
    <el-header>
      <el-col :span="12"><h1>情说后台管理系统</h1></el-col>
      <el-col :span="12">
        <login-info></login-info>
      </el-col>
    </el-header>
    <el-container>
      <nav-menu class="menu" ref="menu" @clickme="changeWidth"></nav-menu>
      <div class="main" id="container" ref="main">
        <!-- 面包屑 -->
        <bread-crumb></bread-crumb>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import BreadCrumb from 'base/bread-crumb/bread-crumb' 
import LoginInfo from 'components/login/login-info'
import NavMenu from 'components/nav-menu/nav-menu'

export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    changeWidth(fold) {
      if (fold) {
          Velocity(this.$refs.menu.$refs.menulist, {
            width: 65
          }, {
            easing: 'easeOutQuint',
            duration: 200,
            queue: false
          })
          Velocity(this.$refs.main, {
            left: 65
          }, {
            easing: 'easeOutQuint',
            duration: 200,
            queue: false
          })
      } else {
          Velocity(this.$refs.menu.$refs.menulist, {
            width: 200
          }, {
            easing: 'easeOutQuint',
            duration: 200,
            queue: false
          })
          Velocity(this.$refs.main, {
            left: 200
          }, {
            easing: 'easeOutQuint',
            duration: 200,
            queue: false
          })
      }
    }
  },
  components: {
    BreadCrumb,
    LoginInfo,
    NavMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $main-color: #409EFF;
  .el-header, .el-footer {
    background-color: $main-color;
    line-height: 60px;
    & h1 {
      font-size: 22px;
      color: #fff;
    }
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .menu {
    width: 200px;
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
  }
  .el-menu {
    border-right: 0;
  }
  .main {
    position: absolute;
    top: 60px;
    left: 200px;
    bottom: 0;
    right: 0;
    background-color: #fff;
    padding: 20px;
  }
    
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
</style>
