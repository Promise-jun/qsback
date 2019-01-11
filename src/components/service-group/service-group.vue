<template>
	<div>
    	<el-row :gutter="20">
		  <el-col :span="6" v-loading="groupLoading">

		  	<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>分组名称</span>
			    <el-button v-hasPermission="70" style="float: right; padding: 3px 0" type="text" @click="addGroup">添加分组</el-button>
			  </div>
			  <div v-for="(item, index) in groupList" :key="item.serviceGroupId" class="text item" :class="{active: isActive === index}" @click="chooseUser(item, index)">
			  	<span class="text">{{item.serviceGroupName}}</span>
			  	<el-tooltip content="删除" placement="top" v-hasPermission="71">
				  <el-button @click.stop="delGroup(item.serviceGroupId, index)" type="text" icon="iconfont icon-delete"></el-button>
				</el-tooltip>
			  </div>
			</el-card>

		  </el-col>
		  <el-col :span="18" v-show="isActive !== ''">

		  	<el-card class="box-card">
				<div slot="header" class="clearfix">
				  <span>{{GroupTitle}}</span>
				</div>
			  	<el-form :inline="true" class="demo-form-inline" size="small">
				  <el-form-item label="客服组名">
				    <el-input v-model="inpGroupName" placeholder="请输入"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="selectGroup">查询</el-button>
				  </el-form-item>
				</el-form>

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
				    <el-table-column type="selection" :selectable="isCheck" width="50"> </el-table-column>
				    <el-table-column prop="userName" label="姓名"></el-table-column>
				    <el-table-column prop="roleName" label="角色"></el-table-column>
				    <el-table-column prop="userPhone" label="手机号"></el-table-column>
				    <el-table-column prop="serviceGroupName" label="组名"></el-table-column>
				    <el-table-column label="加入时间" width="155">
				    	<template slot-scope="scope">
				    		{{scope.row.createTm | dateformat}}
				    	</template>
				    </el-table-column>
				    <el-table-column label="操作">
				    	<template slot-scope="scope">
				    		<div v-if="scope.row.roleId == 3">
				    			<el-tooltip content="修改主管" placement="top" v-hasPermission="76">
								  <el-button @click="changeDirector(scope.row)" size="mini" type="text" icon="iconfont icon-edit-square" style="color: #E6A23C;"></el-button>
								</el-tooltip>
				    		</div>
					    	<div v-else>
					    		<el-tooltip content="删除" placement="top" v-hasPermission="74">
								  <el-button @click="delMember(scope.row, scope.$index)" size="mini" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
								</el-tooltip>
								<el-tooltip content="设为组长" placement="top" v-hasPermission="75" v-if="scope.row.isLeader == 0">
								  <el-button @click="setLeader(scope.row, scope.$index, 1)" size="mini" type="text" icon="iconfont icon-check" style="color: #67C23A;"></el-button>
								</el-tooltip>
								<el-tooltip content="取消组长" placement="top" v-hasPermission="75" v-else>
								  <el-button @click="setLeader(scope.row, scope.$index, 0)" size="mini" type="text" icon="iconfont icon-close" style="color: #67C23A;"></el-button>
								</el-tooltip>
					    	</div>
					    </template>
				    </el-table-column>
				</el-table>

				<el-row>
				  <el-col :span="12">
				  	<el-button v-hasPermission="73" type="primary" size="small" icon="el-icon-circle-plus" @click="addMember">添加用户</el-button>
				  	<el-button v-hasPermission="77" type="primary" size="small" icon="el-icon-circle-plus" @click="createGroup">创建小组</el-button>
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
			</el-card>

		  </el-col>
		</el-row>
		
		<!-- 添加分组 -->
		<el-dialog title="新建分组" :visible.sync="isGroupForm">
		  <el-form :model="formGroup" :rules="rules" label-width="100px">
		    <el-form-item label="分组名称" prop="groupName">
		      <el-input v-model="formGroup.groupName" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="客服主管" prop="kefuDirector">
		      <el-select v-model="formGroup.kefuDirector" placeholder="请选择客服主管">
		        <el-option
			      v-for="item in kefuList"
			      :key="item.user_id"
			      :label="item.user_name"
			      :value="item.user_id">
			    </el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="isGroupForm = false">取 消</el-button>
		    <el-button type="primary" @click="addGroupSubmit" :loading="submitLoading">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 修改主管 -->
		<el-dialog title="修改主管" :visible.sync="isDirector">
		  <el-form :model="directorObj" :rules="rules" label-width="100px">
		    <el-form-item label="客服主管" prop="kefuDirector">
		      <el-select v-model="directorObj.kefuDirector" placeholder="请选择客服主管">
		        <el-option
			      v-for="item in kefuList"
			      :key="item.user_id"
			      :label="item.user_name"
			      :value="item.user_id">
			    </el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="isDirector = false">取 消</el-button>
		    <el-button type="primary" @click="submitChangeDirector" :loading="submitLoading">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 添加成员 -->
		<el-dialog title="添加成员" :visible.sync="memberVisible">
		  <el-form :model="memberObj" :rules="rules" label-width="100px">
		    <el-form-item label="组别名称" prop="name">
		      <el-input v-model="memberObj.name" autocomplete="off" :disabled="true"></el-input>
		    </el-form-item>
		    <el-form-item label="选择组员">
		      <el-select
			    v-model="memberObj.member"
			    multiple
			    collapse-tags
			    placeholder="请选择">
			    <el-option
			      v-for="item in memberList"
			      :key="item.user_id"
			      :label="item.user_name"
			      :value="item.user_id">
			    </el-option>
			  </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="memberVisible = false">取 消</el-button>
		    <el-button type="primary" @click="MemberSubmit" :loading="submitLoading">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'servicegroup',
		data() {
			return {
				rules: {
					groupName: [
						{ required: true, message: '分组名称不能为空' }
					],
					kefuDirector: [
						{ required: true, message: '客服主管不能为空' }
					]
				},
				isActive: '',
				// 分组
				groupLoading: false,
				groupList: [],
				isGroupForm: false,
				formGroup: {
					groupName: '',
					kefuDirector: '' 
				},
				submitLoading: false,
				// 客服主管
				kefuList: [],
		        // 客服组成员
		        memberVisible: false,
		        memberObj: {
		        	id: '',
		        	name: '',
		        	member: []
		        },
		        memberList: [], //成员列表
		        inpGroupName: '',
		        GroupTitle: '',
		        loading: false,
		        tableList: [],
		        multipleSelection: [],
		        pageTotal: { //分页数据
			        total: 0,
			        pageSize: 10,
			        page: 1
			    },
			    // 修改主管
			    isDirector: false,
			    directorObj: {
			    	kefuDirector: '',
			    	serviceMemberId: ''
			    }
			}
		},
		created() {
			this.getGroup()
		},
		methods: {
			// 分组列表
			getGroup() {
				this.groupLoading = true
				this.$axios({
					method: 'post',
					url: '/system/SysService/queryForList',
					data: this.$qs.stringify({
						parentGroupId: 0,
						thisPage: 1,
						limit: 50
					})
				}).then(res => {
					this.groupLoading = false
					let result = res.data
					if (result.code == 200) {
						this.groupList = result.data.list
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			addGroup() { //添加分组
				this.getDirector()
				this.isGroupForm = true;
			},
			addGroupSubmit() { //提交分组
				if (!this.formGroup.groupName) {
					this.$message.error('请填写分组名称');
					return;
				}
				if (!this.formGroup.kefuDirector) {
					this.$message.error('请选择客服主管');
					return;
				}
				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/system/SysService/saveForSysService',
					data: this.$qs.stringify({
						serviceGroupName: this.formGroup.groupName,
						memberId: this.formGroup.kefuDirector,
						parentGroupId: 0
					})
				}).then(res => {
					this.isGroupForm = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.getGroup()
						this.$message({
							type: 'success',
							message: '添加分组成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 获取客服主管列表
			getDirector() {
				this.$axios({
					method: 'post',
					url: '/system/SysService/findCustomerSupervisor'
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.kefuList = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 删除分组
			delGroup(groupId, index) {
				this.$confirm('确定要删除该分组吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.groupLoading = true
					this.$axios({
						method: 'post',
						url: '/system/SysService/deleteForSysService',
						data: this.$qs.stringify({
							serviceGroupId: groupId,
							isDel: 1
						})
					}).then(res => {
						this.groupLoading = false
						let result = res.data
						if (result.code == 200) {
							this.groupList.splice(index, 1)
							this.$message({
								type: 'success',
								message: '删除分组成功'
							})
						} else {
							this.$message.error(result.msg)
						}
					}).catch(err => {
						this.$message.error(err)
					})
		        }).catch(() => {
		                
		        });
			},
			//选择分组
			chooseUser(item, index) { 
				this.isActive = index;
				this.GroupTitle = item.serviceGroupName;
				this.memberObj.id = item.serviceGroupId
				this.memberObj.name = item.serviceGroupName
				this.getList(this.memberObj.id)
			},
			getList(groupId) {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/serviceMember/queryForList',
					data: this.$qs.stringify({
						serviceGroupName: this.inpGroupName,
						serviceGroupId: groupId,
						thisPage: this.pageTotal.page,
						limit: this.pageTotal.pageSize
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
			//查询客服组成员
			selectGroup() { 
				this.getList(this.memberObj.id);
			},
			// 是否可以被选择
			isCheck(row, index) {
				if (row.roleId == 3 || row.parentGroupId != 0) {
					return false
				} else {
					return true
				}
			},
			// 添加成员
			addMember() {
				this.getMember()
				this.memberVisible = true
			},
			MemberSubmit() {
				if (!this.memberObj.member.length) {
					this.$message.error('请选择组员');
					return;
				}
				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/system/serviceMember/saveServiceMember',
					data: this.$qs.stringify({
						groupId: this.memberObj.id,
						memberIds: this.memberObj.member.join(',')
					})
				}).then(res => {
					this.memberVisible = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.getList(this.memberObj.id)
						this.$message({
							type: 'success',
							message: '成员添加成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取成员列表
			getMember() {
				this.$axios({
					method: 'post',
					url: '/system/serviceMember/finAddedMembers'
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.memberList = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 创建小组
			createGroup() {
				if (!this.multipleSelection.length) {
					this.$message.error('请选择分组成员')
					return
				}
				this.$prompt('请输入小组名称', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('请输入小组名称')
						return
		        	}
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/serviceMember/saveServiceMember',
		        		data: this.$qs.stringify({
		        			groupId: this.memberObj.id,
		        			gruopName: value,
		        			memberIds: this.multipleSelection.join(',')
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.getList(this.memberObj.id)
		        			this.$message({
		        				type: 'success',
		        				message: '创建小组成功'
		        			})
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
		        	this.multipleSelection.push(item.memberUserId)
		        });
		    },
		    // 删除成员
		    delMember(row, index) {
		    	this.$confirm('确定要将该成员移除吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/serviceMember/deleteMemberById',
		        		data: this.$qs.stringify({
		        			memberId: row.memberUserId
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.tableList.splice(index, 1)
		        			this.$message({
		        				type: 'success',
		        				message: '成员移除成功'
		        			})
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})
		        }).catch(() => {
		                   
		        });
		    },
		    // 设置是否为组长
		    setLeader(row, index, type) {
		    	let tool
		    	if (type == 1) {
		    		tool = '确定要将该成员设为客服组长？'
		    	} else {
		    		tool = '确定要将该成员取消客服组长？'
		    	}
		    	this.$confirm(tool, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/serviceMember/editForServiceMember',
		        		data: this.$qs.stringify({
		        			memberUserId: row.memberUserId,
		        			isLeader: type
		        		})
			    	}).then(res => {
			    		let result = res.data
			    		if (result.code == 200) {
			    			this.getList(this.memberObj.id)
			    			this.$message({
					            type: 'success',
					            message: '操作成功!'
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
		    // 修改主管
		    changeDirector(row) {
		    	this.getDirector()
		    	this.isDirector = true
		    	this.directorObj.serviceMemberId = row.serviceMemberId
		    },
		    // 提交修改
		    submitChangeDirector() {
		    	if (!this.directorObj.kefuDirector) {
					this.$message.error('请选择客服主管');
					return;
				}
				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/system/serviceMember/updateExecutiveDirector',
					data: this.$qs.stringify({
						serviceMemberId: this.directorObj.serviceMemberId,
						memberUserId: this.directorObj.kefuDirector
					})
				}).then(res => {
					this.isDirector = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.getList(this.memberObj.id)
						this.$message({
							type: 'success',
							message: '客服主管修改成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.submitLoading = false
					console.error(err)
				})
		    }
		},
		components: {
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped="">
	.el-pagination {
		float: right;
	}
	.item {
		padding: 6px;
		cursor: pointer;
		overflow: hidden;
		&:hover {
			background-color: #F2F6FC;
		}
		&.active {
			color: #fff;
			background-color: #7BB6F3;
			& .el-button {
				color: #fff;
			}
		}
		& .text {
			float: left;
		}
		& .el-button {
			padding: 0;
			float: right;
			color: #F56C6C;
		}
	}
</style>