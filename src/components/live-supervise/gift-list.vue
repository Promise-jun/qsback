<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="礼物ID">
		    <el-input v-model="formObj.userId" placeholder="请输入礼物ID"></el-input>
		  </el-form-item>
		  <el-form-item label="礼物名称">
		    <el-input v-model="formObj.userName" placeholder="请输入礼物名称"></el-input>
		  </el-form-item>
		  <el-form-item label="状态">
		    <el-select v-model="formObj.status" placeholder="请选择状态">
		  		<el-option label="全部" value="0"></el-option>
		  		<el-option label="可用" value="1"></el-option>
		  		<el-option label="不可用" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="上架时间">
		    <el-date-picker 
		    	v-model="formObj.uptime" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="下架时间">
		    <el-date-picker 
		    	v-model="formObj.downtime" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '个礼物'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="giftId" label="ID" width="50"></el-table-column>
		    <el-table-column prop="giftName" label="名称"></el-table-column>
		    <el-table-column label="静图">
		      <template slot-scope="scope">
		      	<img :src="scope.row.giftUrl" class="pic" @click="showBigPic(scope.row.giftUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column prop="num" label="动图最低数量"></el-table-column>
		    <el-table-column label="价值">
		    	<template slot-scope="scope">{{scope.row.gold}}金币</template>
		    </el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="uptime" label="上架时间">
		      <template slot-scope="scope">{{ scope.row.uptime | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="downtime" label="下架时间">
		      <template slot-scope="scope">{{ scope.row.downtime | formatDate }}</template>
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		    		<el-tooltip content="编辑" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
		    		<el-tooltip content="删除" placement="top">
					  <el-button @click="del(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			  </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加礼物</el-button>
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
		
		<el-dialog title="图片" :visible.sync="bigPicVisible" :center="true">
		  	<img :src="bigPicurl" class="big-pic">
		</el-dialog>
		
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'giftList',
		data() {
			return {
				dataPath: ['直播管理', '直播设置', '礼物管理'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 5,
			        page: 1
			    },
			    loading: false,
				formObj: {},
				tableData: [{
					giftId: 1,
					giftName: '聚宝盆',
					giftUrl: 'http://img3.imgtn.bdimg.com/it/u=3360690558,3623061169&fm=11&gp=0.jpg',
					num: 50,
					gold: 888,
					status: '可用',
					uptime: 1543209657000,
					downtime: 1543219657000
				}],
				bigPicVisible: false,
				bigPicurl: ''
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
			add() { //添加礼物
				this.$router.push({
		  			path: '/liveSet/gift/addGift'
		  		})
			},
			onSubmit() {
	        	this.getList();
	      	},
	      	showBigPic(url) { //查看大图
	      		this.bigPicVisible = true
	      		this.bigPicurl = url
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
	.pic {
		width: 100px;
		cursor: pointer;
	}
	.big-pic {
		display: block;
		margin: 0 auto;
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  	opacity: 0;
	}
</style>