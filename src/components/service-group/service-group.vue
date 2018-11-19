<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>

    	<el-row :gutter="20">
		  <el-col :span="6">

		  	<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>分组名称</span>
			    <el-button style="float: right; padding: 3px 0" type="text" @click="addGroup">添加分组</el-button>
			  </div>
			  <div v-for="(item, index) in groupList" :key="item.id" class="text item" :class="{active: isActive === index}" @click="chooseUser(item, index)">
			  	<span class="text">{{item.name}}</span>
			  	<el-tooltip content="删除" placement="top">
				  <el-button @click.stop="delRole(scope.row)" type="text" icon="iconfont icon-delete"></el-button>
				</el-tooltip>
			  </div>
			</el-card>

		  </el-col>
		  <el-col :span="18" v-show="isActive !== ''">

		  	<el-card class="box-card">
				<div slot="header" class="clearfix">
				  <span>{{GroupTitle}}</span>
				</div>
			  	<el-form :inline="true" class="demo-form-inline">
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
				    :data="tableList"
				    tooltip-effect="dark"
				    style="width: 100%; margin: 15px 0;"
				    @selection-change="handleSelectionChange">
				    <el-table-column type="selection"  width="50"> </el-table-column>
				    <el-table-column prop="name" label="姓名"></el-table-column>
				    <el-table-column prop="role" label="角色"></el-table-column>
				    <el-table-column prop="phone" label="手机号"></el-table-column>
				    <el-table-column prop="groupName" label="组名"></el-table-column>
				    <el-table-column prop="addTime" label="加入时间" width="150"></el-table-column>
				    <el-table-column label="操作">
				    	<template slot-scope="scope">
				    		<el-tooltip content="删除" placement="top">
							  <el-button @click="delRole(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
							</el-tooltip>
							<el-tooltip content="设为组长" placement="top" v-show="!isChargeman">
							  <el-button type="text" icon="iconfont icon-check" style="color: #67C23A;"></el-button>
							</el-tooltip>
							<el-tooltip content="取消组长" placement="top" v-show="isChargeman">
							  <el-button type="text" icon="iconfont icon-close" style="color: #67C23A;"></el-button>
							</el-tooltip>
					    </template>
				    </el-table-column>
				</el-table>

				<el-row>
				  <el-col :span="12">
				  	<el-button type="primary" icon="el-icon-circle-plus">添加用户</el-button>
				  	<el-button type="primary" icon="el-icon-circle-plus">创建小组</el-button>
				  </el-col>
				</el-row>
			</el-card>

		  </el-col>
		</el-row>
		
		<!-- 添加分组 -->
		<el-dialog title="新建分组" :visible.sync="isGroupForm">
		  <el-form :model="formGroup" label-width="100px">
		    <el-form-item label="分组名称">
		      <el-input v-model="formGroup.groupName" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="客服主管">
		      <el-select v-model="formGroup.kefuDirector" placeholder="请选择客服主管">
		        <el-option
			      v-for="item in kefuList"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="isGroupForm = false">取 消</el-button>
		    <el-button type="primary" @click="addGroupSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'

	export default {
		name: 'servicegroup',
		data() {
			return {
				dataPath: ['用户管理', '客服组管理'],
				isActive: '',
				groupList: [{
					id: 1,
					name: '分组1'
				}, {
					id: 2,
					name: '分组2'
				}],
				isGroupForm: false,
				formGroup: {
					groupName: '',
					kefuDirector: '' 
				},
				kefuList: [{
		          value: '1',
		          label: '客服1号'
		        }, {
		          value: '2',
		          label: '客服2号'
		        }, {
		          value: '3',
		          label: '客服3号'
		        }],
		        inpGroupName: '',
		        GroupTitle: '',
		        tableList: [{
		        	phone: "135****4532",
		          	role: '客服',
		          	name: '高圆圆',
		          	groupName: '分组1',
		          	addTime: '2018-10-10 10:12'
		        }],
		        multipleSelection: [],
		        isChargeman: false  //是否为组长
			}
		},
		methods: {
			addGroup() { //添加分组
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
				this.isGroupForm = false;
			},
			chooseUser(item, index) { //选择用户
				this.isActive = index;
				this.GroupTitle = item.name;
			},
			selectGroup() { //查询客服组

			},
			handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    }
		},
		components: {
			BreadCrumb
		}
	}
</script>

<style type="text/css" lang="scss" scoped="">
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