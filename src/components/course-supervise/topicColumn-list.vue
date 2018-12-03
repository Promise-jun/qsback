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

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column label="标题">
		    	<template slot-scope="scope">
		    		<router-link :to="{ name:'seeCourse',params:{ id: scope.row.id } }">{{ scope.row.title }}</router-link>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="summary" label="概述"></el-table-column>
		    <el-table-column label="封面">
		      <template slot-scope="scope">
		      	<img :src="scope.row.picUrl" class="pic" @click="showBigPic(scope.row.picUrl)">
		      </template>
		    </el-table-column>
		    <el-table-column prop="theme" label="主题"></el-table-column>
		    <el-table-column prop="price" label="价格"></el-table-column>
		    <el-table-column prop="num" label="数量"></el-table-column>
		    <el-table-column prop="human" label="人气"></el-table-column>
		    <el-table-column prop="status" label="状态"></el-table-column>
		    <el-table-column prop="type" label="类型"></el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">新建专栏</el-button>
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
		name: 'topicColumnList',
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
			    	id: '23',
			    	name: '1212',
			    	title: '成长的烦恼',
			    	summary: '孩子幼年的教育',
			    	picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543381946645&di=f460d27bba8fd0e663433d350d903fb6&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F68%2F32%2F08658PICred.jpg',
			    	theme: '婚恋情感',
			    	price: 9.99,
			    	num: 100,
			    	human: 88,
			    	status: '上架',
			    	type: '付费',
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
			add() { //新建专栏
				this.$router.push({
					path: '/topicColumn/addColumn'
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