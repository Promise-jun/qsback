<template>
	<el-dialog
	  	title="图片裁剪"
	  	:visible.sync="picDialogVisible"
	  	:modal="false"
	  	center
	  	:before-close="hidePanel"
	  	width="50%"
	>	
		<div class="pic-box" v-loading="picLoading">
			<vueCropper
			  	ref="cropper"
			  	:img="picOption.img"
			  	:info="picOption.info"
				:outputSize="picOption.outputSize"
				:outputType="picOption.outputType"
				:canScale="picOption.canScale"
				:autoCrop="picOption.autoCrop"
				:autoCropWidth="picOption.autoCropWidth"
				:autoCropHeight="picOption.autoCropHeight"
				:fixed="picOption.fixed"
				:fixedNumber="picOption.fixedNumber"
				:infoTrue="picOption.infoTrue"
				:centerBox="picOption.centerBox"
			></vueCropper>
		</div>
	  	<span slot="footer" class="dialog-footer">
	    	<el-button @click="hidePanel">取 消</el-button>
	    	<el-button type="primary" @click="confirm" :loading="picLoading">确 定</el-button>
	  	</span>
	</el-dialog>
</template>

<script type="text/javascript">
	import { VueCropper }  from 'vue-cropper' 
	
	export default {
		name: 'cutOutPic',
		props: {
			picDialogVisible: {
				type: Boolean,
				default: false
			},
			picOption: {
				type: Object,
				default: {}
			},
			picLoading: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			hidePanel() {
	          	this.$emit('update:picDialogVisible', false)
	      	},
			confirm() {
				this.$refs.cropper.getCropData(data => {
					this.$emit('upload', data)
			    });
			}
		},
		components: {
			VueCropper
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
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
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
	.pic-box {
		height: 400px;
	}
</style>