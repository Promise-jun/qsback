<template>
	<div class="children-view user-detail" v-loading="loading">
		<el-row>
		  	<el-col :span="24" class="title">订单详情</el-col>
		</el-row>

		<el-row class="basic-info" :gutter="20">
		  	<el-col :span="14">
				<el-card class="box-card" style="margin-bottom: 24px;">
				  	<div slot="header" style="overflow: hidden;">
				    	<p style="float: left;">
				  			<label>订单号：</label>
				  			<span>zxz20181111002202</span>
				  		</p>
				  		<p style="float: right;">
				  			<label>订单总价：</label>
				  			<span><i class="color">600</i>元</span>
				  		</p>
				  	</div>
					<el-row class="order-info">
						<el-col :span="8">
							<p>
					  			<label>用户名：</label>
					  			<span>背着吉他的蝙蝠女侠</span>
					  		</p>
					  		<p>
					  			<label>咨询师：</label>
					  			<span>周晓晓</span>
					  		</p>
					  		<p>
					  			<label>订单类型：</label>
					  			<span>苹果订单</span>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>用户ID：</label>
					  			<span>20391030133</span>
					  		</p>
					  		<p>
					  			<label>服务方式：</label>
					  			<span>通话</span>
					  		</p>
					  		<p>
					  			<label>服务单价：</label>
					  			<span>20.00元/分钟</span>
					  		</p>
						</el-col>
						<el-col :span="8">
							<p>
					  			<label>服务名称：</label>
					  			<span>一周语音咨询</span>
					  		</p>
					  		<p>
					  			<label>服务类型：</label>
					  			<span>家庭矛盾</span>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
				
				<el-card class="box-card">
					<el-row>
						<el-col :span="3">
							<p>
					  			<label>订单服务：</label>
					  		</p>
						</el-col>
						<el-col :span="7">
							<p>
					  			<label>共需：</label>
					  			<span><i class="color">1次（60分钟）</i></span>
					  		</p>
						</el-col>
						<el-col :span="7">
							<p>
					  			<label>已服务：</label>
					  			<span><i class="color">0次（0分钟）</i></span>
					  		</p>
						</el-col>
						<el-col :span="7">
							<p>
					  			<label>还需：</label>
					  			<span><i class="color">1次（60分钟）</i></span>
					  		</p>
						</el-col>
					</el-row>
				</el-card>
		  	</el-col>

		  	<el-col :span="10">
			  	<el-card class="box-card">
				  	<div slot="header" style="overflow: hidden;">
				    	<p>
				  			<label>订单状态：</label>
				  			<span style="color: #409EFF;">待服务</span>
				  		</p>
				  	</div>
				  	<el-row class="order-info">
						<el-col :span="12">
							<p>
					  			<label>创建时间：</label>
					  			<span>2018-11-19 10:29:49</span>
					  		</p>
					  		<p>
					  			<label>确认时间：</label>
					  			<span></span>
					  		</p>
					  		<p>
					  			<label>业务归属：</label>
					  			<span>杭州分公司</span>
					  		</p>
					  		<p>
					  			<label>协助客服：</label>
					  			<span>大熊猫</span>
					  		</p>
						</el-col>
						<el-col :span="12">
							<p>
					  			<label>预告时间：</label>
					  			<span>2018-11-08 10:29:49</span>
					  		</p>
					  		<p>
					  			<label>完成时间：</label>
					  			<span></span>
					  		</p>
					  		<p>
					  			<label>业务客服：</label>
					  			<span>小白兔</span>
					  			<el-tooltip content="编辑" placement="top">
					  				<i class="el-icon-edit edit"></i>
					  			</el-tooltip>
					  		</p>
						</el-col>
					</el-row>
					<div style="padding-top: 16px;">
						<el-button type="primary" size="small" @click="achieve">完成订单</el-button>
						<el-button type="danger" size="small" @click="refundVisible = true">订单退款</el-button>
					</div>
				</el-card>
		  	</el-col>
		</el-row>

		<!-- 退款记录 -->
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header">
				    	<span>退款记录</span>
				  	</div>
				  	<el-table
					    ref="tableList"
					    stripe
					    border
					    size="small"
					    :data="refundList"
					    tooltip-effect="dark"
					    style="width: 100%;">
					    <el-table-column prop="userId" label="退款请求号" align='center'></el-table-column>
					    <el-table-column label="退款金额" align='center'>
					    	<template slot-scope="scope">
					      		{{ scope.row.userName }}
					      	</template>
					    </el-table-column>
					    <el-table-column prop="userAge" label="退款状态" align='center'></el-table-column>
					    <el-table-column label="退款凭证" align='center'>
					    	<template slot-scope="scope">
								<span v-if="scope.row.userSex == 0">未知</span>
								<span v-else-if="scope.row.userSex == 1">男</span>
								<span v-else="scope.row.userSex == 2">女</span>
					    	</template>
					    </el-table-column>
					    <el-table-column prop="enterTime" label="退款时间" align='center'>
					    	<template slot-scope="scope">
					    		{{scope.row.createTm | dateformat}}
					    	</template>
					    </el-table-column>
					    <el-table-column prop="city" label="其他" align='center'></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>	

		<!-- 天猫订单 -->
		<tmall-order></tmall-order>

		<!-- 通话记录 -->
		<call-log></call-log>

		<!-- 来访自述 -->
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header">
				    	<span>来访者自述</span>
				  	</div>
				  	<div class="narrating">
				  		<p>
					  		<label>问题描述：</label>
					  		<span>大开发了三等奖发牢骚的房间里的设计费累死了打飞机了三等奖数量的房间里斯达康房间里收到了福建省电力附近收到了福建两省的房间里大开发了三等奖发牢骚的房间里的设计费累死了打飞机了三等奖数量的房间里斯达康房间里收到了福建省电力附近收到了福建两省的房间里 </span>
					  	</p>
					  	<p>
					  		<label>咨询目标：</label>
					  		<span>大开发了三等奖发牢骚的房间里的设计费累死了打飞机了三等奖数量的房间里斯达康房间里收到了福建省电力附近收到了福建两省的房间里大开发了三等奖发牢骚的房间里的设计费累死了打飞机了三等奖数量的房间里斯达康房间里收到了福建省电力附近收到了福建两省的房间里 </span>
					  	</p>
				  	</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 咨询记录 -->
		<search-record></search-record>

		<el-tabs type="border-card">
		  	<el-tab-pane label="客服记录">
		  		<p><el-button type="primary" icon="el-icon-circle-plus" size="small">添加反馈</el-button></p>
		  		<el-table
		  			v-loading="recordLoading"
			      	:data="recordData"
			      	stripe
			      	border
			      	style="width: 100%; margin-top: 15px;">
				    <el-table-column prop="date" label="记录人"></el-table-column>
				    <el-table-column prop="date" label="内容"></el-table-column>
				    <el-table-column prop="date" label="时间"></el-table-column>
			    </el-table>
		  	</el-tab-pane>
		  	<el-tab-pane label="操作日志" lazy>
		  		<el-table
		  			v-loading="logLoading"
			      	:data="logData"
			      	stripe
			      	border
			      	style="width: 100%;">
				    <el-table-column prop="date" label="日志"></el-table-column>
				    <el-table-column prop="date" label="时间"></el-table-column>
			    </el-table>
		  	</el-tab-pane>
		  	<el-tab-pane label="资金流水" lazy>
		  		<el-table
		  			v-loading="nullahLoading"
			      	:data="nullahData"
			      	stripe
			      	border
			      	style="width: 100%;">
				    <el-table-column prop="date" label="昵称"></el-table-column>
				    <el-table-column prop="date" label="资金类型"></el-table-column>
				    <el-table-column prop="date" label="金额"></el-table-column>
				    <el-table-column prop="date" label="账户余额"></el-table-column>
				    <el-table-column prop="date" label="时间"></el-table-column>
			    </el-table>
		  	</el-tab-pane>
		</el-tabs>

		<!-- 退款弹窗 -->
		<el-dialog 
			title="退款" 
			:visible.sync="refundVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false"
			:modal="false"
			width="60%"
		>
		  	<el-form :model="refundForm" status-icon :rules="rules" ref="refundForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="退款原因" prop="cause">
			    <el-select v-model="refundForm.cause" placeholder="请选择">
			      <el-option label="创建错误" value="1"></el-option>
			      <el-option label="没有收获" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="退款类型">
			    <el-select v-model="refundForm.type" placeholder="请选择">
			      <el-option label="暂无类型" value=""></el-option>
			      <el-option label="换老师" value="1"></el-option>
			      <el-option label="全额退款" value="2"></el-option>
			      <el-option label="部分退款" value="3"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="退款金额" prop="price">
			    <el-input v-model="refundForm.price" autocomplete="off" placeholder="请输入退款金额" style="width: 300px;"></el-input>
			    <span>（提示：最多<i class="color">200.00</i>元）</span>
			  </el-form-item>
			  <el-form-item label="退款说明" prop="explain">
			    <el-input type="textarea" :rows="3" placeholder="请输入退款说明" v-model="refundForm.explain" style="width: 500px;"></el-input>
			  </el-form-item>
			  <el-form-item label="退款凭证" prop="voucherList">
			    <ul class="pic-list">
			  		<li v-for="(item, index) in refundForm.voucherList" :key="index">
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
			    <el-button type="primary" @click="submitForm('refundForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="refundVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

		<big-pic :visible.sync="bigPicVisible" :picurl="bigPicUrl"></big-pic>
	</div>
</template>

<script type="text/javascript">
	import TmallOrder from 'components/consult-order/tmall-order' //天猫订单
	import CallLog from 'components/consult-order/call-log' //通话记录
	import SearchRecord from 'components/consult-order/search-record' //咨询记录
	import BigPic from 'base/big-pic/big-pic' //查看大图
	
	export default {
		name: 'orderDetail',
		data() {
			return {
				rules: {
					cause: [
						{ required: true, message: '退款原因不能为空' }
					],
					price: [
						{ required: true, message: '退款金额不能为空' }
					],
					explain: [
						{ required: true, message: '退款说明不能为空' }
					],
					voucherList: [
						{ required: true, message: '退款凭证不能为空' }
					]
				},
				loading: false,
				// 订单退款
				submitLoading: false,
				refundVisible: false,
				refundForm: {
					voucherList: [
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3197537752,2095789724&fm=27&gp=0.jpg',
						'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4093087131,2303503192&fm=27&gp=0.jpg'
					]
				},
				refundList: [],
				picLoading: false,
				bigPicVisible: false,
				bigPicUrl: '',
				// 客服记录
				recordLoading: false,
				recordData: [],
				// 操作日志
				logLoading: false,
				logData: [],
				// 资金流水
				nullahLoading: false,
				nullahData: []
			}
		},
		methods: {
			// 完成订单
			achieve() {
				this.$confirm('确定要完成该笔订单吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	
		        }).catch(() => {
		             
		        });
			},
			// 订单退款
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
		    // 选择退款凭证
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
				    			this.refundForm.voucherList.push(result.msg)
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
			// 移除退款凭证
			delPic(index) {
				this.refundForm.voucherList.splice(index, 1)
			}
		},
		components: {
			TmallOrder,
			CallLog,
			SearchRecord,
			BigPic
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
	.color {
		color: #F56C6C; 
		font-style: normal;
		font-size: 16px;
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

	// 来访自述
	.narrating {
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #303030;
		letter-spacing: 0.34px;
		& p {
			& label {
				color: #409EFF;
			}
			line-height: 20px;
			padding: 5px 0;
		}
	}
</style>