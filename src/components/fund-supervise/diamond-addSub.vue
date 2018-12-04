<template>
	<div>
		<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="订单号">
		    <el-input v-model="formObj.userId" placeholder="请输入订单号"></el-input>
		  </el-form-item>
		  <el-form-item label="操作类型">
		    <el-select v-model="formObj.status" placeholder="请选择操作类型">
  			    <el-option label="全部" value="0"></el-option>
  			    <el-option label="充值" value="1"></el-option>
  			    <el-option label="充值错误" value="2"></el-option>
  			    <el-option label="服务费错误" value="3"></el-option>
  			</el-select>
		  </el-form-item>
		  <el-form-item label="手机号">
		    <el-input v-model="formObj.userId" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item label="申请人姓名">
		    <el-input v-model="formObj.userId" placeholder="请输入申请人姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="审核人姓名">
		    <el-input v-model="formObj.userId" placeholder="请输入审核人姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="状态">
		    <el-select v-model="formObj.status" placeholder="请选择状态">
  			    <el-option label="全部" value="0"></el-option>
  			    <el-option label="待审核" value="1"></el-option>
  			    <el-option label="审核通过" value="2"></el-option>
  			</el-select>
		  </el-form-item>
		  <el-form-item label="创建时间">
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

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
			<el-table-column prop="userId" label="用户ID"></el-table-column>
			<el-table-column prop="userId" label="订单号"></el-table-column>
			<el-table-column prop="gatheringId" label="昵称"></el-table-column>
			<el-table-column prop="income" label="手机号"></el-table-column>
			<el-table-column prop="balance" label="操作钻石"></el-table-column>
			<el-table-column prop="balance" label="申请人姓名"></el-table-column>
		    <el-table-column prop="payerId" label="审核人姓名"></el-table-column>
		    <el-table-column prop="payerId" label="操作类型"></el-table-column>
		    <el-table-column prop="payerId" label="操作原因"></el-table-column>
		    <el-table-column prop="payerId" label="状态"></el-table-column>
		    <el-table-column prop="createTm" label="创建时间">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="createTm" label="更新时间">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus">申请加减币</el-button>
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
	import { formatDate } from 'common/js/format'

	export default {
		name: 'diamondAddSub',
		data() {
			return {
				formObj: {},
				loading: false,
				tableData: [],
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 5,
			        page: 1
			    }
			}
		},
		filters: {
		    formatDate(time) {
		    	var date = new Date(time);
		    	return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
		   	},
		   	moneyFilter(value) {
			  	// 截取当前数据到小数点后两位
			    let realVal = Number(value).toFixed(2)
			    // num.toFixed(2)获取的是字符串
			    return realVal
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