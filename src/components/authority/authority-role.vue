<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>
    	角色列表：
    	<el-select v-model="value" placeholder="请选择" @change="changeVal">
		    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>

		<el-card class="box-card">
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

		<div class="buttons">
		  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
		  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
		  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
		  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
		  <el-button @click="resetChecked">清空</el-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'

	export default {
		name: 'authorityRole',
		data() {
			return {
				dataPath: ['权限管理', '角色权限管理'],
				options: [{
		          value: '选项1',
		          label: '超级管理员'
		        }, {
		          value: '选项2',
		          label: '管理员'
		        }],
		        value: '',
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
			changeVal() {
				console.log(this.value)
			},
			  getCheckedNodes() {
		        console.log(this.$refs.tree.getCheckedNodes());
		      },
		      getCheckedKeys() {
		        console.log(this.$refs.tree.getCheckedKeys());
		      },
		      setCheckedNodes() {
		        this.$refs.tree.setCheckedNodes([{
		          id: 5,
		          label: '二级 2-1'
		        }, {
		          id: 9,
		          label: '三级 1-1-1'
		        }]);
		      },
		      setCheckedKeys() {
		        this.$refs.tree.setCheckedKeys([3]);
		      },
		      resetChecked() {
		        this.$refs.tree.setCheckedKeys([]);
		      }
		},
		components: {
			BreadCrumb
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.box-card {
		margin: 20px 0;
	}
</style>