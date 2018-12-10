<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userid" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="昵称">
		    <el-input v-model="formObj.nickName" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="服务人员状态">
		    <el-select v-model="formObj.status" placeholder="请选择">
			    <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
		    ref="tableList"
		    stripe
		    border
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="用户ID">
		      <template slot-scope="scope">
		      	<router-link target="_blank" :to="{path:'/anchor/anchorDetail', query:{userId: scope.row.userId}}">{{ scope.row.userId }}</router-link>
		      </template>
		    </el-table-column>
		    <el-table-column prop="username" label="用户名"></el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
			<el-table-column prop="nickName" label="昵称"></el-table-column>
			<el-table-column prop="sex" label="性别"></el-table-column>
			<el-table-column prop="registerTime" label="注册时间" width="150"></el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="followNum" label="关注他的人(个)"></el-table-column>
		    <el-table-column prop="syjf" label="剩余积分"></el-table-column>
		    <el-table-column prop="price" label="余额(元)"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top">
					  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="addAnchor">申请主播</el-button>
		  	<el-button type="primary" icon="el-icon-refresh">更新IM账号</el-button>
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
					status: '',  //服务人员状态
					dateValue: ''
				},
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
		        	userId: 7541,
		        	username: "大方点",
		        	phone: "135****4532",
		          	nickName: '俄方岁',
		          	sex: "女",
		          	registerTime: '2018-11-15 11:15:15',
		          	name: '高圆圆',
		          	followNum: 5,
		          	syjf: 100,
		          	price: 200
		        },{
		        	userId: 7541,
		        	username: "大方点",
		        	phone: "135****4532",
		          	nickName: '俄方岁',
		          	sex: "女",
		          	registerTime: '2018-11-15 11:15:15',
		          	name: '高圆圆',
		          	followNum: 5,
		          	syjf: 100,
		          	price: 200
		        }],
		        multipleSelection: []
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
		    // 申请主播
		    addAnchor() {
		    	let {href} = this.$router.resolve({
		    		path: '/anchor/addAnchor'
		    	});
				window.open(href, '_blank');
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