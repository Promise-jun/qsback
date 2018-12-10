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
		      	<router-link target="_blank" :to="{path:'/mentor/mentorDetail', query:{userId: scope.row.userId}}">{{ scope.row.userId }}</router-link>
		      </template>
		    </el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="age" label="年龄"></el-table-column>
		    <el-table-column prop="sex" label="性别"></el-table-column>
		    <el-table-column prop="city" label="所在城市"></el-table-column>
		    <el-table-column prop="nickName" label="昵称"></el-table-column>
		    <el-table-column prop="enterTime" label="入驻时间" width="150"></el-table-column>
		    <el-table-column prop="zxtimelen" label="30天咨询时长"></el-table-column>
		    <el-table-column prop="zxnum" label="30天咨询人数"></el-table-column>
		    <el-table-column prop="ywss" label="业务所属"></el-table-column>
		    <el-table-column prop="tuijian" label="是否推荐"></el-table-column>
		    <el-table-column label="操作" width="90">
		    	<template slot-scope="scope">
					<el-tooltip content="上调" placement="top">
					  <el-button type="text" icon="iconfont icon-arrowup" style="color: #67C23A;"></el-button>
					</el-tooltip>
					<el-tooltip content="下调" placement="top">
					  <el-button type="text" icon="iconfont icon-arrowdown" style="color: #F56C6C;"></el-button>
					</el-tooltip>
					<el-tooltip content="推荐" placement="top">
					  <el-button type="text" icon="iconfont icon-like" v-show="isLike"></el-button>
					</el-tooltip>
					<el-tooltip content="不推荐" placement="top">
					  <el-button type="text" icon="iconfont icon-unlike" v-show="!isLike"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="addMentor">申请导师</el-button>
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
		          	nickName: '俄方岁',
		          	enterTime: '2018-11-15 11:15:15',
		          	name: '高圆圆',
		          	age: 20,
		          	sex: "女",
		          	city: '广东 韶关',
		          	zxtimelen: '20分钟',
		          	zxnum: "1人",
		          	ywss: '',
		          	tuijian: '推荐'
		        }, {
		        	userId: 7541,
		          	nickName: '俄方岁',
		          	enterTime: '2018-11-15 11:15:15',
		          	name: '高圆圆',
		          	age: 20,
		          	sex: "女",
		          	city: '广东 韶关',
		          	zxtimelen: '20分钟',
		          	zxnum: "1人",
		          	ywss: '',
		          	tuijian: '推荐'
		        }],
		        multipleSelection: [],
		        isLike: false //是否推荐
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
		    //申请导师
		    addMentor() {
		    	let {href} = this.$router.resolve({
		    		path: '/mentor/addMentor'
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