<template>
  <div ref="menulist">
    <el-menu router unique-opened :collapse="isFold" :default-active="onRoutes" background-color="#324157" text-color="#BFCBD9">
    	<div class="fold" @click="fold"><i class="iconfont icon-swap"></i></div>
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
        name: '首页',
        icon: 'el-icon-menu'
    },
    {
    	name: '角色管理',
    	icon: 'el-icon-menu',
        path: '/role'
    },
    {
    	name: '功能管理',
    	icon: 'el-icon-menu',
        path: '/function'
    },
    {
    	name: '权限管理',
    	icon: 'el-icon-menu',
    	child: [
    		{
    			name: '角色权限管理',
    			path: '/authority/role'
    		},
    		{
    			name: '用户权限管理',
    			path: '/authority/user'
    		}
    	]
    },
    {
        name: '用户管理',
        icon: 'el-icon-menu',
        child: [
            {
                name: '客户管理',
                path: '/userlist'
            },
            {
                name: '导师管理',
                child: [
                    {
                    	name: '导师列表',
                        path: '/mentor/list'
                    },
                    {
                    	name: '导师审核',
                        path: '/mentor/audit'
                    }
                ]
            },
            {
                name: '主播管理',
                child: [
                    {
                    	name: '主播列表',
                        path: '/anchor/list'
                    },
                    {
                    	name: '主播审核',
                        path: '/anchor/audit'
                    }
                ]
            },
            {
                name: '群组管理',
                path: '/group/list'
            },
            {
                name: '后台用户管理',
                path: '/operator/list'
            },
            {
            	name: '客服组管理',
            	path: '/servicegroup'
            }
        ]
    },
    {
    	name: '个人中心',
    	icon: 'el-icon-menu',
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
    	navList: data,
    	isFold: false  //是否折叠
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes(){
        return this.$route.path
    }
  },
  methods: {
  	fold() {
  		this.isFold = !this.isFold
  		this.$emit('clickme', this.isFold);
  	}
  },
  components: {
  	NavItem
  }
}

</script>
<style type="text/css" lang="scss" scoped>
	.fold {
		text-align: center;
		font-size: 30px;
		line-height: 30px;
		color: #fff;
		cursor: pointer;
		&:hover {
			background-color: #4E5C71;
		}
	}
</style>
