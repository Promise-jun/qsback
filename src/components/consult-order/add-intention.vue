<template>
	<div class="children-view" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">创建意向订单</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="14">
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
			</el-col>
			<el-col :span="10">
				<el-card class="box-card" style="min-height: 165px;">
				  	<div slot="header" class="clearfix">
				    	<span><i class="must">*</i>咨询分类</span>
				    	<el-button style="float: right; padding: 3px 0" type="text" @click="consultVisible = true">+选择</el-button>
				  	</div>
				  	<el-row :gutter="20">
					  	<el-col :span="24">
					  		<el-tag
							  	v-for="(item, index) in orderObj.consultNameList"
							  	:key="index">
							  	{{item}}
							</el-tag>
					  	</el-col>
				  	</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>客户信息</span>
				  	</div>
					<el-row :gutter="20">
						<el-col :span="12">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">称呼：</div>
						  		<div>
						  			<el-input v-model="orderObj.call" placeholder="例如：张女士/王先生" size="small" style="width: 50%;"></el-input>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="12">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">性别：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.sex" size="small">
									    <el-radio border :label="1">男</el-radio>
									    <el-radio border :label="2">女</el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="24">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">年龄：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.age" size="small">
									    <el-radio border label="45-65">45-65岁</el-radio>
									    <el-radio border label="35-45">35-45岁</el-radio>
									    <el-radio border label="25-35">25-35岁</el-radio>
									    <el-radio border label="20-25">20-25岁</el-radio>
									    <el-radio border label="0-20">20岁以下</el-radio>
									</el-radio-group>
									<el-input v-model="orderObj.age" placeholder="请输入年龄" size="small" style="margin-left: 20px; width: 200px;">
										<template slot="append">岁</template>
									</el-input>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="24">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">职业：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.vocation" size="small">
									    <el-radio 
									    	border
									    	v-for="item in vocationList" 
									    	:key="item.dic_id"
									    	:label="item.dic_id">
									    	{{ item.dic_name }}
									    </el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="12">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">婚姻：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.marriage" size="small">
									    <el-radio border :label="0">保密</el-radio>
									    <el-radio border :label="1">单身</el-radio>
									    <el-radio border :label="2">热恋</el-radio>
									    <el-radio border :label="3">求交往</el-radio>
									    <el-radio border :label="4">离异</el-radio>
									    <el-radio border :label="5">已婚</el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">难易：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.easy" size="small">
									    <el-radio border :label="0">复杂</el-radio>
									    <el-radio border :label="1">一般</el-radio>
									    <el-radio border :label="2">简单</el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool"><i class="must">*</i>紧急状况：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.urgent" size="small">
									    <el-radio border :label="0">紧急</el-radio>
									    <el-radio border :label="1">随时</el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="12">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">地区：</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.area" size="small">
									    <el-radio border label="海外北上广深杭">海外北上广深杭</el-radio>
									    <el-radio border label="省会及二线城市">省会及二线城市</el-radio>
									    <el-radio border label="其他城市">其他城市</el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">微信：</div>
						  		<div>
						  			<el-input v-model="orderObj.wx" placeholder="请输入微信" size="small" style="width: 50%;"></el-input>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">淘宝号：</div>
						  		<div>
						  			<el-input v-model="orderObj.taobao" placeholder="请输入淘宝号" size="small" style="width: 50%;"></el-input>
						  		</div>
						  	</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>诉求</span>
				  	</div>
				  	<div class="form-box" style="padding-bottom: 14px;">
				  		<div class="tool"><i class="must">*</i>问题描述</div>
				  		<div>
				  			<el-input type="textarea" :rows="3" placeholder="请输入诉求描述" v-model="orderObj.appeal"></el-input>
				  		</div>
				  	</div>
				  	<div class="form-box" style="padding-bottom: 14px;">
				  		<div class="tool"><i class="must">*</i>咨询目标</div>
				  		<div>
				  			<el-input type="textarea" :rows="3" placeholder="请输入咨询目标" v-model="orderObj.target"></el-input>
				  		</div>
				  	</div>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>服务意向</span>
				  	</div>
				  	<el-row :gutter="20">
						<el-col :span="12">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool"><i class="must">*</i>服务形式</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.serviceForm" size="small">
									    <el-radio 
									    	border
									    	v-for="item in consultWay" 
									    	:key="item.dic_id"
									    	:label="item.dic_id">
									    	{{ item.dic_name }}
									    </el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool"><i class="must">*</i>咨询时长</div>
						  		<div class="radio">
						  			<el-radio-group v-model="orderObj.initial" size="small">
									    <el-radio 
									    	border
									    	v-for="item in initialList" 
									    	:key="item.dic_id"
									    	:label="item.dic_id">
									    	{{ item.dic_name }}
									    </el-radio>
									</el-radio-group>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="12">
							<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool"><i class="must">*</i>服务时间：</div>
						  		<div>
						  			<el-input v-model="orderObj.serviceTime" placeholder="请输入服务时间" size="small"></el-input>
						  		</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool"><i class="must">*</i>本次价格：</div>
						  		<div>
						  			<el-input v-model="orderObj.price" placeholder="请输入正式价格" size="small" style="width: 35%;">
						  				<template slot="append">元</template>
						  			</el-input>
						  			<el-input v-model="orderObj.priceNote" placeholder="请输入价格备注" size="small" style="margin-left: 15px; width: 60%;"></el-input>
						  		</div>
						  	</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>报名设置</span>
				  	</div>
				  	<el-row :gutter="20">
						<el-col :span="12">
							<!-- <div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">报名开始日期：</div>
						  		<div>
						  			<el-date-picker
								      	v-model="orderObj.startTime"
								      	type="date"
								      	value-format="yyyy-MM-dd"
								      	placeholder="选择报名开始日期">
								    </el-date-picker>
						  		</div>
						  	</div> -->
						  	<div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool"><i class="must">*</i>报名人数：</div>
						  		<div>
						  			<el-input v-model="orderObj.num" placeholder="请输入报名人数" size="small" style="width: 50%;">
						  				<template slot="append">人</template>
						  			</el-input>
						  		</div>
						  	</div>
						</el-col>
						<el-col :span="12">
							<!-- <div class="form-box" style="padding-bottom: 14px;">
						  		<div class="tool">报名截止日期：</div>
						  		<div>
						  			<el-date-picker
								      	v-model="orderObj.endTime"
								      	type="date"
								      	value-format="yyyy-MM-dd"
								      	placeholder="选择报名截止日期">
								    </el-date-picker>
						  		</div>
						  	</div> -->
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>客服备注（仅内部可见）</span>
				  	</div>
				  	<div class="form-box" style="padding-bottom: 14px;">
				  		<div class="tool">备注内容</div>
				  		<div>
				  			<el-input type="textarea" :rows="3" placeholder="请输入备注内容" v-model="orderObj.remark"></el-input>
				  		</div>
				  	</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- <el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>微信提醒</span>
				    	<el-button style="float: right; padding: 3px 0" type="text" @click="wxalertVisible = true">+选择</el-button>
				  	</div>
				  	<div class="form-box" style="padding-bottom: 14px;">
				  		<el-tag
						  	v-for="tag in wxList"
						  	:key="tag.id">
						  		{{tag.name}}
						</el-tag>
				  	</div>
				</el-card>
			</el-col>
		</el-row> -->

		<div style="margin-top: 30px;">
			<el-button type="primary" @click="confirmCreate">确定创建</el-button>
		</div>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>
		<!-- 咨询分类 -->
		<consult-classify :visible.sync="consultVisible" :idList="[]" :nameList="[]" @submit="submitConsult"></consult-classify>
		<!-- 选择提醒用户 -->
		<wx-alert :visible.sync="wxalertVisible" :wxList="wxList" @submit="submitAlert"></wx-alert>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user' //选择用户
	import ConsultClassify from 'components/consult-classify/consult-classify' //选择咨询分类
	import WxAlert from 'components/consult-classify/wx-alert' //微信提醒
	
	export default {
		name: 'addIntention',
		data() {
			return {
				loading: false,
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
					source: '', //来源 58：梦立方 81：阅览一心 62：线下
					status: 0, //报名中
					sex: '', //性别
					wx: '', //微信
					area: '', //地区
					vocation: '', //职业
					marriage: 0, //婚姻状况
					appeal: '', //问题描述
					target: '', //咨询目标
					num: '', //报名人数
					price: '', //正式价格
					priceNote: '', //价格备注
					urgent: '', //紧急情况
					serviceForm: '', //服务形式
					serviceTime: '', //服务时间
					initial: '', //初访形式
					consultIdList: [], //咨询分类id
					consultNameList: [] //咨询分类名
				},
				//职业列表
				vocationList: [],
				//初访形式
				initialList: [],
				//咨询方式
				consultWay: [],
				consultVisible: false,
				//微信提醒
				wxalertVisible: false,
				wxList: []
			}
		},
		created() {
			if (this.$route.meta.type == 'dreamCube') { //梦立方
				this.orderObj.source = 58
			} else if (this.$route.meta.type == 'pleasantHeart') { //悦然一心
				this.orderObj.source = 81
			}
			this.getOption()
		},
		methods: {
			// 获取选项
			getOption() {
				// this.loading = true
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
					} else {
						this.$message.error(result.msg)
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

		    	this.orderObj.taobao = item.userPayAccount
		    	this.chooseUserVisible = false
			},
			// 注册用户
			registerUser(item) {
				console.log(item)
				this.chooseUserVisible = false
			},
			// 咨询分类
			submitConsult(idList, nameList) {
				this.orderObj.consultIdList = idList
				this.orderObj.consultNameList = nameList

				this.consultVisible = false
			},
			// 微信提醒
			submitAlert(item) {
				console.log(item)
				this.wxList = item
				this.wxalertVisible = false
			},
			// 订单确认
			confirmCreate() {
				// if (this.userInfo.userId == '') {
				// 	this.$message.error('请先选择用户')
				// 	return
				// }
				if (!this.orderObj.consultIdList.length) {
					this.$message.error('请选择咨询分类')
					return
				}
				if (this.orderObj.marriage === '') {
					this.$message.error('请选择婚姻状况')
					return
				}
				if (this.orderObj.urgent === '') {
					this.$message.error('请选择紧急状况')
					return
				}
				if (this.orderObj.appeal == '' || this.orderObj.target == '') {
					this.$message.error('请输入诉求内容')
					return
				}

				if (this.orderObj.serviceForm == '') {
					this.$message.error('请选择服务形式')
					return
				}
				if (this.orderObj.serviceTime == '') {
					this.$message.error('请输入服务时间')
					return
				}
				if (this.orderObj.initial == '') {
					this.$message.error('请选择初访形式')
					return
				}
				if (isNaN(this.orderObj.price)) {
					this.$message.error('正式价格格式不正确')
					return
				}
				if (this.orderObj.priceNote == '') {
					this.$message.error('请输入价格备注')
					return
				}
				if (this.orderObj.num == '' || isNaN(this.orderObj.num)) {
					this.$message.error('报名人数信息不正确')
					return
				}

				let baseInfo = ''
				if (this.orderObj.sex) {
					baseInfo += 'userSex:' + this.orderObj.sex + ','
				}
				if (this.orderObj.wx) {
					baseInfo += 'userWechat:' + this.orderObj.wx + ','
				}
				if (this.orderObj.area) {
					baseInfo += 'userAddress:' + this.orderObj.area + ','
				}
				if (this.orderObj.vocation) {
					baseInfo += 'userProfession:' + this.orderObj.vocation + ','
				}
				if (baseInfo != '') {
					baseInfo = baseInfo.substr(0, baseInfo.length-1)
				}

				let uploadInfo = {
					userId: this.userInfo.userId,
					intentionUserInfo: baseInfo,
					intentionAppellation: this.orderObj.call,
					intentionType: this.orderObj.source,
					intentionAgeStage: this.orderObj.age,
					intentionIsMarriage: this.orderObj.marriage,
					intentionTaobao: this.orderObj.taobao,
					intentionClassification: this.orderObj.consultIdList.join('/'),
					intentionDegreeDifficulty: this.orderObj.easy,
					intentionAutobiography: this.orderObj.appeal,
					intentionObjective: this.orderObj.target,
					intentionServiceTime: this.orderObj.serviceTime,
					intentionServiceType: this.orderObj.serviceForm,
					intentionVisitType: this.orderObj.initial,
					intentionFormalPrice: this.orderObj.price,
					intentionPriceRemarks: this.orderObj.priceNote,
					intentionMaximumSignup: this.orderObj.num,
					intentionEmergencyStatus: this.orderObj.urgent,
					intentionGuestRemarks: this.orderObj.remark,
					intentionStatus: this.orderObj.status
				}
				this.$confirm('确定创建该意向订单吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/order/intention/saveForIntention',
		        		data: this.$qs.stringify(uploadInfo)
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			if (this.$route.meta.type == 'dreamCube') { //梦立方
								this.$router.replace({
			        				path: '/dreamCube/intentionOrder'
			        			})
							} else if (this.$route.meta.type == 'pleasantHeart') { //悦然一心
								this.$router.replace({
			        				path: '/pleasantHeart/intentionOrder'
			        			})
							}
		        			this.$message({
				            	type: 'success',
				            	message: '创建成功!'
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
			ConsultClassify,
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
	  	&>.el-row {
	  		margin-bottom: 24px;
	  	}
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.box-card {
		& p {
			padding: 10px 0;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #303030;
		}
	}
	.form-box {
		font-size: 14px;
		& .tool {
			padding-bottom: 10px;
			color: #909399;
		}
		& .radio {
			line-height: 32px;
		}
	}

	.el-tag {
		margin-right: 15px;
		margin-bottom: 10px;
	}
</style>