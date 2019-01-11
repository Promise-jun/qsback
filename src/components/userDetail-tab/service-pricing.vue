<template>
	<div v-loading="loading">
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>服务分成</span>
		  	</div>
		  	<el-row :gutter="20">
			  	<el-col :span="10">
			  		<p>
			  			<label>派单分成：</label>
			  			<span>{{fallInfo.dispatchProportion}}%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(1)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>打赏分成：</label>
			  			<span>{{fallInfo.rewardProportion}}%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(2)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>社交分成：</label>
			  			<span>{{fallInfo.socialityProportion}}%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(3)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
			  	<el-col :span="10">
			  		<p>
			  			<label>平台分成：</label>
			  			<span>{{fallInfo.platformProportion}}%</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeFallInto(4)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>课程分成：</label>
			  			<span>{{fallInfo.courseProportion}}%</span>
			  			<el-tooltip content="编辑" placement="top">	
			  				<i class="el-icon-edit edit" @click="changeFallInto(5)"></i>
			  			</el-tooltip>
			  		</p>
			  		<p>
			  			<label>钻石转化：</label>
			  			<span>{{fallInfo.diamondsProportion}}%</span>
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
			  	<el-col :span="8" v-for="item in wayList" :key="item.dicId">
			  		<p>
			  			<label>{{item.dicName}}：</label>
			  			<span v-if="findMap(item.dicId)">{{priceMap[item.dicId].price}}元/分钟</span>
			  			<span v-else>--</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changePrice(item)"></i>
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
			  	<el-col :span="8" v-for="item in wayList" :key="item.dicId">
			  		<p>
			  			<label>{{item.dicName}}：</label>
			  			<span v-if="openCategory.indexOf(item.dicId) != -1">开启</span>
			  			<span v-else>关闭</span>
			  			<el-tooltip content="编辑" placement="top">
			  				<i class="el-icon-edit edit" @click="changeProject(item)"></i>
			  			</el-tooltip>
			  		</p>
			  	</el-col>
		  	</el-row>
		</el-card>

		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span>套餐设置</span>
		    	<el-button style="float: right; padding: 3px 0" type="text" @click="addSetMeal">添加套餐</el-button>
		  	</div>
		  	<el-table
			    :data="tableData"
			    stripe
			    border
			    v-loading="setMealLoading"
			    style="width: 100%"
			>
			    <el-table-column prop="title" label="套餐名称"></el-table-column>
			    <el-table-column prop="name" label="服务类型"></el-table-column>
			    <!-- <el-table-column prop="name" label="订单有效期(天)"></el-table-column> -->
			    <el-table-column prop="unitPrice" label="服务单价(元/分钟)"></el-table-column>
			    <el-table-column prop="time" label="服务时长(分钟)"></el-table-column>
				<el-table-column prop="marketPrice" label="原价(元)"></el-table-column>
				<el-table-column prop="unitPrice" label="促销(元)">
					<template slot-scope="scope">{{ scope.row.marketPrice * (scope.row.menuRebate / 100) }}</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
			    	<template slot-scope="scope">
			    		<el-tooltip content="编辑" placement="top">
					  		<el-button @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
						</el-tooltip>
						<el-tooltip content="上架" placement="top" v-if="scope.row.status == 0">
					  		<el-button @click="grounding(scope.row, scope.$index)" type="text" icon="iconfont icon-arrowup" style="color: #67C23A;"></el-button>
						</el-tooltip>
						<el-tooltip content="下架" placement="top" v-else>
					  		<el-button @click="grounding(scope.row, scope.$index)" type="text" icon="iconfont icon-arrowdown" style="color: #F56C6C;"></el-button>
						</el-tooltip>
				  	</template>
			    </el-table-column>
			</el-table>

			<el-row>
			  <el-col :span="24">
			  	<page-num
			  		v-if="pageTotal.total > pageTotal.pageSize"
					:currentpage="pageTotal.page"
					:total="pageTotal.total"
					:pageSize="pageTotal.pageSize"
					:render="getList"
					:options="pageTotal">
				</page-num>
			  </el-col>
			</el-row>
		</el-card>
		
		<!-- 服务定价弹窗 -->
		<el-dialog
		  	title="提示"
		  	:modal="false"
		  	:visible.sync="priceVisible"
		  	width="50%">
		  	<el-form :model="priceForm" status-icon :rules="rules" ref="priceForm" label-width="130px" class="demo-ruleForm">
			  	<el-form-item :label="dialogToolTitle" prop="type">
			    	<el-input v-model="priceForm.type" autocomplete="off" style="width: 50%;" placeholder="请输入价格"></el-input> 元/分钟
			  	</el-form-item>
			  	<el-form-item label="最少起购">
			  		<el-input-number v-model="priceForm.min" :min="5" :max="100" :step="5"></el-input-number> 分钟
			  	</el-form-item>
			  	<el-form-item label="起购步长">
			  		<el-input-number v-model="priceForm.step" :min="5" :max="100" :step="5"></el-input-number> 分钟
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
			    <el-option label="关闭" value="0"></el-option>
			</el-select>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="projectVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitProject" :loading="submitLoading">确 定</el-button>
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
			  	<el-form-item label="套餐分类" prop="classify">
			  		<el-select v-model="setMealForm.classify" placeholder="请选择">
					    <el-option 
					    	v-for="item in classifyList" 
					    	:key="item.dicId" 
					    	:label="item.dicName" 
					    	:value="item.dicId">
					    </el-option>
					</el-select>
			  	</el-form-item>
			  	<el-form-item label="类型" prop="serviceType">
			  		<el-col :span="12">
						<el-radio-group v-model="setMealForm.serviceType" @change="changeType">
	      					<el-radio 
	      						v-for="item in wayList" 
	      						v-if="openCategory.indexOf(item.dicId) != -1"
	      						:key="item.dicId" 
	      						:label="item.dicId">
	      						{{item.dicName}}
	      					</el-radio>
	    				</el-radio-group>
			  		</el-col>
				  	<el-col :span="12">
				  		<span style="padding-left: 15px;">单价：{{priceObj.unitPrice}}元/分钟</span>
				  	</el-col>
			  	</el-form-item>
			  	<el-form-item label="服务时间" prop="time">
			  		<el-col :span="12">
						<el-input-number v-model="setMealForm.time" :min="0" @change="changeTime"></el-input-number> 分钟
			  		</el-col>
			  		<el-col :span="12">
						<span style="padding-left: 15px;">原价：{{priceObj.costPrice}}元</span>
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
		  			<el-radio-group v-model="setMealForm.chooseAgio" style="margin-left: 30px;" @change="changeAgio">
      					<el-radio label="90">九折</el-radio>
      					<el-radio label="80">八折</el-radio>
      					<el-radio label="70">七折</el-radio>
      					<el-radio label="50">五折</el-radio>
    				</el-radio-group>
		  			<span style="padding-left: 30px;">提示：输入1到100的折扣比例或选择常用折扣</span>
			  	</el-form-item>
			  	<!-- <el-form-item label="有效期">
			  			  			<el-input-number v-model="setMealForm.inpTime" :min="0"></el-input-number> 天
			  			  			<el-radio-group v-model="setMealForm.chooseTime" style="margin-left: 30px;" @change="changeOpenTime">
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
			  	</el-form-item> -->
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
		props: {
			userId: {
				type: String,
				default: ''
			},
			category: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				rules: {
		          	name: [
		            	{ required: true, message: '价格不能为空' }
		          	],
		          	type: [
		          		{ required: true, message: '价格不能为空' }
		          	],
		          	classify: [
		          		{ required: true, message: '套餐分类不能为空' }
		          	],
		          	serviceType: [
		          		{ required: true, message: '服务类型不能为空' }
		          	],
		          	time: [
		          		{ required: true, message: '服务时间不能为空' }
		          	]
		        },
		        loading: false,
		        // 咨询方式
		        wayList: [],
		        // 分层比例
		        fallInfo: {},
		        // 咨询师服务定价
		        priceMap: {},
				// 服务定价
				dialogToolTitle: '',
				submitLoading: false,
				priceVisible: false,
				priceForm: {
					priceId: '',
					methodId: '',
					type: '',
					min: 5,
					step: 5
				},
				isEdit: false,
				// 服务项目
				openCategory: '',
				projectVisible: false,
				projectForm: {
					value: '1',
					dicId: ''
				},
				// 套餐设置
				setMealLoading: false,
				tableData: [],
				// 添加套餐
				setMealVisible: false,
				setMealForm: {
					time: 0,
					min: 0,
					inpAgio: 100
				},
				classifyList: [], //套餐分类
				priceObj: { //套餐价格
					unitPrice: 0,
					costPrice: 0
				},
				pageTotal: { //分页数据
				    total: 0,
			        pageSize: 10,
			        page: 1
			    }
			}
		},
		created() {
			this.openCategory = this.category
			this.queryPrice()
			this.getOption(1) //咨询方式
			this.getOption(16) //心理分类
			this.getFallInto() //分层比例列表
			this.getSetMeal() //套餐列表
		},
		methods: {
			// 获取选项
			getOption(type) {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/sys/dic/queryForList',
					data: this.$qs.stringify({
						dicPid: type,
						thisPage: 1,
						limit: 50
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						if (type == 1) { //咨询方式
							this.wayList = result.data.list
						} else if (type == 16) { //心理分类
							this.classifyList = result.data.list
						}
					} else {
						this.$message.error(result.msg)
					}
						
				}).catch(err => {
					console.log(err)
				})
			},
			// 分层比例
			getFallInto() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/merchant/sharingProportion/findByUserId',
					data: this.$qs.stringify({
						userId: this.userId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.fallInfo = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 服务分成
			changeFallInto(changeId) {
				let title = '', 
					uploadInfo = {}
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
		        	if (changeId == 1) {
						uploadInfo = {
							sharingProportionId: this.fallInfo.sharingProportionId,
							dispatchProportion: value
						}
					} else if (changeId == 2) {
						uploadInfo = {
							sharingProportionId: this.fallInfo.sharingProportionId,
							rewardProportion: value
						}
					} else if (changeId == 3) {
						uploadInfo = {
							sharingProportionId: this.fallInfo.sharingProportionId,
							socialityProportion: value
						}
					} else if (changeId == 4) {
						uploadInfo = {
							sharingProportionId: this.fallInfo.sharingProportionId,
							platformProportion: value
						}
					} else if (changeId == 5) {
						uploadInfo = {
							sharingProportionId: this.fallInfo.sharingProportionId,
							courseProportion: value
						}
					} else if (changeId == 6) {
						uploadInfo = {
							sharingProportionId: this.fallInfo.sharingProportionId,
							diamondsProportion: value
						}
					}
		        	this.loading = true
		        	this.$axios({
		        		method: 'post',
		        		url: '/system/merchant/sharingProportion/edit',
		        		data: this.$qs.stringify(uploadInfo)
		        	}).then(res => {
		        		let result = res.data
		        		if (result.code == 200) {
		        			this.getFallInto()
		        			this.$message({
				           		type: 'success',
				            	message: title + '修改成功！'
				          	});
		        		} else {
		        			this.$message.error(result.msg)
		        		}
		        	}).catch(err => {
		        		this.$message.error(err)
		        	})  	
		        }).catch(() => {
		          	 
		        });
			},
			// 查询服务定价
			queryPrice() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/price/findByUserId',
					data: this.$qs.stringify({
						userId: this.userId
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.priceMap = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			findMap(key) {
				if( this.priceMap.hasOwnProperty(key) ){
					return true
				} else {
					return false
				}
			},
			// 服务定价
			changePrice(item) {
				this.isEdit = this.findMap(item.dicId)
				this.dialogToolTitle = item.dicName
				this.priceForm.priceId = this.isEdit ? this.priceMap[item.dicId].consultantPriceId : ''
				this.priceForm.type = this.isEdit ? this.priceMap[item.dicId].price : ''
				this.priceForm.min = this.isEdit ? this.priceMap[item.dicId].minMinutes : 5
				this.priceForm.step = this.isEdit ? this.priceMap[item.dicId].unitMinutes : 5
				this.priceForm.methodId = item.dicId
				this.priceVisible = true
			},
			submitPriceForm(formName) {
				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	this.submitLoading = true
		            	let uploadInfo, uploadUrl
		            	if (this.isEdit) { //编辑
		            		uploadInfo = {
		            			consultantPriceId: this.priceForm.priceId,
		            			price: this.priceForm.type,
		            			minMinutes: this.priceForm.min,
		            			unitMinutes: this.priceForm.step
		            		}
		            		uploadUrl = '/system/consultant/price/edit'
		            	} else { //新增
		            		uploadInfo = {
		            			consultantUserId: this.userId,
		            			methodId: this.priceForm.methodId,
		            			price: this.priceForm.type,
		            			minMinutes: this.priceForm.min,
		            			unitMinutes: this.priceForm.step
		            		}
		            		uploadUrl = '/system/consultant/price/save'
		            	}
		            	this.$axios({
		            		method: 'post',
		            		url: uploadUrl,
		            		data: this.$qs.stringify(uploadInfo)
		            	}).then(res => {
		            		let result = res.data
		            		this.submitLoading = false
		            		if (result.code == 200) {
		            			this.queryPrice()
		            			this.$message({
		            				type: 'success',
		            				message: '操作成功！'
		            			})
		            		} else {
		            			this.$message.error(result.msg)
		            		}
		            	}).catch(err => {
		            		this.$message.error(err)
		            	})
		          		this.priceVisible = false
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
			},
			// 服务项目
			changeProject(item) {
				this.dialogToolTitle = item.dicName
				this.projectForm.dicId = item.dicId
				this.projectVisible = true
			},
			submitProject() {
				let newStr = ''
				let str = this.openCategory != '' ? this.openCategory.split(',') : []
				let arr = []
				arr = str.map(function(data){  
			        return +data;  
			    }); 
				if (this.projectForm.value == 1) { //开启
					arr.push(this.projectForm.dicId)
				} else { //关闭
					let index = arr.indexOf(this.projectForm.dicId)
					arr.splice(index, 1)
				}
				newStr = ''
				this.wayList.forEach((item, index) => {
					if (arr.indexOf(item.dicId) != -1) {
						newStr += item.dicId + ','
					}
				})
				this.openCategory = newStr.substr(0, newStr.length - 1)


				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/edit',
					data: this.$qs.stringify({
						consultantId: this.$route.query.consultantId,
						methodDic: this.openCategory
					})
				}).then(res => {
					this.projectVisible = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {

					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.$message.error(err)
				})
			},
			// 套餐列表
			getSetMeal() {
				this.setMealLoading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/menu/queryForList',
					data: this.$qs.stringify({
						userId: this.userId,
						thisPage: this.pageTotal.page,
						limit: this.pageTotal.pageSize
					})
				}).then(res => {
					this.setMealLoading = false
					let result = res.data
					if (result.code == 200) {
						this.tableData = result.data.list
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 改变服务类型
			changeType(val) {
				this.priceObj.unitPrice = this.priceMap[val].price
				this.priceObj.costPrice = parseFloat(this.priceObj.unitPrice) * parseFloat(this.setMealForm.time).toFixed(2)
			},
			// 改变服务时间
			changeTime(val) {
				this.priceObj.costPrice = parseFloat(this.priceObj.unitPrice) * parseFloat(this.setMealForm.time).toFixed(2)
			},
			// 改变套餐折扣
			changeAgio() {
				this.setMealForm.inpAgio = this.setMealForm.chooseAgio
			},
			// 改变有效期
			changeOpenTime() {
				this.setMealForm.inpTime = this.setMealForm.chooseTime
			},
			// 添加套餐
			addSetMeal() {
				delete this.setMealForm.id
				this.setMealForm = {
					name: '',
					classify: '',
					serviceType: '',
					time: 0,
					min: 0,
					max: 0,
					inpAgio: 100
				},
				this.setMealVisible = true
			},
			// 编辑套餐
			edit(row) {
				this.setMealForm = {
					id: row.consultantMenuId,
					name: row.title,
					classify: row.mentalCategoryId,
					serviceType: row.methodId,
					time: row.time,
					min: row.minTime,
					max: row.maxTime,
					inpAgio: row.menuRebate
				},
				this.changeType(this.setMealForm.serviceType)
				this.setMealVisible = true
			},
			// 提交套餐
			submitSetMealForm(formName) {
				this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	if (!this.setMealForm.id) { // 新增
		            		let uploadInfo = {
		            			userId: this.userId,
		            			title: this.setMealForm.name,
		            			menuRebate: this.setMealForm.inpAgio,
		            			time: this.setMealForm.time,
		            			minTime: this.setMealForm.min,
		            			maxTime: this.setMealForm.max,
		            			type: 1,
		            			mentalCategoryId: this.setMealForm.classify,
		            			methodId: this.setMealForm.serviceType
		            		}
		            		let uploadUrl = '/system/consultant/menu/save'
		            		this.uploadSetMeal(uploadInfo, uploadUrl)
		            	} else { // 编辑
		            		let uploadInfo = {
		            			consultantMenuId: this.setMealForm.id,
		            			userId: this.userId,
		            			title: this.setMealForm.name,
		            			menuRebate: this.setMealForm.inpAgio,
		            			time: this.setMealForm.time,
		            			minTime: this.setMealForm.min,
		            			maxTime: this.setMealForm.max,
		            			type: 1,
		            			mentalCategoryId: this.setMealForm.classify,
		            			methodId: this.setMealForm.serviceType
		            		}
		            		let uploadUrl = '/system/consultant/menu/edit'
		            		this.uploadSetMeal(uploadInfo, uploadUrl)
		            	}
		          		this.setMealVisible = false
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
			},
			uploadSetMeal(info, urls) {
				this.submitLoading = true
				this.$axios({
					method: 'post',
					url: urls,
					data: this.$qs.stringify(info)
				}).then(res => {
					this.setMealVisible = false
					this.submitLoading = false
					let result = res.data
					if (result.code == 200) {
						this.getSetMeal()
						this.$message({
							type: 'success',
							message: '操作成功！'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 上下架套餐
			grounding(row, index) {
				let uploadStatus
				if (row.status == 0) {
					uploadStatus = 1
				} else {
					uploadStatus = 0
				}
				this.$axios({
					method: 'post',
					url: '/system/consultant/menu/updateStatus',
					data: this.$qs.stringify({
						consultantMenuId: row.consultantMenuId,
						status: uploadStatus
					})
				}).then(res => {
					let result = res.data
					console.log(result)
					if (result.code == 200) {
						this.tableData[index].status = uploadStatus
						this.$message({
							type: 'success',
							message: '操作成功！'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
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
	.el-pagination {
		float: right;
	}
</style>