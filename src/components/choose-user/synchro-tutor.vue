<template>
	<!-- 同步导师弹窗 -->
	<el-dialog 
		title="同步导师" 
		:visible.sync="visible" 
		:modal="false"
		width="40%"
		:before-close="hidePanel"
	>
		<el-row :gutter="15">
			<el-col :span="24">
				<el-form :inline="true" :model="searchUserForm" status-icon size="small" ref="searchUserForm" class="demo-form-inline">
				  	<el-form-item>
				    	<el-input v-model="searchUserForm.userId" placeholder="用户ID" autocomplete="off"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="searchForm('searchUserForm')">搜索</el-button>
				  	</el-form-item>
				</el-form>
				<el-row class="user-list" style="height: 200px;" :gutter="15" v-loading="loading">
					<el-col :span="16" v-if="userInfo.userId">
						<el-card shadow="hover">
							<el-row :gutter="10">
								<el-col :span="5" style="width: 50px;">
									<img class="user-head" style="margin-left: 0;" :src="userInfo.headImage">
								</el-col>
								<el-col :span="19">
									<div class="user-name">{{ userInfo.nickName }}</div>
									<p>
										<label>ID：</label>
										<span>{{ userInfo.userId }}</span>
									</p>
								</el-col>
								<el-col :span="24">
									<p style="padding: 5px 0px;">
										<label>姓名：</label>
										<span>{{ userInfo.userName }}</span>
									</p>
								</el-col>
								<el-col :span="24">
									<p style="padding: 5px 0px;">
										<label>性别：</label>
										<span v-if="userInfo.sex == 0">未知</span>
										<span v-else-if="userInfo.sex == 1">男</span>
										<span v-else-if="userInfo.sex == 2">女</span>
									</p>
								</el-col>
								<el-col :span="24">
									<p style="padding: 5px 0px;">
										<label>手机号：</label>
										<span>{{ userInfo.phone }}</span>
									</p>
								</el-col>
								<el-col :span="24" class="user-list-btn">
									<el-button type="primary" size="mini" @click="confirmChoose" :loading="submitLoading">同步</el-button>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script type="text/javascript">
	
	export default {
		name: 'synchroTutor',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				searchUserForm: {
					userId: ''
				},
				loading: false,
				userInfo: {},
				submitLoading: false
			}
		},
		methods: {
			getList() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/order/wechart/findOldUser',
					data: this.$qs.stringify({
						userId: this.searchUserForm.userId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.userInfo = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.loading = false
					console.error(err)
				})
			},
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
	      	//搜索用户
			searchForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	if (this.searchUserForm.userId == '') {
		            		this.$message.error('请输入用户ID');
		            		return
		            	}
		            	this.getList()
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
		    // 确认同步
		    confirmChoose() {
		    	this.submitLoading = true
		    	this.$axios({
		    		method: 'post',
		    		url: '/order/wechart/InsertConsultantUser',
		    		data: this.$qs.stringify({
		    			userId: this.userInfo.userId
		    		})
		    	}).then(res => {
		    		this.submitLoading = false
		    		let result = res.data
		    		if (result.code == 200) {
		    			this.$emit('confirm')
		    			this.$message({
		    				type: 'success',
		    				message: '备份成功'
		    			})
		    		} else {
		    			this.$message.error(result.msg)
		    		}
		    	}).catch(err => {
		    		this.submitLoading = false
		    		console.error(err)
		    	})
		    }
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	
</style>