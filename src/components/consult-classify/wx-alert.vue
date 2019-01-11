<template>
	<el-dialog 
		title="选择小组成员" 
		:visible.sync="visible" 
		:modal="false"
		width="60%"
		:before-close="hidePanel"
	>
		<el-row :gutter="40">
			<el-col :span="12">
				<el-input
					style="margin-bottom: 15px;"
				  	placeholder="输入关键字进行过滤"
				  	v-model="filterText">
				</el-input>
				<el-tree
					ref="tree"
					v-loading="loading"
					:render-after-expand="false"
					:highlight-current="true"
				  	:props="props"
				  	:data="data"
				  	node-key="id"
				  	show-checkbox
				  	:default-checked-keys="[defaultList]"
				  	:filter-node-method="filterNode"
				  	@check-change="handleCheckChange">
				</el-tree>
			</el-col>
			<el-col :span="12" style="border-left: 1px solid #EAEAEA;">
				<p>
					<span>已选择</span>
					<span style="float: right;">共{{chooseList.length}}人</span>
				</p>
				<transition name="el-zoom-in-center">
					<div>
						<p v-for="(item, index) in chooseList" :key="item.id">
							<span>{{item.name}}</span>
							<el-button type="text" size="small" style="color: #F56C6C;" @click="delCheck(item, index)">删除</el-button>
						</p>
					</div>
				</transition>
					
			</el-col>
		</el-row>
		<span slot="footer" class="dialog-footer">
		    <el-button @click="hidePanel">取 消</el-button>
		    <el-button type="primary" @click="submitList" :loading="sendLoading">发 送</el-button>
		</span>
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
			wxList: {
				type: Array,
				default: []
			},
			sendLoading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				loading: false,
        		submitLoading: false,
        		defaultList: [], //默认选中的项
        		chooseList: [], //选择的列表
        		filterText: '',  //搜索过滤
        		props: {
		          	label: 'name',
		          	children: 'freeMentors'
		        },
		        data: [],
			}
		},
		created() {
			this.chooseList = this.wxList
			if (this.chooseList.length) {
				this.chooseList.forEach(item => {
					this.defaultList.push(item.id)
				})
			}
			this.getList()
		},
		methods: {
			getList() {
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/order/intention/findFreeTimeMentors'
				}).then(res => {
					this.loading = false
					let result = res.data
					if (result.code == 200) {
						this.data = result.data
					} else {
						this.$message.error(result.msg)
					}
				}).catch(err => {
					this.loading = false
					console.log(err)
				})
			},
			hidePanel() {
	          	this.$emit('update:visible', false)
	      	},
			//提交 
			submitList() {
				this.$emit('submit', this.chooseList);
			},
			filterNode(value, data) {
		        if (!value) return true;
		        return data.name.indexOf(value) !== -1;
		    },
			handleCheckChange(data, checked, indeterminate) {
		        // console.log(data, checked, indeterminate);
		        if (data.freeMentors) {
		        	return
		        }
		        if (checked) {
		        	this.chooseList.push(data)
		        } else {
		        	let index = this.chooseList.findIndex(item => {
		        		return item.id == data.id
		        	})
		        	this.chooseList.splice(index, 1)
		        }
		    },
		    //删除已选成员
		    delCheck(item, index) {
		    	this.$refs.tree.setChecked(item, false)
		    }
		},
		watch: {
		    filterText(val) {
		        this.$refs.tree.filter(val);
		    }
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-tag {
		margin-right: 15px;
	}
	.el-col {
		height: 280px;
		overflow-y: auto;
	}
	p {
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #303030;
		letter-spacing: 0.39px;
		overflow: hidden;
		& span {
			float: left;
			line-height: 32px;
		}
		& .el-button {
			font-size: 16px;
			float: right;
		}
	}
</style>