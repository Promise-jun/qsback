<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" class="demo-form-inline">
		  <el-form-item label="关键词">
		  	<el-input v-model="keyWords" placeholder="请输入关键词"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '个关键词'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="id" label="ID"></el-table-column>
		    <el-table-column prop="keyWords" label="关键词"></el-table-column>
		    <el-table-column prop="time" label="时间">
		      <template slot-scope="scope">{{ scope.row.time | formatDate }}</template>
		    </el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加关键词</el-button>
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
			  <el-form-item label="关键词" prop="keyWords">
			    <el-input v-model="roleForm.keyWords" autocomplete="off"></el-input>
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
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'keyWords',
		data() {
			return {
				dataPath: ['运营管理', '互动管理', '关键词管理'],
				rules: {
		          keyWords: [
		            { required: true, message: '关键词不能为空' }
		          ]
		        },
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
				keyWords: '',
				dialogTitle: '添加关键词',
		        dialogFormVisible: false,
		        submitLoading: false,
				loading: false,
				tableData: [{
					id: 23,
					keyWords: '微信',
					time: 1543209657000
				}],
				roleForm: {
					keyWords: ''
				}
			}
		},
		filters: {
		    formatDate(time) {
		    	var date = new Date(time);
		    	return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
		   	}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {

			},
			add() { //添加关键词
				this.dialogTitle = '添加关键词';
		      	this.dialogFormVisible = true;

		      	delete this.roleForm.id;
				this.roleForm.keyWords = ''
			},
			edit(row) { //编辑关键词
				this.dialogTitle = '修改关键词';
		      	this.dialogFormVisible = true;

		      	this.roleForm.id = row.id
				this.roleForm.keyWords = row.keyWords
			},
			onSubmit() {
	        	this.getList();
	      	},
	      	submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            // this.submitLoading = true
		          	console.log(this.roleForm)
		          	this.dialogFormVisible = false;
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