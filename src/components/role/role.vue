<template>
	<div>
    	<el-table
		    :data="tableData"
		    stripe
		    border
		    v-loading="loading"
		    style="width: 100%"
		>	
		    <el-table-column prop="roleName" label="角色名称"></el-table-column>
		    <el-table-column prop="roleDescribe" label="角色描述" show-overflow-tooltip></el-table-column>
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
					  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
		    		<el-tooltip content="删除" placement="top">
					  <el-button @click="delRole(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>
		
		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus" @click="addRole">添加角色</el-button>
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

		<role-dialog 
			:title="dialogTitle" 
			:visible.sync="dialogFormVisible" 
			:roleData="roleData" 
			:submitLoading="submitLoading"
			@submit="submitData"></role-dialog>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'
	import RoleDialog from 'components/role/role-dialog'
	import { formatDate } from 'common/js/format'
	
	export default {
		name: 'role',
		data() {
			return {
				loading: false,
		        dialogTitle: '添加角色',
		        dialogFormVisible: false,
		        submitLoading: false,
		        roleData: {},
		        tableData: [], //表格数据
		        pageTotal: { //分页数据
			        total: 0,
			        pageSize: 10,
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
		created() {
			this.getList();
		},
		methods: {
		  getList() {
		  	let uploadData = {
				thisPage: this.pageTotal.page,
				limit: this.pageTotal.pageSize
			}
			this.loading = true
			this.$axios({
				method: 'post',
				url: '/system/sysRole/queryForList',
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
	      // 添加角色
	      addRole() {
	      	this.dialogTitle = '添加角色';
	      	this.dialogFormVisible = true;
	      	this.roleData = {}
	      },
	      // 编辑角色
	      editRole(row) {
	      	let newRow = {
	      		roleId: row.roleId,
	      		roleName: row.roleName,
	      		roleDescribe: row.roleDescribe
	      	}
	      	this.dialogTitle = '修改角色';
	      	this.dialogFormVisible = true;
	      	this.roleData = newRow;
	      },
	      // 删除角色
	      delRole(row) {
	        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          center: true
	        }).then(() => {
	        	this.$axios({
			        method: 'post',
			        url: '/system/sysRole/deleteForSysRole',
			        data: this.$qs.stringify({
			        	roleId: row.roleId,
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
	      submitData(data) {
	      	this.submitLoading = true
          	if (!data.roleId) { //新增
          		let urls = '/system/sysRole/saveForSysRole'
          		let text = '添加成功'
          		this.upload(urls, data, text)
          	} else { //编辑
          		let urls = '/system/sysRole/editForSysRole'
          		let text = '修改成功'
          		this.upload(urls, data, text)
          	}
	      },
	      upload(urls, data, text) {
	      	this.$axios({
		        method: 'post',
		        url: urls,
		        data: this.$qs.stringify(data)
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
			PageNum,
			RoleDialog
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