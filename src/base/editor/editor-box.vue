<template>
	<div>
		<el-dialog
		  	title="内容编辑"
		  	:visible.sync="editorDialogVisible"
		  	:modal="false"
		  	:before-close="hidePanel"
		  	width="70%"
		>	
			<div>
				<editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></editor>
			</div>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="hidePanel">取 消</el-button>
		    	<el-button type="primary" @click="confirm">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
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
		name: 'editor',
		props: {
			editorDialogVisible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tinymceHtml: '123456',
				editorInit: {
				  	language_url: '/static/zh_CN.js',
				  	language: 'zh_CN',
				  	skin_url: '/static/skins/lightgray',
				  	height: 300,
				  	plugins: 'image link media lists code table colorpicker textcolor wordcount contextmenu',
				  	toolbar: 
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
				  	images_upload_handler: (blobInfo, success, failure) => {
				  		this.handleImgUpload(blobInfo, success, failure)
				  	}
				}
			}
		},
		mounted() {
			tinymce.init({})
			console.log(123)
		},
		methods: {
			handleImgUpload (blobInfo, success, failure) {
			  	let formdata = new FormData()
			  	formdata.set('upload_file', blobInfo.blob())
			  	console.log(blobInfo.base64())
			  	axios.post('/api/upload', formdata).then(res => {
			    	success(res.data.data.src)
			  	}).catch(res => {
			    	failure('error')
			  	})
			},
			hidePanel() {
	          	this.$emit('update:editorDialogVisible', false)
	      	},
			confirm() {
				this.$emit('upload', this.tinymceHtml)
			}
		},
		components: {
			Editor
		}
	}
</script>