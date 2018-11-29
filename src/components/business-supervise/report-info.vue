<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="reportUser" label="举报人"></el-table-column>
		    <el-table-column prop="unreportUser" label="被举报人"></el-table-column>
		    <el-table-column prop="cause" label="原因"></el-table-column>
		    <el-table-column prop="describe" label="描述"></el-table-column>
		    <el-table-column label="时间">
		    	<template slot-scope="scope">{{ scope.row.sendTime | formatDate }}</template>
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
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'reportInfo',
		data() {
			return {
				dataPath: ['运营管理', '举报信息'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    loading: false,
			    tableData: [{
			    	reportUser: '背着吉他的蝙蝠女侠',
			    	unreportUser: '情说000005',
			    	cause: '色情欺诈',
			    	describe: '哈哈哈',
			    	sendTime: 1543219657000
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