<template>
	<el-dialog 
		:title="title" 
		:visible.sync="visible" 
		:close-on-click-modal="false" 
		:close-on-press-escape="false"
		:before-close="hidePanel"
	>
	  	<el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="200px" class="demo-ruleForm">
		  <el-form-item label="角色名称" prop="roleName">
		    <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="角色描述">
		    <el-input v-model="roleForm.roleDescribe" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('roleForm')" :loading="submitLoading">提交</el-button>
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
			},
			submitLoading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
		        rules: {
		          roleName: [
		            { required: true, message: '角色名称不能为空' }
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