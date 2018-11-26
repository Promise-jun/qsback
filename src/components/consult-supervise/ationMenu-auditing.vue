<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户名">
		    <el-input v-model="formObj.userId" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item label="导师姓名">
		    <el-input v-model="formObj.userName" placeholder="请输入导师姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="标题">
		    <el-input v-model="formObj.userNickname" placeholder="请输入标题"></el-input>
		  </el-form-item>
		  <!-- <el-form-item label="渠道">
		    <el-select v-model="formObj.canal" placeholder="请选择">
		  			    <el-option v-for="item in canalArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item label="客服">
		    <el-select v-model="formObj.kefu" placeholder="请选择">
		  			    <el-option v-for="item in kefuArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item label="账户属性">
		    <el-select v-model="formObj.attr" placeholder="请选择">
		  			    <el-option v-for="item in attrArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
		  </el-form-item> -->
		  <!-- <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item> -->
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '条咨询'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column label="姓名">
		      <template slot-scope="scope">{{ scope.row.userId }}</template>
		    </el-table-column>
		    <el-table-column prop="userNickname" label="标题"></el-table-column>
		    <el-table-column label="实际价格">
		      <template slot-scope="scope">￥{{ scope.row.moneyBalance | moneyFilter }}</template>
		    </el-table-column>
		    <el-table-column label="市场价格">
		      <template slot-scope="scope">￥{{ scope.row.moneyBalance | moneyFilter }}</template>
		    </el-table-column>
		    <el-table-column prop="goldBalance" label="折扣"></el-table-column>
		    <el-table-column prop="createNm" label="次数(高/低)"></el-table-column>
		    <el-table-column prop="goldBalance" label="单次时长"></el-table-column>
		    <el-table-column prop="goldBalance" label="渠道"></el-table-column>
		    <el-table-column prop="goldBalance" label="状态"></el-table-column>
		    <el-table-column prop="goldBalance" label="审核状态"></el-table-column>
		    <el-table-column prop="createTm" label="创建时间" width="150">
		      <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		    <el-table-column label="操作" width="150">
		      <template slot-scope="scope">
		    	<el-tooltip content="审核" placement="top">
				  <el-button @click="auditing(scope.row)" type="text" icon="iconfont icon-filesearch"></el-button>
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
		name: 'ationMenuAuditing',
		data() {
			return {
				dataPath: ['咨询管理', '咨询套餐', '套餐审核'],
				formObj: {}, //搜索信息
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 5,
			        page: 1
			    },
			    loading: false, //表格loading
			    tableData: []  //表格数据
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
	        	console.log(this.formObj)
	      	}
		},
		components: {
			BreadCrumb,
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
</style>