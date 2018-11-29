<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
    	  <el-form-item label="时间">
		    <el-date-picker
		      	v-model="formObj.time"
		      	type="daterange"
		      	range-separator="至"
		      	start-placeholder="开始日期"
		      	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-checkbox v-model="formObj.picChecked">仅显示图片</el-checkbox>
		  </el-form-item>
		  <el-form-item>
		    <el-checkbox v-model="formObj.checked">仅显示带有敏感词</el-checkbox>
		  </el-form-item>
		  <el-form-item label="关键词">
		    <el-input v-model="formObj.keyWords" placeholder="请输入关键词"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '条聊天记录'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column label="发送者" width="100" align="center">
		    	<template slot-scope="scope">
	    			<img :src="scope.row.sendHeadUrl" class="head-pic">
	    			<p class="user_id">{{ scope.row.sendId }}</p>
		    	</template>
		    </el-table-column>
		    <el-table-column label="接收者" width="100" align="center">
		    	<template slot-scope="scope">
	    			<img :src="scope.row.receiveHeadUrl" class="head-pic">
	    			<p class="user_id">{{ scope.row.receiveId }}</p>
		    	</template>
		    </el-table-column>
		    <el-table-column label="发送时间" width="150" align="center">
		      <template slot-scope="scope">{{ scope.row.sendTime | formatDate }}</template>
		    </el-table-column>
		    <el-table-column label="内容">
		    	<template slot-scope="scope">
		    		<div v-if="scope.row.picUrl">
		    			<img :src="scope.row.picUrl" class="pic_info" @click="showBigPic(scope.row.picUrl)">
		    		</div>
		    		<div v-else-if="scope.row.audioUrl">
		    			<audio :src="scope.row.audioUrl" controls="controls"></audio>
		    		</div>
		    		<div v-else>
		    			{{ scope.row.content }}
		    		</div>
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
	import BreadCrumb from 'base/bread-crumb/bread-crumb' 
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'

	export default {
		name: 'textChat',
		data() {
			return {
				dataPath: ['运营管理', '互动管理', '图文聊天记录'],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
				formObj: {},
				loading: false,
				tableData: [{
					sendId: 23,
					sendName: '情说000005',
					sendHeadUrl: 'http://img3.imgtn.bdimg.com/it/u=1515847357,2115914744&fm=26&gp=0.jpg',
					receiveId: 171,
					receiveName: '小白',
					receiveHeadUrl: 'http://img4.imgtn.bdimg.com/it/u=356357529,1073111929&fm=15&gp=0.jpg',
					sendTime: 1543219657000,
					content: '123456789'
				}, {
					sendId: 23,
					sendName: '情说000005',
					sendHeadUrl: 'http://img3.imgtn.bdimg.com/it/u=1515847357,2115914744&fm=26&gp=0.jpg',
					receiveId: 171,
					receiveName: '小白',
					receiveHeadUrl: 'http://img4.imgtn.bdimg.com/it/u=356357529,1073111929&fm=15&gp=0.jpg',
					sendTime: 1543219657000,
					picUrl: 'http://wx4.sinaimg.cn/orj360/5a6879b6gy1fxn586in71j20k0329e81.jpg'
				}, {
					sendId: 23,
					sendName: '情说000005',
					sendHeadUrl: 'http://img3.imgtn.bdimg.com/it/u=1515847357,2115914744&fm=26&gp=0.jpg',
					receiveId: 171,
					receiveName: '小白',
					receiveHeadUrl: 'http://img4.imgtn.bdimg.com/it/u=356357529,1073111929&fm=15&gp=0.jpg',
					sendTime: 1543219657000,
					audioUrl: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3'
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
	.el-row {
		margin-top: 15px;
		& .el-pagination {
			float: right;
		}
	}
	.head-pic {
		display: block;
		margin: 0 auto 5px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}
	.pic_info {
		max-width: 100px;
		max-height: 100px;
		cursor: pointer;
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