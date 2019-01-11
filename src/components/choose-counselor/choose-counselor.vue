<template>
	<!-- 选择咨询师弹窗 -->
	<el-dialog 
		title="选择咨询师" 
		:visible.sync="visible" 
		:modal="false"
		width="70%"
		:before-close="hidePanel"
	>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form :inline="true" :model="searchUserForm" status-icon size="small" ref="searchUserForm" class="demo-form-inline">
				  	<el-form-item label="姓名">
				    	<el-input v-model="searchUserForm.userName" placeholder="请输入咨询师姓名" autocomplete="off"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="searchForm('searchUserForm')">搜索</el-button>
				  	</el-form-item>
				</el-form>
				<el-row class="user-list" :gutter="15" v-loading="loading">
					<el-col :span="8" v-for="item in userList" :key="item.userId">
						<el-card shadow="hover">
							<el-row :gutter="10">
								<el-col :span="5">
									<img class="user-head" :src="item.userImage">
								</el-col>
								<el-col :span="19">
									<div class="user-name">{{ item.userName }}</div>
									<p>
										<label>ID：</label>
										<span>{{ item.userId }}</span>
									</p>
								</el-col>
								<el-col :span="24" style="padding-top: 7px;">
									<p>
										<label>手机号：</label>
										<span>{{ item.userPhone }}</span>
									</p>
								</el-col>
								<el-col :span="24">
									<p>
										<label>注册时间：</label>
										<span>{{ item.createTm | dateformat }}</span>
									</p>
								</el-col>
								<el-col :span="24" class="user-list-btn">
									<el-button type="primary" size="mini" @click="confirmChoose(item)">选择</el-button>
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
		name: 'chooseCounselor',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				searchUserForm: {
					userName: ''
				},
				loading: false,
				userList: [], //用户列表
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				let uploadData = {
					thisPage: 1,
					limit: 20,
					realName: this.searchUserForm.userName
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/queryForList',
					data: this.$qs.stringify(uploadData)
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
			        	this.userList = result.data.list
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
			//搜索用户
			searchForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	this.getList()
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
		    //确定选择用户
		    confirmChoose(item) {
		    	this.$emit('confirm', item)
		    }
		}
	}
</script>