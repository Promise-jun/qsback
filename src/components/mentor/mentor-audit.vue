<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
		  <el-form-item label="情说号">
		    <el-input v-model="formObj.userCode" placeholder="请输入情说号"></el-input>
		  </el-form-item>
		  <el-form-item label="用户名">
		    <el-input v-model="formObj.nickName" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="导师审核状态">
		    <el-select v-model="formObj.status" placeholder="请选择">
			    <el-option label="待审核" value="0"></el-option>
			    <el-option label="审核通过" value="1"></el-option>
			    <el-option label="审核不通过" value="2"></el-option>
			</el-select>
		  </el-form-item>
		  <!-- <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item> -->
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '个导师'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableList"
		    stripe
		    border
		    size="mini"
		    v-loading="loading"
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="情说号">
		      <template slot-scope="scope">{{ scope.row.userCode }}</template>
		    </el-table-column>
		    <el-table-column label="在职类型">
		      <template slot-scope="scope">
		      		<span v-if="scope.row.workType == 0">兼职</span>
		      		<span v-else-if="scope.row.workType == 1">全职</span>
		      </template>
		    </el-table-column>
		    <el-table-column prop="nickName" label="昵称"></el-table-column>
		    <el-table-column prop="realName" label="姓名"></el-table-column>
		    <el-table-column prop="city" label="所在城市"></el-table-column>
		    <el-table-column label="从业时间" width="155">
		    	<template slot-scope="scope">{{scope.row.workTm | dateformat}}</template>
		    </el-table-column>
		    <el-table-column label="提交时间" width="155">
		    	<template slot-scope="scope">{{scope.row.createTm | dateformat}}</template>
		    </el-table-column>
		    <el-table-column label="审核状态">
		    	<template slot-scope="scope">
		      		<span v-if="scope.row.status == 0">待审核</span>
		      		<span v-else-if="scope.row.status == 1">审核通过</span>
		      		<span v-else-if="scope.row.status == 2">审核不通过</span>
		      	</template>
		    </el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="编辑" placement="top" v-hasPermission="61">
					  <el-button @click="edit(scope.row)" size="mini" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
					<el-tooltip content="处理" placement="top" v-hasPermission="34">
					  <el-button @click="handle(scope.row)" size="mini" type="text" icon="iconfont icon-wrench" style="color: #E6A23C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<!-- <el-button type="primary" size="small" icon="el-icon-refresh">更新IM账号</el-button> -->
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
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'mentorlist',
		data() {
			return {
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 15,
			        page: 1
			    },
				formObj: {
					userid: '',
					userCode: '',
					name: '',
					nickName: '',
					status: '0',  //导师审核状态
				},
		        tableList: [],
		        multipleSelection: [],
		        loading: false
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				/*let beginTime, endTime
				if (this.formObj.dateValue && this.formObj.dateValue.length) {
					beginTime = this.formObj.dateValue[0]
					endTime = this.formObj.dateValue[1]
				} else {
					beginTime = ''
					endTime = ''
				}*/
				let uploadData = {
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize,
					userCode: this.formObj.userCode,
					nickName: this.formObj.nickName,
					realName: this.formObj.name,
					status: this.formObj.status
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/apply/queryForList',
					data: this.$qs.stringify(uploadData)
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
			        	this.tableList = result.data.list
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
			onSubmit() {
				this.getList()
	      	},
	      	handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    },
		    // 编辑
		    edit(row) {
		    	let {href} = this.$router.resolve({
		    		path: '/mentor/addMentor?consultantApplyId=' + row.consultantApplyId
		    	});
				window.open(href, '_blank');
		    },
		    // 处理
		    handle(row) {
		    	let {href} = this.$router.resolve({
		    		path: '/mentor/mentorAuditDetail?consultantApplyId=' + row.consultantApplyId
		    	});
				window.open(href, '_blank');
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
</style>