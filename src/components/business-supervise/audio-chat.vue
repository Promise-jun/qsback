<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="时间">
		    <el-date-picker
		      	v-model="formObj.time"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="类型">
		    <el-select v-model="formObj.type" placeholder="请选择类型">
		  		<el-option label="浙江移动" value="1"></el-option>
		  		<el-option label="阿里云" value="2"></el-option>
		  		<el-option label="APP语音" value="3"></el-option>
		  		<el-option label="APP视频" value="4"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="用户">
		    <el-input v-model="formObj.user" placeholder="请选择用户"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-checkbox v-model="formObj.checked">仅显示带有敏感词</el-checkbox>
		  </el-form-item>
		  <el-form-item label="关键词">
		    <el-input v-model="formObj.keyWords" placeholder="请输入关键词"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '条聊天记录'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="sendUser" label="发起方"></el-table-column>
		    <el-table-column prop="receiveUser" label="接听方"></el-table-column>
		    <el-table-column prop="type" label="类型"></el-table-column>
		    <el-table-column prop="starttime" label="开始时间">
		      <template slot-scope="scope">{{ scope.row.starttime | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="endtime" label="结束时间">
		      <template slot-scope="scope">{{ scope.row.endtime | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="timelen" label="总时长"></el-table-column>
		    <el-table-column prop="num" label="敏感词数量"></el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		    		<el-tooltip content="查看" placement="top">
					  <el-button @click="lookOver(scope.row)" type="text" icon="iconfont icon-monitor"></el-button>
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
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'audioChat',
		data() {
			return {
				dataPath: ['运营管理', '互动管理', '音频聊天记录'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
				formObj: {},
				loading: false,
				tableData: [{
					sendUser: '李易峰',
					receiveUser: '领势吴彦祖',
					type: 'APP视频',
					starttime: 1543209657000,
					endtime: 1543219657000,
					timelen: '3分钟',
					num: '未转化'
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
	      	},
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