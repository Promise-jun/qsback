<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="课程单号">
		    <el-input v-model="formObj.courseId" placeholder="请输入课程单号"></el-input>
		  </el-form-item>
		  <el-form-item label="课程名称">
		    <el-input v-model="formObj.courseName" placeholder="请输入课程名称"></el-input>
		  </el-form-item>
		  <el-form-item label="课程类型">
		    <el-select v-model="formObj.status" placeholder="请选择课程类型">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="免费" value="1"></el-option>
		  		<el-option label="付费" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="用户昵称">
		    <el-input v-model="formObj.userName" placeholder="请输入用户昵称"></el-input>
		  </el-form-item>
		  <el-form-item label="导师姓名">
		    <el-input v-model="formObj.tutor" placeholder="请输入导师姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="创建时间">
		    <el-date-picker
		      	v-model="formObj.createTm"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="支付时间">
		    <el-date-picker
		      	v-model="formObj.payTm"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="formObj.status" placeholder="请选择订单状态">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="未支付" value="1"></el-option>
		  		<el-option label="已支付" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="orderId" label="订单编号"></el-table-column>
		    <el-table-column prop="courseType" label="课程类型"></el-table-column>
		    <el-table-column prop="courseName" label="课程名称"></el-table-column>
		    <el-table-column prop="userName" label="用户昵称"></el-table-column>
		    <el-table-column prop="tutor" label="课程导师"></el-table-column>
		    <el-table-column label="创建时间">
		    	<template slot-scope="scope">
					{{scope.row.createTm | formatDate}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="支付时间">
		    	<template slot-scope="scope">
					{{scope.row.payTm | formatDate}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="totalPrice" label="订单总价(￥)"></el-table-column>
		    <el-table-column prop="orderstatus" label="订单状态"></el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="24">
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
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'courseOrderList',
		data() {
			return {
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    formObj: {},
			    loading: false,
			    tableData: [{
			    	orderId: 'ZL20180302000028',
			    	courseType: '付费',
			    	courseName: '高情商的孩子是怎么养成的',
			    	userName: '情说107965',
			    	tutor: '李易峰',
			    	createTm: 1543209657000,
			    	payTm: 1543209667000,
			    	totalPrice: 1.68,
			    	orderstatus: '已支付'
			    }]
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
			onSubmit() {
	        	this.getList();
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