<template>
	<el-dialog 
		:title="title" 
		:visible.sync="visible" 
		:close-on-click-modal="false" 
		:close-on-press-escape="false"
		:before-close="hidePanel"
	>
	  	<el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
	  	  <el-form-item label="标题" prop="title">
		    <el-input v-model="roleForm.title" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="名称" prop="name">
		    <el-input v-model="roleForm.name" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="图标">
		    <el-input v-model="roleForm.icon" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="是否显示">
		    <el-switch v-model="roleForm.isShow"></el-switch>
		  </el-form-item>
		  <el-form-item label="排序">
		    <el-input v-model.number="roleForm.sort"></el-input>
		  </el-form-item>
		  <el-form-item label="访问路径">
		    <el-input v-model.number="roleForm.path"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
		    <el-button @click="hidePanel">取消</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
</template>

<script type="text/javascript">
	export default {
		props: {
			title: {
				type: String,
				default: "提示"
			},
			visible: {
				type: Boolean,
				default: false
			},
			roleData: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
		        rules: {
		          name: [
		            { required: true, message: '名称不能为空' },
		          ],
		          title: [
		            { required: true, message: '标题不能为空' },
		          ]
		        }
			}
		},
		computed: {
			roleForm: function() {
				return this.roleData
			}
		},
		methods: {
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
	      	submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$emit('submit', this.roleForm);
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    }
		}
	}
</script>