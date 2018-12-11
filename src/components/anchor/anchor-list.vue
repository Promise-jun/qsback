<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userid" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="昵称">
		    <el-input v-model="formObj.nickName" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="主播状态">
		    <el-select v-model="formObj.status" placeholder="请选择">
			    <el-option label="可用" value="0"></el-option>
			    <el-option label="禁用" value="1"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	:default-time="['00:00:00', '23:59:59']"
		    	value-format="yyyy-MM-dd HH:mm:ss"
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert title="总计416个用户" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableList"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column label="用户ID">
		      <template slot-scope="scope">
		      	<router-link target="_blank" :to="{path:'/anchor/anchorDetail', query:{userId: scope.row.userId}}">{{ scope.row.userId }}</router-link>
		      </template>
		    </el-table-column>
		    <el-table-column prop="username" label="用户名"></el-table-column>
		    <el-table-column prop="anchorPhone" label="手机号"></el-table-column>
			<el-table-column prop="nickName" label="昵称"></el-table-column>
			<el-table-column label="性别">
				<template slot-scope="scope">
		      		<span v-if="scope.row.sex == 0">未知</span>
		      		<span v-else-if="scope.row.sex == 1">男</span>
		      		<span v-else>女</span>
		      	</template>
			</el-table-column>
			<el-table-column label="注册时间" width="155">
				<template slot-scope="scope">{{scope.row.createTm | dateformat}}</template>
			</el-table-column>
		    <el-table-column prop="realName" label="姓名"></el-table-column>
		    <el-table-column prop="diamondBalance" label="钻石余额"></el-table-column>
		    <el-table-column prop="diamondFreeze" label="冻结钻石"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="addAnchor">申请主播</el-button>
		  	<el-button type="primary" icon="el-icon-refresh">更新IM账号</el-button>
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
			        pageSize: 10,
			        page: 1
			    },
				formObj: {
					userid: '',
					name: '',
					nickName: '',
					status: '0',  //状态
					dateValue: []
				},
				loading: false,
		        tableList: [],
		        multipleSelection: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				let beginTime, endTime
				if (this.formObj.dateValue && this.formObj.dateValue.length) {
					beginTime = this.formObj.dateValue[0]
					endTime = this.formObj.dateValue[1]
				} else {
					beginTime = ''
					endTime = ''
				}
				let uploadData = {
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize,
					userId: this.formObj.userid,
					nickName: this.formObj.nickName,
					realName: this.formObj.name,
					beginTime: beginTime,
					endTime: endTime,
					isDel: this.formObj.status
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/anchor/queryForList',
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
			// 查询
			onSubmit() {
	        	this.getList()
	      	},
	      	handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    },
		    // 申请主播
		    addAnchor() {
		    	let {href} = this.$router.resolve({
		    		path: '/anchor/addAnchor'
		    	});
				window.open(href, '_blank');
		    },
		    // 编辑主播
		    edit(row) {
		    	let {href} = this.$router.resolve({
		    		path: '/anchor/editAnchor?userId=' + row.userId
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