<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="选择时间">
		    <el-date-picker v-model="formObj.month" type="month" placeholder="选择日期"></el-date-picker>
		  </el-form-item>
		  <el-form-item label="用户">
		    <el-input v-model="formObj.userId" placeholder="请输入用户"></el-input>
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
		    <el-table-column prop="nikeName" label="主播昵称"></el-table-column>
		    <el-table-column prop="name" label="主播姓名"></el-table-column>
		    <el-table-column prop="num" label="当月合格数量"></el-table-column>
		    <el-table-column prop="count" label="共计节目数量"></el-table-column>
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
	
	export default {
		name: 'radioCount',
		data() {
			return {
				dataPath: ['电台管理', '专辑管理', '节目统计'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
				loading: false,
				tableData: [{
					userId: 7997,
					nikeName: '情说000056',
					name: '七堇年',
					num: 10,
					count: 36
				}],
				formObj: {}
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