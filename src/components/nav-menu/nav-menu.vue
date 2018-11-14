<template>
  <div>
    <el-menu router unique-opened  :default-active="onRoutes">
        <!-- 循环navList数组，将每项的值及index传给nav-item组件 -->
        <nav-item v-for="(item, index) in navList" :item="item" :navIndex="String(index)" :key="index"></nav-item>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
import NavItem from 'components/nav-menu/nav-item'

let data = [
    {
        path: '/',
        name: '首页'
    },
    {
        name: '系统组件',
        child: [
            {
                name: '介绍',
                path: '/components'
            },
            {
                name: '功能类',
                child: [
                    {
                        path: '/components/permission',
                        name: '详细鉴权'
                    },
                    {
                        path: '/components/pageTable',
                        name: '表格分页'
                    }
                ]
            }
        ]
    },
    {
    	name: '个人中心',
    	child: [
    		{
    			name: '修改密码',
    			path: '/changePass'
    		}
    	]
    }
]

export default {
  name: 'navMenu',
  data() {
    return {
    	navList: data
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes(){
        return this.$route.path
    }
  },
  components: {
  	NavItem
  }
}

</script>
<style type="text/css" lang="scss" scoped>
</style>
