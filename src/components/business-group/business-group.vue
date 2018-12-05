<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="6">

		  	<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>业务组名称</span>
			    <el-button style="float: right; padding: 3px 0" type="text" @click="addGroup">添加分组</el-button>
			  </div>
			  <div v-for="(item, index) in groupList" :key="item.id" class="text item" :class="{active: isActive === index}" @click="chooseUser(item, index)">
			  	<span class="text">{{item.name}}</span>
				<el-tooltip content="删除" placement="top">
				  <el-button @click.stop="del(item)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
				</el-tooltip>
				<el-tooltip content="编辑" placement="top">
				  <el-button @click.stop="edit(item)" type="text" icon="iconfont icon-edit"></el-button>
				</el-tooltip>
			  </div>
			</el-card>

		  </el-col>
		  <el-col :span="18" v-show="isActive !== ''">

		  	<el-card class="box-card">
				<div slot="header" class="clearfix">
				  <span>{{GroupTitle}}</span>
				</div>
				<el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="咨询师" name="first" lazy>
				    	<tutor :groupId="groupId"></tutor>
				    </el-tab-pane>
				    <el-tab-pane label="业务员" name="second" lazy>
				    	<salesman :groupId="groupId"></salesman>
				    </el-tab-pane>
				    <el-tab-pane label="主播" name="third" lazy>
				    	<anchor :groupId="groupId"></anchor>
				    </el-tab-pane>
				</el-tabs>
			</el-card>

		  </el-col>
		</el-row>

		<!-- 添加分组 -->
		<el-dialog title="新建业务组" :visible.sync="isGroupForm">
		  <el-form :model="formGroup" label-width="100px">
		    <el-form-item label="名称">
		      <el-input v-model="formGroup.groupName" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="排序">
		      <el-input v-model="formGroup.groupName" autocomplete="off"></el-input>
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
	import Tutor from 'components/business-group/tutor'
	import Salesman from 'components/business-group/salesman'
	import Anchor from 'components/business-group/anchor'
	
	export default {
		name: 'businessGroup',
		data() {
			return {
				isActive: '',
				groupList: [{ //业务组列表
					id: 1,
					name: '分组1'
				}, {
					id: 2,
					name: '分组2'
				}],
				GroupTitle: '',
				isGroupForm: false,
				formGroup: {
					groupName: '',
					kefuDirector: '' 
				},
				activeName: '',
				groupId: ''
			}
		},
		methods: {
			addGroup() { //添加分组
				this.isGroupForm = true;
			},
			edit(item) { //编辑分组
				this.isGroupForm = true;
			},
			chooseUser(item, index) { //选择用户
				this.isActive = index;
				this.activeName = 'first'
				this.GroupTitle = item.name;
				this.groupId = item.id
			},
			addGroupSubmit() { //提交分组
				if (!this.formGroup.groupName) {
					this.$message.error('请填写分组名称');
					return;
				}
				this.isGroupForm = false;
			},
			handleClick(tab, event) {
        		
     		}
		},
		components: {
			Tutor,
			Salesman,
			Anchor
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
				color: #fff !important;
			}
		}
		& .text {
			float: left;
		}
		& .el-button {
			padding: 0 2px;
			float: right;
		}
	}
</style>