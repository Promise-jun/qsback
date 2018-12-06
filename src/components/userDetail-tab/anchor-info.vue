<template>
	<div>
  		<el-row :gutter="20">
		  	<el-col :span="10">
		  		<p>
		  			<label>主播类型：</label>
		  			<span>认证主播</span>
		  		</p>
		  		<p>
		  			<label>30天直播时长：</label>
		  			<span>0分钟</span>
		  		</p>
		  		<p>
		  			<label>直播权限：</label>
		  			<span>是</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="authorityVisible = true"></i>
		  			</el-tooltip>
		  		</p>
		  	</el-col>
		  	<el-col :span="10">
		  		<p>
		  			<label>入驻时间：</label>
		  			<span>2018-08-03 11:15:39</span>
		  		</p>
		  		<p>
		  			<label>30天获得钻石：</label>
		  			<span>0</span>
		  		</p>
		  		<p>
		  			<label>钻石转化：</label>
		  			<span>50%</span>
		  			<el-tooltip content="编辑" placement="top">
		  				<i class="el-icon-edit edit" @click="changeTranslate"></i>
		  			</el-tooltip>
		  		</p>
		  	</el-col>
	  	</el-row>
		
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>认证信息</span>
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
  				:on-preview="handlePictureCardPreview"
  				:on-success="handleAvatarSuccess"
  				:on-remove="handleRemove">
  					<i class="el-icon-plus"></i>
			</el-upload>
		</el-card>

		<!-- 分配客服 -->
		<el-dialog title="提示" :visible.sync="authorityVisible" width="30%" :modal="false">
			选择直播权限：
	      	<el-select v-model="authority" placeholder="请选择">
	       	 	<el-option label="是" value="1"></el-option>
	       	 	<el-option label="否" value="2"></el-option>
	      	</el-select>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="authorityVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="authorityVisible = false">确 定</el-button>
		  	</div>
		</el-dialog>
		
		<el-dialog :visible.sync="dialogVisible" :modal="false">
  			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'anchorInfo',
		data() {
			return {
				dialogImageUrl: '',
        		dialogVisible: false,
        		authorityVisible: false, //直播权限弹窗
        		authority: '1'
			}
		},
		methods: {
			handleAvatarSuccess(file, fileList) {
				console.log(fileList)
			},
			handleRemove(file, fileList) {
        		console.log(file, fileList);
      		},
      		handlePictureCardPreview(file) {
        		this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
      		},
      		changeTranslate() { //钻石转化
      			this.$prompt('钻石转化(%)', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error('钻石转化不能为空');
		        		return
		        	}
		          	this.$message({
		           		type: 'success',
		            	message: '你的钻石转化是: ' + value
		          	});
		        }).catch(() => {
		          	 
		        });
      		}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	p {
		padding: 12px 0;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
	}
	.box-card {
		margin: 20px 0 10px;
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