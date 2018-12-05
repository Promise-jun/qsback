<template>
	<div>
		<el-table
		    ref="tableList"
		    stripe
		    border
		    v-loading="loading"
		    :data="tableList"
		    tooltip-effect="dark"
		    style="width: 100%; margin: 15px 0;"
		    @selection-change="handleSelectionChange">
		    <el-table-column type="selection"  width="50"> </el-table-column>
		    <el-table-column prop="name" label="昵称"></el-table-column>
		    <el-table-column prop="phone" label="手机号"></el-table-column>
		    <el-table-column prop="addTime" label="加入时间" width="150"></el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-tooltip content="删除" placement="top">
					  <el-button @click="delRole(scope.row)" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
					</el-tooltip>
			    </template>
		    </el-table-column>
		</el-table>

		<el-row>
		  <el-col :span="12">
		  	<el-button type="primary" icon="el-icon-circle-plus">添加用户</el-button>
		  	<el-button type="primary" icon="el-icon-delete">批量删除</el-button>
		  </el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		data() {
			return {
				loading: false,
				tableList: []
			}
		},
		created() {
			console.log(789)
		},
		methods: {
			handleSelectionChange(val) {
	      		console.log(val)
		        this.multipleSelection = val;
		    }
		}
	}
</script>