<template>
	<div>
    	<el-alert :title="'总计' + pageTotal.total + '条咨询'" type="warning" :closable="false"></el-alert>

    	<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="orderId" label="订单号"></el-table-column>
		    <el-table-column prop="way" label="服务方式"></el-table-column>
		    <el-table-column prop="userName" label="用户昵称"></el-table-column>
		    <el-table-column prop="tutor" label="导师姓名"></el-table-column>
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
		    <el-table-column prop="totalLen" label="总时长(分钟)"></el-table-column>
		    <el-table-column prop="surplusLen" label="剩余时长(分钟)"></el-table-column>
		    <el-table-column prop="totalPrice" label="订单总价(￥)"></el-table-column>
		    <el-table-column prop="orderstatus" label="订单状态"></el-table-column>
		    <el-table-column label="操作" width="100">
		      <template slot-scope="scope">
		    		<el-tooltip content="处理" placement="top">
					  <el-button @click="handle(scope.row)" type="text" icon="iconfont icon-wrench"></el-button>
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
		name: 'kefuIntervene',
		data() {
			return {
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    loading: false,
			    tableData: [{
			    	orderId: 'ZL20180302000028',
			    	way: '通话',
			    	userName: '情说107965',
			    	tutor: '李易峰',
			    	createTm: 1543209657000,
			    	payTm: 1543209667000,
			    	totalLen: 60,
			    	surplusLen: 60,
			    	totalPrice: 600.00,
			    	orderstatus: '已关闭',
			    	kefu: '客服一号',
			    	achieveTm: 1543209667000
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