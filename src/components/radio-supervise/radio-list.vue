<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-table
		    :data="tableData"
		    stripe
		    border
		    v-loading="loading"
		    style="width: 100%"
		>	
		    <el-table-column label="标题">
		    	<template slot-scope="scope">
		    		<router-link :to="{ name:'radioList',query:{ id: scope.row.id } }">{{ scope.row.title }}</router-link>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="name" label="名称"></el-table-column>
		    <el-table-column prop="tuijian" label="是否推荐"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="编辑" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
		    		<el-tooltip content="删除" placement="top">
					  <el-button @click="del(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加新纪录</el-button>
		  </el-col>
		  <el-col :span="12">
		  	<page-num
		  		v-if="pageTotal.total > pageTotal.pageSize"
				:currentpage="pageTotal.page"
				:total="pageTotal.total"
				:pageSize="pageTotal.pageSize"
				:render="getList"
				:options="pageTotal">
			</page-num>
		  </el-col>
		</el-row>

		<el-dialog 
			:title="dialogTitle" 
			:visible.sync="dialogFormVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false"
		>
		  	<el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="roleForm.title" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="名称" prop="name">
			    <el-input v-model="roleForm.name" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('roleForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="dialogFormVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'radioList',
		data() {
			return {
				dataPath: ['电台管理', '电台设置', '电台分类'],
				rules: {
		          title: [
		            { required: true, message: '标题不能为空' }
		          ],
		          name: [
		            { required: true, message: '名称不能为空' }
		          ]
		        },
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 10,
			        page: 1
			    },
				loading: false, //表格loading
				dialogTitle: '添加记录',
		        dialogFormVisible: false, //弹窗
		        submitLoading: false, //提交按钮
		        roleForm: {
		        	title: '',
		        	name: '',
		        	parentMenucode: 0
		        },
				tableData: [{
					id: 1,
					title: '主题(必填)',
					name: '主题',
					tuijian: 0
				}]
			}
		},
		methods: {
			add() { //添加记录
				this.dialogTitle = '添加记录'
				this.dialogFormVisible = true

				this.roleForm.title = ''
				this.roleForm.name = ''
			},
			edit(row) { //编辑记录
				this.dialogTitle = '修改角色';
		      	this.dialogFormVisible = true;

		      	this.roleForm.title = row.title
				this.roleForm.name = row.name
			},
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            // this.submitLoading = true
		            console.log(this.roleForm)
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		},
		components: {
			BreadCrumb,
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-row {
		margin-top: 15px;
		& .el-pagination {
			float: right;
		}
	}
</style>