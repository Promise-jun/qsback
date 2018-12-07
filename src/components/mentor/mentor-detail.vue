<template>
	<div class="children-view user-detail">
		<el-row>
		  	<el-col :span="24" class="title">导师详情</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="16">
		  		<el-card>
		  			<el-row :gutter="20" class="module">
					  	<el-col :span="8">
					  		<div class="user-head">
					  			<img :src="imageUrl">
					  			<el-upload
					  				ref="upload"
								  	class="avatar-uploader change-pic"
								  	action="https://jsonplaceholder.typicode.com/posts/"
								  	:show-file-list="false"
								  	:before-upload="beforeAvatarUpload"
								>
								  	<i class="el-icon-edit edit"></i>更改
								</el-upload>
					  		</div>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>昵称：</label>
					  			<span>情说12039026</span>
					  		</p>
					  		<p>
					  			<label>用户名：</label>
					  			<span>1039203029</span>
					  		</p>
					  		<p>
					  			<label>用户ID：</label>
					  			<span>2019</span>
					  		</p>
					  		<p>
					  			<label>手机号：</label>
					  			<span>12949020391</span>
					  		</p>
					  		<p>
					  			<label>性别：</label>
					  			<span>-</span>
					  		</p>
					  	</el-col>
					  	<el-col :span="8">
					  		<p>
					  			<label>姓名：</label>
					  			<span>-</span>
					  		</p>
					  		<p>
					  			<label>身份证：</label>
					  			<span>330721199206022414</span>
					  		</p>
					  		<p>
					  			<label>身高：</label>
					  			<span>168cm</span>
					  		</p>
					  		<p>
					  			<label>类型：</label>
					  			<span>国家一级咨询师</span>
					  		</p>
					  		<p>
					  			<label>状态：</label>
					  			<span>忙碌</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				  	<el-row class="mentor-data">
				  		<el-col :span="6">
				  			<p class="label">粉丝</p>
				  			<p class="num">201</p>
				  		</el-col>
				  		<el-col :span="6">
				  			<p class="label">评分</p>
				  			<p class="num">5.0</p>
				  		</el-col>
				  		<el-col :span="6">
				  			<p class="label">30天咨询人数</p>
				  			<p class="num">302</p>
				  		</el-col>
				  		<el-col :span="6">
				  			<p class="label">30天获得钻石</p>
				  			<p class="num">540</p>
				  		</el-col>
				  	</el-row>
				</el-card>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-card>
				  	<div slot="header" class="clearfix">
					    <span>其他信息</span>
					</div>
					<el-row :gutter="10" class="module mentor-other-info">
					  	<el-col :span="12">
					  		<p class="user-grade">
					  			<label>导师等级：</label>
					  			<span>
					  				<i class="left">LV</i>
					  				<i class="right">99</i>
					  			</span>
					  		</p>
					  		<p>
					  			<label>单次价格：</label>
					  			<span>100元/次</span>
					  			<el-tooltip content="编辑" placement="top">
					  				<i class="el-icon-edit edit" @click="singlePrice"></i>
					  			</el-tooltip>
					  		</p>
					  	</el-col>
					  	<el-col :span="12">
					  		<p>
					  			<label>30天咨询时长：</label>
					  			<span>0小时</span>
					  		</p>
					  		<p>
					  			<label>30天直播时长：</label>
					  			<span>0小时</span>
					  		</p>
					  	</el-col>
				  	</el-row>
				  	<div class="btns">
				  		<p>语音介绍：</p>
				  		<audio class="mentor-audio" src="" controls=""></audio>
					    <p>
					    	<el-button type="primary" @click="audioDialogVisible = true">上传语音</el-button>
					    </p>
					</div>
				</el-card>
		  	</el-col>
		</el-row>

		<!-- 更多操作 -->
		<el-card class="mentor-more-operation">
			<div slot="header" class="clearfix">
			    <span>更多操作</span>
  			</div>
  			<el-row :gutter="20">
  				<el-col :span="6">
  					<p>
			  			<label>咨询服务：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeCounseling(1)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>音频识别：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeAudioDistinguish(2)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>成长杂志：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeMagazine(3)"></i>
			  			</el-tooltip>
			  		</p>
  				</el-col>
  				<el-col :span="6">
  					<p>
			  			<label>互动直播：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeLiveTelecast(4)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>新用户派单：</label>
			  			<span>关闭</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeDistribution(5)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>签约导师：</label>
			  			<span>关闭</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeSigning(6)"></i>
			  			</el-tooltip>
			  		</p>
  				</el-col>
  				<el-col :span="6">
  					<p>
			  			<label>服务派单：</label>
			  			<span>关闭</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeService(7)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>系统推荐：</label>
			  			<span>关闭</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeGroom(8)"></i>
			  			</el-tooltip>
			  		</p>
  				</el-col>
  				<el-col :span="6">
  					<p>
			  			<label>业务所属：</label>
			  			<span>--</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeBusiness(10)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>咨询列表：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeConsult(9)"></i>
			  			</el-tooltip>
			  		</p>
  				</el-col>
  			</el-row>
		</el-card>

		<el-tabs type="border-card">
		  	<el-tab-pane label="资金信息">
		  		<fund-info></fund-info>
		  	</el-tab-pane>
		  	<el-tab-pane label="服务时间" lazy>
		  		
		  	</el-tab-pane>
		  	<el-tab-pane label="服务定价" lazy>
		  		<service-pricing></service-pricing>
		  	</el-tab-pane>
		  	<el-tab-pane label="资质简介" lazy>
		  		<aptitude-abstract></aptitude-abstract>
		  	</el-tab-pane>
		  	<el-tab-pane label="操作日志" lazy>
		  		
		  	</el-tab-pane>
		</el-tabs>

		<!-- 图片裁剪 -->
		<cut-out-pic :picDialogVisible.sync="picDialogVisible" :picOption="picOption" @upload="uploadImg"></cut-out-pic>

		<!-- 音频上传 -->
		<el-dialog
		  	title="上传音频"
		  	:visible.sync="audioDialogVisible"
		  	:modal="false"
		  	center
		  	width="30%"
		>	
  			<!-- action必选参数, 上传的地址 -->
    		<el-upload 
    			class="avatar-uploader el-upload--text" 
    			:action="uploadUrl" 
    			:show-file-list="false" 
    			:on-success="handleAudioSuccess" 
    			:before-upload="beforeUploadAudio" 
    			:on-progress="uploadAudioProcess"
    		>
        		<audio v-if="audioForm.audio != '' && audioFlag == false" :src="audioForm.audio" class="avatar" controls="controls">
        			您的浏览器不支持音频播放
        		</audio>
        		<i v-else-if="audioForm.audio == '' && audioFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
        		<el-progress v-if="audioFlag == true" type="circle" :percentage="audioUploadPercent" style="margin-top:30px;"></el-progress>
    		</el-upload>
    		<P class="text">请保证音频格式正确，且不超过10M</P>
		</el-dialog>
		
		<!-- 更多操作公用弹窗 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="dialogVisible"
		  	width="30%">
		  	{{dialogToolTitle}}：
		  	<el-select v-model="operationObj.operationValue" placeholder="请选择">
			    <el-option label="开启" value="1"></el-option>
			    <el-option label="关闭" value="2"></el-option>
			</el-select>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="dialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitChange">确 定</el-button>
		  	</span>
		</el-dialog>

		<!-- 业务所属 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="businessVisible"
		  	width="30%">
		  	{{dialogToolTitle}}：
		  	<el-select v-model="businessObj.businessValue" placeholder="请选择">
			    <el-option label="武汉分公司" value="1"></el-option>
			    <el-option label="上海分公司" value="2"></el-option>
			</el-select>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="businessVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitBusiness">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import cutOutPic from 'base/cutOut-pic/cutOut-pic'
	import FundInfo from 'components/userDetail-tab/fund-info'
	import ServicePricing from 'components/userDetail-tab/service-pricing' //服务定价
	import AptitudeAbstract from 'components/userDetail-tab/aptitude-abstract' //资质简介

	export default {
		name: 'mentorDetail',
		data() {
			return {
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
				imageUrl: 'http://i10.hoopchina.com.cn/hupuapp/bbs/966/16313966/thread_16313966_20180726164538_s_65949_o_w1024_h1024_62044.jpg?x-oss-process=image/resize,w_800/format,jpg', //头像
				// 导师音频
				audioDialogVisible: false,
				audioForm: {
					audio: ''
				},
				audioFlag: false, //是否正在上传
				uploadUrl: 'https://jsonplaceholder.typicode.com/posts/', //上传地址
				audioUploadPercent: 0, //上传进度
				//更多操作公用弹窗
				dialogVisible: false,
				dialogToolTitle: '',
				operationObj: {
					operationId: 0,
					operationValue: '1'
				},
				//业务所属
				businessVisible: false,
				businessObj: {
					businessId: 0,
					businessValue: '1'
				}
			}
		},
		methods: {
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }

		        this.picDialogVisible = true
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

		        return isJPG && isLt2M;
		    },
		    uploadImg(data) {
		        // this.$refs.upload.submit();
		        this.picDialogVisible = false
		    },
		    singlePrice() {
		    	this.$prompt('单次价格（元/次）', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('单次价格不能为空');
		        		return
		        	}
		          	this.$message({
		           		type: 'success',
		            	message: '你的单次价格是: ' + value
		          	});
		        }).catch(() => {
		          	 
		        });
		    },

			beforeUploadAudio(file) { //音频上传前
			    const isLt10M = file.size / 1024 / 1024  < 10;
			    if (['audio/mp3'].indexOf(file.type) == -1) {
			        this.$message.error('请上传正确的音频格式');
			        return false;
			    }
			    if (!isLt10M) {
			        this.$message.error('上传音频大小不能超过10MB哦!');
			        return false;
			    }
			},
			uploadAudioProcess(event, file, fileList){ //音频上传中...
				console.log(file)
			    this.audioFlag = true;
			    this.audioUploadPercent = parseInt(file.percentage)
			},
			handleAudioSuccess(res, file) { //获取上传音频地址
			    this.audioFlag = false;
			    this.audioUploadPercent = 0;
			    if(res.status == 200){
			        this.audioForm.audioUploadId = res.data.uploadId;
			        this.audioForm.audio = res.data.uploadUrl;
			    }else{
			        this.$message.error('音频上传失败，请重新上传！');
			    }
			},

			// 更多操作
			changeCounseling(changeId) { //咨询服务
				this.dialogToolTitle = '选择咨询服务'
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeAudioDistinguish(changeId) { //音频识别
				this.dialogToolTitle = '选择音频识别'
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeMagazine(changeId) { //成长杂志
				this.dialogToolTitle = "选择成长杂志"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeLiveTelecast(changeId) { //互动直播
				this.dialogToolTitle = "选择互动直播"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeDistribution(changeId) { //新用户派单
				this.dialogToolTitle = "选择新用户派单"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeSigning(changeId) { //签约导师
				this.dialogToolTitle = "选择签约导师"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeService(changeId) { //服务派单
				this.dialogToolTitle = "选择服务派单"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeGroom(changeId) { //系统推荐
				this.dialogToolTitle = "选择系统推荐"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			changeConsult(changeId) { //咨询列表
				this.dialogToolTitle = "选择咨询列表"
				this.dialogVisible = true
				this.operationObj.operationId = changeId
			},
			submitChange() { //提交修改
				console.log(this.operationObj)
				this.dialogVisible = false
			},

			// 业务所属
			changeBusiness(changeId) {
				this.dialogToolTitle = "选择业务所属"
				this.businessVisible = true
				this.businessObj.businessId = changeId
			},
			submitBusiness() {
				console.log(this.businessObj)
				this.businessVisible = false
			}
		},
		components: {
			cutOutPic,
			FundInfo,
			ServicePricing,
			AptitudeAbstract
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
	.el-card {
		margin: 20px 0;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
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
	.text {
		margin-top: 15px;
	}
</style>