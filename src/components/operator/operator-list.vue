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
					<el-button @click="editRole(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus">添加用户</el-button>
		  	<el-button type="primary" icon="el-icon-circle-plus">分组</el-button>
		  </el-col>
		  <el-col :span="12">
		  	<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
		  </el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'mentorlist',
		data() {
			return {
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
		        multipleSelection: []
			}
		},
		methods: {
			onSubmit() {
	        	console.log(this.formObj);
	      	},
	      	handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    }
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
</style>