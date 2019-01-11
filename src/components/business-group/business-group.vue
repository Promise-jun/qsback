<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="6">

		  	<el-card class="box-card" v-loading="groupLoading">
			  <div slot="header" class="clearfix">
			    <span>业务组名称</span>
			    <el-button v-hasPermission="79" style="float: right; padding: 3px 0" type="text" @click="addGroup">添加分组</el-button>
			  </div>
			  <div v-for="(item, index) in groupList" :key="item.businessGroupId" class="text item" :class="{active: isActive === index}" @click="chooseUser(item, index)">
			  	<span class="text">{{item.businessGroupName}}</span>
				<el-tooltip content="删除" placement="top" v-hasPermission="81">
				  <el-button @click.stop="del(item, index)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
				</el-tooltip>
				<el-tooltip content="编辑" placement="top" v-hasPermission="80">
				  <el-button @click.stop="edit(item, index)" type="text" icon="iconfont icon-edit"></el-button>
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
		      <el-input v-model="formGroup.groupName" autocomplete="off" placeholder="请输入分组名称"></el-input>
		    </el-form-item>
		    <el-form-item label="排序">
		      <el-input v-model="formGroup.kefuDirector" autocomplete="off" placeholder="请输入排序数字"></el-input>
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
				groupLoading: false,
				groupList: [], //分组列表
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
		created() {
			this.getGroup()
		},
		methods: {
			getGroup() {
				this.groupLoading = true
				this.$axios({
					method: 'post',
					url: '/system/Business/queryForList',
					data: this.$qs.stringify({
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
					console.log(err)
				})
			},
			//选择分组
			chooseUser(item, index) {
				this.isActive = index;
				this.activeName = 'first'
				this.GroupTitle = item.businessGroupName;
				this.groupId = item.businessGroupId
			},
			//添加分组
			addGroup() { 
				this.isGroupForm = true;
				delete this.formGroup.groupId
				this.formGroup.groupName = ''
				this.formGroup.kefuDirector = ''
			},
			//编辑分组
			edit(item) { 
				this.isGroupForm = true;
				this.formGroup.groupId = item.businessGroupId
				this.formGroup.groupName = item.businessGroupName
				this.formGroup.kefuDirector = item.businessGroupSort
			},
			//删除分组
			del(item, index) {
				this.$confirm('确定要删除该分组吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/Business/deleteForBusiness',
		        		data: this.$qs.stringify({
		        			businessGroupId: item.businessGroupId
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.groupList.splice(index, 1)
		        			this.$message({
				            	type: 'success',
				            	message: '删除成功!'
				          	});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	})   
		        }).catch(() => {  
		               
		        });
			},
			addGroupSubmit() { //提交分组
				if (!this.formGroup.groupName) {
					this.$message.error('请填写分组名称');
					return;
				}
				if (!this.formGroup.groupId) { // 新增
					let uploadeInfo = {
						businessGroupName: this.formGroup.groupName,
						businessGroupSort: this.formGroup.kefuDirector
					}
					let uploadUrl = '/system/Business/saveForBusiness'
					this.uploadGroup(uploadeInfo, uploadUrl)
				} else { //编辑
					let uploadeInfo = {
						businessGroupId: this.formGroup.groupId,
						businessGroupName: this.formGroup.groupName,
						businessGroupSort: this.formGroup.kefuDirector
					}
					let uploadUrl = '/system/Business/editForBusiness'
					this.uploadGroup(uploadeInfo, uploadUrl)
				}
			},
			uploadGroup(info, urls) {
				this.groupLoading = true
				this.$axios({
					method: 'post',
					url: urls,
					data: this.$qs.stringify(info)
				}).then(res => {
					this.groupLoading = false
					let result = res.data
					if (result.code == 200) {
						this.isGroupForm = false;
						this.getGroup()
						this.$message({
							type: 'success',
							message: '操作成功！'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
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