<template>
	<div>
		<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="订单号">
		    <el-input v-model="formObj.userName" placeholder="请输入订单号"></el-input>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="formObj.status" placeholder="请选择订单状态">
  			    <el-option label="全部" value="0"></el-option>
  			    <el-option label="待审核" value="1"></el-option>
  			    <el-option label="审核驳回" value="2"></el-option>
  			    <el-option label="处理中" value="3"></el-option>
  			    <el-option label="提现成功" value="4"></el-option>
  			    <el-option label="提现失败" value="5"></el-option>
  			</el-select>
		  </el-form-item>
		  <el-form-item label="来源">
		    <el-select v-model="formObj.source" placeholder="请选择来源">
  			    <el-option label="全部" value="0"></el-option>
  			    <el-option label="苹果端" value="1"></el-option>
  			    <el-option label="安卓端" value="2"></el-option>
  			    <el-option label="web端" value="3"></el-option>
  			</el-select>
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
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection" fixed width="50"> </el-table-column>
		    <el-table-column prop="fundId" label="资金交易号"></el-table-column>
		    <el-table-column prop="payerName" label="付款方姓名"></el-table-column>
		    <el-table-column prop="payerId" label="付款方ID"></el-table-column>
		    <el-table-column prop="pay" label="支出（-元）"></el-table-column>
		    <el-table-column prop="balance" label="账户余额（元）"></el-table-column>
		    <el-table-column prop="coverCharge" label="服务费(元)"></el-table-column>
		    <el-table-column prop="ditch" label="渠道"></el-table-column>
		    <el-table-column prop="gatheringName" label="收款方/姓名"></el-table-column>
		    <el-table-column prop="gatheringAccount" label="收款方账户"></el-table-column>
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
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus">批量审核</el-button>
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
		name: 'withdrawCash',
		data() {
			return {
				formObj: {},
				loading: false,
				tableData: [{
					fundId: 'TX20181129000059',
					payerName: '啊啊啊啊',
					payerId: 52,
					pay: 99280.00,
					balance: 0.00,
					coverCharge: 0.00,
					ditch: '领势对公账户',
					gatheringName: '农业银行/啊啊啊啊',
					gatheringAccount: '6228480361622435218',
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
	      	},
	      	handleSelectionChange(val) {
	        	this.multipleSelection = val;
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