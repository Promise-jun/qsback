<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-table
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%"
		>	
		    <el-table-column prop="title" label="标题">
		    	<template slot-scope="scope">
		    		<router-link :to="{ name:'func',query:{ pid: scope.row.id } }">{{ scope.row.title }}</router-link>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="name" label="名称"></el-table-column>
		    <el-table-column prop="icon" label="图标"></el-table-column>
		    <el-table-column prop="isShow" label="是否显示"></el-table-column>
		    <el-table-column prop="sort" label="排序"></el-table-column>
		    <el-table-column prop="path" label="访问路径"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="编辑" placement="top">
					  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
		    		<el-tooltip content="删除" placement="top">
					  <el-button @click="delRole(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<div class="btns">
			<el-button type="primary" icon="el-icon-circle-plus" @click="addRole">添加新纪录</el-button>
		</div>

		<func-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :roleData="roleData" @submit="submitData"></func-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import FuncDialog from 'components/func/func-dialog'

	export default {
		name: 'func',
		data() {
			return {
				dataPath: ['功能管理'],
				tableData: [{
					id: 1,
					title: '角色管理',
				  	name: 'role',
				  	icon: 'el-icon-menu',
				  	isShow: true,
				  	sort: 1,
		          	path: '/role'
		        }],
		        dialogTitle: '添加记录',
		        dialogFormVisible: false,
		        roleData: {}
			}
		},
		beforeRouteUpdate (to, from, next) {
			console.log(123)
			next();
		    // 在当前路由改变，但是该组件被复用时调用
		    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		    // 可以访问组件实例 `this`
		},
		methods: {
			// 添加角色
		    addRole() {
		      	this.dialogTitle = '添加记录';
		      	this.dialogFormVisible = true;
		      	this.roleData = {
		      		title: '',
		      		name: '',
		      		icon: '',
		      		isShow: true,
		      		sort: '',
		      		path: ''
		      	}
		    },
		    // 编辑角色
		    editRole(row) {
		      	let newRow = {
		      		id: row.id,
		      		title: row.title,
		      		name: row.name,
		      		icon: row.icon,
		      		isShow: row.isShow,
		      		sort: row.sort,
		      		path: row.path
		      	}
		      	this.dialogTitle = '修改角色';
		      	this.dialogFormVisible = true;
		      	this.roleData = newRow;
		    },
		    submitData(data) {
	      		console.log(data)
	      		this.dialogFormVisible = false;
	      	}
	  	},
		watch:{
	        $route( to , from ){ //监听路由变化
	//             console.log( to.query )
	         }
		},
		components: {
			BreadCrumb,
			FuncDialog
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.btns {
		margin-top: 15px;
	}
</style>