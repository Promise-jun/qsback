<template>
	<div class="children-view">
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="16">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>选择用户</span>
				    	<el-button style="float: right; padding: 3px 0" type="text" @click="chooseUserVisible = true">+选择</el-button>
				  	</div>
				  	<el-row :gutter="20">
					  	<el-col :span="12">
					  		<p>
					  			<label>用户ID：</label>
					  			<span>{{ userInfo.userId }}</span>
					  		</p>
					  		<p>
					  			<label>用户昵称：</label>
					  			<span>{{ userInfo.userName }}</span>
					  		</p>
					  		<p>
					  			<label>淘宝账户：</label>
					  			<span>{{ userInfo.taobaoId }}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>绑定手机：</label>
					  			<span>{{ userInfo.phone }}</span>
					  		</p>
					  		<p>
					  			<label>所属客服：</label>
					  			<span>{{ userInfo.kefu }}</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="16">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>订单信息</span>
				  	</div>
				  	<div>
						<p>
				  			<label>选择咨询师：</label>
				  			<span style="color: #409EFF; padding-right: 10px;" v-show="orderObj.counselor">{{orderObj.counselor}}</span>
				  			<el-button type="primary" size="mini" @click="counselorVisible = true">+选择</el-button>
				  		</p>
				  		<p>
				  			<label>服务形式：</label>
				  			<el-radio-group v-model="orderObj.shape">
							    <el-radio :label="1">视频</el-radio>
							    <el-radio :label="2">图文+语音条</el-radio>
							    <el-radio :label="3">通话</el-radio>
							</el-radio-group>
				  		</p>
				  		<p>
					  		<label>服务类型：</label>
				  			<el-select v-model="orderObj.serviceType" filterable placeholder="请选择">
							    <el-option
							      	v-for="item in bgList"
							      	:key="item.dicId"
							      	:label="item.dicName"
							      	:value="item.dicId">
							    </el-option>
							</el-select>
					  	</p>
					  	<p>
				  			<label>接受价格：</label>
				  			<el-input v-model="orderObj.price" placeholder="请输入接受价格" style="width: 40%;" class="special-style">
				  				<template slot="append">元</template>
				  			</el-input>
				  		</p>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<div style="margin-top: 30px;">
			<el-button type="primary" @click="confirmCreate">确定创建</el-button>
		</div>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>

		<!-- 选择咨询师 -->
		<choose-counselor :visible.sync="counselorVisible" @confirm="chooseCounselor"></choose-counselor>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user' //选择用户
	import ChooseCounselor from 'components/choose-counselor/choose-counselor' //选择咨询师
	
	export default {
		name: 'addExperience',
		data() {
			return {
				userInfo: {
					userId: '',
					userName: '',
					phone: '',
					kefu: '',
					taobaoId: ''
				},
				// 选择用户
				chooseUserVisible: false,
				orderObj: {
					serviceType: '', //服务类型
					counselorId: '', //咨询师ID
					counselor: '', //咨询师名称
					shape: '', //服务形式
					price: '', //接受价格
				},
				// 心理分类
				bgList: [],
				// 选择咨询师
				counselorVisible: false,
			}
		},
		created() {
			// 服务类型
			this.getOption('心理分类')
		},
		methods: {
			// 获取选项
			getOption(type) {
				this.$axios({
					method: 'post',
					url: '/sys/dic/findByName',
					data: this.$qs.stringify({
						parentName: type
					})
				}).then(res => {
					let result = res.data
					if (type == '心理分类') {
						this.bgList = result
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 确认选择用户
			chooseUser(item) {
				this.userInfo.userId = item.userId
		    	this.userInfo.userName = item.userNickname
		    	this.userInfo.phone = item.userPhone
		    	this.userInfo.kefu = item.userCustomerService
		    	this.userInfo.taobaoId = item.userPayAccount

		    	this.chooseUserVisible = false
			},
			// 注册用户
			registerUser(item) {
				console.log(item)
				this.chooseUserVisible = false
			},
			// 确认选择咨询师
			chooseCounselor(item) {
				this.orderObj.counselorId = item.userId
				this.orderObj.counselor = item.userName

				this.counselorVisible = false
			},
			// 订单确认
			confirmCreate() {
				if (this.userInfo.userId == '') {
					this.$message.error('请先选择用户')
					return
				}
				if (this.orderObj.counselorId == '') {
					this.$message.error('请选择咨询师')
					return
				}
				if (this.orderObj.shape == '') {
					this.$message.error('请选择服务形式')
					return
				}
				if (this.orderObj.serviceType == '') {
					this.$message.error('请选择服务类型')
					return
				}
				if (this.orderObj.price == '') {
					this.$message.error('请输入接受价格')
					return
				}
				if (isNaN(this.orderObj.price)) {
					this.$message.error('接受价格格式不正确')
					return
				}
				this.$confirm('确定创建该体验订单吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '创建成功!'
		          	});
		        }).catch(() => {
		        
		        });
			},
		},
		components: {
			ChooseUser,
			ChooseCounselor
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.children-view {
	  	position: absolute;
	  	top: 44px;
	  	left: 0;
	  	bottom: 0;
	  	right: 0;
	 	z-index: 100;
	  	background-color: #fff;
	  	padding: 20px;
	  	overflow-y: auto;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.box-card {
		& p {
			padding: 10px 0 20px;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #303030;
		}
	}
</style>

<style type="text/css" lang="scss">
	.special-style {
		& .el-input__inner {
			font-size: 16px;
			font-weight: 600;
			color: #FF5A1C;
		}
	}
</style>