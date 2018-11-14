<template>
  <div>
    <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
      <div class="el-dropdown-link">
        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3859421672,511986628&fm=200&gp=0.jpg">
        <span>admin</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePass"><i class="el-icon-setting list-icon"></i>修改密码</el-dropdown-item>
        <el-dropdown-item><i class="el-icon-message list-icon"></i>进入聊天室</el-dropdown-item>
        <el-dropdown-item divided><i class="el-icon-circle-close-outline list-icon"></i>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'loginInfo',
  data () {
    return {
      
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'changePass') {
        this.$router.push({
          path: '/changePass'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .dropdown {
    float: right;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
    padding: 0 5px;
    background: #6EB4FC;
    &:hover {
      background: #8CC2FA;
    }
    & img {
      display: inline-block;
      vertical-align: middle;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
  .list-icon {
    margin-right: 6px;
  }
</style>
