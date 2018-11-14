<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-col :span="12"><h1>情说后台管理系统</h1></el-col>
        <el-col :span="12">
          <login-info></login-info>
        </el-col>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-main id="container">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LoginInfo from 'components/login/login-info'
import NavMenu from 'components/nav-menu/nav-menu'

export default {
  name: 'App',
  created() {
    
  },
  components: {
    LoginInfo,
    NavMenu
  }
} 
</script>

<style lang="scss">
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
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
