<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
		  <el-form-item label="情说号">
		    <el-input v-model="formObj.userCode" placeholder="请输入情说号"></el-input>
		  </el-form-item>
		  <el-form-item label="昵称">
		    <el-input v-model="formObj.nickName" placeholder="请输入昵称"></el-input>
		  </el-form-item>
		  <el-form-item label="姓名">
		    <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="导师状态">
		    <el-select v-model="formObj.status" placeholder="请选择">
			    <el-option label="可用" value="0"></el-option>
			    <el-option label="禁用" value="1"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		    <el-button type="success" @click="synchro" icon="el-icon-circle-plus">同步</el-button>
		  </el-form-item>
		</el-form>

		<el-alert :title="'总计' + pageTotal.total + '个导师'" type="warning" :closable="false"></el-alert>

		<el-table
		    ref="tableList"
		    stripe
		    border
		    size="mini"
		    v-loading="loading"
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column prop="userCode" label="情说号"></el-table-column>
		    <el-table-column label="姓名">
		    	<template slot-scope="scope">
		      		<router-link v-if="findPermission(33)" target="_blank" :to="{path:'/mentor/mentorDetail', query:{consultantId: scope.row.consultantId}}">{{ scope.row.userName }}</router-link>
		      		<span v-else>{{ scope.row.userName }}</span>
		      	</template>
		    </el-table-column>
		    <el-table-column prop="userAge" label="年龄"></el-table-column>
		    <el-table-column label="性别">
		    	<template slot-scope="scope">
					<span v-if="scope.row.userSex == 0">未知</span>
					<span v-else-if="scope.row.userSex == 1">男</span>
					<span v-else="scope.row.userSex == 2">女</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="city" label="所在城市"></el-table-column>
		    <el-table-column prop="userNickname" label="昵称"></el-table-column>
		    <el-table-column prop="enterTime" label="入驻时间" width="155">
		    	<template slot-scope="scope">
		    		{{scope.row.createTm | dateformat}}
		    	</template>
		    </el-table-column>
		    <!-- <el-table-column prop="zxtimelen" label="30天咨询时长"></el-table-column> -->
		    <!-- <el-table-column prop="zxnum" label="30天咨询人数"></el-table-column> -->
		    <!-- <el-table-column prop="ywss" label="业务所属"></el-table-column> -->
		    <el-table-column label="是否推荐">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.recommend == 0">不推荐</span>
					<span v-else-if="scope.row.recommend == 1">推荐</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="操作" width="90">
		    	<!-- <template slot-scope="scope">
						<el-tooltip content="推荐" placement="top" v-if="scope.row.recommend == 0">
						  <el-button @click="isRecommend(scope.row, scope.$index)" type="text" icon="iconfont icon-like"></el-button>
						</el-tooltip>
						<el-tooltip content="不推荐" placement="top" v-else>
						  <el-button @click="isRecommend(scope.row, scope.$index)" type="text" icon="iconfont icon-unlike" style="color: #909399;"></el-button>
						</el-tooltip>
				    </template> -->
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button v-hasPermission="32" type="primary" size="small" icon="el-icon-circle-plus" @click="addMentor">申请导师</el-button>
		  	<!-- <el-button type="primary" size="small" icon="el-icon-refresh">更新IM账号</el-button> -->
		  </el-col>
		  <el-col :span="12">
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

		<!-- 选择用户 -->
		<synchro-tutor :visible.sync="synchroVisible" @confirm="confirmSynchro"></synchro-tutor>
	</div>
</template>

<script type="text/javascript">
	import PageNum from 'base/page-num/page-num'
	import SynchroTutor from 'components/choose-user/synchro-tutor'

	export default {
		name: 'mentorlist',
		data() {
			return {
				loading: false,
				pageTotal: { //分页数据
			        total: 0,
			        pageSize: 15,
			        page: 1
			    },
				formObj: {
					userid: '',
					userCode: '',
					name: '',
					nickName: '',
					status: '0',  //服务人员状态
				},
		        tableList: [],
		        multipleSelection: [],
		        // 同步导师
		        synchroVisible: false
			}
		},
		created() {
			this.getList()
		},
		methods: {
			// 权限控制
		    findPermission(val) {
			    let permissionList = this.$route.meta.permission
			    if(permissionList && permissionList.length){
			        let isShow = permissionList.findIndex(item => {
			            return item.id == val
			        })
			        if (isShow == -1) {
			            return false
			        } else {
			            return true
			        }
			    } else {
			        return false
			    }
		    },
			getList() {
				let uploadData = {
					thisPage: this.pageTotal.page,
					limit: this.pageTotal.pageSize,
					userCode: this.formObj.userCode,
					nickName: this.formObj.nickName,
					realName: this.formObj.name,
					status: this.formObj.status
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/consultant/queryForList',
					data: this.$qs.stringify(uploadData)
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
			        	this.tableList = result.data.list
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
			},
			onSubmit() {
	        	this.getList()
	      	},
	      	handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    },
		    //申请导师
		    addMentor() {
		    	let {href} = this.$router.resolve({
		    		path: '/mentor/addMentor'
		    	});
				window.open(href, '_blank');
		    },
		    // 同步
		    synchro() {
		    	this.synchroVisible = true
		    },
		    // 确认同步
		    confirmSynchro() {
		    	this.synchroVisible = false
		    }
		},
		components: {
			PageNum,
			SynchroTutor
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, .5);
	}
</style>