<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.userName" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="昵称">
		    <el-input v-model="formObj.userNickname" placeholder="请输入昵称"></el-input>
		  </el-form-item>
		  <!-- <el-form-item label="渠道">
		    <el-select v-model="formObj.canal" placeholder="请选择">
		  			    <el-option v-for="item in canalArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item label="客服">
		    <el-select v-model="formObj.kefu" placeholder="请选择">
		  			    <el-option v-for="item in kefuArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item label="账户属性">
		    <el-select v-model="formObj.attr" placeholder="请选择">
		  			    <el-option v-for="item in attrArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item> -->
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert title="总计416个用户" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="userlist"
		    stripe
		    border
		    v-loading="loading"
		    :data="userList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="用户ID">
		      <template slot-scope="scope">{{ scope.row.userId }}</template>
		    </el-table-column>
		    <el-table-column prop="userNickname" label="昵称"></el-table-column>
		    <el-table-column prop="createTm" label="注册时间" width="150"></el-table-column>
		    <el-table-column prop="userName" label="姓名"></el-table-column>
		    <el-table-column prop="userSourceName" label="渠道"></el-table-column>
		    <el-table-column prop="moneyBalance" label="金额"></el-table-column>
		    <el-table-column prop="goldBalance" label="金币"></el-table-column>
		    <el-table-column prop="createNm" label="客服"></el-table-column>
		    <el-table-column label="操作" width="150">
		      <template slot-scope="scope">
		    	<el-tooltip content="编辑" placement="top">
				  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
				</el-tooltip>
				<el-tooltip content="禁用" placement="top" v-show="!isLock">
				  <el-button type="text" icon="iconfont icon-lock" style="color: #F56C6C;"></el-button>
				</el-tooltip>
				<el-tooltip content="启用" placement="top" v-show="isLock">
				  <el-button type="text" icon="iconfont icon-unlock" style="color: #67C23A;"></el-button>
				</el-tooltip>
				<el-tooltip content="添加导师或主播" placement="top">
				  <el-button type="text" icon="iconfont icon-plus-circle" style="color: #E6A23C;"></el-button>
				</el-tooltip>
				<el-tooltip content="分配客服" placement="top">
				  <el-button type="text" icon="iconfont icon-cluster" style="color: #00A5FF;"></el-button>
				</el-tooltip>
				<el-tooltip content="重置密码" placement="top">
				  <el-button type="text" icon="iconfont icon-edit-square" style="color: #F56C6C;"></el-button>
				</el-tooltip>
			  </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="addUser">添加用户</el-button>
		  	<el-button type="primary" icon="el-icon-circle-plus">添加IM账号</el-button>
		  	<el-button type="primary" icon="el-icon-rank">批量分配客服</el-button>
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

		<transition name="fade" mode="out-in">
			<router-view class="children-view"></router-view>
		</transition>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'

	export default {
		name: 'userlist',
		data() {
			return {
				dataPath: ['用户管理', '客户管理'],
				loading: false,
				formObj: {
					userId: '',
					userName: '',
					userNickname: ''
				},
		        userList: [],
		        multipleSelection: [],
		        isLock: false,  //是否禁用
		        pageTotal: { //分页数据
			        total: 0,
			        pageSize: 10,
			        page: 1
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
			this.getList();
		},
		methods: {
			getList() {
				let uploadData = {
					userType: 0,
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize,
					userId: this.formObj.userId,
					userName: this.formObj.userName,
					userNickname: this.formObj.userNickname
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/user/queryForList',
					data: this.$qs.stringify(uploadData)
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						if (result.data.list.length) {
							this.pageTotal = {
				              total: parseInt(result.data.total),
				              pageSize: parseInt(result.data.pageSize),
				              page: parseInt(result.data.pageNum)
				            };
						}
			        	this.userList = result.data.list
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
		  addUser() { //添加用户
		  	this.$router.push({
		  		path: '/userlist/addUser'
		  	})
		  },
	      onSubmit() {
	        this.getList();
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	      }
	    },
		components: {
			BreadCrumb,
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
	.children-view {
		position: absolute;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #fff;
	    padding: 20px;
	    overflow-y: auto;
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  	opacity: 0;
	}
</style>