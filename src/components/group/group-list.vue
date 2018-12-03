<template>
	<div>
    	<el-form :inline="true" :model="formObj" class="demo-form-inline">
		  <el-form-item label="创建时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
		  </el-form-item>
		</el-form>

		<el-table
		    ref="tableList"
		    stripe
		    border
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		>
		    <el-table-column label="群名称">
		      <template slot-scope="scope">{{ scope.row.groupName }}</template>
		    </el-table-column>
		    <el-table-column prop="groupType" label="群类型"></el-table-column>
			<el-table-column prop="groupHost" label="群主"></el-table-column>
			<el-table-column prop="groupNum" label="当前成员数"></el-table-column>
			<el-table-column prop="groupMaxNum" label="最大成员数"></el-table-column>
		    <el-table-column label="群头像">
		      <template slot-scope="scope">
		      	<img :src="scope.row.groupHead" class="group-head">
		      </template>
		    </el-table-column>
		    <el-table-column prop="groupgg" label="群公告" show-overflow-tooltip></el-table-column>
		    <el-table-column prop="groupjs" label="群介绍" show-overflow-tooltip></el-table-column>
		    <el-table-column prop="groupCreateTime" label="创建时间" width="150"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top">
					  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top">
					  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
					<el-tooltip content="群聊记录" placement="top">
					  <el-button @click="editRole(scope.row)" type="text" icon="iconfont icon-solution" style="color: #E6A23C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus">创建群组</el-button>
		  </el-col>
		  <el-col :span="12">
		  	<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
		  </el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'mentorlist',
		data() {
			return {
				formObj: {
					dateValue: ''
				},
		        tableList: [{
		        	groupName: '东方舵手',
		        	groupType: "共有群",
		        	groupHost: "水电费",
		          	groupNum: 10,
		          	groupMaxNum: 50,
		          	groupHead: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3725756666,851118582&fm=27&gp=0.jpg',
		          	groupgg: '123456',
		          	groupjs: '楼市带来房价来说楼市',
		          	groupCreateTime: '2018-11-15 11:15:15'
		        },{
		        	groupName: '东方舵手',
		        	groupType: "共有群",
		        	groupHost: "水电费",
		          	groupNum: 10,
		          	groupMaxNum: 50,
		          	groupHead: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3725756666,851118582&fm=27&gp=0.jpg',
		          	groupgg: '123456',
		          	groupjs: '楼市带来房价来说楼市',
		          	groupCreateTime: '2018-11-15 11:15:15'
		        }],
		        multipleSelection: []
			}
		},
		methods: {
			onSubmit() {
	        	console.log(this.formObj);
	      	},
	      	handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    }
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-pagination {
		float: right;
	}
	.group-head {
		width: 40px;
	}
</style>