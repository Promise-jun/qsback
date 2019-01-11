<template>
	<div>
		<p class="title">现金统计</p>
		<el-table :data="quidsData" stripe border style="width: 100%">
		    <el-table-column prop="prop" label="可用余额"></el-table-column>
		    <el-table-column prop="prop" label="冻结金额"></el-table-column>
		    <el-table-column prop="prop" label="总资产"></el-table-column>
		    <el-table-column prop="prop" label="总充值"></el-table-column>
		    <el-table-column prop="prop" label="总提现"></el-table-column>
		    <el-table-column prop="prop" label="总加币金额"></el-table-column>
		    <el-table-column prop="prop" label="总减币金额"></el-table-column>
		</el-table>

		<p class="title">金币统计</p>
		<el-table :data="goldData" stripe border style="width: 100%">
		    <el-table-column prop="prop" label="可用金币"></el-table-column>
		    <el-table-column prop="prop" label="冻结金币"></el-table-column>
		    <el-table-column prop="prop" label="总金币"></el-table-column>
		    <el-table-column prop="prop" label="总兑换"></el-table-column>
		    <el-table-column prop="prop" label="兑换次数"></el-table-column>
		</el-table>

		<p class="title">钻石统计</p>
		<el-table :data="goldData" stripe border style="width: 100%">
		    <el-table-column prop="prop" label="可用钻石"></el-table-column>
		    <el-table-column prop="prop" label="冻结钻石"></el-table-column>
		    <el-table-column prop="prop" label="兑换金币"></el-table-column>
		    <el-table-column prop="prop" label="兑换提现"></el-table-column>
		    <el-table-column prop="prop" label="提现次数"></el-table-column>
		</el-table>

		<p class="title">提现绑定</p>
		<el-table :data="cashData" stripe border style="width: 100%">
		    <el-table-column prop="accountName" label="账户名称"></el-table-column>
		    <el-table-column prop="accountCode" label="账户卡号"></el-table-column>
		    <el-table-column prop="accountUserName" label="户主名称"></el-table-column>
		    <el-table-column label="操作">
		    	<!-- <template slot-scope="scope">
			    	<el-tooltip content="编辑" placement="top">
					  <el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
				</template> -->
		    </el-table-column>
		</el-table>

		<!-- 绑定 -->
		<el-dialog 
			title="提示" 
			:visible.sync="dialogFormVisible"
			:modal="false"
		>
		  	<el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="真实姓名" prop="userName">
			    <el-input v-model="roleForm.userName" placeholder="请输入真实姓名" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="身份证号" prop="idCard">
			    <el-input v-model="roleForm.idCard" placeholder="请输入身份证号" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="银行卡号" prop="bankCard">
			    <el-input v-model="roleForm.bankCard" placeholder="请输入银行卡号" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="所属银行" prop="bank">
			    <el-select v-model="roleForm.bank" placeholder="请选择所属银行">
			      	<el-option label="工商银行" value="1"></el-option>
			      	<el-option label="交通银行" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('roleForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="dialogFormVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'fundInfo',
		data() {
			return {
				rules: {
		          userName: [
		            { required: true, message: '真实姓名不能为空' }
		          ],
		          idCard: [
		            { required: true, message: '身份证号不能为空' }
		          ],
		          bankCard: [
		            { required: true, message: '银行卡号不能为空' }
		          ],
		          bank: [
		            { required: true, message: '所属银行不能为空' }
		          ]
		        },
				quidsData: [], //现金统计
				goldData: [], //金币统计
				diamondData: [], //钻石统计
				cashData: [{
					accountId: 1,
					accountName: '支付宝',
					accountCode: '1022988217',
					accountUserName: '唐**'
				}], //提现绑定
				dialogFormVisible: false,
				roleForm: {},
				submitLoading: false //提交按钮loading
			}
		},
		methods: {
			edit(row) {
				this.dialogFormVisible = true
			},
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
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.title {
		padding: 15px 0;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
</style>