<template>
	<div>
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
		    <el-table-column prop="userName" label="姓名"></el-table-column>
		    <el-table-column prop="userPhone" label="手机号"></el-table-column>
		    <el-table-column label="加入时间" width="155">
		    	<template slot-scope="scope">{{ scope.row.createTm | dateformat }}</template>
		    </el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="删除" placement="top" v-hasPermission="88">
					  <el-button @click="del(scope.row, scope.$index)" size="mini" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button v-hasPermission="87" type="primary" size="small" icon="el-icon-circle-plus" @click="add">添加用户</el-button>
		  	<el-button v-hasPermission="89" type="primary" size="small" icon="el-icon-delete" @click="batchDel">批量删除</el-button>
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

		<!-- 添加业务员 -->
		<el-dialog title="添加业务员" :visible.sync="visibleDialog" width="30%">
		  <el-form :model="formData" label-width="100px" ref="submitForm">
		    <el-form-item label="姓名">
		      	<el-select
				    v-model="formData.value"
				    multiple
				    filterable
				    remote
				    reserve-keyword
				    placeholder="请输入关键词"
				    :remote-method="searchUser"
				    :loading="userLoading">
				    <el-option
				      	v-for="item in options"
				      	:key="item.user_id"
				      	:label="item.user_name"
				      	:value="item.user_id">
				    </el-option>
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
			    formData: {
			    	value: []
			    },
			    options: [],
			    userLoading: false,
			    multipleSelection: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/Business/findBusinessMembers',
					data: this.$qs.stringify({
						groupId: this.groupId,
						memberType: 1,
						pageNumber: this.pageTotal.page,
						pageSize: this.pageTotal.pageSize
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.tableList = result.data.list
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 搜索用户
			searchUser(query) {
		        if (query !== '') {
		          	this.userLoading = true;
			        this.$axios({
			        	method: 'post',
			        	url: '/system/Business/findBusinessOroperations',
			        	data: this.$qs.stringify({
			        		userName: query,
			        		memberType: 1
			        	})
			        }).then(res => {
			        	this.userLoading = false;
			        	let result = res.data
			        	if (result.code == 200) {
			            	this.options = result.data.filter(item => {
			              		return item.user_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
			            	});
			        	} else {
			        		this.$message.error(result.msg)
			        	}
			        	
			        }).catch(err => {
			        	console.log(err)
			        })	
		        } else {
		          	this.options = [];
		        }
		    },
			// 删除
			del(row, index) {
				this.$confirm('确定要删除该业务员吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/Business/deleteBatchMembers',
		        		data: this.$qs.stringify({
		        			memberIds: row.userId
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.tableList.splice(index, 1)
		        			this.$message({
				            	type: 'success',
				            	message: '删除成功!'
				          	});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})
		        }).catch(() => {
		            
		        });
			},
			handleSelectionChange(val) {
	      		this.multipleSelection = []
		        val.forEach((item, index) => {
		        	this.multipleSelection.push(item.userId)
		        });
		    },
		    // 批量删除
		    batchDel() {
		    	if (!this.multipleSelection.length) {
		    		this.$message.error('请先选择至少一个用户')
		    		return
		    	}
		    	this.$confirm('确定要批量删除选中的业务员吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/Business/deleteBatchMembers',
		        		data: this.$qs.stringify({
		        			memberIds: this.multipleSelection.join(',')
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.getList()
		        			this.$message({
				            	type: 'success',
				            	message: '删除成功!'
				          	});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})
		        }).catch(() => {
		                  
		        });
		    },
		    add() { //添加用户
		    	this.visibleDialog = true
		    },
		    submit(formName) {
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	if (!this.formData.value.length) {
		          		this.$message.error('添加业务员不能为空！')
		          		return
		          	}
		          	let uploadInfo = {
	            		groupId: this.groupId,
	            		memberIds: this.formData.value.toString(),
	            		memberType: 1
	            	}
		            this.submitLoading = true
		            this.$axios({
		            	method: 'post',
		            	url: '/system/Business/saveConfirmAdd',
		            	indices: false,
		            	data: this.$qs.stringify(uploadInfo)
		            }).then(res => {
		            	this.visibleDialog = false
		            	this.submitLoading = false
		            	let result = res.data
		            	if (result.code == 200) {
		            		this.getList()
		            		if (result.data.length) {
		            			let str = ''
		            			result.data.forEach((item, index) => {
		            				str += item.user_name + ','
		            			})
		            			this.$message.error(str + '已经在该组了！')
		            		} else {
		            			this.$message({
			            			type: 'success',
			            			message: '添加成功！'
			            		})
		            		}
		            	} else {
		            		this.$message.error(result.msg)
		            	}
		            }).catch(err => {
		            	console.log(err)
		            })

		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    }
		},
		watch: {
			groupId: {
　　　　    	handler(newValue, oldValue) {
                    //父组件groupId对象改变会触发此函数
                    this.getList()
　　　　        },
　　　　		deep: true
　　　　    }
		}
	}
</script>