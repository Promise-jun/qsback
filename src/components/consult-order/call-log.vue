<template>
	<div>
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header" style="overflow: hidden;">
				    	<span>通话记录</span>
				    	<div style="float: right;">
				    		<el-button size="small" @click="callVisible = true">查看全部4条记录</el-button>
	  						<el-button size="small" type="primary">创建电话链接</el-button>
				    	</div>
				  	</div>
				  	<el-row :gutter="20">
				  		<el-col :span="12">
				  			<p class="log-info">
					  			<label>第1条</label>
					  			<span style="padding: 0 15px;">50分钟</span>
					  			<span>2017-02-03 21:00 至 2017-02-03 21:00</span>
					  			<i class="iconfont icon-down log-icon" ref="logIcon" @click="isOpenInfo"></i>
					  		</p>
					      	<el-collapse-transition>
					        	<div v-show="show">
							        <p class="log-info">
							  			<label>第2条</label>
							  			<span style="padding: 0 15px;">50分钟</span>
							  			<span>2017-02-03 21:00 至 2017-02-03 21:00</span>
							  		</p>
					        	</div>
					      	</el-collapse-transition>
				  		</el-col>
				  		<el-col :span="12">
				  			<el-row class="call-info" :gutter="10">
				  				<el-col :span="8">
				  					<p>
							  			<label>电话通道：</label>
							  			<span>阿里云</span>
							  		</p>
							  		<p>
							  			<label>通话状态：</label>
							  			<span>服务中</span>
							  		</p>
				  				</el-col>
				  				<el-col :span="16">
				  					<p>
							  			<label>通话时间：</label>
							  			<span>00:00:01</span>
							  		</p>
							  		<p>
							  			<label>状态说明：</label>
							  			<span>第三方来决定联手开发建立三级分类大力开发第三方</span>
							  		</p>
				  				</el-col>
				  			</el-row>
				  		</el-col>
				  	</el-row>
				</el-card>
			</el-col>
		</el-row>

		<!-- 退款弹窗 -->
		<el-dialog 
			title="全部通话记录 " 
			:visible.sync="callVisible" 
			:modal="false"
			width="70%"
		>
			<el-row :gutter="20" class="call-box">
				<el-col :span="24">
					<el-card class="box-card" shadow="hover">
					  	<div slot="header" style="overflow: hidden;">
					    	<el-col :span="5">
					    		<p>
						  			<label>电话通道：</label>
						  			<span>四川</span>
						  		</p>
					    	</el-col>
					    	<el-col :span="7">
					    		<p>
						  			<label>开始时间：</label>
						  			<span>2018-04-09 17:00:00</span>
						  		</p>
					    	</el-col>
					    	<el-col :span="7">
					    		<p>
						  			<label>结束时间：</label>
						  			<span>2018-04-09 18:00:00</span>
						  		</p>
					    	</el-col>
					    	<el-col :span="5">
					    		<p>
						  			<label>通话时长：</label>
						  			<span>60分钟</span>
						  		</p>
					    	</el-col>
					  	</div>
						<el-row>
							<el-col :span="24">
								<p class="call-operate">
						  			<label>操作：</label>
						  			<audio src="http://dl.stream.qqmusic.qq.com/C4000016IvEW0kcA1M.m4a?guid=6935341414&vkey=372B9035A7E4DEC3773966AA1EB783CAA32F050D920222BF373B759170C01CDCC45973E0B4CADB7E43BAFE168C7F84D9E51CF3821739BC7C&uin=4025&fromtag=66" controls></audio>
						  			<el-button plain>查看文字</el-button>
						  		</p>
							</el-col>
						</el-row>
					</el-card>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'callLog',
		data() {
			return {
				show: false,
				callVisible: false
			}
		},
		methods: {
			// 是否打开全部记录
			isOpenInfo() {
				this.show = !this.show
				this.$refs.logIcon.style.transform = this.show ? 'rotate(180deg)' : 'rotate(0deg)'
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.log-info {
		padding: 0 30px;
		height: 64px;
		line-height: 64px;
		background: #F2F6FC;
		border: 1px solid #EAEAEA;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #303030;
		letter-spacing: 0.34px;
		margin-bottom: 15px;
		& label {
			color: #909399;
		}
		& .log-icon {
			float: right;
			cursor: pointer;
			color: #409EFF;
			transition: all 0.3s;
		}
	}
	.call-info {
		height: 66px;
		background: #F2F6FC;
		border: 1px solid #EAEAEA;
		padding: 7px 10px;
		& p {
			padding: 6px 0;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: #303030;
			letter-spacing: 0.34px;
		}
	}

	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	
	.call-box {
		max-height: 500px;
		overflow-y: auto;
		background: #F9F9F9;
		&>.el-col:not(:last-child) {
			margin-bottom: 20px;
		}
		& .call-operate {
			& label {
				display: inline-block;
				vertical-align: middle;
			}
			& audio {
				width: 75%;
				padding: 0 15px 0 5px;
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
		
</style>