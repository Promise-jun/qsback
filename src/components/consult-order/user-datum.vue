<template>
	<div>
		<!-- 客户信息操作 -->
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="24">
				<el-card class="box-card">
					<el-row :gutter="20" class="order-operate">
						<el-col :span="8">
							<p>
					  			<label>称呼：</label>
					  			<span>{{datumInfo.intentionAppellation}}</span>
					  			<el-button type="text" size="mini" @click="changeDatum(1)">【更改】</el-button>
					  		</p>
					  		<p>
					  			<label>年龄：</label>
					  			<span>{{datumInfo.intentionAgeStage}}岁</span>
					  			<el-button type="text" size="mini" @click="changeDatum(2)">【更改】</el-button>
					  		</p>
					  		<p>
					  			<label>状态：</label>
					  			<span v-if="datumInfo.intentionEmergencyStatus == 0">紧急</span>
					  			<span v-else-if="datumInfo.intentionEmergencyStatus == 1">随时</span>
					  			<el-button type="text" size="mini" @click="changeDatum(3)">【更改】</el-button>
					  		</p>
					  		<p>
					  			<label>淘宝ID：</label>
					  			<span>{{datumInfo.intentionTaobao}}</span>
					  			<el-button type="text" size="mini" @click="changeDatum(4)">【更改】</el-button>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>性别：</label>
					  			<span v-if="baseInfo.userSex == 1">男</span>
					  			<span v-else-if="baseInfo.userSex == 2">女</span>
					  			<el-button type="text" size="mini" @click="changeDatum(5)">【更改】</el-button>
					  		</p>
					  		<p>
					  			<label>职业：</label>
					  			<span v-text="getName(baseInfo.userProfession, this.workList)"></span>
					  			<el-button type="text" size="mini" @click="changeDatum(6)">【更改】</el-button>
					  		</p>	
					  		<p>
					  			<label>难易：</label>
					  			<span v-if="datumInfo.intentionDegreeDifficulty == 0">复杂</span>
					  			<span v-else-if="datumInfo.intentionDegreeDifficulty == 1">一般</span>
					  			<span v-else-if="datumInfo.intentionDegreeDifficulty == 2">简单</span>
					  			<el-button type="text" size="mini" @click="changeDatum(7)">【更改】</el-button>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>地区：</label>
					  			<span>{{baseInfo.userAddress}}</span>
					  			<el-button type="text" size="mini" @click="changeDatum(8)">【更改】</el-button>
					  		</p>
					  		<p>
					  			<label>婚姻：</label>
					  			<span v-if="datumInfo.intentionIsMarriage == 0">保密</span>
					  			<span v-else-if="datumInfo.intentionIsMarriage == 1">单身</span>
					  			<span v-else-if="datumInfo.intentionIsMarriage == 2">热恋</span>
					  			<span v-else-if="datumInfo.intentionIsMarriage == 3">求交往</span>
					  			<span v-else-if="datumInfo.intentionIsMarriage == 4">离异</span>
					  			<span v-else-if="datumInfo.intentionIsMarriage == 5">已婚</span>
					  			<el-button type="text" size="mini" @click="changeDatum(9)">【更改】</el-button>
					  		</p>
					  		<p>
					  			<label>微信：</label>
					  			<span>{{baseInfo.userWechat}}</span>
					  			<el-button type="text" size="mini" @click="changeDatum(10)">【更改】</el-button>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		
		<!-- 咨询分类 和 诉求 -->
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="24">
				<el-card class="box-card">
					<div slot="header" class="classify-list">
					    <p style="float: left;">
				  			<label>咨询分类：</label>
				  			<span>
				  				<i v-for="(item, index) in nameList" :key="index">{{item}}</i>
				  			</span>
				  			<el-button type="text" size="mini" @click="consultVisible = true">【更改】</el-button>
				  		</p>
					   	<!-- <p style="float: right;">
				  			<span style="padding-right: 10px;">蓝江辉-海棠</span>
				  			<span>2018-10-24 19:17</span>
				  		</p> -->
				  	</div>
					<el-row class="order-info">
						<el-col :span="24">
						  	<div class="form-box" style="padding-bottom: 24px;">
						  		<div class="tool">问题描述</div>
						  		<div class="appeal-cont">{{datumInfo.intentionAutobiography}}</div>
						  	</div>
						  	<div class="form-box" style="padding-bottom: 24px;">
						  		<div class="tool">咨询目标</div>
						  		<div class="appeal-cont">{{datumInfo.intentionObjective}}</div>
						  	</div>
						</el-col>
				  	</el-row>
				</el-card>
			</el-col>
		</el-row>
		
		<!-- 联系记录 -->
		<!-- <el-row class="basic-info" :gutter="20">
		  	<el-col :span="24">
				<el-card class="box-card" style="margin-bottom: 24px;">
				  	<div slot="header">
					    <span>联系记录</span>
					    <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
				  	</div>
					<el-table
					    :data="contactData"
					    stripe
					    border
					    style="width: 100%">
					    <el-table-column label="内容"></el-table-column>
					    <el-table-column prop="timelen" label="订单详情" align="center"></el-table-column>
					    <el-table-column label="客服" align="center"></el-table-column>
					    <el-table-column prop="grade" label="时间" align="center"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row> -->

		<!-- 修改称呼 -->
		<el-dialog 
			title="修改称呼" 
			:visible.sync="callVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm">
			  <el-form-item label="称呼：">
			    <el-input v-model="datumObj.call" autocomplete="off" placeholder="请输入称呼"></el-input>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="callVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(1)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改年龄 -->
		<el-dialog 
			title="修改年龄" 
			:visible.sync="ageVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="年龄：">
			    <el-radio-group v-model="datumObj.chooseAge" @change="changeAge">
				    <el-radio border label="45-65">45-65岁</el-radio>
				    <el-radio border label="35-45">35-45岁</el-radio>
				    <el-radio border label="25-35">25-35岁</el-radio>
				    <el-radio border label="20-25">20-25岁</el-radio>
				    <el-radio border label="0-20">20岁以下</el-radio>
				</el-radio-group>
				<el-input v-model="datumObj.age" placeholder="请输入年龄" style="width: 200px; margin-top: 10px;">
					<template slot="append">岁</template>
				</el-input>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="ageVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(2)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改状态 -->
		<el-dialog 
			title="修改状态" 
			:visible.sync="statusVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="状态：">
			    <el-radio-group v-model="datumObj.status">
				    <el-radio border :label="0">紧急</el-radio>
				    <el-radio border :label="1">随时</el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="statusVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(3)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改淘宝号 -->
		<el-dialog 
			title="修改淘宝号" 
			:visible.sync="taobaoVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm">
			  <el-form-item label="淘宝ID：">
			    <el-input v-model="datumObj.taobao" autocomplete="off" placeholder="请输入淘宝ID"></el-input>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="taobaoVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(4)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改性别 -->
		<el-dialog 
			title="修改性别" 
			:visible.sync="sexVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="性别：">
			    <el-radio-group v-model="datumObj.sex">
				    <el-radio border label="1">男</el-radio>
				    <el-radio border label="2">女</el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="sexVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(5)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改职业 -->
		<el-dialog 
			title="修改职业" 
			:visible.sync="workVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="职业：">
			    <el-radio-group v-model="datumObj.work" v-if="workList.length">
				    <el-radio 
				    	border
				    	style="margin-bottom: 15px;"
				    	v-for="item in workList" 
				    	:key="item.dic_id"
				    	:label="item.dic_id">
				    	{{ item.dic_name }}
				    </el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="workVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(6)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改难易程度 -->
		<el-dialog 
			title="修改难易程度" 
			:visible.sync="easyVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="难易：">
			    <el-radio-group v-model="datumObj.easy">
				    <el-radio border :label="0">复杂</el-radio>
				    <el-radio border :label="1">一般</el-radio>
				    <el-radio border :label="2">简单</el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="easyVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(7)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改地区 -->
		<el-dialog 
			title="修改地区" 
			:visible.sync="areaVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="地区：">
			    <el-radio-group v-model="datumObj.area">
				    <el-radio border label="海外北上广深杭">海外北上广深杭</el-radio>
				    <el-radio border label="省会及二线城市">省会及二线城市</el-radio>
				    <el-radio border label="其他城市">其他城市</el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="areaVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(8)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改婚姻 -->
		<el-dialog 
			title="修改婚姻状态" 
			:visible.sync="marriageVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm" size="small">
			  <el-form-item label="婚姻：">
			    <el-radio-group v-model="datumObj.marriage">
				    <el-radio border :label="0">保密</el-radio>
				    <el-radio border :label="1">单身</el-radio>
				    <el-radio border :label="2">热恋</el-radio>
				    <el-radio border :label="3">求交往</el-radio>
				    <el-radio border :label="4">离异</el-radio>
				    <el-radio border :label="5">已婚</el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="marriageVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(9)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改微信 -->
		<el-dialog 
			title="修改微信" 
			:visible.sync="wxVisible" 
			:modal="false"
		>
		  	<el-form :model="datumObj" label-width="80px" class="demo-ruleForm">
			  <el-form-item label="微信：">
			    <el-input v-model="datumObj.wx" placeholder="请输入微信"></el-input>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="wxVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitDatum(10)" :loading="submitLoading">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 咨询分类 -->
		<consult-classify :visible.sync="consultVisible" :idList="idList" :nameList="nameList" @submit="submitConsult"></consult-classify>
	</div>
</template>

<script type="text/javascript">
	import ConsultClassify from 'components/consult-classify/consult-classify' //选择咨询分类
	
	export default {
		props: {
			info: {
				type: Object,
				default: {}
			},
			workList: {
				type: Array,
				default: []
			},
			wayList: {
				type: Array,
				default: []
			}
		},
		name: 'userDatum',
		data() {
			return {
				// 用户资料信息
				datumInfo: {},
				baseInfo: {
					userSex: '',
					userWechat: '',
					userAddress: '',
					userProfession: ''
				},
				submitLoading: false,
				// 修改用户资料
				datumObj: {
					age: '',
					status: '',
					sex: '',
					work: '',
					easy: '',
					easy: '',
					area: '',
					marriage: ''
				},
				callVisible: false, //称呼
				ageVisible: false, //年龄
				statusVisible: false, //状态
				taobaoVisible: false, //淘宝ID
				sexVisible: false, //性别
				workVisible: false, //职业
				vocationList: [], //职业列表
				easyVisible: false, //难易程度
				areaVisible: false, //地区
				marriageVisible: false, //婚姻状态
				wxVisible: false, //微信
				// 联系记录
				contactData: [],
				// 咨询分类
				idList: [], //id列表
				nameList: [], //name列表
				consultVisible: false
			}
		},
		created() {
			this.datumInfo = this.info
			let key, value
			if (this.datumInfo.intentionUserInfo != '') {
				let list = this.datumInfo.intentionUserInfo.split(',')
				list.forEach(item => {
					key = item.split(':')[0]
					value = item.split(':')[1]
					this.baseInfo[key] = value
				})
			}
			this.getClassify(this.datumInfo.intentionClassification)
		},
		methods: {
			// 修改资料
			changeDatum(type) {
				if (type == 1) { //称呼
					this.callVisible = true
					this.datumObj.call = this.datumInfo.intentionAppellation
				} else if (type == 2) { //年龄
					this.ageVisible = true
					this.datumObj.age = this.datumInfo.intentionAgeStage
				} else if (type == 3) { //状态
					this.statusVisible = true
					this.datumObj.status = this.datumInfo.intentionEmergencyStatus
				} else if (type == 4) { //淘宝ID
					this.taobaoVisible = true
					this.datumObj.taobao = this.datumInfo.intentionTaobao
				} else if (type == 5) { //性别
					this.sexVisible = true
					this.datumObj.sex = this.baseInfo.userSex
				} else if (type == 6) { //职业
					this.workVisible = true
					this.datumObj.work = this.baseInfo.userProfession
				} else if (type == 7) { //难易
					this.easyVisible = true
					this.datumObj.easy = this.datumInfo.intentionDegreeDifficulty
				} else if (type == 8) { //地区
					this.areaVisible = true
					this.datumObj.area = this.baseInfo.userAddress
				} else if (type == 9) { //婚姻状态
					this.marriageVisible = true
					this.datumObj.marriage = this.datumInfo.intentionIsMarriage
				} else if (type == 10) { //微信
					this.wxVisible = true
					this.datumObj.wx = this.baseInfo.userWechat
				}
			},
			// 提交资料
			submitDatum(type) {
				let uploadInfo = {}
				if (type == 1) { //称呼
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionAppellation: this.datumObj.call
					}
				} else if (type == 2) { //年龄
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionAgeStage: this.datumObj.age
					}
				} else if (type == 3) { //状态
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionEmergencyStatus: this.datumObj.status
					}
				} else if (type == 4) { //淘宝ID
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionTaobao: this.datumObj.taobao
					}
				} else if (type == 5) { //性别
					let userInfo = this.getUserInfoStr(this.datumObj.sex, this.baseInfo.userWechat, this.baseInfo.userAddress, this.baseInfo.userProfession)
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionUserInfo: userInfo
					}
				} else if (type == 6) { //职业
					let userInfo = this.getUserInfoStr(this.baseInfo.userSex, this.baseInfo.userWechat, this.baseInfo.userAddress, this.datumObj.work)
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionUserInfo: userInfo
					}
				} else if (type == 7) { //难易
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionDegreeDifficulty: this.datumObj.easy
					}
				} else if (type == 8) { //地区
					let userInfo = this.getUserInfoStr(this.baseInfo.userSex, this.baseInfo.userWechat, this.datumObj.area, this.baseInfo.userProfession)
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionUserInfo: userInfo
					}
				} else if (type == 9) { //婚姻状况
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionIsMarriage: this.datumObj.marriage
					}
				} else if (type == 10) { //微信
					let userInfo = this.getUserInfoStr(this.baseInfo.userSex, this.datumObj.wx, this.baseInfo.userAddress, this.baseInfo.userProfession)
					uploadInfo = {
						intentionId: this.$route.query.intentionId,
						intentionUserInfo: userInfo
					}
				}

				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/updateIntentionInfo',
					data: this.$qs.stringify(uploadInfo)
				}).then(res => {
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.$message({
							type: 'success',
							message: '修改成功'
						})
						if (type == 1) { //称呼
							this.callVisible = false
							this.datumInfo.intentionAppellation = this.datumObj.call
						} else if (type == 2) { //年龄
							this.ageVisible = false
							this.datumInfo.intentionAgeStage = this.datumObj.age
						} else if (type == 3) { //状态
							this.statusVisible = false
							this.datumInfo.intentionEmergencyStatus = this.datumObj.status
						} else if (type == 4) { //淘宝
							this.taobaoVisible = false
							this.datumInfo.intentionTaobao = this.datumObj.taobao
						} else if (type == 5) { //性别
							this.sexVisible = false
							this.baseInfo.userSex = this.datumObj.sex
						} else if (type == 6) { //职业
							this.workVisible = false
							this.baseInfo.userProfession = this.datumObj.work
						} else if (type == 7) { //难易
							this.easyVisible = false
							this.datumInfo.intentionDegreeDifficulty = this.datumObj.easy
						} else if (type == 8) { //地区
							this.areaVisible = false
							this.baseInfo.userAddress = this.datumObj.area
						} else if (type == 9) { //婚姻状况
							this.marriageVisible = false
							this.datumInfo.intentionIsMarriage = this.datumObj.marriage
						} else if (type == 10) { //微信
							this.wxVisible = false
							this.baseInfo.userWechat = this.datumObj.wx
						}
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 改变年龄选项
			changeAge(val) {
				this.datumObj.age = val
			},
			// 获取基本信息字符串
			getUserInfoStr(sex, wx, address, profession) {
				let str = ''
				if (sex) {
					str += 'userSex:' + sex + ','
				}
				if (wx) {
					str += 'userWechat:' + wx + ','
				}
				if (address) {
					str += 'userAddress:' + address + ','
				}
				if (profession) {
					str += 'userProfession:' + profession + ','
				}
				if (str != '') {
					str = str.substr(0, str.length-1)
				}
				return str
			},
			//获取名字
			getName(id, list) {
				if (id == '') {
					return ''
				} else {
					let newItem = list.find(item => {
						return item.dic_id == id
					})
					return newItem.dic_name
				}
			},
			//获取咨询分类
			getClassify(str) {
				if (str == '') {
					return
				}
				let newItem
				this.idList = str.split('/')
				this.nameList = []
				this.idList.forEach(item => {
					if (item.indexOf(',') == -1) {
						newItem = this.wayList.find(value => {
							return value.dic_id == item
						})
						this.nameList.push(newItem.dic_name)
					} else {
						let list = item.split(',')
						let str = ''
						list.forEach(el => {
							newItem = this.wayList.find(value => {
								return value.dic_id == el
							})
							str += newItem.dic_name + '>'
						})
						str = str.substr(0, str.length-1)
						this.nameList.push(str)
					}	
				})
			},
			// 咨询分类
			submitConsult(idArr, nameArr) {
				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/updateIntentionInfo',
					data: this.$qs.stringify({
						intentionId: this.$route.query.intentionId,
						intentionClassification: idArr.join('/')
					})
				}).then(res => {
					this.consultVisible = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.idList = idArr
						this.nameList = nameArr
						this.$message({
							type: 'success',
							message: '咨询分类修改成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.submitLoading = false
					console.log(err)
				})
			},
		},
		components: {
			ConsultClassify
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
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

	.classify-list {
		overflow: hidden;
		& i {
			font-style: normal;
		}
		& i:not(:last-child) {
			padding-right: 10px;
		}
	}
	.appeal-cont {
		padding: 10px 12px;
		min-height: 80px;
		background: #F2F6FC;
		border: 1px solid #EDEFF2;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #303030;
		letter-spacing: 0.34px;
		line-height: 20px;
	}
</style>