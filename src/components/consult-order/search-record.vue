<template>
	<div>
		<el-row :gutter="20" style="margin-bottom: 24px;">
			<el-col :span="24">
				<el-card class="box-card">
				  	<div slot="header">
				    	<span>咨询记录</span>
				  	</div>
					<div v-loading="Loading">
						<div>
							<el-table
							    ref="tableList"
							    stripe
							    border
							    size="small"
							    :data="tableList"
							    tooltip-effect="dark"
							    style="width: 100%;">
							    <el-table-column prop="userId" label="序号" align='center'></el-table-column>
							    <el-table-column label="记录单号" align='center'>
							    	<template slot-scope="scope">
							      		{{ scope.row.userName }}
							      	</template>
							    </el-table-column>
							    <el-table-column prop="userAge" label="咨询状态" align='center'></el-table-column>
							    <el-table-column label="预约时间" align='center'>
							    	<template slot-scope="scope">
										<span v-if="scope.row.userSex == 0">未知</span>
										<span v-else-if="scope.row.userSex == 1">男</span>
										<span v-else="scope.row.userSex == 2">女</span>
							    	</template>
							    </el-table-column>
							    <el-table-column prop="city" label="完成时间" align='center'></el-table-column>
							</el-table>
							<div class="other-operate">
								<label>相关操作：</label>
								<div class="content">
									<!-- <p class="text">本次咨询情况：11 后续咨询方案：11 下次咨询时间：11</p> -->
									<p>
										<el-button type="primary" size="small" @click="recordeVisible = true">提交咨询记录</el-button>
										<el-button type="warning" size="small">选择时间</el-button>
									</p>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 咨询记录 -->
		<el-dialog 
			title="评价" 
			:visible.sync="recordeVisible" 
			:close-on-click-modal="false" 
			:close-on-press-escape="false"
			:modal="false"
			width="60%"
		>
		  	<el-form :model="recordForm" status-icon ref="recordForm" label-width="80px" class="demo-ruleForm">
			  <el-form-item label="诊断记录" prop="content">
			    <el-input type="textarea" :rows="10" placeholder="请输入诊断记录" v-model="recordForm.content"></el-input>
			    <p>提交后，代表已完成本次咨询<span style="color: #F56C6C;">（内容仅专家可见，不对客户开放）</span></p>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('recordForm')" :loading="submitLoading">提交</el-button>
			    <el-button @click="recordeVisible = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'searchRecord',
		data() {
			return {
				Loading: false,
				tableList: [],
				submitLoading: false,
				recordeVisible: false,
				recordForm: {
					content: '本次咨询情况：\n\n后续咨询方案：\n\n下次咨询时间：'
				}
			}
		},
		methods: {
			// 提交记录
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
	.other-operate {
		padding: 10px 20px;
		border-left: 1px solid #ebeef5;
		border-right: 1px solid #ebeef5;
		border-bottom: 1px solid #ebeef5;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #303030;
		letter-spacing: 0.34px;
		& label {
			float: left;
			height: 32px;
			line-height: 32px;
		}
		& .content {
			margin-left: 80px;
		}
		& .text {
			padding: 6px 0 10px;
			line-height: 20px;
		}
	}

	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
</style>