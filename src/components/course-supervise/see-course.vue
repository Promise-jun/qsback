<template>
	<div class="children-view">
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
		  <el-form-item label="类型">
		    <el-select v-model="formObj.status" placeholder="请选择类型">
		  		<el-option label="免费" value="1"></el-option>
		  		<el-option label="付费" value="2"></el-option>
		  	</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '个课程'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="概述">
		            <span>{{ props.row.summary }}</span>
		          </el-form-item>
		          <el-form-item label="所属专栏">
		            <span>{{ props.row.column }}</span>
		          </el-form-item>
		          <el-form-item label="主题">
		            <span>{{ props.row.theme }}</span>
		          </el-form-item>
		          <el-form-item label="音频">
		            <audio :src="props.row.audio" controls></audio>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="title" label="标题"></el-table-column>
		    <el-table-column label="封面">
		      <template slot-scope="scope">
		      	<img :src="scope.row.picUrl" class="pic" @click="showBigPic(scope.row.picUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column prop="price" label="价格"></el-table-column>
		    <el-table-column prop="num" label="播放次数"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="groom" label="推荐"></el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">创建课程</el-button>
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

		<el-dialog title="图片" :visible.sync="bigPicVisible" :center="true" :modal="false">
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
		name: 'seeCourse',
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
			    	id: '11',
			    	name: '1212',
			    	title: '成长的烦恼',
			    	summary: '孩子幼年的教育',
			    	picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543381946645&di=f460d27bba8fd0e663433d350d903fb6&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F68%2F32%2F08658PICred.jpg',
			    	theme: '婚恋情感',
			    	column: '成长的烦恼系列',
			    	price: 9.99,
			    	num: 100,
			    	audio: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3',
			    	status: '上架',
			    	groom: '推荐'
			    }],
			    bigPicVisible: false,
			    bigPicurl: ''
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {

			},
			add() { //创建课程
				this.$router.push({
					path: '/topicColumn/' + this.$route.params.id + '/addCourse'
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
	.children-view {
		position: absolute;
	    top: 44px;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #fff;
	    padding: 20px;
	    overflow-y: auto;
	}
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
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  	opacity: 0;
	}
	.demo-table-expand {
	    font-size: 0;
	    & label {
	    	width: 90px;
		    color: #99a9bf;
	    }
	    & .el-form-item {
	    	margin-right: 0;
		    margin-bottom: 0;
		    width: 50%;
	    }
	}
</style>