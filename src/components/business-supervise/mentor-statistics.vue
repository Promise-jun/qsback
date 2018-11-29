<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" class="demo-form-inline">
    	  <el-form-item label="统计时间">
		    <el-date-picker
		      	v-model="timevalue"
		      	type="daterange"
		      	range-separator="至"
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
		    :summary-method="getSummaries"
		    show-summary
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="mentor" label="咨询师"></el-table-column>
		    <el-table-column prop="orderNum" label="体验订单数"></el-table-column>
		    <el-table-column prop="zhl" label="体验转化率（%）"></el-table-column>
		    <el-table-column prop="newNum" label="新用户数"></el-table-column>
		    <el-table-column prop="oldNum" label="老用户数"></el-table-column>
		    <el-table-column prop="totalNum" label="共计用户"></el-table-column>
		    <el-table-column prop="totalLen" label="服务总时长（小时）"></el-table-column>
		    <el-table-column prop="overLen" label="平均时长（小时）"></el-table-column>
		    <el-table-column prop="totalPrice" label="累计金额（￥）"></el-table-column>
		    <el-table-column prop="overPrice" label="平均客单价（￥）"></el-table-column>
		    <el-table-column prop="outPrice" label="退款金额（￥）"></el-table-column>
		    <el-table-column prop="outNum" label="退款用户数"></el-table-column>
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
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'kefuStatistics',
		data() {
			return {
				dataPath: ['运营管理', '数据统计', '咨询师统计'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
				timevalue: '',
				loading: false,
				tableData: [{
					mentor: '成龙',
					orderNum: 8,
					zhl: 30,
					newNum: 3,
					oldNum: 2,
					totalNum: 5,
					totalLen: 3,
					overLen: 0.7,
					totalPrice: 700,
					overPrice: 223,
					outPrice: 66,
					outNum: 1
				}, {
					mentor: '李易峰',
					orderNum: 3,
					zhl: 15,
					newNum: 3,
					oldNum: 2,
					totalNum: 5,
					totalLen: 3,
					overLen: 0.9,
					totalPrice: 1200,
					overPrice: 256,
					outPrice: 66,
					outNum: 1
				}]
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
	      	getSummaries(param) {
	      		const { columns, data } = param;
		        const sums = [];
		        columns.forEach((column, index) => {
		          if (index === 0) {
		            sums[index] = '合计';
		            return;
		          }
		          const values = data.map(item => Number(item[column.property]));
		          if (!values.every(value => isNaN(value))) {
		            sums[index] = values.reduce((prev, curr) => {
		              const value = Number(curr);
		              if (!isNaN(value)) {
		                return prev + curr;
		              } else {
		                return prev;
		              }
		            }, 0);
		          } else {
		            sums[index] = 'N/A';
		          }
		        });
		        sums[2] = sums[2] / data.length //计算体验转化率
		        sums[7] = sums[7] / data.length //计算平均时长
		        sums[9] = sums[9] / data.length //计算评价客单价
		        return sums;
	      	}
		},
		components: {
			BreadCrumb,
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-row {
		margin-top: 15px;
		& .el-pagination {
			float: right;
		}
	}
</style>