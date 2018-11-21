<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>
		<el-row>
		  <el-col :span="24">
		  	状态：
		  	<el-select v-model="statusVal" placeholder="活动区域">
		      <el-option label="全部" value="0"></el-option>
		      <el-option label="可用" value="1"></el-option>
		      <el-option label="不可用" value="2"></el-option>
		    </el-select>
		    <el-button type="primary" icon="el-icon-circle-plus">查询</el-button>
		  </el-col>
		</el-row>
	    
	    <el-table
		    :data="tableData"
		    stripe
		    border
		    v-loading="loading"
		    style="width: 100%"
		>	
		    <el-table-column prop="labelName" label="标签名称"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">新增标签</el-button>
		  </el-col>
		  <el-col :span="12">
		  	<!-- <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentPage"></el-pagination> -->
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

		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
		  <el-form :model="formData" status-icon :rules="rules" ref="roleForm" label-width="100px">
		    <el-form-item label="名称" prop="name">
		      <el-input v-model="formData.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="状态" prop="status">
		      	<el-select v-model="formData.status">
			      <el-option label="可用" value="1"></el-option>
			      <el-option label="不可用" value="2"></el-option>
			    </el-select>
		    </el-form-item>
		    <el-form-item>
			  <el-button type="primary" @click="submitForm('roleForm')" :loading="submitLoading">提交</el-button>
			  <el-button @click="dialogVisible = false">取消</el-button>
			</el-form-item>
		  </el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format' //时间格式化方法

	export default {
		name: 'personalityLabel',
		data() {
			return {
				dataPath: ['咨询管理', '咨询设置', '个性化标签'],
				rules: {
		          name: [
		            { required: true, message: '名称不能为空' },
		          ],
		          status: [
		            { required: true, message: '请选择状态' },
		          ]
		        },
				submitLoading: false, //提交按钮loading
				dialogVisible: false,  //弹窗是否显示
				dialogTitle: '添加标签',  //弹窗标题
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 6,
			        page: 1
			    },
			    loading: false,
				tableData: [], //表格数据
				formData: {  //输入数据
		        	name: '',
		        	status: ''
		        },
		        statusVal: '0'  //查询状态
			}
		},
		mounted() {
			let data = [{
				id: 1,
				labelName: '123',
				status: '1',
				createTime: '234'
			}] 
			this.tableData = data
		},
		filters: {
		    formatDate(time) {
		    	var date = new Date(time);
		    	return formatDate(date, 'yyyy-MM-dd');
		   	}
		},
		methods: {
			add() { //新增标签
				this.dialogVisible = true;
				this.dialogTitle = '添加标签';
				this.formData = {};

				let nowDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
				console.log(nowDate)
			},
			edit(row) { //编辑标签
				let newRow = {
		      		id: row.id,
		      		name: row.labelName,
		      		status :row.status
		      	}
				this.dialogVisible = true;
				this.dialogTitle = '修改标签';
				this.formData = newRow;
			},
			submitForm(formName) { //提交表单
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	console.log(this.formData)
		          	this.submitLoading = true
		          	/*if (!this.formData.categoryId) { //新增
		          		this.addClassify();
		          	} else { //编辑
		          		this.editClassify();
		          	}*/
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
	.el-table {
		margin: 20px 0;
	}
	.el-pagination {
		float: right;
	}
</style>