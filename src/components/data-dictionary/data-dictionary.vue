<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-table
		    :data="tableData"
		    stripe
		    border
		    v-loading="loading"
		    style="width: 100%"
		>	
		    <el-table-column label="数据名称">
		    	<template slot-scope="scope">
		    		<router-link :to="{ name:'dataDictionary',query:{ dicId: scope.row.dicId } }">
		    			{{ scope.row.dicName }}
		    		</router-link>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="dicRemark" label="字段注释" show-overflow-tooltip></el-table-column>
		    <el-table-column prop="createNm" label="创建人"></el-table-column>
		    <el-table-column label="创建时间">
		    	<template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
		    </el-table-column>
		    <el-table-column prop="updateNm" label="最后更新人"></el-table-column>
		    <el-table-column label="最后更新时间">
		    	<template slot-scope="scope">{{ scope.row.updateTm | formatDate }}</template>
		    </el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加</el-button>
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

		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
		  <el-form :model="formData" status-icon :rules="rules" ref="roleForm" label-width="100px">
		    <el-form-item label="数据名称" prop="dicName">
		      <el-input v-model="formData.dicName" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="字段注释">
		      <el-input v-model="formData.dicRemark" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item>
			  <el-button type="primary" @click="submitForm('roleForm')" :loading="submitLoading">提交</el-button>
			  <el-button @click="dialogVisible = false">取消</el-button>
			</el-form-item>
		  </el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import PageNum from 'base/page-num/page-num'
	import { formatDate } from 'common/js/format'

	export default {
		name: 'dataDictionary',
		data() {
			return {
				dataPath: ['数据字典'],
				rules: {
		          dicName: [
		            { required: true, message: '数据名称不能为空' },
		          ]
		        },
				loading: false,
				dialogTitle: '新增',
				dialogVisible: false,
				submitLoading: false, //提交按钮loading
				tableData: [],   //表格数据
				formData: {
					dicName: '',
					dicRemark: '',
					dicPid: 0  //父类id
				},
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 6,
			        page: 1
			    }
			}
		},
		filters: {
		    formatDate(time) {
		    	var date = new Date(time);
		    	return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
		   	}
		},
		beforeRouteUpdate (to, from, next) {
		    // 在当前路由改变，但是该组件被复用时调用
		    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		    // 可以访问组件实例 `this`
		    next()
		    this.getQuery()
		    this.getList()
		},
		created() {
			this.getQuery()
			this.getList()
		},
		methods: {
			getQuery() {
				this.formData.dicPid = parseInt(this.$route.query.dicId)
				if (!this.formData.dicPid) {
					this.formData.dicPid = 0
					this.dataPath = ['数据字典']
					return
				}
				//查找数据字典
				this.$axios({
					method: 'post',
					url: '/sys/dic/findById',
					data: this.$qs.stringify({
						ID: this.formData.dicPid
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.dataPath = ['数据字典', result.data.dicName]
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			getList() {
				let uploadData = {
					dicPid: this.formData.dicPid,
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/sys/dic/queryForList',
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
			add() {
				this.dialogVisible = true;
				this.dialogTitle = '新增';
				delete this.formData.dicId;
				this.formData.dicName = ''
				this.formData.dicRemark = ''
			},
			edit(row) {
				this.dialogVisible = true;
				this.dialogTitle = '编辑';
				this.formData.dicId = row.dicId
				this.formData.dicName = row.dicName
				this.formData.dicRemark = row.dicRemark
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
				        url: '/sys/dic/deleteForDic',
				        data: this.$qs.stringify({
				        	dicId: row.dicId,
				        	isDel: 1
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
			submitForm(formName) { //提交表单
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.submitLoading = true
		          	if (!this.formData.dicId) { //新增
		          		this.addClassify();
		          	} else { //编辑
		          		this.editClassify();
		          	}
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    addClassify() {
		    	this.$axios({
			        method: 'post',
			        url: '/sys/dic/saveForDic',
			        data: this.$qs.stringify(this.formData)
			    }).then(res => {
			        let result = res.data
			        this.submitLoading = false
			        if (result.code == 200) {
			        	this.getList();
			        	this.dialogVisible = false;
			        	this.$message({
				          message: '添加成功',
				          type: 'success'
				        });
			        } else {
			        	this.$message.error(result.msg);
			        }
			    }).catch(err => {
			    	this.submitLoading = false
			        console.log(err)
			    })
		    },
		    editClassify() {
		    	this.$axios({
			        method: 'post',
			        url: '/sys/dic/editForDic',
			        data: this.$qs.stringify(this.formData)
			    }).then(res => {
			        let result = res.data
			        this.submitLoading = false
			        if (result.code == 200) {
			        	this.getList();
			        	this.dialogVisible = false;
			        	this.$message({
				          message: '修改成功',
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
</style>