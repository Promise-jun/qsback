<template>
	<el-dialog 
		:title="title" 
		:visible.sync="visible" 
		:close-on-click-modal="false" 
		:close-on-press-escape="false"
		:before-close="hidePanel"
	>
	  	<el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="200px" class="demo-ruleForm">
		  <el-form-item label="角色名称" prop="name">
		    <el-input v-model="roleForm.name" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="角色级别" prop="rank">
		    <el-input v-model="roleForm.rank" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="每天允许查看用户手机次数" prop="checkNum">
		    <el-input v-model.number="roleForm.checkNum"></el-input>
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
		            { required: true, message: '角色名称不能为空' },
		          ],
		          rank: [
		            { required: true, message: '角色级别不能为空' },
		          ],
		          checkNum: [
		            { required: true, message: '查看手机次数不能为空'},
		            { type: 'number', message: '必须为数字值' }
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