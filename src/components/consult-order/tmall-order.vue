<template>
	<div>
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header">
				    	<span>天猫订单</span>
				  	</div>
				  	<div>
						<el-table
						    ref="tableList"
						    stripe
						    border
						    size="small"
						    v-loading="tableLoading"
						    :data="tableList"
						    tooltip-effect="dark"
						    style="width: 100%;">
						    <el-table-column prop="userId" label="账户" align='center'></el-table-column>
						    <el-table-column label="单号" align='center'>
						    	<template slot-scope="scope">
						      		<router-link target="_blank" :to="{path:'/mentor/mentorDetail', query:{consultantId: scope.row.consultantId}}">{{ scope.row.userName }}</router-link>
						      	</template>
						    </el-table-column>
						    <el-table-column prop="userAge" label="验证人" align='center'></el-table-column>
						    <el-table-column label="验证图片" align='center'>
						    	<template slot-scope="scope">
									<span v-if="scope.row.userSex == 0">未知</span>
									<span v-else-if="scope.row.userSex == 1">男</span>
									<span v-else="scope.row.userSex == 2">女</span>
						    	</template>
						    </el-table-column>
						    <el-table-column prop="city" label="凭证网址" align='center'></el-table-column>
						    <el-table-column prop="userNickname" label="凭证码" align='center'></el-table-column>
						    <el-table-column prop="enterTime" label="验证状态" align='center'>
						    	<template slot-scope="scope">
						    		{{scope.row.createTm | dateformat}}
						    	</template>
						    </el-table-column>
						</el-table>
						<div class="other-operate">
							<label>评价内容：</label>
							<div class="content">
								<p class="text">领导是否建立第三方监理开始大举发力收到了福建省电力开发建立岁的第三轮</p>
							  	<div style="overflow: hidden;">
							  		<ul class="pic-list">
								  		<li v-for="(item, index) in appraiseForm.picList" :key="index" style="width: 100px; height: 100px;">
								  			<img :src="item" @click="showBigPic(item)" style="cursor: pointer;">
								  		</li>
								  	</ul>
							  	</div>
								<el-button type="primary" size="small" @click="appraiseVisible = true">添加评价</el-button>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 添加评价 -->
		<el-dialog 
			title="评价" 
			:visible.sync="appraiseVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false"
			:modal="false"
			width="60%"
		>
		  	<el-form :model="appraiseForm" status-icon :rules="rules" ref="appraiseForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="内容" prop="content">
			    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="appraiseForm.content" style="width: 500px;"></el-input>
			  </el-form-item>
			  <el-form-item label="图片">
			    <ul class="pic-list">
			  		<li v-for="(item, index) in appraiseForm.picList" :key="index">
			  			<img :src="item">
			  			<span class="pic-mb">
			  				<span @click="showBigPic(item)"><i class="el-icon-zoom-in"></i></span>
			  				<span @click="delPic(index)"><i class="el-icon-delete"></i></span>
			  			</span>
			  		</li>
			  	</ul>
				<el-upload
				  	list-type="picture-card"
				  	accept="image/jpeg, image/gif, image/png"
				  	action=""
				  	v-loading="picLoading"
				  	:show-file-list="false"
				  	:http-request="httpRequest">
				  	<i class="el-icon-plus"></i>
				</el-upload>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('appraiseForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="appraiseVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

		<big-pic :visible.sync="bigPicVisible" :picurl="bigPicUrl"></big-pic>
	</div>
</template>

<script type="text/javascript">
	import BigPic from 'base/big-pic/big-pic' //查看大图

	export default {
		name: 'tmallOrder',
		data() {
			return {
				rules: {
					content: [
						{ required: true, message: '内容不能为空' }
					]
				},
				tableLoading: false,
				tableList: [],
				appraiseVisible: false,
				appraiseForm: {
					picList: [
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
						'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4093087131,2303503192&fm=27&gp=0.jpg'
					]
				},
				picLoading: false,
				submitLoading: false,
				bigPicVisible: false,
				bigPicUrl: ''
			}
		},
		methods: {
			// 提交评价
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            // this.submitLoading = true
		          	
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    // 查看大图
      		showBigPic(url) { 
	      		this.bigPicVisible = true
	      		this.bigPicUrl = url
	      	},
		    // 选择图片
			httpRequest(options) {
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
				    			this.appraiseForm.picList.push(result.msg)
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
			// 移除图片
			delPic(index) {
				this.appraiseForm.picList.splice(index, 1)
			}
		},
		components: {
			BigPic
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.other-operate {
		padding: 15px 20px;
		border-left: 1px solid #ebeef5;
		border-right: 1px solid #ebeef5;
		border-bottom: 1px solid #ebeef5;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #303030;
		letter-spacing: 0.34px;
		& label {
			float: left;
			height: 32px;
			line-height: 32px;
		}
		& .content {
			margin-left: 80px;
		}
		& .text {
			padding: 6px 0 10px;
			line-height: 20px;
		}
	}

	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
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
</style>