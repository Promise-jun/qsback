<template>
	<div>
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

		<el-alert :title="'总计' + pageTotal.total + '条专辑节目'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="title" label="节目标题"></el-table-column>
		    <el-table-column prop="zj" label="所属专辑"></el-table-column>
		    <el-table-column prop="name" label="主播姓名"></el-table-column>
		    <el-table-column label="背景图片">
		      <template slot-scope="scope">
		      	<img :src="scope.row.picUrl" class="pic" @click="showBigPic(scope.row.picUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column prop="timelen" label="时长"></el-table-column>
		    <el-table-column prop="isshoufei" label="是否收费"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="num1" label="赞的数量"></el-table-column>
		    <el-table-column prop="num2" label="播放次数"></el-table-column>
		    <el-table-column prop="downloadnum" label="下载次数"></el-table-column>
			<el-table-column label="创建时间">
		      <template slot-scope="scope">{{ scope.row.createtime | formatDate }}</template>
		    </el-table-column>
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

		<el-dialog title="图片" :visible.sync="bigPicVisible" :center="true">
		  	<img :src="bigPicurl" class="big-pic">
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'anchorRadio',
		data() {
			return {
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
			    	id: 11,
			    	title: '薛之谦歌曲',
			    	zj: '天空之城',
			    	name: '张学友',
			    	picUrl: 'http://e.hiphotos.baidu.com/lvpics/w=1000/sign=e6547bab4890f60304b098470922b11b/f603918fa0ec08fa3debe43d5bee3d6d54fbda45.jpg',
			    	timelen: '0小时3分37秒',
			    	isshoufei: '免费',
			    	status: '上线',
			    	num1: 10,
			    	num2: 23,
			    	downloadnum: 33,
			    	createtime: 1543219657000,
			    	shstatus: '待审核'
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
</style>