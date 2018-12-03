<template>
	<div>
		<el-alert v-if="classify !== ''" :title="'所属分类：' + classify" type="info" :closable="false"></el-alert>

    	<el-table
		    :data="tableData"
		    stripe
		    border
		    v-loading="loading"
		    style="width: 100%"
		>	
		    <el-table-column label="标题">
		    	<template slot-scope="scope">
		    		<router-link :to="{ name:'mentalCategory',query:{ categoryId: scope.row.categoryId } }">
		    			{{ scope.row.categoryTitle }}
		    		</router-link>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="categoryName" label="名称"></el-table-column>
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
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="add">添加分类</el-button>
		  </el-col>
		  <el-col :span="12">
		  	<!-- <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentPage"></el-pagination> -->
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
		    <el-form-item label="标题" prop="categoryTitle">
		      <el-input v-model="formData.categoryTitle" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="名称" prop="categoryName">
		      <el-input v-model="formData.categoryName" autocomplete="off"></el-input>
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
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'mentalCategory',
		data() {
			return {
				rules: {
		          categoryTitle: [
		            { required: true, message: '标题不能为空' },
		          ],
		          categoryName: [
		            { required: true, message: '名称不能为空' },
		          ]
		        },
				tableData: [],  //表格数据
		        dialogVisible: false,  //弹窗是否显示
		        dialogTitle: '添加分类',  //弹窗标题
		        formData: {  //输入数据
		        	categoryName: '',
		        	categoryTitle: '',
		        	categoryParentId: 0 //父类id
		        },
		        submitLoading: false, //提交按钮loading
			    pageTotal: { //分页数据
			        total: 0,
			        pageSize: 6,
			        page: 1
			    },
			    loading: false,
			    classify: ''
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getQuery() {
				this.formData.categoryParentId = this.$route.query.categoryId
				if (!this.formData.categoryParentId) {
					this.formData.categoryParentId = 0
					this.classify = ''
					return
				}
				// 查找心理分类
				this.$axios({
					method: 'post',
					url: '/system/Category/findForCategory',
					data: this.$qs.stringify({
						ID: this.formData.categoryParentId
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.classify = result.data.categoryTitle
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			getList() { //获取表格数据
				this.getQuery();
				let page = {
					categoryParentId: this.formData.categoryParentId,
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize
				}
				this.loading = true
				this.$axios({
			        method: 'post',
			        url: '/system/Category/queryForList',
			        data: this.$qs.stringify(page)
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
			        	this.$message.error(res.data.msg);
			        }
			    }).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
			add() { //添加分类
				this.dialogVisible = true;
				this.dialogTitle = '添加分类';
				this.formData = {};
			},
			edit(row) { //编辑分类
				let newRow = {
		      		categoryId: row.categoryId,
		      		categoryName: row.categoryName,
		      		categoryTitle :row.categoryTitle
		      	}
				this.dialogVisible = true;
				this.dialogTitle = '修改分类';
				this.formData = newRow;
			},
			del(row) { //删除分类
				this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		        	this.$axios({
				        method: 'post',
				        url: '/system/Category/deleteForCategory',
				        data: this.$qs.stringify({
				        	categoryId: row.categoryId,
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
		          	this.getQuery();
		          	this.submitLoading = true
		          	if (!this.formData.categoryId) { //新增
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
			        url: '/system/Category/saveForCategory',
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
			        url: '/system/Category/editForCategory',
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
		watch:{
	        $route( to , from ){ //监听路由变化
				this.getList()
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