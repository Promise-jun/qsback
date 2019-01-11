<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="导师姓名">
		    <el-input v-model="formObj.userName" placeholder="请输入导师姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="标题">
		    <el-input v-model="formObj.title" placeholder="请输入标题"></el-input>
		  </el-form-item>
		  <!-- <el-form-item label="渠道">
		    <el-select v-model="formObj.canal" placeholder="请选择">
		    	<el-option label="全部" value=""></el-option>
		    			    <el-option label="情说" value="0"></el-option>
		    			    <el-option label="天猫" value="1"></el-option>
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

		<el-alert :title="'总计' + pageTotal.total + '个套餐'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column label="姓名">
		      <template slot-scope="scope">{{ scope.row.userName }}</template>
		    </el-table-column>
		    <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
		    <el-table-column label="实际价格">
		      <template slot-scope="scope">￥{{ scope.row.marketPrice * (scope.row.menuRebate / 100) | moneyFilter }}</template>
		    </el-table-column>
		    <el-table-column label="市场价格">
		      <template slot-scope="scope">￥{{ scope.row.marketPrice | moneyFilter }}</template>
		    </el-table-column>
		    <el-table-column label="折扣">
		    	<template slot-scope="scope">{{ scope.row.menuRebate / 100 }}</template>
		    </el-table-column>
		    <el-table-column label="次数(高/低)" width="95">
		    	<template slot-scope="scope">{{ scope.row.maxTime }}/{{ scope.row.minTime }}</template>
		    </el-table-column>
		    <el-table-column prop="time" label="单次时长"></el-table-column>
		    <el-table-column prop="channel" label="渠道">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.channel == 0">情说</span>
		    		<span v-else-if="scope.row.channel == 1">天猫</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="salesVolume" label="销量"></el-table-column>
		    <el-table-column prop="score" label="评分"></el-table-column>
		    <el-table-column label="状态">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.status == 0">未上架</span>
		    		<span v-else-if="scope.row.status == 1">上架</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="审核状态">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.examineStatus == 0">待审核</span>
		    		<span v-else-if="scope.row.examineStatus == 1">审核通过</span>
		    		<span v-else>审核不通过</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="createTm" label="创建时间" width="155">
		      <template slot-scope="scope">{{ scope.row.createTm | dateformat }}</template>
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
	
	export default {
		name: 'ationMenuList',
		data() {
			return {
				formObj: {}, //搜索信息
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    loading: false, //表格loading
			    tableData: []  //表格数据
			}
		},
		filters: {
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
				let uploadInfo = {
					userId: this.formObj.userId,
					userName: this.formObj.userName,
					title: this.formObj.title,
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/menu/queryForList',
					data: this.$qs.stringify(uploadInfo)
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						if (result.data.list.length) {
							this.pageTotal = {
				              total: parseInt(result.data.total),
				              pageSize: parseInt(result.data.pageSize),
				              page: parseInt(result.data.pageNum)
				            };
						}
						this.tableData = result.data.list
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			onSubmit() {
	        	this.getList()
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