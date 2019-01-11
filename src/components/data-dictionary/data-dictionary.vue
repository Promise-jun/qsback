<template>
    <article>
    	<el-row>
		 	<el-col :span="18">
		 		<el-card class="box-card">
				  	<div slot="header" class="clearfix">
				    	<span>数据字典</span>
				    	<el-button v-hasPermission="97" style="float: right; padding: 3px 0" type="text" @click="add">添加分类</el-button>
				  	</div>
				  	<el-tree
			            ref="tree"
			            node-key="dicId"
			            v-loading="loading"
			            :key="treeKey"
			            :data="data"
			            :props="defaultProps"
			            :default-expanded-keys="treeExpandedKeys"
			            :lazy="true"
			            :load="loadTreeNode"
			            @node-expand="treeExpand"
			            @node-collapse="treeCollapse">
				        <span class="custom-tree-node" slot-scope="{ node, data }">
				            <span>{{ node.label }}</span>
				            <span class="custom__tree__icons">
				                <el-tooltip class="item" effect="dark" content="新增" placement="top" v-hasPermission="97">
				                    <i class="tree-icon el-icon-plus" @click.stop="append(data)"></i>
				                </el-tooltip>
				                <el-tooltip class="item" effect="dark" content="编辑" placement="top" v-hasPermission="98">
				                    <i class="tree-icon el-icon-edit" @click.stop="edit(node, data)"></i>
				                </el-tooltip>
				                <el-tooltip class="item" effect="dark" content="删除" placement="top" v-hasPermission="99">
				                    <i class="tree-icon el-icon-close" @click.stop="remove(node, data)"></i>
				                </el-tooltip>
				            </span>
				        </span>
			        </el-tree>
				</el-card>
		 	</el-col>
		</el-row>
			        
        <el-dialog top="5vh" class="dialog" title="新增子节点" :visible.sync="isShowDlg">
            <el-form label-width="120px" ref="nodeQuery"
                     :model="nodeQuery" class="demo-form-inline" :rules="rules">
                <el-form-item label="数据名称" prop="dicName">
			      <el-input v-model="nodeQuery.dicName" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="字段注释">
			      <el-input v-model="nodeQuery.dicRemark" autocomplete="off"></el-input>
			    </el-form-item>
                <el-form-item class="btns__adjust">
                    <el-button size="medium" type="primary" @click="sure" :loading="submitLoading">确定</el-button>
                    <el-button size="medium" @click="reset">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </article>
</template>

<script>
    export default {
        data() {
            return {
            	rules: {
		          dicName: [
		            { required: true, message: '数据名称不能为空' },
		          ]
		        },
                data: [], // tree数据源
                defaultProps: { // 树相关属性设置
                    dicId: "",
                    children: "childList",
                    label: "dicName",
                    isLeaf: 'leaf'
                },
                activeData: null,   // 当前操作数据
                treeExpandedKeys: [],   // 记录打开节点的数组
                treeKey: '',    // 控制tree渲染的key
                nodeQuery: { // 编辑树节点表单的model
                    dicName: '',    
                    dicRemark: '',
                    dicPid: 0  //父类id
                },
                isShowDlg: false,    // 是否显示编辑节点弹框
                loading: false, //加载数据loading
                submitLoading: false //按钮提交loading
            }
        },
        methods: {
            // 加载树
            loadTreeNode(node, resolve) {
                this.nodeQuery.dicPid = node.parent ? node.data.dicId : 0;
                let uploadData = {
					dicPid: this.nodeQuery.dicPid,
					thisPage: 1,
					limit: 100
				}
				this.loading = true
				this.$axios({
					method: 'post',
					url: '/sys/dic/queryForList',
					data: this.$qs.stringify(uploadData)
				}).then(res => {
					this.loading = false
					const result = res.data;
                    const treeData = result.data.list;
                    if (result.code == 200 && node.level === 0) {
                        // 如果是第一次加载数据，直接返回数据
                        resolve(treeData);
                    } else if(result.code == 200) {
                        // 如果非第一次加载数据，将返回数据拼接到操作节点的childList属性中
                        node.data.childList = treeData;
                        resolve(treeData);
                    } else {
                        resolve([]);
                        this.$message({
                            type: 'error',
                            message: '加载数据出错！'
                        });
                    }
				}).catch(err => {
			    	this.loading = false
			        console.log(err)
			    })
            },

            // 添加根节点
            add() {
            	this.editType = "ADD";
            	this.isShowDlg = true;
            	// 记录当前节点数据，供新增弹框关闭后回调用
                this.activeData = {};
            },

            // 新增节点
            append(data) {
                this.editType = "ADD";
                this.isShowDlg = true;
                // 记录当前节点数据，供新增弹框关闭后回调用
                this.activeData = data;
            },

            // 移除节点
            remove(node, data) {
                this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		        	this.$axios({
				        method: 'post',
				        url: '/sys/dic/deleteForDic',
				        data: this.$qs.stringify({
				        	dicId: data.dicId,
				        	isDel: 1
				        })
				    }).then(res => {
				        let result = res.data
				        if (result.code == 200) {
				        	// 重新渲染tree
                        	this.renderTree();
				        	this.$message({
					          message: '删除成功',
					          type: 'success'
					        });
				        } else {
				        	this.$message.error(result.msg);
				        }
				    }).catch(err => {
				        console.log(err)
				    })
		        }).catch(() => {

		        });
            },

            // 编辑节点
            edit(node, data) {
                this.nodeQuery.dicName = data.dicName;
                this.nodeQuery.dicRemark = data.dicRemark;
                // 记录当前操作数据
                this.activeData = data;
                this.editType = "EDIT";
                this.isShowDlg = true;
            },

            // 新增节点回调函数
            appendCallback() {
                const data = this.activeData;
                const nodeQuery = this.nodeQuery;
                nodeQuery.dicPid = data.dicId ? data.dicId : 0;
                // 将新节点名称和父节点id传递到后台
		    	this.$axios({
			        method: 'post',
			        url: '/sys/dic/saveForDic',
			        data: this.$qs.stringify(this.nodeQuery)
			    }).then(res => {
			        let result = res.data
			        this.submitLoading = false
			        if (result.code == 200) {
			        	this.renderTree();
			        	this.isShowDlg = false;
			        	this.$message({
				          message: '添加成功',
				          type: 'success'
				        });
			        } else {
			        	this.$message.error(result.msg);
			        }
			    }).catch(err => {
			    	this.submitLoading = false
			        console.log(err)
			    })
            },

            // 编辑节点回调函数
            editCallback() {
                const data = this.activeData,
                    nodeQuery = this.nodeQuery;
                data.dicName = nodeQuery.dicName;
                data.dicRemark = nodeQuery.dicRemark;
                let uploadData = {
                	dicId: data.dicId,
                	dicName: data.dicName,
                	dicPid: data.dicPid,
                	dicRemark: data.dicRemark
                }
                // 将节点新名称和节点id传递到后台
                this.$axios({
			        method: 'post',
			        url: '/sys/dic/editForDic',
			        data: this.$qs.stringify(uploadData)
			    }).then(res => {
			        let result = res.data
			        this.submitLoading = false
			        if (result.code == 200) {
			        	this.renderTree()
			        	this.isShowDlg = false;
			        	this.$message({
				          message: '修改成功',
				          type: 'success'
				        });
			        } else {
			        	this.$message.error(result.msg);
			        }
			    }).catch(err => {
			    	this.submitLoading = false
			        console.log(err)
			    })
            },

            // 刷新key值，重新渲染tree
            renderTree() {
                this.treeKey = +new Date();
            },

            // 当节点打开时，记录下打开节点的id
            treeExpand(data, node, self) {
                this.treeExpandedKeys.push(data.dicId);
            },

            // 当节点关闭时，移除节点的id
            treeCollapse(data) {
                const index = this.treeExpandedKeys.indexOf(data.dicId);
                if (index > -1) {
                    this.treeExpandedKeys.splice(index, 1);
                }
            },

            // tree noed 新增/编辑确定事件
            sure() {
                const editType = this.editType;
                this.$refs["nodeQuery"].validate(valid => {
                    if (valid) {
                    	this.submitLoading = true
                        editType === "ADD" ? this.appendCallback() : this.editCallback();
                        this.reset();
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },

            // tree node 弹框取消事件
            reset() {
                this.activeData = null;
                this.isShowDlg = false;
                this.nodeQuery = {
                    dicName: '',
                    dicRemark: '',
                    dicPid: 0  //父类id
                };
                this.editType = "ADD";
            }
        }
    };
</script>

<style type="text/css" lang="scss" scoped>
	.custom-tree-node {
    	flex: 1;
    	display: flex;
    	align-items: center;
    	justify-content: space-between;
    	font-size: 14px;
    	padding-right: 8px;
  	}
</style>