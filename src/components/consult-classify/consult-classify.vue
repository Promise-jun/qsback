<template>
	<el-dialog 
		title="选择咨询分类" 
		:visible.sync="visible" 
		:modal="false"
		width="60%"
		:before-close="hidePanel"
	>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form :inline="true" :model="searchUserForm" status-icon size="small" ref="searchUserForm" class="demo-form-inline">
				  	<el-form-item label="咨询分类">
				    	<el-cascader
				    		v-model="searchUserForm.way"
						  	:options="classifyList"
						  	:props="props"
						></el-cascader>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="confirm">确定</el-button>
				  	</el-form-item>
				</el-form>
				<div style="margin: 15px 0;">
					<el-tag
					  	v-for="(item, index) in wayNameList"
					  	:key="index"
					  	closable
					  	@close="closeTag(index)">
					  	{{item}}
					</el-tag>
				</div>
				<div style="text-align: right;">
				    <el-button @click="hidePanel">取 消</el-button>
				    <el-button type="primary" @click="submitClassify" :loading="submitLoading">确 定</el-button>
				</div>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script type="text/javascript">
	
	export default {
		name: 'consultClassify',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			idList: {
				type: Array,
				default: []
			},
			nameList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				searchUserForm: {
					way: []
				},
				wayList: [],
				classifyList: [],
				wayIdList: [],
				wayNameList: [],
				props: {
					label: 'dic_name',
          			value: 'dic_id',
          			children: 'children'
        		},
        		submitLoading: false
			}
		},
		created() {
			this.wayIdList = this.idList
			this.wayNameList = this.nameList
			this.$axios({
				method: 'post',
				url: '/order/intention/findIntentionNeeds'
			}).then(res => {
				let result = res.data
				if (result.code == 200) {
					this.wayList = result.data.classification
					this.classifyList = this.formatAuthority(result.data.classification, 16)
				} else {
					this.$message.error(result.msg)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			formatAuthority(list, parentId) {
			    let items= {};
			    // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
			    for (let i = 0; i < list.length; i++) {
			        let key = list[i].dic_pid;
			        if (items[key]) {
			            items[key].push(list[i]);
			        } else {
			            items[key] = [];
			            items[key].push(list[i]);
			        }
			    }
			    return this.formatTree(items, parentId);
			},
			formatTree(items, parentId) {
			    let result = [];
			    if (!items[parentId]) {
			        return;
			    }
			    for (let t of items[parentId]) {
			        t.children = this.formatTree(items, t.dic_id)
			        result.push(t);
			    }
			    return result;
			},
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
			//确定
			confirm() {
				if ( this.wayIdList.indexOf( this.searchUserForm.way.join(',') ) == -1 ) {
					this.wayIdList.push(this.searchUserForm.way.join(','))
					this.wayNameList.push(this.findItemName(this.searchUserForm.way))
				} else {
					this.$message.error('该分类已经选择了')
				}
			},
			//移除分类
			closeTag(index) {
				this.wayIdList.splice(index, 1)
				this.wayNameList.splice(index, 1)
			},
			//提交 
			submitClassify() {
				if (!this.wayIdList.length) {
					this.$message.error('咨询分类不能为空')
					return
				}
				this.$emit('submit', this.wayIdList, this.wayNameList);
			},
			findItemName(checkList) {
				let nemeArr = []
				checkList.forEach(item => {
					let newItem = this.wayList.find(value => {
						return value.dic_id == item
					})
					nemeArr.push(newItem.dic_name)
				})
				return nemeArr.join('>')
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-tag {
		margin-right: 15px;
	}
</style>