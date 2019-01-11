<template>
	<div>
    	选择角色：
    	<el-select v-model="value" placeholder="请选择" @change="changeVal">
		    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
		</el-select>
		
		<el-row>
		  <el-col :span="20">
		  	<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>功能列表</span>
				    <el-button v-hasPermission="56" style="float: right; padding: 3px 0" type="text" @click="preserve">保存修改</el-button>
				</div>
				<el-tree
					:data="treeData"
					show-checkbox
					default-expand-all
					:check-strictly="true"
					node-key="authorityId"
					ref="tree"	
					:expand-on-click-node="false"
					v-loading="loading"
					:props="defaultProps">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span class="custom__tree__icons" v-if="data.dataUrl.indexOf('queryForList') != -1">
			                <el-input v-model="data.ruleSql" class="sql-input" placeholder="请输入SQL"></el-input>
			            </span>
					</span>
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
		        },
		        list: [] //权限列表（一级）
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
					url: '/system/roleauth/findRoleAndAuth'
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						result.data[1].forEach(item => {
							item.ruleSql = ''
							this.list.push(item)
						})
						var resultData = formatAuthority(this.list, 0)
						this.treeData = resultData
						this.roleList = result.data[0]
					} else {
						console.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			changeVal(val) { //选择角色
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/system/roleauth/queryForList',
					data: this.$qs.stringify({
						roleId: val,
						thisPage: 1,
						limit: 200
					})
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.list.forEach(item => {
							result.data.list.forEach(v => {
								if (item.authorityId == v.authorityId) {
									item.ruleSql = v.ruleSql
								}
							})
						})
						this.$refs.tree.setCheckedNodes(result.data.list);
					} else {
						console.error(result.msg);
					}
				}).catch(err => {
			        console.log(err)
			    })
			},
			//改变角色功能(单次提交)
			changeTree(obj, treeObj) { 
				let clickId = obj.authorityId
				let isCheck = treeObj.checkedKeys.findIndex((value, index, arr) => {
				  	return value == clickId
				})
				
				let isdel, urls
				if (isCheck == -1) {
					isdel = 1
					urls = '/system/roleauth/delete'
				} else {
					isdel = 0
					urls = '/system/roleauth/save'
				}

				if (!this.value) {
					this.$message.error('请选择角色');
					return
				}

				this.$axios({
					method: 'post',
					url: urls,
					data: this.$qs.stringify({
						roleId: this.value,
						authorityId: clickId,
						isDel: isdel
					})
				}).then(res => {
					let result = res.data
					if (result.code == 200) {
						this.$message({
							type: 'success',
							message: '操作成功'
						})
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//改变角色功能(集合提交)
			preserve() {
				if (!this.value) {
					this.$message.error('请选择角色');
					return
				}

				if (!this.$refs.tree.getCheckedNodes().length) {
					this.$message.error('请至少选择一个权限');
					return
				}

				let jsonList = []
				this.$refs.tree.getCheckedNodes().forEach(item => {
					jsonList.push({
						roleId: this.value,
						authorityId: item.authorityId,
						ruleSql: item.ruleSql
					})
				})

				let strList = JSON.stringify(jsonList)
				this.$confirm('确定要修改吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.loading = true
		        	this.$axios({
						method: 'post',
						url: '/system/roleauth/saveBatch',
						data: this.$qs.stringify({
							list: strList
						})
					}).then(res => {
						this.loading = false
						let result = res.data
						if (result.code == 200) {
							this.$message({
					            type: 'success',
					            message: '修改成功!'
					        });
						} else {
							console.error(result.msg)
						}
					}).catch(err => {
						this.loading = false
						console.log(err)
					})
		        }).catch(() => {    

		        });
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.box-card {
		margin: 20px 0;
	}
	.custom-tree-node {
    	flex: 1;
    	display: flex;
    	align-items: center;
    	justify-content: space-between;
    	font-size: 14px;
    	padding-right: 8px;
  	}
</style>

<style type="text/css" lang="scss">
	.sql-input input {
		width: 350px;
		height: 22px;
	}
</style>