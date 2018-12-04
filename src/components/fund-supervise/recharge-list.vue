<template>
	<div>
		<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="订单号">
		    <el-input v-model="formObj.userName" placeholder="请输入订单号"></el-input>
		  </el-form-item>
		  <el-form-item label="申请时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="充值状态">
		    <el-select v-model="formObj.status" placeholder="请选择充值状态">
  			    <el-option label="全部" value="0"></el-option>
  			    <el-option label="支付中" value="1"></el-option>
  			    <el-option label="充值成功" value="2"></el-option>
  			    <el-option label="充值失败" value="3"></el-option>
  			</el-select>
		  </el-form-item>
		  <el-form-item label="支付方式">
		    <el-select v-model="formObj.source" placeholder="请选择支付方式">
  			    <el-option label="全部" value="0"></el-option>
  			    <el-option label="微信" value="1"></el-option>
  			    <el-option label="支付宝" value="2"></el-option>
  			    <el-option label="余额" value="3"></el-option>
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
		    <el-table-column prop="fundId" label="资金交易号"></el-table-column>
			<el-table-column prop="gatheringName" label="收款方"></el-table-column>
			<el-table-column prop="gatheringId" label="收款方ID"></el-table-column>
			<el-table-column prop="income" label="收入（-元）"></el-table-column>
			<el-table-column prop="balance" label="账户余额（元）"></el-table-column>
		    <el-table-column prop="coverCharge" label="服务费(元)"></el-table-column>
		    <el-table-column prop="payWay" label="支付方式"></el-table-column>
		    <el-table-column prop="payerName" label="付款方姓名"></el-table-column>
		    <el-table-column prop="payerId" label="付款方ID"></el-table-column>
		    <el-table-column prop="payAccount" label="银行/支付公司单号"></el-table-column>
		    <el-table-column prop="status" label="交易状态"></el-table-column>
		    <el-table-column prop="createTm" label="交易创建时间">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="createTm" label="交易支付时间">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="createTm" label="交易完成时间">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		    <el-table-column label="操作" fixed="right">
		      <template slot-scope="scope">
		    	<el-tooltip content="处理" placement="top">
				  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-wrench"></el-button>
				</el-tooltip>
			  </template>
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
		name: 'rechargeList',
		data() {
			return {
				formObj: {},
				loading: false,
				tableData: [{
					fundId: 'TX20181129000059',
					payerName: '啊啊啊啊',
					payerId: 52,
					income: 280.00,
					balance: 0.00,
					coverCharge: 0.00,
					payWay: '微信',
					gatheringName: '农业银行/啊啊啊啊',
					gatheringId: 23,
					payAccount: '',
					status: '待审核',
					createTm: 1543890604000
				}],
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