<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="导师姓名">
		    <el-select
			    v-model="formObj.tutor"
			    filterable
			    remote
			    clearable
			    placeholder="请输入导师姓名"
			    :remote-method="remoteMethod"
			    :loading="tutorLoading">
			    <el-option
			      	v-for="item in tutorList"
			      	:key="item.value"
			      	:label="item.label"
			      	:value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="时间">
		    <el-date-picker
		      	v-model="formObj.time"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="是否上架">
		    <el-select v-model="formObj.status" placeholder="请选择是否上架">
		  		<el-option label="上架" value="1"></el-option>
		  		<el-option label="不上架" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="是否推荐">
		    <el-select v-model="formObj.type" placeholder="请选择是否推荐">
		  		<el-option label="推荐" value="1"></el-option>
		  		<el-option label="不推荐" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>
	
		<el-alert :title="'总计' + pageTotal.total + '篇杂志'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    :show-header="false"
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column label="图片" width="100">
		      <template slot-scope="scope">
		      	<img :src="scope.row.picUrl" class="pic" @click="showBigPic(scope.row.picUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column label="内容">
		      <template slot-scope="scope">
		    	<p class="title">{{scope.row.title}}</p>
		    	<p class="classify">{{scope.row.classify}}</p>
		    	<p class="data">
		    		<span>{{scope.row.author}}</span>
		    		<span>{{scope.row.pageView}}浏览</span>
		    		<span>{{scope.row.scNum}}收藏</span>
		    		<span>创建时间：{{scope.row.createTm | formatDate}}</span>
		    	</p>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" width="100">
		      <template slot-scope="scope">
		    		<el-tooltip content="推荐" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-like" style="color: #F56C6C;"></el-button>
					</el-tooltip>
					<!-- <el-tooltip content="取消推荐" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-unlike" style="color: #909399;"></el-button>
					</el-tooltip> -->
					<el-tooltip content="上架" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-upload" style="color: #E6A23C;"></el-button>
					</el-tooltip>
					<!-- <el-tooltip content="下架" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-download" style="color: #909399;"></el-button>
					</el-tooltip> -->
					<el-tooltip content="编辑" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
			  </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">创建杂志</el-button>
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
		name: 'magazineList',
		data() {
			return {
				dataPath: ['运营管理', '杂志管理', '杂志列表'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
				formObj: {
					tutor: ''
				},
				tutorLoading: false, //搜索导师
				tutorList: [], //搜索到的导师列表
				loading: false,
				tableData: [{
					id: 23,
					picUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
					title: '与孩子共同成长之“正面管教”',
					classify: '正面管教',
					author: '周星驰',
					pageView: 10,
					scNum: 300,
					createTm: 1543209657000
				}, {
					id: 23,
					picUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
					title: '与孩子共同成长之“正面管教”',
					classify: '正面管教',
					author: '周星驰',
					pageView: 10,
					scNum: 300,
					createTm: 1543209657000
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
			remoteMethod(query) {
				let list = [{value: 1, label: 'james'}, {value: 2, label: 'wede'}, {value: 3, label: 'kobe'}]
		        if (query !== '') {
		          	this.tutorLoading = true;
		          	setTimeout(() => {
		            	this.tutorLoading = false;
		            	this.tutorList = list.filter(item => {
		             		return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
		            	});
		          	}, 500);
		        } else {
		          	this.tutorList = [];
		        }
		    },
		    add() { //创建杂志

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
		width: 80px;
		cursor: pointer;
	}
	.big-pic {
		width: 100%;
		display: block;
		margin: 0 auto;
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  	opacity: 0;
	}

	.title {
		font-family: PingFangSC-Medium;
	    font-size: 18px;
	    color: #303030;
	    letter-spacing: 0.8px;
	}
	.classify {
		padding: 5px 0;
		font-family: PingFangSC-Medium;
	    font-size: 16px;
	    color: #919191;
	    letter-spacing: 0.71px;
	}
	.data {
		& span {
			padding-right: 10px;
			font-family: PingFangSC-Medium;
		    font-size: 14px;
		    color: #919191;
		    letter-spacing: 0.62px;
		}	
	}
</style>