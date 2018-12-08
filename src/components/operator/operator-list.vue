<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userid" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="用户名">
		    <el-input v-model="formObj.nickName" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="角色">
		    <el-select v-model="formObj.role" placeholder="请选择">
			    <el-option v-for="item in roleArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="状态">
		    <el-select v-model="formObj.status" placeholder="请选择">
			    <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-table
		    ref="tableList"
		    stripe
		    border
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="ID">
		      <template slot-scope="scope">{{ scope.row.userid }}</template>
		    </el-table-column>
		    <el-table-column prop="username" label="用户名"></el-table-column>
			<el-table-column prop="nickName" label="昵称"></el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="role" label="角色"></el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="qscode" label="关联的用户情说号"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top">
				  		<el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top">
				  		<el-button @click="del(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
					<el-tooltip content="创建IM账号" placement="top">
				  		<el-button @click="del(scope.row)" type="text" icon="iconfont icon-file-markdown" style="color: #67C23A;"></el-button>
					</el-tooltip>
					<el-tooltip content="关联用户账号" placement="top">
				  		<el-button @click="associate(scope.row)" type="text" icon="iconfont icon-deploymentunit" style="color: #E6A23C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus">添加用户</el-button>
		  	<el-button type="primary" icon="el-icon-circle-plus">分组</el-button>
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

		<el-dialog title="提示" :visible.sync="associateVisible" width="40%">
		  	<el-form :model="associateForm">
		    	<el-form-item label="输入请说号" label-width="100px">
		      		<el-input v-model="associateForm.name" autocomplete="off"></el-input>
		    	</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		   		<el-button @click="associateVisible = false">取 消</el-button>
		   		<el-button type="danger" @click="associateVisible = false">取消关联</el-button>
		    	<el-button type="primary" @click="associateVisible = false">确 定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'mentorlist',
		data() {
			return {
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 5,
			        page: 1
			    },
				formObj: {
					userid: '',
					name: '',
					nickName: '',
					role: '',
					status: '',  //服务人员状态
				},
				roleArr: [{
				  value: '1',
		          label: '超级管理员'
				}, {
				  value: '2',
		          label: '管理员'
				}],
				statusArr: [{
		          value: '1',
		          label: '可用'
		        }, {
		          value: '2',
		          label: '禁用'
		        }, {
		          value: '3',
		          label: '注销'
		        }],
		        tableList: [{
		        	userid: 7541,
		        	username: "大方点",
		        	phone: "135****4532",
		          	nickName: '俄方岁',
		          	role: '超级管理员',
		          	name: '高圆圆',
		          	qscode: '123456'
		        }, {
		        	userid: 7541,
		        	username: "大方点",
		        	phone: "135****4532",
		          	nickName: '俄方岁',
		          	role: '超级管理员',
		          	name: '高圆圆',
		          	qscode: '123456'
		        }],
		        multipleSelection: [],
		        // 关联用户账号
		        associateVisible: false,
		        associateForm: {}
			}
		},
		methods: {
			getList() {
				
			},
			onSubmit() {
	        	console.log(this.formObj);
	      	},
	      	handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    },
		    // 关联用户账号
		    associate(row) {
		    	this.associateVisible = true
		    }
		},
		components: {
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
</style>