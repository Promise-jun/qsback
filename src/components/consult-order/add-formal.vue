<template>
	<div class="children-view">
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="12">
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
			<el-col :span="12">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>其他操作</span>
				  	</div>
				  	<div class="form-box" style="padding-bottom: 14px;">
				  		<div class="tool">第三方单号</div>
				  		<div><el-input v-model="orderObj.number" size="small" placeholder="多个订单号用英文字符逗号隔开"></el-input></div>
				  	</div>
				  	<div class="form-box">
				  		<div class="tool">服务类型</div>
				  		<div>
				  			<el-select v-model="orderObj.serviceType" filterable placeholder="请选择">
							    <el-option
							      	v-for="item in bgList"
							      	:key="item.dicId"
							      	:label="item.dicName"
							      	:value="item.dicId">
							    </el-option>
							</el-select>
				  		</div>
				  	</div>
				</el-card>
			</el-col>
		</el-row>

		<el-tabs type="border-card" @tab-click="tabChange">
		  	<el-tab-pane label="单次咨询">
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
		  			<label>订单内容设置：</label>
		  			<el-row :gutter="20" style="margin-top: 20px;">
		  				<el-col :span="8">
		  					<div class="form-box">
						  		<div class="tool" style="color: #909399;">服务时间：</div>
						  		<div>
						  			<el-input v-model="orderObj.time" placeholder="请输入服务时间" class="special-style">
						  				<template slot="append">分钟</template>
						  			</el-input>
						  		</div>
						  	</div>
		  				</el-col>
		  				<el-col :span="8">
		  					<div class="form-box">
						  		<div class="tool" style="color: #909399;">服务单价：</div>
						  		<div>
						  			<el-input v-model="orderObj.unitPrice" placeholder="请输入服务单价" class="special-style">
						  				<template slot="append">元/次</template>
						  			</el-input>
						  		</div>
						  	</div>
		  				</el-col>
		  				<el-col :span="8">
		  					<div class="form-box">
						  		<div class="tool" style="color: #909399;">服务总价：</div>
						  		<div>
						  			<el-input v-model="orderObj.totalPrice" placeholder="请输入服务总价" class="special-style">
						  				<template slot="append">元</template>
						  			</el-input>
						  		</div>
						  	</div>
		  				</el-col>
		  			</el-row>
		  		</p>
		  	</el-tab-pane>
		  	<el-tab-pane label="套餐咨询">
		  		<p>
		  			<label>选择咨询师：</label>
		  			<span style="color: #409EFF; padding-right: 10px;" v-show="orderObj.counselor">{{orderObj.counselor}}</span>
		  			<el-button type="primary" size="mini" @click="counselorVisible = true">+选择</el-button>
		  		</p>
		  		<p>
		  			<label>服务形式：</label>
		  			<el-radio-group v-model="orderObj.shape">
					    <el-radio label="视频">视频</el-radio>
					    <el-radio label="图文+语音条">图文+语音条</el-radio>
					    <el-radio label="通话">通话</el-radio>
					</el-radio-group>
		  		</p>
		  		<p>
		  			<label>订单内容设置：</label>
		  			<el-row :gutter="20" style="margin-top: 20px;">
		  				<el-col :span="8">
		  					<div class="form-box">
						  		<div class="tool" style="color: #909399;">服务次数：</div>
						  		<div>
						  			<el-input v-model="orderObj.num" placeholder="请输入服务次数" class="special-style">
						  				<template slot="append">次</template>
						  			</el-input>
						  		</div>
						  	</div>
		  				</el-col>
		  				<el-col :span="8">
		  					<div class="form-box">
						  		<div class="tool" style="color: #909399;">服务单价：</div>
						  		<div>
						  			<el-input v-model="orderObj.unitPrice" placeholder="请输入服务单价" class="special-style">
						  				<template slot="append">元/60分钟</template>
						  			</el-input>
						  		</div>
						  	</div>
		  				</el-col>
		  				<el-col :span="8">
		  					<div class="form-box">
						  		<div class="tool" style="color: #909399;">服务总价：</div>
						  		<div>
						  			<el-input v-model="orderObj.totalPrice" placeholder="请输入服务总价" class="special-style">
						  				<template slot="append">元</template>
						  			</el-input>
						  		</div>
						  	</div>
		  				</el-col>
		  			</el-row>
		  		</p>
		  	</el-tab-pane>
		</el-tabs>

		<div style="margin-top: 30px;">
			<el-button type="primary" @click="confirmCreate">确定创建</el-button>
		</div>

		<!-- 订单确认 -->
		<el-dialog
		  	title="订单确认"
		  	:visible.sync="orderVisible"
		  	:modal="false"
		  	width="70%">
		  	<el-card class="order-box-card" style="margin-bottom: 24px;">
			  	<div slot="header" class="clearfix">
			    	<span>服务用户：</span>
			  	</div>
			  	<el-row :gutter="20">
				  	<el-col :span="12">
				  		<p>
				  			<label>用户ID：</label>
				  			<span>{{ userInfo.userId }}</span>
				  		</p>
				  		<p>
				  			<label>绑定手机：</label>
				  			<span>{{ userInfo.phone }}</span>
				  		</p>
				  	</el-col>
				  	<el-col :span="12">
				  		<p>
				  			<label>用户昵称：</label>
				  			<span>{{ userInfo.userName }}</span>
				  		</p>
				  		<p>
				  			<label>所属客服：</label>
				  			<span>{{ userInfo.kefu }}</span>
				  		</p>
				  	</el-col>
			  	</el-row>
			</el-card>
			<el-card class="order-box-card">
			  	<div slot="header" class="clearfix">
			    	<span>订单信息：</span>
			  	</div>
			  	<el-row :gutter="20">
			  		<el-col :span="6">
				  		<p>
				  			<label>咨询师：</label>
				  			<span class="special-style">{{orderObj.counselor}}</span>
				  		</p>
				  		<p>
				  			<label>淘宝帐户：</label>
				  			<span>{{ userInfo.taobaoId }}</span>
				  		</p>
				  	</el-col>
				  	<el-col :span="6">
				  		<p>
				  			<label v-if="orderObj.type == 0">服务时间：</label>
				  			<label v-else-if="orderObj.type == 1">服务次数：</label>
				  			<span class="special-style" v-if="orderObj.type == 0">{{orderObj.time}}分钟</span>
				  			<span class="special-style" v-else-if="orderObj.type == 1">{{orderObj.num}}次</span>
				  		</p>
				  		<p>
				  			<label>订单形式：</label>
				  			<span v-if="orderObj.type == 0">单次咨询</span>
				  			<span v-else-if="orderObj.type == 1">套餐咨询</span>
				  		</p>
				  	</el-col>
				  	<el-col :span="6">
				  		<p>
				  			<label>服务单价：</label>
				  			<span class="special-style" v-if="orderObj.type == 0">{{ orderObj.unitPrice }}元/次</span>
				  			<span class="special-style" v-else-if="orderObj.type == 1">{{ orderObj.unitPrice }}元/60分钟</span>
				  		</p>
				  		<p>
				  			<label>服务类型：</label>
				  			<span v-text="findContent(orderObj.serviceType, bgList)"></span>
				  		</p>
				  	</el-col>
				  	<el-col :span="6">
				  		<p>
				  			<label>订单总价：</label>
				  			<span class="special-style">{{ orderObj.totalPrice }}元</span>
				  		</p>
				  		<p>
				  			<label>服务形式：</label>
				  			<span>{{ orderObj.shape }}</span>
				  		</p>
				  	</el-col>
				  	<el-col :span="24">
				  		<p>
				  			<label>第三方单号：</label>
				  			<span>{{ orderObj.number }}</span>
				  		</p>
				  	</el-col>
			  	</el-row>
			</el-card>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="orderVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="orderVisible = false" :disabled="isOk">{{confirmCont}}</el-button>
		 	</span>
		</el-dialog>

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
		name: 'addFormal',
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
					number: '', //第三方单号
					serviceType: '', //服务类型
					type: '0', //订单形式 0：单次，1：套餐
					counselorId: '', //咨询师ID
					counselor: '', //咨询师名称
					shape: '', //服务形式
					time: '', //服务时间
					num: '', //服务次数
					unitPrice: '', //服务单价
					totalPrice: '', //服务总价
				},
				// 心理分类
				bgList: [],
				// 选择咨询师
				counselorVisible: false,
				// 订单确认
				orderVisible: false,
				// 定时器
				timeLen: 2,
				isOk: true,
				confirmCont: '3秒'
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
			// tab切换
			tabChange(val) {
				this.orderObj.type = val.index
			},
			// 订单确认
			confirmCreate() {
				/*if (this.userInfo.userId == '') {
					this.$message.error('请先选择用户')
					return
				}
				if (this.orderObj.serviceType == '') {
					this.$message.error('请选择服务类型')
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
				if (this.orderObj.type == 0) { //单次
					if (this.orderObj.time == '') {
						this.$message.error('请输入服务时间')
						return
					}
					if (isNaN(this.orderObj.time)) {
						this.$message.error('服务时间格式不正确')
						return
					}
				} else if (this.orderObj.type == 1) { //套餐
					if (this.orderObj.num == '') {
						this.$message.error('请输入服务次数')
						return
					}
					if (isNaN(this.orderObj.num)) {
						this.$message.error('服务次数格式不正确')
						return
					}
				}
				if (this.orderObj.unitPrice == '') {
					this.$message.error('请输入服务单价')
					return
				}
				if (isNaN(this.orderObj.unitPrice)) {
					this.$message.error('服务单价格式不正确')
					return
				}
				if (this.orderObj.totalPrice == '') {
					this.$message.error('请输入服务总价')
					return
				}
				if (isNaN(this.orderObj.totalPrice)) {
					this.$message.error('服务总价格式不正确')
					return
				}*/
				this.orderVisible = true
				this.timeLen = 2
				this.isOk = true
				this.confirmCont = '3秒'
				clearInterval(this.timer)
				this.timer = setInterval( () => {
					this.confirmCont = this.timeLen + '秒'
					this.timeLen--
					if (this.timeLen < 0) {
						clearInterval(this.timer)
						this.confirmCont = '确 定'
						this.isOk = false
					}
	　　　　　　}, 1000)
			},
			findContent(val, arr) {
				let item = arr.find((element) => (element.dicId == val))
				if (item) {
					return item.dicName
				}
			}
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
	.form-box {
		& .tool {
			padding-bottom: 10px;
		}
	}
	.el-tab-pane {
		& p {
			padding: 12px 0;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #303030;
		}
	}
	.order-box-card {
		& p {
			padding: 8px 0;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #303030;
		}
	}
</style>

<style type="text/css" lang="scss">
	.special-style {
		font-size: 16px;
		font-weight: 600;
		color: #FF5A1C;
		& .el-input__inner {
			font-size: 16px;
			font-weight: 600;
			color: #FF5A1C;
		}
	}
</style>