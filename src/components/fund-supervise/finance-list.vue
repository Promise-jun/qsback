<template>
	<div>
		<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="业务单号">
		    <el-input v-model="formObj.userId" placeholder="请输入业务单号"></el-input>
		  </el-form-item>
		  <el-form-item label="付款账户">
		    <el-input v-model="formObj.phone" placeholder="请输入付款账户"></el-input>
		  </el-form-item>
		  <el-form-item label="收款账户">
		    <el-input v-model="formObj.userName" placeholder="请输入收款账户"></el-input>
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
		    <el-table-column prop="orderId" label="财务流水号"></el-table-column>
		    <el-table-column prop="orderId" label="资金交易号"></el-table-column>
			<el-table-column prop="userId" label="业务单号"></el-table-column>
			<el-table-column prop="gatheringId" label="来源"></el-table-column>
			<el-table-column prop="income" label="交易类型"></el-table-column>
			<el-table-column prop="balance" label="财务类型"></el-table-column>
		    <el-table-column prop="coverCharge" label="付款方式"></el-table-column>
		    <el-table-column prop="payWay" label="付款用户"></el-table-column>
		    <el-table-column prop="payerName" label="付款账户"></el-table-column>
		    <el-table-column prop="payerId" label="代付发起人"></el-table-column>
		    <el-table-column prop="payAccount" label="付款金额"></el-table-column>
		    <el-table-column prop="payAccount" label="付款余额"></el-table-column>
		    <el-table-column prop="payAccount" label="收款用户"></el-table-column>
		    <el-table-column prop="payAccount" label="收款账户"></el-table-column>
		    <el-table-column prop="payAccount" label="收款金额"></el-table-column>
		    <el-table-column prop="payAccount" label="收款余额"></el-table-column>
		    <el-table-column prop="createTm" label="创建时间">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
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
		name: 'financeList',
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