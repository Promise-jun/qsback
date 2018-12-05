<template>
	<div>
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
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="addTime" label="加入时间" width="150"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="删除" placement="top">
					  <el-button @click="delRole(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加用户</el-button>
		  	<el-button type="primary" icon="el-icon-delete">批量删除</el-button>
		  </el-col>
		  <el-col :span="12">
		  	<page-num
		  		
				:currentpage="pageTotal.page"
				:total="pageTotal.total"
				:pageSize="pageTotal.pageSize"
				:render="getList"
				:options="pageTotal">
			</page-num>
		  </el-col>
		</el-row>

		<!-- 添加咨询师 -->
		<el-dialog title="添加咨询师" :visible.sync="visibleDialog" width="30%">
		  <el-form :model="formData" label-width="100px" ref="submitForm">
		    <el-form-item label="姓名">
		      	<el-select v-model="formData.value" placeholder="请选择">
				    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item>
			    <el-button type="primary" @click="submit('submitForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="visibleDialog = false">取消</el-button>
			</el-form-item>
		  </el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'
	
	export default {
		props: ['groupId'],
		data() {
			return {
				loading: false,
				tableList: [],
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    visibleDialog: false,
			    submitLoading: false,
			    formData: {},
			    options: [{
			    	label: '唐嫣',
			    	value: 0
			    }]
			}
		},
		created() {
			console.log(this.groupId)
		},
		methods: {
			getList() {

			},
			handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    },
		    add() { //添加用户
		    	this.visibleDialog = true
		    },
		    submit(formName) {
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.submitLoading = true
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    }
		},
		components: {
			PageNum
		},
		watch: {
			groupId: {
　　　　    	handler(newValue, oldValue) {
                    //父组件groupId对象改变会触发此函数
                    console.log(newValue)
　　　　        },
　　　　		deep: true
　　　　    }
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
</style>