<template>
	<div>
		<el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
    	  <el-form-item label="咨询单号">
		    <el-input v-model="formObj.orderId" placeholder="请输入咨询单号"></el-input>
		  </el-form-item>
		  <el-form-item label="情说号">
		    <el-input v-model="formObj.userCode" placeholder="请输入情说号"></el-input>
		  </el-form-item>
		  <el-form-item label="订单状态">
		    <el-select v-model="formObj.status" placeholder="请选择订单状态">
		    	<el-option label="全部" value=""></el-option>
		    	<el-option label="报名中" :value="0"></el-option>
		  		<el-option label="报名已满" :value="1"></el-option>
		  		<el-option label="报名结束" :value="2"></el-option>
		  		<el-option label="已完成" :value="3"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="状态">
		    <el-select v-model="formObj.isDel" placeholder="请选择订单状态">
		    	<el-option label="可用" :value="0"></el-option>
		  		<el-option label="不可用" :value="1"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="创建时间">
		    <el-date-picker
		      	v-model="formObj.createTm"
		      	type="daterange"
		      	:default-time="['00:00:00', '23:59:59']"
		    	value-format="yyyy-MM-dd HH:mm:ss"
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
		    size="mini"
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column label="订单号" :show-overflow-tooltip="true">
		    	<template slot-scope="scope">
					<el-button v-if="findPermission(19)" @click="handle(scope.row)" type="text">{{scope.row.intentionId}}</el-button>
					<el-button v-else-if="findPermission(42)" @click="handle(scope.row)" type="text">{{scope.row.intentionId}}</el-button>
					<span v-else>{{scope.row.intentionId}}</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="userCode" label="情说号"></el-table-column>
		    <el-table-column prop="intentionTaobao" label="淘宝账号"></el-table-column>
		    <el-table-column prop="serviceMethod" label="服务方式"></el-table-column>
		    <el-table-column prop="visitType" label="初访形式" :show-overflow-tooltip="true"></el-table-column>
		    <el-table-column prop="intentionFormalPrice" label="正式价格（￥）" width="120"></el-table-column>
		    <el-table-column prop="signupCount" label="已经报名人数"></el-table-column>
		    <el-table-column label="订单状态">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.intentionStatus == 0">报名中</span>
		    		<span v-else-if="scope.row.intentionStatus == 1">报名已满</span>
		    		<span v-else-if="scope.row.intentionStatus == 2">报名结束</span>
		    		<span v-else-if="scope.row.intentionStatus == 3">已完成</span>
			 	</template>
		    </el-table-column>
		    <el-table-column label="创建时间" width="135">
		    	<template slot-scope="scope">{{scope.row.createTm | dateformat}}</template>
		    </el-table-column>
		    <el-table-column prop="createNm" label="客服"></el-table-column>
		    <el-table-column label="操作">
		      	<template slot-scope="scope">
		    		<el-tooltip content="处理" placement="top" v-if="findPermission(19)">
					  <el-button @click="handle(scope.row)" type="text" icon="iconfont icon-wrench"></el-button>
					</el-tooltip>
					<el-tooltip content="处理" placement="top" v-else-if="findPermission(42)">
					  <el-button @click="handle(scope.row)" type="text" icon="iconfont icon-wrench"></el-button>
					</el-tooltip>
			  	</template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button v-if="findPermission(18)" type="primary" size="small" icon="el-icon-circle-plus" @click="add">新增咨询</el-button>
		  	<el-button v-if="findPermission(41)" type="primary" size="small" icon="el-icon-circle-plus" @click="add">新增咨询</el-button>
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
		name: 'intentionOrder',
		data() {
			return {
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 15,
			        page: 1
			    },
			    formObj: {
			    	source: '', //来源 58：梦立方 81：阅览一心 62：线下
			    	orderId: '',
			    	userId: '',
			    	userCode: '',
			    	status: '',
			    	isDel: 0,
			    	createTm: []
			    },
			    loading: false,
			    tableData: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			// 权限控制
			findPermission(val) {
				let permissionList = this.$route.meta.permission
				if(permissionList && permissionList.length){
				    let isShow = permissionList.findIndex(item => {
				    	return item.id == val
				    })
				    if (isShow == -1) {
				        return false
				    } else {
				        return true
				    }
				} else {
					return false
				}
			},
			getList() {
				let beginTime, endTime
				if (this.formObj.createTm && this.formObj.createTm.length) {
					beginTime = this.formObj.createTm[0]
					endTime = this.formObj.createTm[1]
				} else {
					beginTime = ''
					endTime = ''
				}
				if (this.$route.meta.type == 'dreamCube') { //梦立方
					this.formObj.source = 58
				} else if (this.$route.meta.type == 'pleasantHeart') { //悦然一心
					this.formObj.source = 81
				}
				let uploadInfo = {
					intentionType: this.formObj.source, //梦立方
					intentionId: this.formObj.orderId,
					userCode: this.formObj.userCode,
					intentionStatus: this.formObj.status,
					isDel: this.formObj.isDel,
					beginTime: beginTime,
					endTime: endTime,
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/queryForList',
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
					this.loading = false
					console.log(err)
				})
			},
			onSubmit() {
	        	this.getList();
	      	},
	      	add() { //新增咨询
	      		let urls = ''
	      		if (this.$route.meta.type == 'dreamCube') { //梦立方
	      			urls = '/dreamCube/intentionOrder/addIntention'
	      		} else if (this.$route.meta.type == 'pleasantHeart') { //悦然一心
	      			urls = '/pleasantHeart/intentionOrder/addIntention'
	      		}

	      		let {href} = this.$router.resolve({
		    		path: urls
		    	});
				window.open(href, '_blank');
	      	},
	      	// 处理
	      	handle(row) {
	      		let urls = ''
	      		if (this.$route.meta.type == 'dreamCube') { //梦立方
	      			urls = '/dreamCube/intentionOrder/intentionDetail'
	      		} else if (this.$route.meta.type == 'pleasantHeart') { //悦然一心
	      			urls = '/pleasantHeart/intentionOrder/intentionDetail'
	      		}
	      		
	      		let {href} = this.$router.resolve({
		    		path: urls,
		    		query: {
		    			intentionId: row.intentionId
		    		}
		    	});
				window.open(href, '_blank');
	      	}
		},
		watch: {
		    $route(to, from) {
		      	if (to.meta.title == from.meta.title) {
		      		this.pageTotal = { //分页数据
					    total: 0,
				        pageSize: 15,
				        page: 1
				    }
		      		this.getList();
		      	} else {
		      		if (to.name == "dreamCubeIntentionOrder" || to.name == 'pleasantHeartIntentionOrder') {
			       		this.getList();
		      		}
		      	}
		    }
		},
		components: {
			PageNum
		}
	}
</script>

<style type="text/css">
	.el-table .el-loading-mask {
		z-index: 50;
	}
</style>