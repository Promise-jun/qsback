<template>
	<div>
    	角色列表：
    	<el-select v-model="value" placeholder="请选择" @change="changeVal">
		    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
		</el-select>
		
		<el-row>
		  <el-col :span="20">
		  	<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>功能列表</span>
				</div>
				<el-tree
					:data="treeData"
					show-checkbox
					default-expand-all
					:check-strictly="true"
					node-key="authorityId"
					ref="tree"	
					v-loading="loading"
					:props="defaultProps"
					@check="changeTree">
				</el-tree>
			</el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	import { formatAuthority } from 'common/js/util'

	export default {
		name: 'authorityRole',
		data() {
			return {
				loading: false,
				roleList: [], //角色列表
		        value: '',  //当前选择角色
		        treeData: [], //功能列表
		        defaultProps: {
		          children: 'children',
		          label: 'menuName'
		        }
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/sys/SysRoleAuth/findAuthList'
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						var resultData = formatAuthority(result.data.authList, 0)
						this.treeData = resultData
						this.roleList = result.data.roleList
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			changeVal() { //选择角色
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/sys/SysRoleAuth/findRoleAuths',
					data: this.$qs.stringify({
						ID: this.value
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.$refs.tree.setCheckedNodes(result.data);
					} else {
						this.$message.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			changeTree(obj, treeObj) { //改变角色功能
				let clickId = obj.authorityId
				let isCheck = treeObj.checkedKeys.findIndex((value, index, arr) => {
				  	return value == clickId
				})
				console.log(isCheck)

				if (!this.value) {
					this.$message.error('请选择角色');
					return
				}
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.box-card {
		margin: 20px 0;
	}
</style>