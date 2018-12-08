<template>
	<div>
		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    style="width: 100%;">
		    <el-table-column prop="zzId" label="后台用户"></el-table-column>
		    <el-table-column prop="zzName" label="操作内容"></el-table-column>
		    <el-table-column label="操作时间">
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
		name: 'operationLog',
		data() {
			return {
				loading: false,
				tableData: [],
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 5,
			        page: 1
			    },
			}
		},
		filters: {
		    formatDate(time) {
		    	var date = new Date(time);
		    	return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
		   	}
		},
		created() {
			this.getList();
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
	.el-table {
		margin-bottom: 15px;
	}
	.el-pagination {
		float: right;
	}
</style>