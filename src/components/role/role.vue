<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-table
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%"
		>	
		    <el-table-column prop="name" label="名称"></el-table-column>
		    <el-table-column prop="rank" label="级别"></el-table-column>
		    <el-table-column prop="checkNum" label="每天允许查看用户手机次数"></el-table-column>
		    <el-table-column prop="date" label="修改时间"></el-table-column>
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
		
		<div class="btns">
			<el-button type="primary" icon="el-icon-circle-plus" @click="addRole">添加角色</el-button>
		</div>

		<role-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :roleData="roleData" @submit="submitData"></role-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import RoleDialog from 'components/role/role-dialog'
	
	export default {
		name: 'role',
		data() {
			return {
				dataPath: ['角色管理'],
				tableData: [{
					id: 1,
				  	name: '超级管理员',
				  	rank: 1,
				  	checkNum: 15,
		          	date: '2016-05-02'
		        }, {
		        	id: 2,
		        	name: '管理员',
		        	rank: 2,
		        	checkNum: 10,
		          	date: '2016-05-04'
		        }],
		        dialogTitle: '添加角色',
		        dialogFormVisible: false,
		        roleData: {}
			}
		},
		methods: {
	      // 添加角色
	      addRole() {
	      	this.dialogTitle = '添加角色';
	      	this.dialogFormVisible = true;
	      	this.roleData = {}
	      },
	      // 编辑角色
	      editRole(row) {
	      	let newRow = {
	      		id: row.id,
	      		name: row.name,
	      		rank: row.rank,
	      		checkNum: row.checkNum
	      	}
	      	this.dialogTitle = '修改角色';
	      	this.dialogFormVisible = true;
	      	this.roleData = newRow;
	      },
	      // 删除角色
	      delRole(row) {
	        console.log(row);
	        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          center: true
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	      },
	      submitData(data) {
	      	console.log(data)
	      	this.dialogFormVisible = false;
	      }
	    },
		components: {
			BreadCrumb,
			RoleDialog
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.btns {
		margin-top: 15px;
	}
</style>