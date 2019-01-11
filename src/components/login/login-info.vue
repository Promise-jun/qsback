<template>
  <div>
    <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
      <div class="el-dropdown-link">
        <img :src="$store.state.userInfo.userImage">
        <span>{{$store.state.userInfo.userNickname}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item command="changePass"><i class="el-icon-setting list-icon"></i>修改密码</el-dropdown-item> -->
        <el-dropdown-item><i class="el-icon-message list-icon"></i>进入聊天室</el-dropdown-item>
        <el-dropdown-item command="logout" divided><i class="el-icon-circle-close-outline list-icon"></i>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from '../../store'

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
      } else if (command === 'logout') {
        this.$router.push({
          path: '/login'
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
    background: rgba(255, 255, 255, .4);
    &:hover {
      background: rgba(255, 255, 255, .5);
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
