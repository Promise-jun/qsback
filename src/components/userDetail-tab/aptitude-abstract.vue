<template>
	<div v-loading="loading">
	  	<el-row :gutter="20" class="top-info">
		  	<el-col :span="12">
		  		<p>
		  			<label>所在城市：</label>
		  			<span>{{baseInfo.city}}</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="changeAddress"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>详细地址：</label>
		  			<span>{{baseInfo.address}}</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="detailedAddress"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>入驻时间：</label>
		  			<span>{{baseInfo.createTm | dateformat}}</span>
		  		</p>
		  		<p>
		  			<label>心理分类：</label>
		  			<el-tag 
		  				v-for="tag in classifyList" 
		  				v-if="baseInfo.mentalCategory && baseInfo.mentalCategory.indexOf(tag.dicId) != -1" 
		  				:key="tag.dicId"
		  				:disable-transitions="true">
					  	{{tag.dicName}}
					</el-tag>
					<el-button class="button-new-tag" size="small" @click="editTag(1)">编辑</el-button>
		  		</p>
		  		<p>
		  			<label>导师标签：</label>
		  		</p>
		  		<p>
		  			<label>个性化标签：</label>	
		  			<!-- <el-tag v-for="tag in individuationList" v-if="baseInfo.consultantSignature.indexOf(tag.dicId) != -1" :key="tag.dicId">
					  	{{tag.dicName}}
					</el-tag>
					<el-button class="button-new-tag" size="small" @click="editTag(2)">编辑</el-button> -->
		  		</p>
		  	</el-col>
		  	<el-col :span="12">
		  		<p>
		  			<label>出生日期：</label>
		  			<span>{{baseInfo.birthday | dateformat('YYYY-MM-DD')}}</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="setTime(1)"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>从业时间：</label>
		  			<span>{{baseInfo.workTm | dateformat('YYYY-MM-DD')}}</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="setTime(2)"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>个性签名：</label>
		  			<span>{{baseInfo.consultantSignature}}</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="motto"></i>
		  			</el-tooltip>
		  		</p>
		  	</el-col>
	  	</el-row>
		
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>资质列表</span>
		  	</div>
			<el-table
			    ref="tableData"
			    stripe
			    border
			    v-loading="aptitudeLoading"
			    :data="aptitudeList"
			    tooltip-effect="dark"
			    style="width: 100%;">
			    <el-table-column prop="represent" label="资质认证"></el-table-column>
			    <el-table-column prop="materialNumber" label="资质编号"></el-table-column>
			    <el-table-column label="资质图片">
			      <template slot-scope="scope">
			      	<img :src="scope.row.materialUrl" class="pic" @click="showBigPic(scope.row.materialUrl)">
			      </template>
			    </el-table-column>
			    <el-table-column label="操作">
			      <template slot-scope="scope">
			    		<el-tooltip content="编辑" placement="top">
						  <el-button @click="editAptitude(scope.row, scope.$index)" type="text" icon="iconfont icon-edit"></el-button>
						</el-tooltip>
			    		<el-tooltip content="删除" placement="top">
						  <el-button @click="delAptitude(scope.row, scope.$index)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
						</el-tooltip>
				  </template>
			    </el-table-column>
			</el-table>
		</el-card>

	  	<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>相册</span>
		  	</div>
		  	<ul class="pic-list">
		  		<li v-for="(item, index) in photoList" :key="item.photoId">
		  			<img :src="item.photoUrl">
		  			<span class="pic-mb">
		  				<span @click="showBigPic(item.photoUrl)"><i class="el-icon-zoom-in"></i></span>
		  				<span @click="delPhoto(item.photoId, index)"><i class="el-icon-delete"></i></span>
		  			</span>
		  		</li>
		  	</ul>
			<el-upload
				v-if="photoList.length < 8"
			  	list-type="picture-card"
			  	accept="image/jpeg, image/gif, image/png"
			  	action=""
			  	:show-file-list="false"
			  	:http-request="photoRequest">
			  		<i class="el-icon-plus"></i>
			</el-upload>
		</el-card>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>简介</span>
		    	<el-button style="float: right; padding: 3px 0" type="text" @click="abstractEdit">编辑</el-button>
		  	</div>
		  	<div class="show-edit-cont" v-html="abstractHtml"></div>
		</el-card>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>职业背景</span>
		    	<el-button style="float: right; padding: 3px 0" type="text" @click="vocationEdit">编辑</el-button>
		  	</div>
		  	<div class="show-edit-cont" v-html="vocationHtml"></div>
		</el-card>

		<!-- <el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>自动回复</span>
		    	<el-button style="float: right; padding: 3px 0" type="text" @click="replyEdit">编辑</el-button>
		  	</div>
		  	<div class="show-edit-cont" v-html="replyHtml" style="height: 100px;"></div>
		</el-card> -->

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>合同信息</span>
		  	</div>
		  	<ul class="pic-list">
		  		<li v-for="(item, index) in pactList" :key="item.materialId">
		  			<img :src="item.materialUrl">
		  			<span class="pic-mb">
		  				<span @click="showBigPic(item.materialUrl)"><i class="el-icon-zoom-in"></i></span>
		  				<span @click="delPic(item.materialId, index)"><i class="el-icon-delete"></i></span>
		  			</span>
		  		</li>
		  	</ul>
			<el-upload
			  	list-type="picture-card"
			  	accept="image/jpeg, image/gif, image/png"
			  	action=""
			  	v-loading="picLoading"
			  	:show-file-list="false"
			  	:http-request="pactRequest">
			  	<i class="el-icon-plus"></i>
			</el-upload>
		</el-card>
		
		<!-- 改变地址 -->
	  	<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="addressVisible"
		  	width="40%">
		  	{{dialogToolTitle}}：
		  	<el-cascader
			  	:options="addressList"
			  	@active-item-change="handleItemChange"
			  	:props="props"
			></el-cascader>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="addressVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitAddress">确 定</el-button>
		  	</span>
		</el-dialog>

		<!-- 改变时间 -->
	  	<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="timeVisible"
		  	width="40%">
		  	{{dialogToolTitle}}：
		  	<el-date-picker
		      	v-model="timeForm.value"
		      	type="date"
		      	value-format="yyyy-MM-dd"
		      	placeholder="选择日期">
		    </el-date-picker>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="timeVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitTime" :loading="submitLoading">确 定</el-button>
		  	</span>
		</el-dialog>

		<!-- 标签操作 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="tagVisible"
		  	width="50%">
		  	{{tagForm.title}}
			<el-select v-model="tagForm.tag" placeholder="请选择">
			    <el-option
			      	v-for="item in tagList"
			      	:key="item.dicId"
			      	:label="item.dicName"
			      	:value="item.dicId">
			    </el-option>
			</el-select>
			<el-button type="success" icon="el-icon-check" circle title="添加" size="small" style="margin-left: 10px;" @click="tagAdd"></el-button>
			<div v-if="tagForm.checkList.length" style="margin-top: 15px;">
				<el-tag 
					type="info" 
					v-for="(item, index) in tagForm.checkList" 
					:key="item.dicId"
					closable
  					:disable-transitions="false"
					@close="tagClose(item, index)">
						{{item.dicName}}
					</el-tag>
			</div>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="tagVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitTag" :loading="submitLoading">确 定</el-button>
		  	</div>
		</el-dialog>
		
		<!-- 资质弹窗 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="aptitudeVisible"
		  	width="50%">
		  	<el-form :model="aptitudeForm" status-icon :rules="rules" ref="aptitudeForm" label-width="100px" class="demo-ruleForm">
			  	<el-form-item label="资质认证" prop="zzName">
			    	<el-select v-model="aptitudeForm.zzName" placeholder="请选择">
					    <el-option
					      	v-for="item in nameList"
					      	:key="item.dicId"
					      	:label="item.dicName"
					      	:value="item.dicName">
					    </el-option>
					</el-select>
			  	</el-form-item>
			  	<el-form-item label="资质编号" prop="zzId">
			    	<el-input v-model="aptitudeForm.zzId" autocomplete="off"></el-input>
			  	</el-form-item>
			  	<el-form-item label="资质证书" prop="zzPicUrl">
					<el-upload
					  	class="avatar-uploader"
					  	accept="image/jpeg, image/gif, image/png"
					  	action=""
					  	v-loading="picLoading"
					  	:show-file-list="false"
					  	:http-request="aptitudeRequest">
					  	<img v-if="aptitudeForm.zzPicUrl" :src="aptitudeForm.zzPicUrl" class="avatar">
					  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
			  	</el-form-item>
			  	<el-form-item>
			    	<el-button type="primary" @click="submitAptitude('aptitudeForm')" :loading="submitLoading">提交</el-button>
			    	<el-button @click="aptitudeVisible = false">取消</el-button>
			  	</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 图片裁剪 -->
		<cut-out-pic :picDialogVisible.sync="picDialogVisible" :picLoading="photoLoading" :picOption="picOption" @upload="uploadImg"></cut-out-pic>
	
		<!-- 富文本编辑器 -->
		<el-dialog
		  	title="内容编辑"
		  	:visible.sync="editorDialogVisible"
		  	:modal="false"
		  	width="70%"
		>	
			<div>
				<editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></editor>
			</div>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="editorDialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="confirmEditor">确 定</el-button>
		  	</span>
		</el-dialog>

		<big-pic :visible.sync="bigPicVisible" :picurl="bigPicUrl"></big-pic>
	</div>
</template>

<script type="text/javascript">
	import CutOutPic from 'base/cutOut-pic/cutOut-pic' //图片裁剪
	import BigPic from 'base/big-pic/big-pic' //查看大图
	// 富文本编辑器
	import tinymce from 'tinymce/tinymce'
	import 'tinymce/themes/modern/theme'
	import 'tinymce/plugins/image'
	import 'tinymce/plugins/link'
	import 'tinymce/plugins/media'
	import 'tinymce/plugins/code'
	import 'tinymce/plugins/table'
	import 'tinymce/plugins/lists'
	import 'tinymce/plugins/contextmenu'
	import 'tinymce/plugins/wordcount'
	import 'tinymce/plugins/colorpicker'
	import 'tinymce/plugins/textcolor'
	import Editor from '@tinymce/tinymce-vue'
	 
	
	export default {
		name: "aptitudeAbstract",
		props: {
			userId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				rules: {
					zzName: [
						{ required: true, message: '资质认证不能为空'}
					],
					zzId: [
						{ required: true, message: '资质编号不能为空'}
					],
					zzPicUrl: [
						{ required: true, message: '资质证书不能为空'}
					]
				},
				baseInfo: {}, //资质简介基本信息
				loading: false,
				dialogToolTitle: '',
				bigPicVisible: false,
				bigPicUrl: '',
				submitLoading: false, 
				//选择地址
				addressVisible: false,
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
        		//选择时间
        		timeVisible: false,
        		timeForm: {
        			type: null //区分时间类型
        		},

        		// 标签弹窗
        		tagVisible: false,
        		tagForm: {
        			title: '',
        			tag: '',
        			checkList: []
        		},
        		tagList: [],
        		//心理分类
        		classifyList: [],
        		//导师标签
        		labelList: [],
        		//个性化标签
        		individuationList: [],

        		//资质列表
        		picLoading: false,
        		aptitudeLoading: false,
        		aptitudeList: [],
        		aptitudeVisible: false,
        		aptitudeForm: {},
        		nameList: [], //资质列表
        		currentIndex: null,

        		// 相册
        		photoLoading: false,
        		photoList: [],
        		picDialogVisible: false, //图片裁剪弹窗
				picOption: {  //图片裁剪配置
					img: '../../assets/a.jpg',
					info: true,
					outputSize: 1,
					outputType: "png",
					canScale: true,
					autoCrop: true,
					autoCropWidth: 250,
        			autoCropHeight: 250,
        			fixed: true,
        			infoTrue: true,
        			fixedNumber: [1, 1],
        			centerBox: true
				},
				fileType: '',

				//简介内容
				abstractHtml: '',
				//职业背景
				vocationHtml: '',
				//富文本编辑器
				editorDialogVisible: false,
				tinymceType: 1,
				tinymceHtml: '',
				editorInit: {
				  	language_url: '/static/zh_CN.js',
				  	language: 'zh_CN',
				  	skin_url: '/static/skins/lightgray',
				  	height: 300,
				  	plugins: 'image link media lists code table colorpicker textcolor wordcount contextmenu',
				  	toolbar: 
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          			branding: false,
				  	images_upload_handler: (blobInfo, success, failure) => {
				  		this.handleImgUpload(blobInfo, success, failure)
				  	}
				},
				replyHtml: '', //自动回复
				// 合同信息
				pactList: []
			}
		},
		created() {
			this.getOption(42)
			this.getOption(16)
			this.getOption(11)
			// 获取资质简介
			this.getInfo()
			// 获取资质列表
			this.getAptitude()
			// 获取相册
			this.getPhoto()
			// 获取合同信息
			this.getPact()
		},
		mounted() {
			tinymce.init({})
		},
		methods: {
			// 获取选项
			getOption(type) {
				this.$axios({
					method: 'post',
					url: '/sys/dic/queryForList',
					data: this.$qs.stringify({
						dicPid: type,
						thisPage: 1,
						limit: 50
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						if (type == 42) { //权威职称
							this.nameList = result.data.list
						} else if (type == 16) { //心理分类
							this.classifyList = result.data.list
						} else if (type == 11) { //个性化标签
							this.individuationList = result.data.list
						}
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 资质简介
			getInfo() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/findAptitudeIntroduce',
					data: this.$qs.stringify({
						consultantId: this.$route.query.consultantId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					console.log(result)
					if (result.code == 200) {
						if (result.data) {
							this.baseInfo = result.data
							if (result.data.personalProfileUrl != '') { //简介
								this.getEditorCont(result.data.personalProfileUrl, 1)
							}
							if (result.data.workExperienceUrl != '') { //职业背景
								this.getEditorCont(result.data.workExperienceUrl, 2)
							}
						}
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取简介和职业背景
			getEditorCont(txtUrl, type) {
				this.$axios({
					method: 'post',
					url: '/system/consultant/aptitude/getTxtContent',
					data: this.$qs.stringify({
						url: txtUrl
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						if (type == 1) {
							this.abstractHtml = result.msg
						} else if (type == 2) {
							this.vocationHtml = result.msg
						}
					} else {
						this.$message.error(result.msg)
						console.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 改变地址
			changeAddress() {
				this.dialogToolTitle = '选择城市：'
				this.addressVisible = true
			},
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
		    submitAddress() {
		    	this.addressVisible = false
		    },
		    // 详细地址
		    detailedAddress() {
		    	this.$prompt('输入详细地址', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('详细地址不能为空');
		        		return
		        	}
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/consultant/aptitude/edit',
		        		data: this.$qs.stringify({
		        			consultantAptitudeId: this.baseInfo.consultantAptitudeId,
		        			address: value
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.baseInfo.address = value
		        			this.$message({
		        				type: 'success',
		        				message: '详细地址修改成功'
		        			})
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		console.log(err)
		        	})
		        }).catch(() => {
		          	 
		        });
		    },
		    // 个性签名
		    motto() {
		    	this.$prompt('输入个性签名', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('个性签名不能为空');
		        		return
		        	}
		          	this.$axios({
		          		method: 'post',
		          		url: '/system/consultant/edit',
		          		data: this.$qs.stringify({
		          			consultantId: this.$route.query.consultantId,
		          			consultantSignature: value
		          		})
		          	}).then(res => {
		          		let result = res.data
		          		if (result.code == 200) {
		          			this.baseInfo.consultantSignature = value
		          			this.$message({
		          				type: 'success',
		          				message: '个性签名修改成功'
		          			})
		          		} else {
		          			this.$message.error(result.msg)
		          		}
		          	}).catch(err => {
		          		console.log(err)
		          	})
		        }).catch(() => {
		          	 
		        });
		    },
		    // 设置日期
		    setTime(type) {
		    	if (type == 1) {
		    		this.dialogToolTitle = '出生日期'
		    	} else if (type == 2) {
		    		this.dialogToolTitle = '从业时间'
		    	} else {
		    		this.dialogToolTitle = ''
		    	}
		    	this.timeForm.type = type
		    	this.timeVisible = true
		    },
		    submitTime() {
		    	let uploadInfo
		    	this.submitLoading = true
		    	if (this.timeForm.type == 1) { //出生日期
		    		uploadInfo = {
						consultantAptitudeId: this.baseInfo.consultantAptitudeId,
						birthday: this.timeForm.value
					}
					this.$axios({
			    		method: 'post',
			    		url: '/system/consultant/aptitude/edit',
			    		data: this.$qs.stringify(uploadInfo)
			    	}).then(res => {
			    		this.timeVisible = false
			    		this.submitLoading = false
			    		let result = res.data
			    		if (result.code == 200) {
			    			this.baseInfo.birthday = this.timeForm.value
			    			this.$message({
			    				type: 'success',
			    				message: '生日修改成功'
			    			})
			    		} else {
			    			this.$message.error(result.msg)
			    		}
			    	}).catch(err => {
			    		console.log(err)
			    	})
		    	}
		    	if (this.timeForm.type == 2) { //从业时间
					uploadInfo = {
						consultantId: this.$route.query.consultantId,
						workTm: this.timeForm.value
					}
					this.$axios({
			    		method: 'post',
			    		url: '/system/consultant/edit',
			    		data: this.$qs.stringify(uploadInfo)
			    	}).then(res => {
			    		this.timeVisible = false
			    		this.submitLoading = false
			    		let result = res.data
			    		if (result.code == 200) {
			    			this.baseInfo.workTm = this.timeForm.value
			    			this.$message({
			    				type: 'success',
			    				message: '从业时间修改成功'
			    			})
			    		} else {
			    			this.$message.error(result.msg)
			    		}
			    	}).catch(err => {
			    		console.log(err)
			    	})
		    	}  
		    },

		    // 标签操作
		    editTag(type) {
		    	this.tagForm.checkList = []
		    	if (type == 1) { //心理分类
		    		this.tagForm.title = '添加心理分类标签：'
		    		this.tagList = this.classifyList
		    		this.tagList.forEach((item, idex) => {
		    			if (this.baseInfo.mentalCategory.indexOf(item.dicId) != -1) {
		    				this.tagForm.checkList.push(item)
		    			}
		    		})
		    	}
		    	this.tagVisible = true
		    },
		    // 添加标签
		    tagAdd() {
		    	if (this.tagForm.tag == '') {
		    		this.$message.error('请先选择标签')
		    		return 
		    	}
		    	if (this.findArrIndex(this.tagForm.tag, this.tagForm.checkList) != -1) {
		    		this.$message.error('不要重复选择相同标签')
		    		return 
		    	}
		    	let index = this.findArrIndex(this.tagForm.tag, this.tagList)
		    	this.tagForm.checkList.push( this.tagList[index])
		    },
		    // 删除标签
		    tagClose(item, index) {
		    	this.tagForm.checkList.splice(index, 1)
		    },
		    // 查找数组索引
		    findArrIndex(val, arr) {
		    	return arr.findIndex((value, index, arr) => {
				  	return value.dicId == val
				})
		    },
		    // 提交标签
		    submitTag() {
		    	let uploadInfo = []
		    	this.tagForm.checkList.forEach((item, index) => {
		    		uploadInfo.push(item.dicId)
		    	})
		    	this.submitLoading = true
		    	this.$axios({
		    		method: 'post',
		    		url: '/system/consultant/edit',
		    		data: this.$qs.stringify({
		    			consultantId: this.$route.query.consultantId,
		    			mentalCategory: uploadInfo.join(',')
		    		})
		    	}).then(res => {
		    		this.tagVisible = false
		    		this.submitLoading = false
		    		let result = res.data
		    		if (result.code == 200) {
		    			this.baseInfo.mentalCategory = uploadInfo.join(',')
		    			this.$message({
		    				type: 'success',
		    				message: '标签操作成功'
		    			})
		    		} else {
		    			this.$message.error(result.msg)
		    		}
		    	}).catch(err => {
		    		console.log(err)
		    	})
		    },
      		
      		// 资质证书
      		// 获取资质列表
		    getAptitude() {
		    	if (this.userId != '') {
		    		this.$axios({
		    			method: 'post',
		    			url: '/system/merchant/material/findByUserId',
		    			data: this.$qs.stringify({
		    				userId: this.userId,
		    				materialType: 0
		    			})
		    		}).then(res => {
		    			let result = res.data
		    			if (result.code == 200) {
		    				this.aptitudeList = result.data
		    			} else {
		    				this.$message.error(result.msg);
		    			}
		    		}).catch(err => {
		    			console.log(err)
		    		})
		    	}
		    },
		    // 删除资质
		    delAptitude(row, index) {
		    	this.$confirm('确定要删除吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/merchant/material/delete',
		        		data: this.$qs.stringify({
		        			materialId: row.materialId
		        		})
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.aptitudeList.splice(index, 1)
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
		    // 编辑资质
      		editAptitude(row, index) {
      			this.currentIndex = index
		    	this.aptitudeForm = {
		    		id: row.materialId,
		    		zzName: row.represent,
		    		zzId: row.materialNumber,
		    		zzPicUrl: row.materialUrl
		    	}
		    	this.aptitudeVisible = true
      		},
      		submitAptitude(formName) {
				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		          		this.submitLoading = true
		          		let uploadInfo = {
			          		materialType: 0,
			          		userId: this.userId,
			          		materialId: this.aptitudeForm.id,
			          		materialNumber: this.aptitudeForm.zzId,
			          		materialUrl: this.aptitudeForm.zzPicUrl,
			          		represent: this.aptitudeForm.zzName
			          	}
			          	this.$axios({
			          		method: 'post',
			          		url: '/system/merchant/material/edit',
			          		data: this.$qs.stringify(uploadInfo)
			          	}).then(res => {
			          		this.aptitudeVisible = false
			          		this.submitLoading = false
			          		let result = res.data
			          		if (result.code == 200) {
			          			this.aptitudeList.splice(this.currentIndex, 1, {
			          				materialId: this.aptitudeForm.id,
			          				materialNumber: this.aptitudeForm.zzId,
			          				materialUrl: this.aptitudeForm.zzPicUrl,
			          				represent: this.aptitudeForm.zzName
			          			})
			          			this.$message({
			          				type: 'success',
			          				message: '编辑资质成功'
			          			})
			          		} else {
			          			this.$message.error(result.msg);
			          		}
			          	}).catch(err => {
			          		console.log(err)
			          	})
		            	// this.submitLoading = true
		          		this.aptitudeVisible = false
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
			},
			// 资质证书上传
		    aptitudeRequest(file) {
		    	this.uploadPic(file, 1)
		    },
		    uploadPic(options, type) {
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
				    	this.picLoading = true
				    	let base64Str = e.target.result.split(',')[1]
				    	this.$axios({
				    		method: 'post',
				    		url: '/system/consultant/apply/savePicture',
				    		data: this.$qs.stringify({
				    			image: base64Str,
				    			fileType: file.type.split('/')[1]
				    		})
				    	}).then(res => {
				    		this.picLoading = false
				    		let result = res.data
				    		if (result.code == 200) {
				    			if (type == 1) { //资质证书
				    				this.aptitudeForm.zzPicUrl = result.msg
				    			} else if (type == 2) { //合同信息
				    				this.uploadPact(result.msg)
				    			}
				    		} else {
				    			this.$message.error(result.msg);
				    		}
				    	}).catch(err => {
				    		this.picLoading = false
				    		console.log(err)
				    	})
				    }
				}
		    },
      		// 查看大图
      		showBigPic(url) { 
	      		this.bigPicVisible = true
	      		this.bigPicUrl = url
	      	},

	      	//相册
   			// 获取相册列表
   			getPhoto() {
   				this.loading = true
   				this.$axios({
   					method: 'post',
   					url: '/system/user/photo/findByUserId',
   					data: this.$qs.stringify({
   						userId: this.userId
   					})
   				}).then(res => {
   					let result = res.data
   					if (result.code == 200) {
   						this.photoList = result.data
   					} else {
   						this.$message.error(result.msg)
   					}
   				}).catch(err => {
   					console.log(err)
   				})
   			},
	      	// 上传相册
	      	photoRequest(options) {
	      		this.picDialogVisible = true

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
			      	this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
			      	return
			    }
			    if (!isLt2M) {
			      	this.$message.error('上传图片大小不能超过 10MB!')
			      	return
			    }
			    this.fileType = file.type.split('/')[1]
			    var reader = new FileReader();
		    	reader.onload = e => {
			        let data;
					
			        if (typeof e.target.result === "object") {
			          // 把Array Buffer转化为blob 如果是base64不需要
			          data = window.URL.createObjectURL(new Blob([e.target.result]));
			        } else {
			          data = e.target.result;
			        }
			        this.picOption.img = data
			    };
			    reader.readAsArrayBuffer(file);
		    },
		    uploadImg(data) { //确定上传
		    	this.photoLoading = true
		    	this.$axios({
		    		method: 'post',
		    		url: '/system/user/photo/saveForUserPhotoAsync',
		    		data: this.$qs.stringify({
		    			base64Str: data.split(',')[1],
		    			fileType: this.fileType,
		    			userId: this.userId
		    		})
		    	}).then(res => {
		    		this.picDialogVisible = false
		    		this.photoLoading = false
		    		let result = res.data
		    		if (result.code == 200) {
		    			this.photoList.push({
		    				photoId: result.msg,
		    				photoUrl: data
		    			})
		    			this.$message({
				          	message: '相册上传成功！',
				          	type: 'success'
				        });
		    		} else {
		    			this.$message.error(result.msg);
		    		}
		    	}).catch(err => {
		    		this.$message.error(err);
		    	})
		    },
		    // 删除相册
		    delPhoto(pid, index) {
		    	this.$confirm('确定要删除该相册吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$axios({
			    		method: 'post',
			    		url: '/system/user/photo/deleteForUserPhoto',
			    		data: this.$qs.stringify({
			    			photoId: pid
			    		})
			    	}).then(res => {
			    		let result = res.data
			    		if (result.code == 200) {
			    			this.photoList.splice(index, 1)
			    			this.$message({
			    				type: 'success',
			    				message: '相册删除成功'
			    			})
			    		} else {
			    			this.$message.error(result.msg)
			    		}
			    	}).catch(err => {
			    		console.log(err)
			    	})
		        }).catch(() => {
		                
		        });
		    },
	      	
      		//富文本编辑器
      		handleImgUpload (blobInfo, success, failure) {
      			console.log(blobInfo.filename())
      			let fileType = blobInfo.filename().split('.')[1]
      			this.$axios({
      				method: 'post',
      				url: '/system/consultant/apply/savePicture',
      				data: this.$qs.stringify({
      					image: blobInfo.base64(),
      					fileType: fileType
      				})
      			}).then(res => {
      				let result = res.data
      				console.log(result)
      				if (result.code == 200) {
      					success(result.msg)
      				}
      			}).catch(err => {
      				failure('error')
      			})
      			// console.log(blobInfo.base64())
			  	/*let formdata = new FormData()
			  	formdata.set('upload_file', blobInfo.blob())
			  	axios.post('/api/upload', formdata).then(res => {
			    	success(res.data.data.src)
			  	}).catch(res => {
			    	failure('error')
			  	})*/
			},
			// 提交编辑
			confirmEditor() {
				let uploadInfo = {
					userId: this.userId,
					content: this.tinymceHtml,
					type: this.tinymceType
				}
				this.$axios({
					method: 'post',
					url: '/system/consultant/aptitude/editor',
					data: this.$qs.stringify(uploadInfo)
				}).then(res => {	
					let result = res.data
					if (result.code == 200) {
						if (this.tinymceType == 1) { //简介
							this.abstractHtml = this.tinymceHtml
						} else if (this.tinymceType == 2) { //职业背景
							this.vocationHtml = this.tinymceHtml
						}
						this.editorDialogVisible = false
					} else {
						this.$message.error(result.msg)
						console.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 简介编辑
			abstractEdit() {
				this.tinymceType = 1
				this.tinymceHtml = this.abstractHtml
				this.editorDialogVisible = true
			},
			// 职业背景编辑
			vocationEdit() {
				this.tinymceType = 2
				this.tinymceHtml = this.vocationHtml
				this.editorDialogVisible = true
			},
			// 自动回复
			replyEdit() {
				this.$prompt('输入自动回复内容', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('自动回复不能为空');
		        		return
		        	}
		        	this.replyHtml = value
		          	this.$message({
		           		type: 'success',
		            	message: '你的内容是: ' + value
		          	});
		        }).catch(() => {
		          	 
		        });
			},

			// 合同信息列表
			getPact() {
				this.$axios({
					method: 'post',
					url: '/system/merchant/material/findByUserId',
					data: this.$qs.stringify({
						userId: this.userId,
						materialType: 4
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.pactList = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 上传合同
			pactRequest(file) {
				this.uploadPic(file, 2)
			},
			// 提交合同
			uploadPact(urls) {
				this.$axios({
					method: 'post',
					url: '/system/merchant/material/save',
					data: this.$qs.stringify({
						materialType: 4,
						userId: this.userId,
						materialUrl: urls
					})
				}).then(res => {
					let result = res.data
					console.log(result)
					if (result.code == 200) {
						this.pactList.push({
							materialId: result.msg,
							materialUrl: urls
						})
						this.$message({
							type: 'success',
							message: '图片上传成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//删除合同信息
			delPic(picId, index) {
				this.$confirm('确定要删除该合同信息吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$axios({
						method: 'post',
						url: '/system/merchant/material/delete',
						data: this.$qs.stringify({
							materialId: picId
						})
					}).then(res => {
						let result = res.data
						if (result.code == 200) {
							this.pactList.splice(index, 1)
							this.$message({
								type: 'success',
								message: '合同删除成功'
							})
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
			CutOutPic,
			BigPic,
			Editor
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.top-info p {
		padding: 8px 0;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
	}
	.box-card {
		margin: 10px 0 20px;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}

	.el-tag + .el-tag {
    	margin-left: 10px;
  	}
  	.button-new-tag {
    	margin-left: 10px;
    	height: 32px;
    	line-height: 30px;
    	padding-top: 0;
    	padding-bottom: 0;
  	}
  	.input-new-tag {
    	width: 90px;
    	margin-left: 10px;
    	vertical-align: bottom;
  	}
  	.pic {
		width: 100px;
		cursor: pointer;
	}
	.big-pic {
		display: block;
		margin: 0 auto;
	}
	.avatar-uploader {
		width: 178px;
		height: 178px;
		border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    &:hover {
	    	border-color: #409EFF;
	    }
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	}
	.avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	}
	.pic-list {
		float: left;
		& li {
			float: left;
			width: 146px;
			height: 146px;
			line-height: 146px;
			margin: 0 8px 8px 0;
			border-radius: 6px;
			overflow: hidden;
			position: relative;
			& img {
				max-width: 100%;
				max-height: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			& .pic-mb {
				position: absolute;
			    width: 100%;
			    height: 100%;
			    left: 0;
			    top: 0;
			    cursor: default;
			    text-align: center;
			    color: #fff;
			    opacity: 0;
			    font-size: 20px;
			    background-color: rgba(0,0,0,.5);
			    -webkit-transition: opacity .3s;
			    transition: opacity .3s;
			    & span {
			    	cursor: pointer;
			    	&:last-child {
			    		margin-left: 10px;
			    	}
			    }
			}
		}
		& li:hover {
			& .pic-mb {
				opacity: 1;
			}
		}
	}
	.show-edit-cont {
		line-height: 1.5;
		height: 200px;
		overflow-y: auto;
	}
</style>