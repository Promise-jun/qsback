<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="天猫单号">
		    <el-input v-model="formObj.courseId" placeholder="请输入天猫单号"></el-input>
		  </el-form-item>
		  <el-form-item label="用户昵称">
		    <el-input v-model="formObj.courseName" placeholder="请输入用户昵称"></el-input>
		  </el-form-item>
		  <el-form-item label="导师姓名">
		    <el-input v-model="formObj.courseName" placeholder="请输入导师姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="淘宝账号">
		    <el-input v-model="formObj.courseName" placeholder="请输入淘宝账号"></el-input>
		  </el-form-item>
		  <el-form-item label="用户手机号">
		    <el-input v-model="formObj.courseName" placeholder="请输入用户手机号"></el-input>
		  </el-form-item>
		  <el-form-item label="客服">
		    <el-select v-model="formObj.status" placeholder="请选择客服">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="客服一号" value="1"></el-option>
		  		<el-option label="客服二号" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="formObj.status" placeholder="请选择订单状态">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="待付款" value="1"></el-option>
		  		<el-option label="待确认" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="订单类型">
		    <el-select v-model="formObj.status" placeholder="请选择订单类型">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="电话咨询" value="1"></el-option>
		  		<el-option label="套餐" value="2"></el-option>
		  		<el-option label="预约" value="3"></el-option>
		  		<el-option label="立即咨询" value="4"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="创建时间">
		    <el-date-picker
		      	v-model="formObj.createTm"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="咨询单号">
		    <el-input v-model="formObj.userName" placeholder="请输入咨询单号"></el-input>
		  </el-form-item>
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userName" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="协助客服">
		    <el-select v-model="formObj.status" placeholder="请选择协助客服">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="客服一号" value="1"></el-option>
		  		<el-option label="客服二号" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="服务形式">
		    <el-select v-model="formObj.status" placeholder="请选择服务形式">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="视频" value="1"></el-option>
		  		<el-option label="电话" value="2"></el-option>
		  		<el-option label="图文+语音条" value="3"></el-option>
		  		<el-option label="通话" value="4"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="评价状态">
		    <el-select v-model="formObj.status" placeholder="请选择评价状态">
		    	<el-option label="全部" value="0"></el-option>
		  		<el-option label="有" value="1"></el-option>
		  		<el-option label="没有" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="支付时间">
		    <el-date-picker
		      	v-model="formObj.payTm"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="完成时间">
		    <el-date-picker
		      	v-model="formObj.payTm"
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
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="taobaoId" label="淘宝账号"></el-table-column>
		    <el-table-column prop="tutor" label="导师姓名"></el-table-column>
		    <el-table-column label="创建时间">
		    	<template slot-scope="scope">
					{{scope.row.createTm | dateformat}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="支付时间">
		    	<template slot-scope="scope">
					{{scope.row.payTm | dateformat}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="totalLen" label="总时长(分钟)"></el-table-column>
		    <el-table-column prop="surplusLen" label="剩余时长(分钟)"></el-table-column>
		    <el-table-column prop="totalPrice" label="订单总价(￥)"></el-table-column>
		    <el-table-column prop="kefu" label="客服"></el-table-column>
		    <el-table-column prop="orderstatus" label="订单状态"></el-table-column>
		    <el-table-column label="完成时间">
		    	<template slot-scope="scope">
					{{scope.row.achieveTm | dateformat}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="操作" width="100">
		      <template slot-scope="scope">
		    		<el-tooltip content="处理" placement="top">
					  <el-button @click="handle(scope.row)" type="text" icon="iconfont icon-wrench"></el-button>
					</el-tooltip>
			  </template>
		    </el-table-column>
		</el-table>
		
		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">新增咨询</el-button>
		  	<el-button type="primary" icon="el-icon-circle-plus">导入评价</el-button>
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

		<transition name="fade" mode="out-in">
	      <router-view></router-view>
	    </transition>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'formalOrder',
		data() {
			return {
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    formObj: {},
			    loading: false,
			    tableData: [{
			    	orderId: 'ZL20180302000028',
			    	way: '通话',
			    	phone: '18367979488',
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
		created() {
			this.getList()
		},
		methods: {
			getList() {

			},
			onSubmit() {
	        	this.getList();
	      	},
	      	add() { //新增咨询
	      		let urls = ''
	      		if (this.$route.meta.type == 'dreamCube') { //梦立方
	      			urls = '/dreamCube/formalOrder/addFormal'
	      		}
	      		this.$router.push({
	      			path: urls
	      		})
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
	.fade-enter-active,
	.fade-leave-active {
  		transition: opacity 0.3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  		opacity: 0;
	}
</style>