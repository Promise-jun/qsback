<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="状态">
		    <el-select v-model="formObj.status" placeholder="请选择状态">
		  		<el-option label="显示" value="1"></el-option>
		  		<el-option label="不显示" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="类型">
		    <el-select v-model="formObj.type" placeholder="请选择类型">
		  		<el-option label="电台" value="1"></el-option>
		  		<el-option label="直播" value="2"></el-option>
		  		<el-option label="微课" value="3"></el-option>
		  		<el-option label="首页" value="4"></el-option>
		  	</el-select>
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
		    <el-table-column prop="picId" label="ID" width="50"></el-table-column>
		    <el-table-column label="图片">
		      <template slot-scope="scope">
		      	<img :src="scope.row.picUrl" class="pic" @click="showBigPic(scope.row.picUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column prop="linkUrl" label="跳转链接"></el-table-column>
		    <el-table-column prop="sort" label="排序"></el-table-column>
		    <el-table-column prop="remarks" label="备注"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="menu" label="菜单"></el-table-column>
		    <el-table-column prop="type" label="客户端类型"></el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加banner图</el-button>
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
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'bannerList',
		data() {
			return {
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    bigPicVisible: false,
				bigPicurl: '',
				formObj: {},
				loading: false,
				tableData: [{
					picId: 1,
					picUrl: 'http://www.qi-che.com/upimg/rnwcars/m_359_n.jpg',
					linkUrl: 'http://www.qingshuo.com/download/app_download.html',
					sort: 0,
					remarks: '情说官网',
					status: '显示',
					menu: '首页',
					type: 'H5'
				}]
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {

			},
			add() { //添加banner图
				this.$router.push({
					path: '/advertisement/banner/addBanner'
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
</style>