<template>
	<!-- 选择用户弹窗 -->
	<el-dialog 
		title="选择用户" 
		:visible.sync="visible" 
		:modal="false"
		width="80%"
		:before-close="hidePanel"
	>
		<el-row :gutter="15">
			<el-col :span="14">
				<el-form :inline="true" :model="searchUserForm" status-icon :rules="rules" size="small" ref="searchUserForm" class="demo-form-inline">
				  	<el-form-item>
				    	<el-input v-model="searchUserForm.userId" placeholder="用户ID" autocomplete="off"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-input v-model="searchUserForm.phone" placeholder="用户手机" autocomplete="off"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-input v-model="searchUserForm.userName" placeholder="用户昵称" autocomplete="off"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="searchForm('searchUserForm')">搜索</el-button>
				  	</el-form-item>
				</el-form>
				<el-row class="user-list" :gutter="15">
					<el-col :span="12" v-for="item in userList" :key="item.userId">
						<el-card shadow="hover">
							<el-row :gutter="10">
								<el-col :span="5">
									<img class="user-head" :src="item.userHead">
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
										<span>{{ item.phone }}</span>
									</p>
								</el-col>
								<el-col :span="24">
									<p>
										<label>注册时间：</label>
										<span>{{ item.registerTime | dateformat }}</span>
									</p>
								</el-col>
								<el-col :span="24">
									<p>
										<label>归属客服：</label>
										<span>{{ item.kefu }}</span>
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
			<el-col :span="10">
				<el-card class="box-card" shadow="never">
				 	<div slot="header" class="clearfix">
				    	<span>注册用户</span>
				  	</div>
					<el-form :model="registerForm" status-icon :rules="rules" size="small" ref="registerForm">
					  	<el-form-item label="用户手机：">
					    	<el-input v-model="registerForm.phone" placeholder="请输入用户手机" autocomplete="off"></el-input>
					  	</el-form-item>
					  	<el-form-item label="用户密码：">
					    	<el-input v-model="registerForm.pass" placeholder="请输入用户密码" autocomplete="off"></el-input>
					  	</el-form-item>
					  	<el-form-item>
							<el-checkbox v-model="registerForm.createPass" @change="createPass">自动生成密码</el-checkbox>
							<el-checkbox v-model="registerForm.send">发送短信告知用户</el-checkbox>
					  	</el-form-item>
					  	<el-form-item>
					    	<el-button type="primary" size="medium" @click="registerFun('registerForm')">注册</el-button>
					  	</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script type="text/javascript">
	
	export default {
		name: 'chooseUser',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				rules: {

				},
				searchUserForm: {},
				userList: [
					{
						userId: 30193020,
						userName: '背着吉他的蝙',
						userHead: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
						phone: 1493103932,
						kefu: '小白兔',
						registerTime: 1544423173000
					},
					{
						userId: 30193021,
						userName: '背着吉他的蝙',
						userHead: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1497321668,2139379548&fm=27&gp=0.jpg',
						phone: 1493103932,
						kefu: '小白兔',
						registerTime: 1544423173000
					}
				],
				//注册用户
				registerForm: {
					send: false,
					createPass: false
				}
			}
		},
		methods: {
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
			//搜索用户
			searchForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
		    //确定选择用户
		    confirmChoose(item) {
		    	this.$emit('confirm', item)
		    },
		    //自动生成密码
		    createPass(val) {
		    	if (val) {
		    		this.registerForm.pass = parseInt(Math.random() * 100000000)
		    	}
		    },
		    //点击注册
		    registerFun(formName) {
		    	this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	this.$emit('register', this.registerForm)
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    }
		}
	}
</script>