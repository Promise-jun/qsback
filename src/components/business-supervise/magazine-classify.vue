<template>
	<div>
		<!-- 面包屑 -->
    	<bread-crumb :dataPath="dataPath"></bread-crumb>
		
		<el-row>
		  	<el-col :span="16">
		  		<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>杂志分类</span>
				  	</div>
				  	<el-tree
					  	:props="props"
					  	:load="loadNode"
					  	lazy
					>
						<span class="custom-tree-node" slot-scope="{ node, data }">
					        <span>{{ node.label }}</span>
					       	<span>
					          	<el-button type="text" size="mini" @click="append(data)">Append</el-button>
					          	<el-button type="text" size="mini" @click="remove(node, data)">Delete</el-button>
					        </span>
					    </span>
					</el-tree>
				</el-card>
		  	</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	import BreadCrumb from 'base/bread-crumb/bread-crumb'
	import PageNum from 'base/page-num/page-num'

	export default {
		name: 'magazineClassify',
		data() {
			return {
				dataPath: ['运营管理', '杂志管理', '杂志分类'],
				props: {
		          	label: 'title',
		          	children: 'children',
		        }
			}
		},
		methods: {
			loadNode(node, resolve) {
		        if (node.level === 0) {
		        	let data1 = [
		        		{	
		        			id: 1,
		        			title: '一级菜单1'
		        		},
		        		{
		        			id: 2,
		        			title: '一级菜单2'
		        		},
		        		{
		        			id: 3,
		        			title: '一级菜单3'
		        		}
		        	]
		          	return resolve(data1);
		        }

		        if (node.id == 2) {
		        	setTimeout(() => {
			          	const data = [{
			          		id: 4,
			            	title: '二级菜单1'
			          	}, {
			          		id: 5,
			            	title: '二级菜单2'
			          	}];

			          	return resolve(data);
			        }, 500);
		        }
			    
			    return resolve([]);
		    },
		    append(data) {
		        const newChild = { id: id++, label: 'testtest', children: [] };
		        if (!data.children) {
		          this.$set(data, 'children', []);
		        }
		        data.children.push(newChild);
		    },
		    remove(node, data) {
		        const parent = node.parent;
		        const children = parent.data.children || parent.data;
		        const index = children.findIndex(d => d.id === data.id);
		        children.splice(index, 1);
		    }
		},
		components: {
			BreadCrumb,
			PageNum
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.el-row {
		margin-top: 15px;
		& .el-pagination {
			float: right;
		}
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