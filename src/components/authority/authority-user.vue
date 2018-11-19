<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>
    	
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="用户">
		    <el-select v-model="formObj.type" placeholder="用户分类">
		      <el-option label="按用户名" value="1"></el-option>
		      <el-option label="按姓名" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-row :gutter="20">
		  <el-col :span="8">

		  	<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>用户列表</span>
			  </div>
			  <div v-for="(item, index) in 4" :key="item" class="text item" :class="{active: isActive === index}" @click="chooseUser(index)">用户{{item}}</div>
			</el-card>

		  </el-col>
		  <el-col :span="16">

		  	<el-card class="box-card" v-show="isActive !== ''">
				<div slot="header" class="clearfix">
				    <span>功能列表</span>
				</div>
				<el-tree
				  :data="data2"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  :props="defaultProps">
				</el-tree>
			</el-card>

		  </el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'

	export default {
		name: 'authorityUser',
		data() {
			return {
				dataPath: ['权限管理', '用户权限管理'],
				formObj: {
		          type: '1',
		          name: ''
		        },
		        isActive: '',
		        data2: [{
		          id: 1,
		          label: '一级 1',
		          children: [{
		            id: 4,
		            label: '二级 1-1',
		            children: [{
		              id: 9,
		              label: '三级 1-1-1'
		            }, {
		              id: 10,
		              label: '三级 1-1-2'
		            }]
		          }]
		        }, {
		          id: 2,
		          label: '一级 2',
		          children: [{
		            id: 5,
		            label: '二级 2-1'
		          }, {
		            id: 6,
		            label: '二级 2-2'
		          }]
		        }, {
		          id: 3,
		          label: '一级 3',
		          children: [{
		            id: 7,
		            label: '二级 3-1'
		          }, {
		            id: 8,
		            label: '二级 3-2'
		          }]
		        }],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        }
			}
		},
		methods: {
			onSubmit() {
		        console.log('submit!');
		    },
			changeVal() {
				console.log(this.value)
			},
			chooseUser(index) { //选择用户
				this.isActive = index;
			}
		},
		components: {
			BreadCrumb
		}
	}
</script>

<style type="text/css" lang="scss" scoped="">
	.item {
		padding: 6px;
		cursor: pointer;
		&:hover {
			background-color: #F2F6FC;
		}
		&.active {
			color: #fff;
			background-color: #7BB6F3;
		}
	}
</style>