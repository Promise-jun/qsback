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
		  <el-form-item label="主播审核状态">
		    <el-select v-model="formObj.status" placeholder="请选择">
			    <el-option label="待审核" value="0"></el-option>
			    <el-option label="审核通过" value="1"></el-option>
			    <el-option label="审核不通过" value="2"></el-option>
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
		      	{{ scope.row.userId }}
		      </template>
		    </el-table-column>
		    <el-table-column prop="username" label="用户名"></el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="nickName" label="昵称"></el-table-column>
			<el-table-column prop="sex" label="性别"></el-table-column>
			<el-table-column prop="registerTime" label="注册时间" width="150"></el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="ywss" label="业务所属"></el-table-column>
		    <el-table-column prop="shStatus" label="审核状态"></el-table-column>
		    <!-- <el-table-column label="操作">
		    	<template slot-scope="scope">
		    					<el-tooltip content="处理" placement="top">
		    					  <el-button @click="handle(scope.row)" type="text" icon="iconfont icon-wrench"></el-button>
		    					</el-tooltip>
		    			    </template>
		    </el-table-column> -->
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
					status: '0',  //主播审核状态
					dateValue: ''
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
					status: this.formObj.status
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/anchorApply/queryForList',
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
		    // 处理
		    handle(row) {
		    	let {href} = this.$router.resolve({
		    		path: '/anchor/anchorAuditDetail?userId=' + row.userId
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