<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userid" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号">
		    <el-input v-model="formObj.phone" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="昵称">
		    <el-input v-model="formObj.nickName" placeholder="请输入昵称"></el-input>
		  </el-form-item>
		  <el-form-item label="淘宝账号">
		    <el-input v-model="formObj.taobaoId" placeholder="请输入淘宝账号"></el-input>
		  </el-form-item>
		  <el-form-item label="渠道">
		    <el-select v-model="formObj.canal" placeholder="请选择">
			    <el-option v-for="item in canalArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="客服">
		    <el-select v-model="formObj.kefu" placeholder="请选择">
			    <el-option v-for="item in kefuArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="账户属性">
		    <el-select v-model="formObj.attr" placeholder="请选择">
			    <el-option v-for="item in attrArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert title="总计416个用户" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="userlist"
		    stripe
		    border
		    :data="userList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="用户ID">
		      <template slot-scope="scope">{{ scope.row.userid }}</template>
		    </el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="nickName" label="昵称"></el-table-column>
		    <el-table-column prop="registerTime" label="注册时间" width="150"></el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="taobaoId" label="淘宝账号"></el-table-column>
		    <el-table-column prop="canal" label="渠道"></el-table-column>
		    <el-table-column prop="price" label="金额"></el-table-column>
		    <el-table-column prop="gold" label="金币"></el-table-column>
		    <el-table-column prop="diamond" label="钻石"></el-table-column>
		    <el-table-column prop="kefu" label="客服"></el-table-column>
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
		  	<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
		  </el-col>
		</el-row>

		<transition name="fade">
			<router-view class="children-view"></router-view>
		</transition>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 

	export default {
		name: 'userlist',
		data() {
			return {
				dataPath: ['用户管理', '客户管理'],
				formObj: {
					userid: '',
					phone: '',
					name: '',
					nickName: '',
					taobaoId: '',
					canal: '', //渠道
					kefu: '',
					attr: '',  //客户属性
					dateValue: ''
				},
				canalArr: [{
		          value: '1',
		          label: '黄金糕'
		        }, {
		          value: '2',
		          label: '双皮奶'
		        }],
		        kefuArr: [{
		          value: '1',
		          label: '黄金糕'
		        }, {
		          value: '2',
		          label: '双皮奶'
		        }],
		        attrArr: [{
		          value: '1',
		          label: '黄金糕'
		        }, {
		          value: '2',
		          label: '双皮奶'
		        }],
		        userList: [{
		        	userid: 7541,
		          	phone: '158****1235',
		          	nickName: '俄方岁',
		          	registerTime: '2018-11-15 11:15:15',
		          	name: '',
		          	taobaoId: '',
		          	canal: 'APP',
		          	price: 0,
		          	gold: 0,
		          	diamond: 0,
		          	kefu: '地方可'
		        },{
		        	userid: 7541,
		          	phone: '158****1235',
		          	nickName: '俄方岁',
		          	registerTime: '2018-11-15 11:15:15',
		          	name: '',
		          	taobaoId: '',
		          	canal: 'APP',
		          	price: 0,
		          	gold: 0,
		          	diamond: 0,
		          	kefu: '地方可'
		        }],
		        multipleSelection: [],
		        isLock: false  //是否禁用
			}
		},
		methods: {
		  addUser() { //添加用户
		  	this.$router.push({
		  		path: '/userlist/addUser'
		  	})
		  },
	      onSubmit() {
	        console.log(this.formObj);
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	      }
	    },
		components: {
			BreadCrumb
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
	    overflow: scroll;
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  	opacity: 0;
	}
</style>