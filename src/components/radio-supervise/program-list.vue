<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="标题">
		    <el-input v-model="formObj.userName" placeholder="请输入标题"></el-input>
		  </el-form-item>
		  <el-form-item label="状态">
		    <el-select v-model="formObj.status" placeholder="请选择状态">
		  		<el-option label="上架" value="1"></el-option>
		  		<el-option label="未上架" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item label="审核状态">
		    <el-select v-model="formObj.status" placeholder="请选择审核状态">
		  		<el-option label="待审核" value="1"></el-option>
		  		<el-option label="审核通过" value="2"></el-option>
		  		<el-option label="审核不通过" value="3"></el-option>
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
		    <el-table-column prop="id" label="用户ID"></el-table-column>
		    <el-table-column prop="name" label="主播姓名"></el-table-column>
		    <el-table-column prop="phone" label="联系方式"></el-table-column>
		    <el-table-column prop="title" label="标题"></el-table-column>
		    <el-table-column prop="classify" label="电台分类"></el-table-column>
		    <el-table-column label="专辑封面">
		      <template slot-scope="scope">
		      	<img :src="scope.row.picUrl" class="pic" @click="showBigPic(scope.row.picUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column prop="num1" label="节目数量"></el-table-column>
		    <el-table-column prop="num2" label="收藏数量"></el-table-column>
		    <el-table-column prop="num3" label="播放次数"></el-table-column>
		    <el-table-column prop="grade" label="评分"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="shstatus" label="审核状态"></el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加专辑</el-button>
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
	
	export default {
		name: 'programList',
		data() {
			return {
				dataPath: ['电台管理', '专辑管理', '专辑列表'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    loading: false, //表格loading
			    bigPicVisible: false,
			    bigPicurl: '',
			    formObj: {},
			    tableData: [{
			    	id: 23,
			    	name: '陶全高',
			    	phone: '13816997307',
			    	title: '杭州',
			    	classify: '[治愈, 欢快, 散步]',
			    	picUrl: 'http://e.hiphotos.baidu.com/lvpics/w=1000/sign=e6547bab4890f60304b098470922b11b/f603918fa0ec08fa3debe43d5bee3d6d54fbda45.jpg',
			    	num1: 10,
			    	num2: 23,
			    	num3: 56,
			    	grade: 5,
			    	status: '已上架',
			    	shstatus: '待审核'
			    }]
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {

			},
			add() { //添加专辑
				this.$router.push({
		  			path: '/program/list/addProgram'
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