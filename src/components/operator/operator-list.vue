<template>
  <div>
    <el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
      <el-form-item label="用户名">
        <el-input v-model="formObj.userAccount" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formObj.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formObj.role" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in roleArr"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formObj.status" placeholder="请选择">
          <el-option label="可用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
      </el-form-item>
    </el-form>

    <el-alert :title="'总计' + pageTotal.total + '个后台用户'" type="warning" :closable="false"></el-alert>

    <el-table
      ref="tableList"
      stripe
      border
      size="mini"
      v-loading="loading"
      :data="tableList"
      tooltip-effect="dark"
      style="width: 100%; margin: 15px 0;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">{{ scope.row.userAccount }}</template>
      </el-table-column>
      <el-table-column prop="userNickname" label="昵称"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column prop="userPhone" label="手机号"></el-table-column>
      <el-table-column prop="userCode" label="关联的用户情说号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" v-hasPermission="40">
            <el-button @click="edit(scope.row)" size="mini" type="text" icon="iconfont icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" v-hasPermission="67">
            <el-button @click="del(scope.row, scope.$index)" size="mini" type="text" icon="iconfont icon-delete" style="color: #F56C6C;"></el-button>
          </el-tooltip>
          <!-- <el-tooltip content="创建IM账号" placement="top">
            <el-button
              @click="create(scope.row)"
              type="text"
              icon="iconfont icon-file-markdown"
              style="color: #67C23A;"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="关联用户账号" placement="top">
            <el-button
              @click="associate(scope.row)"
              type="text"
              icon="iconfont icon-deploymentunit"
              style="color: #E6A23C;"
            ></el-button>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :span="12">
        <el-button v-hasPermission="39" type="primary" icon="el-icon-circle-plus" size="small" @click="addUser">添加用户</el-button>
        <!-- <el-button type="primary" icon="el-icon-circle-plus">分组</el-button> -->
      </el-col>
      <el-col :span="12">
        <page-num
          v-if="pageTotal.total > pageTotal.pageSize"
          :currentpage="pageTotal.page"
          :total="pageTotal.total"
          :pageSize="pageTotal.pageSize"
          :render="getList"
          :options="pageTotal"
        ></page-num>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="associateVisible" width="40%">
      <el-form :model="associateForm">
        <el-form-item label="输入情说号" label-width="100px">
          <el-input v-model="associateForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="associateVisible = false">取 消</el-button>
        <el-button type="danger" @click="associateVisible = false">取消关联</el-button>
        <el-button type="primary" @click="associateVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
import PageNum from "base/page-num/page-num";

export default {
  name: "mentorlist",
  data() {
    return {
      pageTotal: {
        //分页数据
        total: 0,
        pageSize: 15,
        page: 1
      },
      formObj: {
        userAccount: "",
        name: "",
        role: "",
        status: "0" //服务人员状态
      },
      roleArr: [],
      tableList: [],
      multipleSelection: [],
      // 关联用户账号
      associateVisible: false,
      associateForm: {},
      loading: false
    };
  },
  created() {
    //打开页面时加载一次
    this.roleList(); //获取角色
    this.getList();
  },
  methods: {
    roleList() {
      //获取角色
      this.$axios({
        method: "post",
        url: "/system/sysRole/queryForList",
        data: this.$qs.stringify({
          thisPage: 1,
          limit: 50
        })
      })
        .then(res => {
          let result = res.data;
          if (result.code == 200) {
            this.roleArr = result.data.list;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    getList() {
      let uploadData = {
        userType: 2,
        thisPage: this.pageTotal.page,
        limit: this.pageTotal.pageSize,
        userAccount: this.formObj.userAccount,
        userName: this.formObj.name,
        roleId: this.formObj.role,
        isDel: this.formObj.status
      };
      this.loading = true;
      this.$axios({
        method: "post",
        url: "/system/user/queryForListStaff",
        data: this.$qs.stringify(uploadData)
      })
        .then(res => {
          this.loading = false;
          let result = res.data;
          if (result.code == 200) {
            if (result.data.list.length) {
              this.pageTotal = {
                total: parseInt(result.data.total),
                pageSize: parseInt(result.data.pageSize),
                page: parseInt(result.data.pageNum)
              };
            }
            this.tableList = result.data.list;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    addUser() {
      //添加用户
      this.$router.push({
        path: "/operator/list/addOperator"
      });
    },
    edit(row) {
      //编辑用户
      this.$router.push({
        path: "/operator/list/editOperator",
        query: {
          userId: row.userId
        }
      });
    },
    //用户删除
    del(row, index) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/system/user/deleteForStaff",
            data: this.$qs.stringify({
              userId: row.userId
            })
          })
            .then(res => {
              let result = res.data;
              if (result.code == 200) {
                this.tableList.splice(index, 1)
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          tableList.data.splice(idnex, 1);
        })
        .catch(() => {});
    },
    onSubmit() {
      this.getList();
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 关联用户账号
    associate(row) {
      this.associateVisible = true;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "operatorlist") {
        this.getList();
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>