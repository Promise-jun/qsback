<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">导师入驻</el-col>
		</el-row>

		<el-row :gutter="20" v-if="isAdd">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix" style="height: 32px; line-height: 32px;">
		    			<span>选择用户</span>
		    			<el-button type="primary" style="float: right;" icon="el-icon-circle-plus" size="small" @click="chooseUserVisible = true">选择</el-button>
		  			</div>
		  			<el-row :gutter="20">
					  	<el-col :span="12">
					  		<p>
					  			<label>用户ID：</label>
					  			<span>{{ userInfo.userId }}</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
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
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>所属客服：</label>
					  			<span>{{ userInfo.kefu }}</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
		    			<span>基本信息</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="8">
					  		<p>昵称</p>
					  		<el-input v-model="mentorForm.nickName" placeholder="请输入昵称"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>姓名</p>
					  		<el-input v-model="mentorForm.realName" placeholder="请输入姓名"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>咨询师所在地</p>
					  		<el-cascader
							  	:options="addressList"
							  	@active-item-change="handleItemChange"
							  	:props="props"
							></el-cascader>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>手机号</p>
					  		<el-input v-model="mentorForm.phone" placeholder="请输入手机号"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>微信号</p>
					  		<el-input v-model="mentorForm.wechat" placeholder="请输入微信号"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>生日</p>
					  		<el-date-picker
      							v-model="mentorForm.birthday"
      							type="date"
      							value-format="yyyy-MM-dd"
     							placeholder="选择日期">
    						</el-date-picker>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>毕业学校</p>
					  		<el-input v-model="mentorForm.graduateInstitutions" placeholder="请输入毕业学校"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>专业</p>
					  		<el-input v-model="mentorForm.major" placeholder="请输入专业"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>学历</p>
					  		<el-select v-model="mentorForm.education" placeholder="请选择">
							    <el-option
							      	v-for="item in studyList"
							      	:key="item.dicId"
							      	:label="item.dicName"
							      	:value="item.dicName">
							    </el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>学历证书</p>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	:action="actionUrl"
								  	:show-file-list="false"
								  	:http-request="studyRequest">
								  	<img v-if="mentorForm.educationUrl" :src="mentorForm.educationUrl" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>证件号</p>
					  		<el-input v-model="mentorForm.materialNumberl" placeholder="请输入证件号"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>证件类型</p>
					  		<el-select v-model="mentorForm.materialType" placeholder="请选择">
							    <el-option label="大陆身份证" value="0"></el-option>
							    <el-option label="台胞证" value="1"></el-option>
							    <el-option label="护照" value="2"></el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="24">
					  		<p>证件照片</p>
					  		<div class="add-pic-box">
								<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	:action="actionUrl"
								  	:show-file-list="false"
								  	:http-request="frontRequest">
								  	<img v-if="mentorForm.frontView" :src="mentorForm.frontView" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<p>正面</p>
					  		</div>
					  		<div class="add-pic-box">
								<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	:action="actionUrl"
								  	:show-file-list="false"
								  	:http-request="backRequest">
								  	<img v-if="mentorForm.backView" :src="mentorForm.backView" class="avatar">
								  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<p>反面</p>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>推荐人</p>
					  		<el-input v-model="mentorForm.referee" placeholder="请输入推荐人"></el-input>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>如何了解到我们</p>
					  		<el-select v-model="mentorForm.knowChannel" placeholder="请选择">
							    <el-option
							      	v-for="item in ditchList"
							      	:key="item.dicId"
							      	:label="item.dicName"
							      	:value="item.dicName">
							    </el-option>
							</el-select>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
		    			<span>从业背景</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="8">
					  		<p>平台在职类型</p>
					  		<el-select v-model="mentorForm.workType" placeholder="请选择">
					  			<el-option label="兼职" value="0"></el-option>
							    <el-option label="全职" value="1"></el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>从业年限</p>
					  		<el-input v-model="mentorForm.workYears" placeholder="请输入从业年限"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>累计个案（小时）</p>
					  		<el-input v-model="mentorForm.cumulativeLength" placeholder="请输入累计个案（小时）"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>专业背景</p>
					  		<el-input v-model="mentorForm.professionalBackground" placeholder="请输入累计个案（小时）"></el-input>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>擅长领域</p>
					  		<el-select
							    v-model="mentorForm.areasOfExpertise"
							    multiple
							    collapse-tags
							    placeholder="请选择">
							    <el-option
							      	v-for="item in bgList"
							      	:key="item.dicId"
							      	:label="item.dicName"
							      	:value="item.dicId">
							    </el-option>
							</el-select>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>咨询风格</p>
					  		<el-select
							    v-model="mentorForm.consultingStyle"
							    multiple
							    collapse-tags
							    placeholder="请选择">
							    <el-option
							      	v-for="item in styleList"
							      	:key="item.dicId"
							      	:label="item.dicName"
							      	:value="item.dicId">
							    </el-option>
							</el-select>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
		    			<span>上传头像</span>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="24">
					  		<p>头像</p>
					  		<div class="add-pic-box">
					  			<el-upload
								  	class="avatar-uploader"
								  	accept="image/jpeg, image/gif, image/png"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:on-success="headSuccess"
								  	:before-upload="headUpload">
								  	<img v-if="mentorForm.photoUrl" :src="mentorForm.photoUrl" class="avatar head-pic">
								  	<i v-else class="el-icon-plus avatar-uploader-icon head-icon"></i>
								</el-upload>
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
		    			<span>资质认证</span>
		    			<el-button style="float: right; padding: 3px 0" type="text" @click="openVisible(1)">添加</el-button>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="24">
					  		<el-table
							    ref="tableData"
							    stripe
							    border
							    v-loading="aptitudeLoading"
							    :data="aptitudeList"
							    tooltip-effect="dark"
							    style="width: 100%; margin: 15px 0;">
							    <el-table-column prop="represent" label="资质认证"></el-table-column>
							    <el-table-column prop="materialNumber" label="资质编号"></el-table-column>
							    <el-table-column label="资质图片">
							      <template slot-scope="scope">
							      	<img :src="scope.row.materialUrl" class="pic">
							      </template>
							    </el-table-column>
							    <el-table-column label="操作">
							      <template slot-scope="scope">
							    		<el-tooltip content="编辑" placement="top">
										  <el-button @click="editAptitude(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
										</el-tooltip>
							    		<el-tooltip content="删除" placement="top">
										  <el-button @click="delAptitude(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
										</el-tooltip>
								  </template>
							    </el-table-column>
							</el-table>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<el-row :gutter="20">
		  	<el-col :span="24">
		  		<el-card class="box-card">
		  			<div slot="header" class="clearfix">
		    			<span>受训背景</span>
		    			<el-button style="float: right; padding: 3px 0" type="text" @click="openTrain">添加</el-button>
		  			</div>
		  			<el-row :gutter="20" class="enter-module">
		  				<el-col :span="24">
					  		<el-table
							    ref="tableData"
							    stripe
							    border
							    v-loading="trainLoading"
							    :data="trainList"
							    tooltip-effect="dark"
							    style="width: 100%; margin: 15px 0;">
							    <el-table-column prop="aptitudeName" label="受训时间">
							    	<template slot-scope="scope">
							    		{{scope.row.startDate}} - {{scope.row.endDate}}
							    	</template>
							    </el-table-column>
							    <el-table-column prop="content" label="受训背景"></el-table-column>
							    <el-table-column label="培训证明">
							      <template slot-scope="scope">
							      	<img :src="scope.row.educationPictureUrl" class="pic">
							      </template>
							    </el-table-column>
							    <el-table-column label="操作">
							      <template slot-scope="scope">
							    		<el-tooltip content="编辑" placement="top">
										  <el-button @click="editAptitude(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
										</el-tooltip>
							    		<el-tooltip content="删除" placement="top">
										  <el-button @click="delAptitude(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
										</el-tooltip>
								  </template>
							    </el-table-column>
							</el-table>
					  	</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		</el-row>

		<div>
			<el-button type="primary" @click="submitAuditing">提交审核</el-button>
			<el-button type="danger">重置</el-button>
		</div>

		<!-- 上传证书弹窗 -->
		<el-dialog 
			title="提示" 
			:visible.sync="diplomaVisible"
			:modal="false">
		  	<el-form :model="diplomaForm" status-icon :rules="rules" ref="diplomaForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item :label="diplomaTool.name" prop="name">
			  	<el-select v-model="diplomaForm.name" placeholder="请选择">
			      	<el-option v-for="item in nameList" :key="item.dicId" :label="item.dicName" :value="item.dicName"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item :label="diplomaTool.card" prop="card">
			    <el-input v-model="diplomaForm.card" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item :label="diplomaTool.pic" prop="pic">
			    <div class="add-pic-box">
					<el-upload
					  	class="avatar-uploader"
					  	accept="image/jpeg, image/gif, image/png"
					  	:action="actionUrl"
					  	:show-file-list="false"
					  	:http-request="diplomaRequest">
					  	<img v-if="diplomaForm.pic" :src="diplomaForm.pic" class="avatar">
					  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
		  		</div>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitDiploma('diplomaForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="diplomaVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
		
		<!-- 受训背景 -->
		<el-dialog 
			title="提示" 
			:visible.sync="trainVisible"
			:modal="false">
		  	<el-form :model="trainForm" status-icon :rules="rules" ref="trainForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="受训时间" prop="time">
			  	<el-date-picker
			      	v-model="trainForm.time"
			      	type="daterange"
			      	value-format="yyyy-MM-dd"
			      	range-separator="至"
			      	start-placeholder="开始日期"
			      	end-placeholder="结束日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="受训背景" prop="trainCont">
			    <el-input v-model="trainForm.trainCont" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="培训证明">
			    <div class="add-pic-box">
					<el-upload
					  	class="avatar-uploader"
					  	accept="image/jpeg, image/gif, image/png"
					  	:action="actionUrl"
					  	:show-file-list="false"
					  	:http-request="trainRequest">
					  	<img v-if="trainForm.pic" :src="trainForm.pic" class="avatar">
					  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
		  		</div>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitTrain('trainForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="trainVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

		<!-- 选择用户 -->
		<choose-user :visible.sync="chooseUserVisible" @confirm="chooseUser" @register="registerUser"></choose-user>
	</div>
</template>

<script type="text/javascript">
	import ChooseUser from 'components/choose-user/choose-user'
	import { intArrFn } from 'common/js/util.js'

	let moment = require("moment")


	export default {
		name: 'addMentor',
		data() {
			return {
				loading: false,
				rules: {
					name: [
						{ required: true, message: '名称不能为空'}
					],
					pic: [
						{ required: true, message: '证书不能为空'}
					],
					time: [
						{ required: true, message: '培训时间不能为空'}
					]
				},
				userInfo: {
					userId: '',
					userName: '',
					phone: '',
					kefu: ''
				},
				// 选择用户
				chooseUserVisible: false,
				// 选择地址
				addressList: [{
		          	label: '江苏',
		          	cities: []
		        }, {
		          	label: '浙江',
		          	cities: []
		        }],
				props: {
          			value: 'label',
          			children: 'cities'
        		},
        		// 学历列表
        		studyList: [],
        		// 渠道列表
        		ditchList: [],
        		// 擅长领域
        		bgList: [],
        		// 咨询风格
        		styleList: [],
        		mentorForm: {
        			nickName: '', //昵称
					realName: '', //姓名
					city: '', //所在地
					phone: '', //手机号
					wechat: '', //微信号
					birthday: '', //生日
					graduateInstitutions: '', //毕业学校
					major: '', //专业
					education: '', //学历
					educationUrl: '', //学历证书
					materialNumberl: '', //证件号
					materialType: '0', //证件类型
					frontView: '', //正面
					backView: '', //反面
					referee: '', //推荐人
					knowChannel: '', //了解渠道
					workType: '', //在职类型
					workYears: '', //从业年限
					cumulativeLength: '', //累计时长
					professionalBackground: '', //专业背景用“，”号隔开
					areasOfExpertise: [], //擅长领域用“，”号隔开
					consultingStyle: [], //咨询风格用“，”号隔开
					photoUrl: '', //用户头像
        		},
        		// 资质认证
        		aptitudeLoading: false,
        		aptitudeList: [],
        		// 权威职称
        		authorityLoading: false,
        		authorityList: [],
        		// 证书弹窗
        		diplomaVisible: false,
        		diplomaType: null, //当前类型
        		nameList: [], //证书列表
        		diplomaTool: {
        			name: '',
        			card: '',
        			pic: ''
        		},
        		submitLoading: false,
        		diplomaForm: {
        			name: '',
        			card: '',
        			pic: ''
        		},
        		// 受训背景
        		trainLoading: false,
        		trainList: [],
        		trainVisible: false,
        		trainForm: {},
        		//图片上传
        		actionUrl: '',
        		//请求地址
        		isAdd: true,
        		uploadUrl: ''
			}
		},
		created() {
			if (this.$route.query.consultantApplyId) { //编辑 
				this.isAdd = false
				this.uploadUrl = '/system/consultant/apply/edit'
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/apply/findApplyDetail',
					data: this.$qs.stringify({
						consultantApplyId: this.$route.query.consultantApplyId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						let data = result.data
						this.userInfo.userId = data.userId
						this.mentorForm = {
		        			nickName: data.nickName, //昵称
							realName: data.realName, //姓名
							city: data.city, //所在地
							phone: data.phone, //手机号
							wechat: data.wechat, //微信号
							birthday: moment(data.birthday).format('YYYY-MM-DD'), //生日
							graduateInstitutions: data.graduateInstitutions, //毕业学校
							major: data.major, //专业
							education: data.education, //学历
							educationUrl: data.educationUrl, //学历证书
							materialNumberl: data.materialNumberl, //证件号
							materialType: data.materialType, //证件类型
							frontView: data.frontView, //正面
							backView: data.backView, //反面
							referee: data.referee, //推荐人
							knowChannel: data.knowChannel, //了解渠道
							workType: data.workType, //在职类型
							workYears: data.workYears, //从业年限
							cumulativeLength: data.cumulativeLength, //累计时长
							professionalBackground: data.professionalBackground, //专业背景用“，”号隔开
							areasOfExpertise: intArrFn(data.areasOfExpertise), //擅长领域用“，”号隔开
							consultingStyle: intArrFn(data.consultingStyle), //咨询风格用“，”号隔开
							photoUrl: data.photoUrl //用户头像
		        		}
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			} else { //新增
				this.isAdd = true
				this.uploadUrl = '/system/consultant/apply/save'
			}
			this.getOption('学历')
			this.getOption('了解渠道')
			this.getOption('咨询风格')
			this.getOption('心理分类')
			this.getOption('权威职称')
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
					if (type == '学历') {
						this.studyList = result
					} else if (type == '了解渠道') {
						this.ditchList = result
					} else if (type == '咨询风格') {
						this.styleList = result
					} else if (type == '心理分类') { //擅长领域
						this.bgList = result
					} else if (type == '权威职称') {
						this.nameList = result
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

		    	this.mentorForm.nickName = item.userNickname
		    	this.chooseUserVisible = false
			},
			// 注册用户
			registerUser(item) {
				console.log(item)
				this.chooseUserVisible = false
			},
			// 改变地址
			handleItemChange(val) {
		        console.log('active item:', val);
		        setTimeout(_ => {
		          	if (val.indexOf('江苏') > -1 && !this.addressList[0].cities.length) {
		            	this.addressList[0].cities = [{
		              		label: '南京'
		            	}];
		          	} else if (val.indexOf('浙江') > -1 && !this.addressList[1].cities.length) {
		            	this.addressList[1].cities = [{
		              		label: '杭州'
		            	}];
		          	}
		        }, 300);
		    },
		    // 学历证书
		    studyRequest(file) {
		    	this.uploadImg(file, 1)
		    },
		    // 证件正面
		    frontRequest(file) {
				this.uploadImg(file, 2)
		    },
		    // 证件反面
		    backRequest(file) {
				this.uploadImg(file, 3)
		    },
		    uploadImg(options, type) {
		    	// 获取文件对象
    			let file = options.file
    			//判断图片类型
    			let isJPG
			    if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
			     	isJPG =  true
			    } else {
			     	isJPG =  false
			    }
			    // 判断图片大小
			    const isLt2M = file.size / 1024 / 1024 < 10
			    if (!isJPG) {
			      	this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!')
			      	return
			    }
			    if (!isLt2M) {
			      	this.$message.error('上传图片大小不能超过 10MB!')
			      	return
			    }
			    // 创建一个HTML5的FileReader对象
    			var reader = new FileReader();
    			if (file) {
				    reader.readAsDataURL(file)
				    reader.onload = (e) => {
				    	let base64Str = e.target.result.split(',')[1]
				    	this.$axios({
				    		method: 'post',
				    		url: '/system/consultant/apply/uploadPicture',
				    		data: this.$qs.stringify({
				    			image: base64Str
				    		})
				    	}).then(res => {
				    		let result = res.data
				    		if (result.code == 200) {
				    			if (type == 1) { //学历证书
				    				this.mentorForm.educationUrl = result.msg
				    			} else if (type == 2) { //证件正面
				    				this.mentorForm.frontView = result.msg
				    			} else if (type == 3) { //证件反面
				    				this.mentorForm.backView = result.msg
				    			} else if (type == 4) { //资质认证弹窗
									this.diplomaForm.pic = result.msg
				    			} else if (type == 6) { //培训证书
				    				this.trainForm.pic = result.msg
				    			}
				    		} else {
				    			this.$message.error(result.msg);
				    		}
				    	}).catch(err => {
				    		console.log(err)
				    	})
				    }
				}
		    },
		    // 头像
		    headSuccess(res, file) {
		        this.mentorForm.headPic = URL.createObjectURL(file.raw);
		    },
		    headUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    // 证书弹窗
		    openVisible(type) { //打开弹窗
		    	if (this.userInfo.userId == '') {
		    		this.$message.error('用户ID不能为空！请先选择用户！');
		    		return
		    	}
		    	if (type == 1) { //资质认证
		    		this.diplomaTool.name = '资质认证'
		    		this.diplomaTool.card = '资质编号'
		    		this.diplomaTool.pic = '资质照片'

		    		this.diplomaType = 4 //上传图片时候使用
		    	} else if (type == 2) { //权威职称
		    		this.diplomaTool.name = '权威职称'
		    		this.diplomaTool.card = '权威编号'
		    		this.diplomaTool.pic = '权威资质图片'

		    		this.diplomaType = 5 //上传图片时候使用
		    	}
		    	this.diplomaForm = {
		    		name: '',
		    		card: '',
		    		pic: ''
		    	} //清空
		    	this.diplomaVisible = true
		    },
		    submitDiploma(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.submitLoading = true
		          	let uploadInfo = {
		          		materialType: 0,
		          		userId: this.userInfo.userId,
		          		materialNumber: this.diplomaForm.card,
		          		materialUrl: this.diplomaForm.pic,
		          		represent: this.diplomaForm.name
		          	}
		          	this.$axios({
		          		method: 'post',
		          		url: '/system/merchant/material/save',
		          		data: this.$qs.stringify(uploadInfo)
		          	}).then(res => {
		          		this.diplomaVisible = false
		          		this.submitLoading = false
		          		let result = res.data
		          		if (result.code == 200) {
		          			this.aptitudeList.push({
		          				diplomaId: result.data,
		          				materialNumber: this.diplomaForm.card,
		          				materialUrl: this.diplomaForm.pic,
		          				represent: this.diplomaForm.name
		          			})
		          		} else {
		          			this.$message.error(result.msg);
		          		}
		          	}).catch(err => {
		          		console.log(err)
		          	})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    // 证书上传
		    diplomaRequest(file) {
		    	this.uploadImg(file, this.diplomaType)
		    },
		    // 受训背景
		    openTrain() { //打开受训背景弹窗
		    	if (this.userInfo.userId == '') {
		    		this.$message.error('用户ID不能为空！请先选择用户！');
		    		return
		    	}
		    	this.trainForm = {
		    		time: '',
		    		trainCont: '',
		    		pic: ''
		    	}
		    	this.trainVisible = true
		    },
		    submitTrain(formName) {
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.submitLoading = true
		          	let uploadInfo = {
		          		userId: this.userInfo.userId,
		          		startDate: this.trainForm.time[0],
		          		endDate: this.trainForm.time[1],
		          		content: this.trainForm.trainCont,
		          		educationPictureUrl: this.trainForm.pic
		          	}
		          	this.$axios({
		          		method: 'post',
		          		url: '/system/merchant/education/save',
		          		data: this.$qs.stringify(uploadInfo)
		          	}).then(res => {
		          		this.trainVisible = false
		          		this.submitLoading = false
		          		let result = res.data
		          		if (result.code == 200) {
		          			this.trainList.push({
		          				trainId: result.data,
		          				startDate: this.trainForm.time[0],
		          				endDate: this.trainForm.time[1],
		          				content: this.trainForm.trainCont,
		          				educationPictureUrl: this.trainForm.pic
		          			})
		          		} else {
		          			this.$message.error(result.msg);
		          		}
		          	}).catch(err => {
		          		console.log(err)
		          	})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    trainRequest(file) { //培训证书上传
		    	this.uploadImg(file, 6)
		    },
		    // 提交审核
		    submitAuditing() {
		    	this.mentorForm.userId = this.userInfo.userId
		    	if (this.mentorForm.userId == '') {
		    		this.$message.error('用户ID不能为空！请先选择用户！');
		    		return
		    	}
		    	if (this.mentorForm.realName == '' || this.mentorForm.materialNumberl == '') {
		    		this.$message.error('真是姓名或证件号码不能为空!');
		    		return
		    	}
		    	let uploadObj = JSON.parse(JSON.stringify(this.mentorForm))
		    	uploadObj.areasOfExpertise = uploadObj.areasOfExpertise.join(',')
		    	uploadObj.consultingStyle = uploadObj.consultingStyle.join(',')
		    	this.loading = true
		    	this.$axios({
					method: 'post',
					url: this.uploadUrl,
					data: this.$qs.stringify(uploadObj)
				}).then(res => {
					this.loading = false
					let result = res.data
					console.log(result)
					if (result.code == 200) {
						this.$message({
				         	message: '操作成功！',
				          	type: 'success'
				        });
						this.$router.replace({
							path: '/mentor/list'
						})
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
		    },
		},
		components: {
			ChooseUser
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
	.box-card {
		& p {
			padding: 10px 0;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #303030;
		}
	}
	
	.add-pic-box {
		float: left;
		margin-right: 30px;
		& p {
			text-align: center;
		}
	}
	.avatar-uploader .el-upload {
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
  	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 250px;
	    height: 160px;
	    line-height: 160px;
	    text-align: center;
	    border: 1px dashed #d9d9d9;
	    &:hover {
	    	border-color: #409EFF;
	    }
  	}
  	.avatar {
  		width: 250px;
	    display: block;
  	}
	
	.head-icon,
  	.head-pic {
  		width: 250px;
  		height: 250px;
  		line-height: 250px;
  	}
</style>