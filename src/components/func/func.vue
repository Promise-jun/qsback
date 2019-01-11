<template>
	<div>
		<el-alert v-if="classify !== ''" :title="'所属分类：' + classify" type="info" :closable="false"></el-alert>

    	<el-table
		    :data="tableData"
		    stripe
		    border
		    size="mini"
		    v-loading="loading"
		    style="width: 100%"
		>	
		    <el-table-column label="名称">
		    	<template slot-scope="scope">
		    		<router-link :to="{ name:'func',query:{ authorityId: scope.row.authorityId } }">{{ scope.row.menuName }}</router-link>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="icon" label="图标"></el-table-column>
		    <el-table-column prop="menuType" label="菜单类型">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.menuType == 1">导航菜单</span>
		    		<span v-else-if="scope.row.menuType == 2">按钮权限</span>
		    		<span v-else>列表权限</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="sequence" label="排序"></el-table-column>
		    <el-table-column prop="dataUrl" label="访问路径"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="编辑" placement="top" v-hasPermission="53">
					  <el-button @click="edit(scope.row)" size="mini" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
		    		<el-tooltip content="删除" placement="top" v-hasPermission="54">
					  <el-button @click="del(scope.row)" size="mini" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button v-hasPermission="52" type="primary" size="small" icon="el-icon-circle-plus" @click="add">添加新纪录</el-button>
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

		<el-dialog 
			:title="dialogTitle" 
			:visible.sync="dialogFormVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false"
		>
		  	<el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="名称" prop="menuName">
			    <el-input v-model="roleForm.menuName" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="菜单类型" prop="menuType">
			    <el-select v-model="roleForm.menuType" placeholder="请选择菜单类型">
			      <el-option label="导航菜单" :value="1"></el-option>
			      <el-option label="按钮权限" :value="2"></el-option>
			      <el-option label="列表权限" :value="3"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="图标">
			    <el-input v-model="roleForm.icon" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="排序">
			    <el-input v-model.number="roleForm.sequence"></el-input>
			  </el-form-item>
			  <el-form-item label="访问路径">
			    <el-input v-model.number="roleForm.dataUrl"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('roleForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="dialogFormVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'

	export default {
		name: 'func',
		data() {
			return {
				rules: {
		          menuName: [
		            { required: true, message: '名称不能为空' }
		          ],
		          menuType: [
		            { required: true, message: '菜单类型不能为空' }
		          ]
		        },
		        dialogTitle: '添加记录',
		        dialogFormVisible: false,
		        submitLoading: false,
		        loading: false,
		        pageTotal: { //分页数据
			        total: 0,
			        pageSize: 10,
			        page: 1
			    },
		        roleForm: {
		        	menuName: '',
		        	icon: '',
		        	menuType: '',
		        	sequence: '',
		        	dataUrl: '',
		        	parentMenucode: 0
		        },
		        tableData: [],
		        classify: ''
			}
		},
		beforeRouteUpdate (to, from, next) {
		    // 在当前路由改变，但是该组件被复用时调用
		    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		    // 可以访问组件实例 `this`
		    next();
		    this.getQuery()
		    this.getList()
		},
		created() {
			this.getQuery();
			this.getList();
		},
		methods: {
			getQuery() {
				this.roleForm.parentMenucode = parseInt(this.$route.query.authorityId)
				if (!this.roleForm.parentMenucode) {
					this.roleForm.parentMenucode = 0
					this.classify = ''
					return
				}
				//查找菜单
				this.$axios({
					method: 'post',
					url: '/sys/authority/findForAuthority',
					data: this.$qs.stringify({
						ID: this.roleForm.parentMenucode
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.classify = result.data.menuName
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			getList() {
				let uploadData = {
					parentMenucode: this.roleForm.parentMenucode,
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/sys/authority/queryForList',
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
			        	this.tableData = result.data.list
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
			// 添加记录
		    add() {
		      	this.dialogTitle = '添加记录';
		      	this.dialogFormVisible = true;

				delete this.roleForm.authorityId;
				this.roleForm.menuName = ''
				this.roleForm.icon = ''
				this.roleForm.menuType = ''
				this.roleForm.sequence = ''
				this.roleForm.dataUrl = ''
		    },
		    // 编辑记录
		    edit(row) {
		      	this.dialogTitle = '修改角色';
		      	this.dialogFormVisible = true;

		      	this.roleForm.authorityId = row.authorityId
				this.roleForm.menuName = row.menuName
				this.roleForm.icon = row.icon
				this.roleForm.menuType = row.menuType
				this.roleForm.sequence = row.sequence
				this.roleForm.dataUrl = row.dataUrl
		    },
		    del(row) {
				this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	center: true
		        }).then(() => {
		        	this.$axios({
				        method: 'post',
				        url: '/sys/authority/deleteForAuthority',
				        data: this.$qs.stringify({
				        	authorityId: row.authorityId
				        })
				    }).then(res => {
				        let result = res.data
				        if (result.code == 200) {
				        	this.getList();
				        	this.$message({
					          message: '删除成功',
					          type: 'success'
					        });
				        } else {
				        	this.$message.error(result.msg);
				        }
				    }).catch(err => {
				        console.log(err)
				    })
		        }).catch(() => {

		        });
			},
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.submitLoading = true
		          	if (!this.roleForm.authorityId) { //新增
		          		let urls = '/sys/authority/saveForAuthority'
		          		let text = '添加成功'
		          		this.upload(urls, text)
		          	} else { //编辑
		          		let urls = '/sys/authority/editForAuthority'
		          		let text = '修改成功'
		          		this.upload(urls, text)
		          	}
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    upload(urls, text) {
		      	this.$axios({
			        method: 'post',
			        url: urls,
			        data: this.$qs.stringify(this.roleForm)
			    }).then(res => {
			        let result = res.data
			        this.submitLoading = false
			        if (result.code == 200) {
			        	this.getList();
			        	this.dialogFormVisible = false;
			        	this.$message({
				          message: text,
				          type: 'success'
				        });
			        } else {
			        	this.$message.error(result.msg);
			        }
			    }).catch(err => {
			    	this.submitLoading = false
			        console.log(err)
			    })
		    }
	  	},
		components: {
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-alert {
		margin-bottom: 15px;
	}
	.el-row {
		margin-top: 15px;
		& .el-pagination {
			float: right;
		}
	}
</style>