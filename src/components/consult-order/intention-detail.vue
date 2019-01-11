<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">意向订单详情</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
				<el-card class="box-card" style="margin-bottom: 24px;">
				  	<div slot="header">
					    <span>咨询用户</span>
					    <el-button style="float: right; padding: 3px 0" type="text" @click="chooseUserVisible = true">+选择</el-button>
				  	</div>
					<el-row class="order-info">
						<el-col :span="8">
							<p>
					  			<label>意向单号：</label>
					  			<span>{{orderInfo.intentionId}}</span>
					  		</p>
					  		<p>
					  			<label>情说号：</label>
					  			<span>{{userInfo.userCode}}</span>
					  		</p>
					  		<p>
					  			<label>用户昵称：</label>
					  			<span>{{userInfo.userName}}</span>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>创建时间：</label>
					  			<span>{{orderInfo.createTm | dateformat}}</span>
					  		</p>
					  		<p>
					  			<label>绑定手机：</label>
					  			<span>{{userInfo.phone}}</span>
					  		</p>
					  		<p>
					  			<label>所属客服：</label>
					  			<span>{{userInfo.kefu}}</span>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>创建客服：</label>
					  			<span>{{orderInfo.createNm}}</span>
					  		</p>
					  		<p>
					  			<label>淘宝账户：</label>
					  			<span>{{userInfo.taobaoId}}</span>
					  		</p>
					  		<p>
					  			<label>注册时间：</label>
					  			<span>{{userInfo.createTime | dateformat}}</span>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
				<el-card class="box-card">
				  	<div slot="header">
					    <span>咨询意向</span>
					    <el-button style="float: right; padding: 3px 0" type="text" @click="changeIntention">修改</el-button>
				  	</div>
					<el-row class="order-info">
						<el-col :span="8">
							<p>
					  			<label>服务形式：</label>
					  			<span>{{orderInfo.serviceMethod}}</span>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>咨询时长：</label>
					  			<span>{{orderInfo.visitType}}</span>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>服务时间：</label>
					  			<span>{{orderInfo.intentionServiceTime}}</span>
					  		</p>
						</el-col>
						<el-col :span="24">
							<p>
					  			<label>正式价格：</label>
					  			<span>{{orderInfo.intentionFormalPrice}}元（价格备注：{{orderInfo.intentionPriceRemarks}}）</span>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-card class="box-card" style="min-height: 382px;">
			  		<div slot="header">
					    <span>
					    	订单状态：
					    	<i v-if="orderInfo.intentionStatus == 0" style="color: #F56C6C; padding-right: 15px; font-style: normal;">报名中</i>
					    	<i v-else-if="orderInfo.intentionStatus == 1" style="color: #F56C6C; padding-right: 15px; font-style: normal;">报名已满</i>
					    	<i v-else-if="orderInfo.intentionStatus == 2" style="color: #F56C6C; padding-right: 15px; font-style: normal;">报名结束</i>
					    	<i v-else-if="orderInfo.intentionStatus == 3" style="color: #F56C6C; padding-right: 15px; font-style: normal;">已完成</i>
					    	已报名：
							<span v-if="tableData.length">{{tableData.length}}</span>
							<span v-else>0</span>
					    	人
					    </span>
					   	<el-button 
					   		v-if="orderInfo.intentionStatus == 0 || orderInfo.intentionStatus == 1"
					   		style="float: right; padding: 3px 0" 
					   		type="text"
					   		@click="stopEnlist"
					   		>
					   		停止报名
					   	</el-button>
				  	</div>
				  	<el-row class="order-info">
						<el-col :span="24">
					  		<div class="form-box" style="padding-bottom: 24px;">
						  		<div class="tool">最多报名</div>
						  		<div>
						  			<el-input v-model="orderObj.maxNum" placeholder="请输入" style="width: 50%;">
						  				<template slot="append">人</template>
						  			</el-input>
						  			<el-button @click="changeNum">更改</el-button>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 24px;">
						  		<div class="tool">微信提醒：{{orderInfo.intentionRemindNumber}}人</div>
						  		<div v-if="orderInfo.intentionStatus == 0 || orderInfo.intentionStatus == 1">
						  			<el-button type="primary" size="small" @click="wxalertVisible = true">增加</el-button>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 24px;">
						  		<div class="tool">报名链接：</div>
						  		<div style="color: #409EFF; line-height: 20px;">{{linkUrl}}</div>
						  	</div>
						</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
					<el-table
					    :data="tableData"
					    stripe
					    border
					    style="width: 100%">
					    <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
					    <el-table-column label="姓名" align="center">
					    	<template slot-scope="scope">
					    		<el-popover
								    placement="right"
								    width="100"
								    trigger="hover">
								    <img :src="scope.row.user_image" style="width: 100%;">
								    <el-button slot="reference" type="text">{{scope.row.user_name}}</el-button>
								</el-popover>
					    	</template>
					    </el-table-column>
					    <!-- <el-table-column prop="timelen" label="近30平均时长" align="center"></el-table-column>
					    <el-table-column label="近30天客户复购率" align="center">
					    	<template slot-scope="scope">
					    		{{scope.row.fugou}}%
					    	</template>
					    </el-table-column> -->
					    <el-table-column prop="user_credit" label="等级" align="center"></el-table-column>
					    <el-table-column label="状态" align="center">
					    	<template slot-scope="scope">
								<el-button 
									v-if="scope.row.signup_status == 0"
									size="small" 
									type="text" 
									@click="snatchBill(scope.row)"
								>
									未抢单
								</el-button>
								<span v-else-if="scope.row.signup_status == 1">抢单成功</span>
								<span v-else-if="scope.row.signup_status == 2" style="color: #67C23A;">转化成功</span>
								<span v-else-if="scope.row.signup_status == 3" style="color: #F56C6C;">转化失败</span>
					    	</template>
					    </el-table-column>
					    <!-- <el-table-column label="主页" align="center">
					    	<template slot-scope="scope">
					    		<el-button type="text" size="mini">查看主页</el-button>
					    	</template>
					    </el-table-column> -->
					    <el-table-column label="创建体验" align="center">
					    	<template slot-scope="scope">
					    		<!-- <el-button type="warning" size="mini">创建体验</el-button> -->
					    	</template>
					    </el-table-column>
					    <el-table-column label="创建正式" align="center">
					    	<template slot-scope="scope">
					    		<!-- <el-button type="primary" size="mini">创建正式</el-button> -->
					    	</template>
					    </el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>

		<!-- 用户资料 -->
		<user-datum :info="orderInfo" :workList="vocationList" :wayList="wayList" v-if="flag && isWork"></user-datum>
		
		<!-- 修改咨询意向 -->
		<el-dialog 
			title="修改咨询意向" 
			:visible.sync="intentionVisible" 
			:modal="false"
		>
		  	<el-form :model="intentionForm" status-icon :rules="rules" ref="intentionForm" size="small" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="服务形式" prop="shape">
			    <el-radio-group v-model="intentionForm.shape">
				    <el-radio border v-for="item in consultWay" :key="item.dic_id" :label="item.dic_id">{{item.dic_name}}</el-radio>
				</el-radio-group>
			  </el-form-item>
			  <el-form-item label="咨询时长" prop="visit">
			    <el-radio-group v-model="intentionForm.visit">
				    <el-radio border v-for="item in initialList" :key="item.dic_id" :label="item.dic_id">{{item.dic_name}}</el-radio>
				</el-radio-group>
			  </el-form-item>
			  <el-form-item label="服务时间" prop="time">
			    <el-input v-model="intentionForm.time" autocomplete="off" placeholder="请输入服务时间"></el-input>
			  </el-form-item>
			  <el-form-item label="正式价格" prop="price">
			    <el-input v-model="intentionForm.price" autocomplete="off" placeholder="请输入正式价格">
			    	<template slot="append">元</template>
			    </el-input>
			  </el-form-item>
			  <el-form-item label="价格备注" prop="remark">
			    <el-input v-model="intentionForm.remark" autocomplete="off" placeholder="请输入价格备注"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('intentionForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="intentionVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>
		<!-- 选择提醒用户 -->
		<wx-alert :visible.sync="wxalertVisible" :wxList="wxList" :sendLoading="submitLoading" @submit="submitAlert"></wx-alert>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user' //选择用户
	import UserDatum from 'components/consult-order/user-datum'
	import WxAlert from 'components/consult-classify/wx-alert' //微信提醒
	
	export default {
		name: 'intentionDetail',
		data() {
			return {
				loading: false,
				// 订单信息
				orderInfo: {},
				flag: false,
				//选择用户
				chooseUserVisible: false,
				userInfo: {
					userId: '',
					userCode: '',
					userName: '',
					phone: '',
					kefu: '',
					taobaoId: '',
					createTime: ''
				},
				orderObj: {
					maxNum: "", //最多报名人数
				},
				// 咨询师列表
				tableData: [],
				isWork: false,
				vocationList: [], //职业列表
				consultWay: [], //咨询方式
				initialList: [], //初访形式
				wayList: [],
				// 修改咨询意向
				rules: {
					shape: [
						{ required: true, message: '服务形式不能为空' }
					],
					visit: [
						{ required: true, message: '初访形式不能为空' }
					],
					time: [
						{ required: true, message: '服务时间不能为空' }
					],
					price: [
						{ required: true, message: '正式价格不能为空' }
					],
					remark: [
						{ required: true, message: '价格备注不能为空' }
					]
				},
				submitLoading: false,
				intentionVisible: false,
				intentionForm: {},
				//微信提醒
				wxalertVisible: false,
				wxList: [],
				//报名链接
				linkUrl: ""
			}
		},
		created() {
			this.getInfo()
			this.getOption()
		},
		methods: {
			// 订单信息
			getInfo() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/findIntentionDeatil',
					data: this.$qs.stringify({
						intentionId: this.$route.query.intentionId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.orderInfo = result.data.intentionInfo
						this.flag = true
						this.tableData = result.data.signUpMentors //意向咨询师

						this.userInfo.userCode = result.data.userCode //情说号
						this.userInfo.phone = result.data.userPhone //手机
						this.userInfo.taobaoId = result.data.userTaobao //淘宝
						this.userInfo.userName = result.data.userNickName //昵称
						this.userInfo.kefu = result.data.serviceName //客服
						this.userInfo.createTime = result.data.createTime //注册时间

						this.orderObj.maxNum = this.orderInfo.intentionMaximumSignup

						//报名链接
						this.linkUrl = this.orderInfo.intentionSignupUrl + '?intentionId=' + this.$route.query.intentionId
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.loading = false
					console.log(err)
				})
			},
			// 获取选项
			getOption() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/findIntentionNeeds'
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.vocationList = result.data.occupation //职业
						this.consultWay = result.data.consultMethod //咨询方式
						this.initialList = result.data.onceVisit //初访形式
						this.wayList = result.data.classification //咨询分类
						this.isWork = true
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 确认选择用户
			chooseUser(item) {
		    	this.$axios({
		    		method: 'post',
		    		url: '/order/intention/updateIntentionInfo',
		    		data: this.$qs.stringify({
		    			intentionId: this.$route.query.intentionId,
		    			userId: item.userId
		    		})
		    	}).then(res => {
		    		let result = res.data
		    		if (result.code == 200) {
		    			this.chooseUserVisible = false
		    			this.$message({
	          				type: 'success',
	          				message: '用户信息修改成功'
	          			})
	          			this.userInfo.userCode = item.userCode //情说号
	          			this.userInfo.phone = item.userPhone //手机
						this.userInfo.taobaoId = item.userPayAccount //淘宝
						this.userInfo.userName = item.userNickname //昵称
						this.userInfo.kefu = item.userCustomerService //客服
						this.userInfo.createTime = item.createTm //注册时间
		    		} else {
		    			this.$message.error(result.msg)
		    		}
		    	}).catch(err => {
		    		console.log(err)
		    	})
			},
			// 注册用户
			registerUser(item) {
				console.log(item)
				this.$axios({
		    		method: 'post',
		    		url: '/order/intention/updateIntentionInfo',
		    		data: this.$qs.stringify({
		    			intentionId: this.$route.query.intentionId,
		    			userId: item.userId
		    		})
		    	}).then(res => {
		    		let result = res.data
		    		if (result.code == 200) {
		    			this.chooseUserVisible = false
		    			this.$message({
	          				type: 'success',
	          				message: '用户信息修改成功'
	          			})
	          			this.userInfo.userCode = item.userCode //情说号
	          			this.userInfo.phone = item.userPhone //手机
						this.userInfo.taobaoId = item.userPayAccount //淘宝
						this.userInfo.userName = item.userNickname //昵称
						this.userInfo.kefu = item.userCustomerService //客服
						this.userInfo.createTime = item.createTm //注册时间
		    		} else {
		    			this.$message.error(result.msg)
		    		}
		    	}).catch(err => {
		    		console.log(err)
		    	})
			},
			// 修改意向
			changeIntention() {
				this.intentionForm = {
					shape: this.orderInfo.intentionServiceType,
					visit: this.orderInfo.intentionVisitType,
					time: this.orderInfo.intentionServiceTime,
					price: this.orderInfo.intentionFormalPrice,
					remark: this.orderInfo.intentionPriceRemarks
				}
				this.intentionVisible = true
			},
			// 提交意向修改
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	let uploadInfo = {
		          		intentionId: this.$route.query.intentionId,
		          		intentionServiceType: this.intentionForm.shape,
		          		intentionVisitType: this.intentionForm.visit,
		          		intentionServiceTime: this.intentionForm.time,
		          		intentionFormalPrice: this.intentionForm.price,
		          		intentionPriceRemarks: this.intentionForm.remark
		          	}
		            this.submitLoading = true
		          	this.$axios({
		          		method: 'post',
		          		url: '/order/intention/updateIntentionInfo',
		          		data: this.$qs.stringify(uploadInfo)
		          	}).then(res => {
		          		this.intentionVisible = false
		          		this.submitLoading = false
		          		let result = res.data
		          		if (result.code == 200) {
		          			this.orderInfo.serviceMethod = this.getName(this.intentionForm.shape, this.consultWay)
							this.orderInfo.visitType = this.getName(this.intentionForm.visit, this.initialList)
							this.orderInfo.intentionServiceType = this.intentionForm.shape
							this.orderInfo.intentionVisitType = this.intentionForm.visit
							this.orderInfo.intentionServiceTime = this.intentionForm.time
							this.orderInfo.intentionFormalPrice = this.intentionForm.price
							this.orderInfo.intentionPriceRemarks = this.intentionForm.remark
		          			this.$message({
		          				type: 'success',
		          				message: '咨询意向修改成功'
		          			})
		          		} else {
		          			this.$message.error(result.msg)
		          		}
		          	}).catch(err => {
		          		this.submitLoading = false
		          		console.log(err)
		          	})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    //获取名字
			getName(id, list) {
				var newItem = list.find(item => {
					return item.dic_id == id
				})
				return newItem.dic_name
			},
			// 修改报名人数
			changeNum() {
				if (this.orderObj.maxNum == '' || isNaN(this.orderObj.maxNum)) {
					this.$message.error('最大报名人数格式不正确')
					return
				}
				this.$confirm('确定要修改报名人数吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/order/intention/updateIntentionInfo',
		        		data: this.$qs.stringify({
		        			intentionId: this.$route.query.intentionId,
		        			intentionMaximumSignup: this.orderObj.maxNum
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.$message({
		            			type: 'success',
		           		 		message: '报名人数修改成功!'
	          				});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})
		        }).catch(() => {
		           
		        });
			},
			// 停止报名
			stopEnlist() {
				this.$confirm('确定要停止报名吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/order/intention/stopSignUp',
		        		data: this.$qs.stringify({
		        			ID: this.$route.query.intentionId
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.orderInfo.intentionStatus = 2
		        			this.$message({
		            			type: 'success',
		           		 		message: '操作成功!'
	          				});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})
		        }).catch(() => {
		           
		        });
			},
			// 修改微信人数
			addWxTool() {

			},
			// 微信提醒
			submitAlert(item) {
				console.log(item)
				
				if (!item.length) {
					this.$message.error('请先选择咨询师')
					return
				}
				let uploadArr = []
				item.forEach(val => {
					uploadArr.push(val.id)
				})
				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/doChoicemeMentors',
					data: this.$qs.stringify({
						intentionId: this.$route.query.intentionId,
						userIds: uploadArr.join(',')
					})
				}).then(res => {
					this.wxalertVisible = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.wxList = item
						this.orderInfo.intentionRemindNumber = this.wxList.length
						this.$message({
							type: 'success',
							message: '发送成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.wxalertVisible = false
					this.submitLoading = false
					console.log(err)
				})
			},
			// 咨询师抢单
			snatchBill(row) {
				if (this.orderInfo.intentionStatus != 0 && this.orderInfo.intentionStatus != 1) {
					this.$message.error('该订单抢单已结束')
					return
				}
				this.$confirm('确定要给该咨询师抢单吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/order/intention/getIntentionByMentor',
		        		data: this.$qs.stringify({
		        			userId: row.user_id,
		        			intentionId: row.intention_id
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			row.signup_status = 1
							this.$message({
				            	type: 'success',
				            	message: '抢单成功!'
				          	});
		        		} else {
		        			this.$message.error(result.msg)
			        	}	
		        	}).catch(err => {
		        		console.log(err)
		        	})	
		        }).catch(() => {
		           
		        });
			}
		},
		components: {
			ChooseUser,
			UserDatum,
			WxAlert
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.children-view {
		position: fixed;
	    top: 60px;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 100;
	    background-color: #EEF1F6;
	    padding: 20px;
	    overflow-y: auto;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}

	.order-info p {
		padding: 10px 0;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #303133;
		letter-spacing: 0.39px;
	}
	.order-operate p {
		padding: 4px 0;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
		& .el-button {
			font-size: 14px;
		}
	}

	.form-box {
		font-size: 16px;
		& .tool {
			padding-bottom: 12px;
			color: #303030;
		}
	}
</style>