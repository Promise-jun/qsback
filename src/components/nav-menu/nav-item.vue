<template>
	<!-- 如果当前item中有子节点 -->
    <el-submenu v-if="item.child && item.child.length" :index="navIndex"> 
        <!-- 创建菜单分组 -->
        <template slot="title">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
        </template>
        <!-- 递归调用自身，直到subItem不含有子节点 -->
        <nav-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" >
        </nav-item>
    </el-submenu>

    <!-- 如果当前item不含有子节点 -->
    <el-menu-item v-else :index="item.path">
        <i v-if="item.icon" :class="item.icon"></i>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>

<script type="text/javascript">
	export default {
		name: 'navItem',
		props: ['item','navIndex']
	}
</script>

<style type="text/css">
	
</style>