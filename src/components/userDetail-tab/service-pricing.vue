<template>
	<div>
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>服务分成</span>
		  	</div>
		  	<el-row :gutter="20">
			  	<el-col :span="10">
			  		<p>
			  			<label>派单分成：</label>
			  			<span>50%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(1)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>打赏分成：</label>
			  			<span>50%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(2)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>社交分成：</label>
			  			<span>50%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(3)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
			  	<el-col :span="10">
			  		<p>
			  			<label>平台分成：</label>
			  			<span>50%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(4)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>课程分成：</label>
			  			<span>50%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(5)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>钻石转化：</label>
			  			<span>50%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(6)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
		  	</el-row>
		</el-card>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>服务定价</span>
		  	</div>
		  	<el-row :gutter="20">
			  	<el-col :span="8">
			  		<p>
			  			<label>视频服务：</label>
			  			<span>--元/分钟</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changePrice(7)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
			  	<el-col :span="8">
			  		<p>
			  			<label>图文+语音条服务：</label>
			  			<span>--元/分钟</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changePrice(8)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
			  	<el-col :span="8">
			  		<p>
			  			<label>通话服务：</label>
			  			<span>--元/分钟</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changePrice(9)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
		  	</el-row>
		</el-card>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>服务项目</span>
		  	</div>
		  	<el-row :gutter="20">
			  	<el-col :span="8">
			  		<p>
			  			<label>视频服务：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeProject(10)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
			  	<el-col :span="8">
			  		<p>
			  			<label>图文+语音条服务：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeProject(11)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
			  	<el-col :span="8">
			  		<p>
			  			<label>通话服务：</label>
			  			<span>开启</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeProject(12)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
		  	</el-row>
		</el-card>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>套餐设置</span>
		    	<el-button style="float: right; padding: 3px 0" type="text" @click="setMealVisible = true">添加套餐</el-button>
		  	</div>
		  	<el-table
			    :data="tableData"
			    stripe
			    border
			    v-loading="loading"
			    style="width: 100%"
			>
			    <el-table-column prop="name" label="套餐名称"></el-table-column>
			    <el-table-column prop="name" label="服务类型"></el-table-column>
			    <el-table-column prop="name" label="订单有效期(天)"></el-table-column>
			    <el-table-column prop="icon" label="服务单价(元/分钟)"></el-table-column>
			    <el-table-column prop="icon" label="服务时长(分钟)"></el-table-column>
				<el-table-column prop="name" label="原价(元)"></el-table-column>
				<el-table-column prop="name" label="促销(元)"></el-table-column>
			</el-table>
		</el-card>
		
		<!-- 服务定价弹窗 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="priceVisible"
		  	width="50%">
		  	<el-form :model="priceForm" status-icon :rules="rules" ref="priceForm" label-width="130px" class="demo-ruleForm">
			  	<el-form-item :label="dialogToolTitle" prop="type">
			    	<el-input v-model="priceForm.type" autocomplete="off"></el-input>
			  	</el-form-item>
			  	<el-form-item label="最少起购">
			  		<el-input-number v-model="priceForm.min" :min="5" :max="100" :step="5" label="描述文字"></el-input-number> 分钟
			  	</el-form-item>
			  	<el-form-item label="起购步长">
			  		<el-input-number v-model="priceForm.step" :min="5" :max="100" :step="5" label="描述文字"></el-input-number> 分钟
			  	</el-form-item>
			  	<el-form-item>
			    	<el-button type="primary" @click="submitPriceForm('priceForm')" :loading="submitLoading">提交</el-button>
			    	<el-button @click="priceVisible = false">取消</el-button>
			  	</el-form-item>
			</el-form>
		</el-dialog>
		
		<!-- 服务项目弹窗 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="projectVisible"
		  	width="30%">
		  	{{dialogToolTitle}}：
		  	<el-select v-model="projectForm.value" placeholder="请选择">
			    <el-option label="开启" value="1"></el-option>
			    <el-option label="关闭" value="2"></el-option>
			</el-select>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="projectVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitProject">确 定</el-button>
		  	</span>
		</el-dialog>

		<!-- 添加套餐弹窗 -->
		<el-dialog
		  	title="添加套餐"
		  	:modal="false"
		  	:visible.sync="setMealVisible"
		  	width="80%">
		  	<el-form :model="setMealForm" status-icon :rules="rules" ref="setMealForm" label-width="80px" class="demo-ruleForm">
			  	<el-form-item label="套餐名称" prop="name">
			  		<el-col :span="12">
			  			<el-input v-model="setMealForm.name" autocomplete="off"></el-input>
			  		</el-col>
			    	<el-col :span="12">
			    		<span style="padding-left: 15px;">如：300分钟套餐包或者200分钟8折优惠包 限定18个字符</span>
			    	</el-col>
			  	</el-form-item>
			  	<el-form-item label="套餐分类">
			  		<el-select v-model="setMealForm.classify" placeholder="请选择">
					    <el-option v-for="item in classifyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
			  	</el-form-item>
			  	<el-form-item label="类型">
			  		<el-col :span="12">
						<el-radio-group v-model="setMealForm.type">
	      					<el-radio label="视频服务"></el-radio>
	      					<el-radio label="图文+语音条服务"></el-radio>
	      					<el-radio label="通话服务"></el-radio>
	    				</el-radio-group>
			  		</el-col>
				  	<el-col :span="12">
				  		<span style="padding-left: 15px;">单价：0.00元/分钟</span>
				  	</el-col>
			  	</el-form-item>
			  	<el-form-item label="服务时间">
			  		<el-col :span="12">
						<el-input-number v-model="setMealForm.time" :min="0"></el-input-number> 分钟
			  		</el-col>
			  		<el-col :span="12">
						<span style="padding-left: 15px;">原价：0.00元</span>
			  		</el-col>
			  	</el-form-item>
			  	<el-row>
			  		<el-col :span="12">
			  			<el-form-item label="最少次数">
					  		<el-input-number v-model="setMealForm.min" :min="0"></el-input-number> 次
					  	</el-form-item>
			  		</el-col>
			  		<el-col :span="12">
			  			<el-form-item label="最多次数">
					  		<el-input-number v-model="setMealForm.max" :min="setMealForm.min"></el-input-number> 次
					  	</el-form-item>
			  		</el-col>
			  	</el-row>
			  	<el-form-item label="套餐折扣">
		  			<el-input-number v-model="setMealForm.inpAgio" :min="0" :max="100"></el-input-number> %
		  			<el-radio-group v-model="setMealForm.chooseAgio" style="margin-left: 30px;">
      					<el-radio label="90">九折</el-radio>
      					<el-radio label="80">八折</el-radio>
      					<el-radio label="70">七折</el-radio>
      					<el-radio label="50">五折</el-radio>
    				</el-radio-group>
		  			<span style="padding-left: 30px;">提示：输入1到100的折扣比例或选择常用折扣</span>
			  	</el-form-item>
			  	<el-form-item label="有效期">
		  			<el-input-number v-model="setMealForm.inpTime" :min="0" :max="100"></el-input-number> 天
		  			<el-radio-group v-model="setMealForm.chooseTime" style="margin-left: 30px;">
      					<el-radio label="3">3天</el-radio>
      					<el-radio label="7">7天</el-radio>
      					<el-radio label="10">10天</el-radio>
      					<el-radio label="15">15天</el-radio>
      					<el-radio label="30">1个月</el-radio>
      					<el-radio label="90">3个月</el-radio>
      					<el-radio label="180">6个月</el-radio>
      					<el-radio label="360">12个月</el-radio>
    				</el-radio-group>
		  			<div>
		  				注：1：有效期最低3天； 2：有效期（小时）：通话时长（分钟）需要大于1:1，既100分钟时长的通话服务，有效期不可低于100小时
		  			</div>
			  	</el-form-item>
			  	<el-form-item>
			    	<el-button type="primary" @click="submitSetMealForm('setMealForm')" :loading="submitLoading">提交</el-button>
			    	<el-button @click="setMealVisible = false">取消</el-button>
			  	</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'servicePricing',
		data() {
			return {
				rules: {
		          	name: [
		            	{ required: true, message: '价格不能为空' }
		          	]
		        },
				dialogToolTitle: '',
				submitLoading: false,
				// 服务定价
				priceVisible: false,
				priceForm: {
					type: '',
					min: 5,
					step: 5
				},
				// 服务项目
				projectVisible: false,
				projectForm: {
					value: '1'
				},
				// 套餐设置
				loading: false,
				tableData: [],
				// 添加套餐
				setMealVisible: false,
				setMealForm: {},
				classifyList: [{ //套餐分类
					label: '人际职场',
					value: '1'
				}, {
					label: '情绪压力',
					value: '2'
				}] 
			}
		},
		methods: {
			// 服务分成
			changeFallInto(changeId) {
				let title = ''
				if (changeId == 1) {
					title = '派单分成'
				} else if (changeId == 2) {
					title = '打赏分成'
				} else if (changeId == 3) {
					title = '社交分成'
				} else if (changeId == 4) {
					title = '平台分成'
				} else if (changeId == 5) {
					title = '课程分成'
				} else if (changeId == 6) {
					title = '钻石转化'
				} else {
					title = ''
				}
				this.$prompt(title + '（%）', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	if (value == '' || value == null) {
		        		this.$message.error(title + '不能为空');
		        		return
		        	}
		          	this.$message({
		           		type: 'success',
		            	message: '你的内容是: ' + value
		          	});
		        }).catch(() => {
		          	 
		        });
			},
			// 服务定价
			changePrice(changeId) {
				if (changeId == 7) {
					this.dialogToolTitle = '视频服务'
				} else if (changeId == 8) {
					this.dialogToolTitle = '图文+语音条服务'
				} else if (changeId == 9) {
					this.dialogToolTitle = '通话服务'
				}
				this.priceVisible = true
			},
			submitPriceForm(formName) {
				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	// this.submitLoading = true
		          		this.priceVisible = false
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
			},
			// 服务项目
			changeProject(changeId) {
				if (changeId == 10) {
					this.dialogToolTitle = '视频服务'
				} else if (changeId == 11) {
					this.dialogToolTitle = '图文+语音条服务'
				} else if (changeId == 12) {
					this.dialogToolTitle = '通话服务'
				}
				this.projectVisible = true
			},
			submitProject() {
				this.projectVisible = false
			},
			// 添加套餐
			submitSetMealForm(formName) {
				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	// this.submitLoading = true
		          		this.setMealVisible = false
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	p {
		padding: 8px 0;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
	}
	.box-card {
		margin: 10px 0 20px;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
</style>