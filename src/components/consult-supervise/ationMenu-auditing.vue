<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
		  <el-form-item label="用户ID">
		    <el-input v-model="formObj.userId" placeholder="请输入用户ID"></el-input>
		  </el-form-item>
		  <el-form-item label="导师姓名">
		    <el-input v-model="formObj.userName" placeholder="请输入导师姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="标题">
		    <el-input v-model="formObj.title" placeholder="请输入标题"></el-input>
		  </el-form-item>
		  <el-form-item label="审核状态">
		    <el-select v-model="formObj.examineStatus" placeholder="请选择">
			    <el-option label="待审核" value="0"></el-option>
			    <el-option label="审核不通过" value="2"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '条咨询'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableData"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;">
		    <el-table-column label="姓名">
		      <template slot-scope="scope">{{ scope.row.userName }}</template>
		    </el-table-column>
		    <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
		    <el-table-column label="实际价格">
		      <template slot-scope="scope">￥{{ scope.row.marketPrice * (scope.row.menuRebate / 100) | moneyFilter }}</template>
		    </el-table-column>
		    <el-table-column label="市场价格">
		      <template slot-scope="scope">￥{{ scope.row.marketPrice | moneyFilter }}</template>
		    </el-table-column>
		    <el-table-column label="折扣">
		    	<template slot-scope="scope">{{ scope.row.menuRebate / 100 }}</template>
		    </el-table-column>
		    <el-table-column label="次数(高/低)" width="95">
		    	<template slot-scope="scope">{{ scope.row.maxTime }}/{{ scope.row.minTime }}</template>
		    </el-table-column>
		    <el-table-column prop="time" label="单次时长"></el-table-column>
		    <el-table-column prop="channel" label="渠道">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.channel == 0">情说</span>
		    		<span v-else-if="scope.row.channel == 1">天猫</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="状态">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.status == 0">未上架</span>
		    		<span v-else-if="scope.row.status == 1">上架</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="审核状态">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.examineStatus == 0">待审核</span>
		    		<span v-else-if="scope.row.examineStatus == 1">审核通过</span>
		    		<span v-else>审核不通过</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="createTm" label="创建时间" width="155">
		      <template slot-scope="scope">{{ scope.row.createTm | dateformat }}</template>
		    </el-table-column>
		    <el-table-column :label="setMealTitle" width="150">
		    	<template slot-scope="scope">
		      		<span v-if="isShowCause(scope.row)" style="color: #F56C6C;">{{scope.row.examineReason}}</span>
		      		<el-tooltip content="审核" placement="top" v-else>
						<el-button @click="auditing(scope.row)" type="text" icon="iconfont icon-filesearch"></el-button>
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
		
		<!-- 套餐审核 -->
		<el-dialog
		  	title="套餐审核"
		  	:visible.sync="setMealVisible"
		  	width="70%">
		  	<el-row class="setMeal-box">
		  		<el-col :span="24">

						<el-row>
							<el-col :span="3">
								<img class="setMeal-head" :src="setMealInfo.userImage">
							</el-col>
							<el-col :span="7">
								<p>
									<label>主题：</label>
									<span>{{setMealInfo.title}}</span>
								</p>
								<p>
									<label>咨询师姓名：</label>
									<span>{{setMealInfo.userName}}</span>
								</p>
								<p>
									<label>手机号：</label>
									<span>{{setMealInfo.userPhone}}</span>
								</p>
							</el-col>
							<el-col :span="7">
								<p>
									<label>套餐分类：</label>
									<span>{{setMealInfo.mentalCategoryName}}</span>
								</p>
								<p>
									<label>咨询类型：</label>
									<span>{{setMealInfo.methodName}}</span>
								</p>
							</el-col>
							<el-col :span="7">
								<p>
									<label>单价：</label>
									<span>{{setMealInfo.unitPrice}}元/分钟</span>
								</p>
								<p>
									<label>单次服务时间：</label>
									<span>{{setMealInfo.time}}分钟</span>
								</p>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="8">
								<p>
									<label>原价：</label>
									<span>{{setMealInfo.marketPrice}}元</span>
								</p>
								<p>
									<label>实际价格：</label>
									<span>{{setMealInfo.realPrice}}元</span>
								</p>
								<p>
									<label>折扣：</label>
									<span>{{setMealInfo.menuRebate}}%</span>
								</p>
							</el-col>
							<el-col :span="8">
								<p>
									<label>最少次数：</label>
									<span>{{setMealInfo.minTime}}次</span>
								</p>
								<p>
									<label>创建时间：</label>
									<span>{{setMealInfo.createTm | dateformat}}</span>
								</p>
								<p>
									<label>近30天咨询人数：</label>
									<span>人</span>
								</p>
							</el-col>
							<el-col :span="8">
								<p>
									<label>近30天咨询时长：</label>
									<span>小时</span>
								</p>
								<p>
									<label>近30天直播时长：</label>
									<span>小时</span>
								</p>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="24">
								<el-input
									type="textarea"
									:rows="4"
									placeholder="请填写审核不通过原因"
									v-model="refusalReason">
								</el-input>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="24">
								<el-button type="primary" @click="submitAuditing(1)">审核通过</el-button>
								<el-button type="danger" @click="submitAuditing(2)">审核不通过</el-button>
							</el-col>
						</el-row>

		  		</el-col>
		  	</el-row>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
import PageNum from "base/page-num/page-num";
import { formatDate } from "common/js/format";

export default {
  name: "ationMenuAuditing",
  data() {
    return {
      formObj: {
      	examineStatus: "0"
      }, //搜索信息
      pageTotal: { //分页数据
        total: 0,
        pageSize: 10,
        page: 1
      },
      loading: false, //表格loading
      tableData: [], //表格数据
      // 套餐审核
      setMealVisible: false,
      setMealInfo: {},
	  refusalReason: '', //审核拒绝原因 
	  setMealTitle: ''
    };
  },
  filters: {
    moneyFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = Number(value).toFixed(2); // num.toFixed(2)获取的是字符串
      return realVal;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
    	let uploadInfo = {
			userId: this.formObj.userId,
			userName: this.formObj.userName,
			title: this.formObj.title,
			examineStatus: this.formObj.examineStatus,
			thisPage: this.pageTotal.page,
			limit: this.pageTotal.pageSize
		}
		this.loading = true
		this.$axios({
			method: 'post',
			url: '/system/consultant/menu/queryForList',
			data: this.$qs.stringify(uploadInfo)
		}).then(res => {
			this.loading = false
			let result = res.data
			if (result.code == 200) {
				if (result.data.list.length) {
					this.pageTotal = {
		              total: parseInt(result.data.total),
		              pageSize: parseInt(result.data.pageSize),
		              page: parseInt(result.data.pageNum)
		            };
				}
				this.tableData = result.data.list
			} else {
				this.$message.error(result.msg)
			}
		}).catch(err => {
			this.$message.error(err)
		})
    },
    onSubmit() {
      this.getList()
    },
    // 审核套餐
    auditing(row) {
    	this.setMealVisible = true
    	this.$axios({
    		method: 'post',
    		url: '/system/consultant/menu/findExamineDetail',
    		data: this.$qs.stringify({
    			consultantMenuId: row.consultantMenuId
    		})
    	}).then(res => {
    		let result = res.data
    		if (result.code == 200) {
    			this.setMealInfo = result.data
    		} else {
    			this.$message.error(result.msg)
    		}
    	}).catch(err => {
    		console.log(err)
    	})
    },
    // 提交审核
    submitAuditing(type) {
    	let title 
    	if (type == 1) { //通过审核
    		title = '确定通过审核吗？'
    	} else { //拒绝审核
    		title = '确定拒绝审核吗？'
    		if (this.refusalReason == '') {
    			this.$message.error('请输入审核不通过原因')
    			return
    		}
    	}
    	this.$confirm(title, '提示', {
          	confirmButtonText: '确定',
          	cancelButtonText: '取消',
          	type: 'warning'
        }).then(() => {
        	this.$axios({
        		method: 'post',
        		url: '/system/consultant/menu/editExamine',
        		data: this.$qs.stringify({
        			consultantMenuId: this.setMealInfo.consultantMenuId,
        			examineStatus: type,
        			examineReason: this.refusalReason
        		})
        	}).then(res => {
        		this.setMealVisible = false
        		let result = res.data
        		if (result.code == 200) {
        			this.getList()
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
    },
    // 审核原因展示
    isShowCause(row) {
    	if (row.examineStatus == 2) {
    		this.setMealTitle = '审核原因'
    		return true
    	} else {
    		this.setMealTitle = '操作'
    		return false
    	}
    }
  },
  components: {
    PageNum
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.el-pagination {
  float: right;
}
.setMeal-box {
  & .setMeal-head {
    display: block;
    width: 84px;
    height: 84px;
  }
  & p {
    padding: 7px 0;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #303030;
  }
	& .el-row:not(:last-child) {
		margin: 0 0 20px;
	}
}
</style>