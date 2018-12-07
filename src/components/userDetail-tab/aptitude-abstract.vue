<template>
	<div>
	  	<el-row :gutter="20">
		  	<el-col :span="12">
		  		<p>
		  			<label>所在城市：</label>
		  			<span>浙江省-杭州市</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="changeAddress"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>详细地址：</label>
		  			<span>--</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="detailedAddress"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>入驻时间：</label>
		  			<span>2018-09-04</span>
		  		</p>
		  		<p>
		  			<label>心理分类：</label>
		  			<el-tag
					  	:key="tag"
					  	v-for="tag in mindList"
					  	closable
					  	@close="mindClose(tag)">
					  	{{tag}}
					</el-tag>
					<el-input
					  	class="input-new-tag"
					  	v-if="mindInputVisible"
					  	v-model="mindInputValue"
					  	ref="mindTag"
					  	size="small"
					  	@keyup.enter.native="mindInputConfirm"
					  	@blur="mindInputConfirm"
					>
					</el-input>
					<el-button v-else class="button-new-tag" size="small" @click="mindShowInput">添加</el-button>
		  		</p>
		  		<p>
		  			<label>导师标签：</label>
		  			<el-tag
					  	:key="tag"
					  	v-for="tag in labelList"
					  	closable
					  	@close="labelClose(tag)">
					  	{{tag}}
					</el-tag>
					<el-input
					  	class="input-new-tag"
					  	v-if="labelInputVisible"
					  	v-model="labelInputValue"
					  	ref="labelTag"
					  	size="small"
					  	@keyup.enter.native="labelInputConfirm"
					  	@blur="labelInputConfirm"
					>
					</el-input>
					<el-button v-else class="button-new-tag" size="small" @click="labelShowInput">添加</el-button>
		  		</p>
		  		<p>
		  			<label>个性化标签：</label>	
		  			<el-tag
					  	:key="tag"
					  	v-for="tag in individuationList"
					  	closable
					  	@close="individuationClose(tag)">
					  	{{tag}}
					</el-tag>
					<el-input
					  	class="input-new-tag"
					  	v-if="individuationInputVisible"
					  	v-model="individuationInputValue"
					  	ref="individuationTag"
					  	size="small"
					  	@keyup.enter.native="individuationInputConfirm"
					  	@blur="individuationInputConfirm"
					>
					</el-input>
					<el-button v-else class="button-new-tag" size="small" @click="individuationShowInput">添加</el-button>
		  		</p>
		  	</el-col>
		  	<el-col :span="12">
		  		<p>
		  			<label>出生日期：</label>
		  			<span>2018-09-04</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="setTime(1)"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>从业时间：</label>
		  			<span>2018-09-04</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="setTime(2)"></i>
		  			</el-tooltip>
		  		</p>
		  		<p>
		  			<label>座右铭：</label>
		  			<span>--</span>
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
			    v-loading="loading"
			    :data="tableData"
			    style="width: 100%;">
			    <el-table-column prop="zzId" label="资质编号"></el-table-column>
			    <el-table-column prop="zzName" label="资质认证"></el-table-column>
			    <el-table-column label="资质证书">
			      	<template slot-scope="scope">
			      		<img :src="scope.row.zzPicUrl" class="pic" @click="showBigPic(scope.row.zzPicUrl)">
			      	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      	<template slot-scope="scope">
			    		<el-tooltip content="编辑" placement="top">
						  	<el-button @click="editAptitude(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
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
		  		<li>
		  			<img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=377934783,1794723300&fm=27&gp=0.jpg">
		  			<span class="pic-mb">
		  				<span><i class="el-icon-zoom-in"></i></span>
		  				<span><i class="el-icon-delete"></i></span>
		  			</span>
		  		</li>
		  	</ul>
			<el-upload
  				action="https://jsonplaceholder.typicode.com/posts/"
  				list-type="picture-card"
  				:on-preview="photoPreview"
  				:on-success="photoSuccess"
  				:on-remove="photoRemove">
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
		      	placeholder="选择日期">
		    </el-date-picker>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="timeVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitTime">确 定</el-button>
		  	</span>
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
					      	v-for="item in aptitudeList"
					      	:key="item.value"
					      	:label="item.label"
					      	:value="item.value">
					    </el-option>
					</el-select>
			  	</el-form-item>
			  	<el-form-item label="资质编号" prop="zzId">
			    	<el-input v-model="aptitudeForm.zzId" autocomplete="off"></el-input>
			  	</el-form-item>
			  	<el-form-item label="资质证书" prop="zzPicUrl">
			    	<el-upload
						ref="upload"
					  	class="avatar-uploader"
					  	action="https://jsonplaceholder.typicode.com/posts/"
					  	:show-file-list="false"
					  	:before-upload="beforeAptitudeUpload"
					>
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

		<el-dialog title="图片" :visible.sync="bigPicVisible" :center="true" :modal="false">
		  	<img :src="bigPicurl" class="big-pic">
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: "aptitudeAbstract",
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
				dialogToolTitle: '',
				bigPicVisible: false,
				bigPicurl: '',
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
        		timeForm: {},
        		//心理分类
        		mindList: ['标签一', '标签二', '标签三'],
        		mindInputVisible: false,
        		mindInputValue: '',
        		//导师标签
        		labelList: ['标签一', '标签二', '标签三'],
        		labelInputVisible: false,
        		labelInputValue: '',
        		//个性化标签
        		individuationList: ['标签一', '标签二', '标签三'],
        		individuationInputVisible: false,
        		individuationInputValue: '',
        		//资质列表
        		loading: false,
        		tableData: [{
        			zzId: 203929939001093901,
        			zzName: '国家二级心理咨询师',
        			zzPicUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg'
        		}],
        		aptitudeVisible: false,
        		aptitudeForm: {},
        		aptitudeList: [{
        			label: '国家二级心理咨询师',
        			value: 1
        		}, {
        			label: '国家三级心理咨询师',
        			value: 2
        		}], //资质列表
			}
		},
		methods: {
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
		          	this.$message({
		           		type: 'success',
		            	message: '你的内容是: ' + value
		          	});
		        }).catch(() => {
		          	 
		        });
		    },
		    // 座右铭
		    motto() {
		    	this.$prompt('输入座右铭', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('座右铭不能为空');
		        		return
		        	}
		          	this.$message({
		           		type: 'success',
		            	message: '你的内容是: ' + value
		          	});
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
		    	this.timeVisible = true
		    },
		    submitTime() {
		    	this.timeVisible = false
		    	console.log(this.timeForm.value)
		    },
		    // 心理分类
		    mindClose(tag) { //删除
        		this.mindList.splice(this.mindList.indexOf(tag), 1);
      		},
      		mindShowInput() {
        		this.mindInputVisible = true;
        		this.$nextTick(_ => {
          			this.$refs.mindTag.$refs.input.focus();
        		});
      		},
      		mindInputConfirm() {
        		let inputValue = this.mindInputValue;
        		if (inputValue) {
          			this.mindList.push(inputValue);
        		}
        		this.mindInputVisible = false;
        		this.mindInputValue = '';
      		},
      		// 导师标签
		    labelClose(tag) { //删除
        		this.labelList.splice(this.labelList.indexOf(tag), 1);
      		},
      		labelShowInput() {
        		this.labelInputVisible = true;
        		this.$nextTick(_ => {
          			this.$refs.labelTag.$refs.input.focus();
        		});
      		},
      		labelInputConfirm() {
        		let inputValue = this.labelInputValue;
        		if (inputValue) {
          			this.labelList.push(inputValue);
        		}
        		this.labelInputVisible = false;
        		this.labelInputValue = '';
      		},
      		// 个性化标签
		    individuationClose(tag) { //删除
        		this.individuationList.splice(this.individuationList.indexOf(tag), 1);
      		},
      		individuationShowInput() {
        		this.individuationInputVisible = true;
        		this.$nextTick(_ => {
          			this.$refs.individuationTag.$refs.input.focus();
        		});
      		},
      		individuationInputConfirm() {
        		let inputValue = this.individuationInputValue;
        		if (inputValue) {
          			this.individuationList.push(inputValue);
        		}
        		this.individuationInputVisible = false;
        		this.individuationInputValue = '';
      		},
      		// 资质证书
      		editAptitude(row) {
      			this.aptitudeForm.zzId = row.zzId
      			this.aptitudeForm.zzName = row.zzName
      			this.aptitudeForm.zzPicUrl = row.zzPicUrl
      			this.aptitudeVisible = true
      		},
      		submitAptitude(formName) {
				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	// this.submitLoading = true
		          		this.aptitudeVisible = false
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
			},
			beforeAptitudeUpload(file) { //图片上传前
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		    },
      		// 查看大图
      		showBigPic(url) { 
	      		this.bigPicVisible = true
	      		this.bigPicurl = url
	      	},
	      	//相册
	      	photoSuccess(file, fileList) {
				console.log(fileList)
			},
			photoRemove(file, fileList) {
        		console.log(file, fileList);
      		},
      		photoPreview(file) {
        		this.bigPicurl = file.url;
        		this.bigPicVisible = true;
      		},
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	p {
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
			text-align: center;
			margin: 0 8px 8px 0;
			border-radius: 6px;
			overflow: hidden;
			position: relative;
			& img {
				max-width: 100%;
				max-height: 100%;
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