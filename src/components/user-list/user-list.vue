<template>
  <div style="overflow: hidden;">
    <el-form :inline="true" :model="formObj" class="demo-form-inline" size="small">
      <el-form-item label="情说号">
        <el-input v-model="formObj.userCode" placeholder="请输入情说号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formObj.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formObj.userNickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="渠道">
		    <el-select v-model="formObj.canal" placeholder="请选择">
		  			    <el-option v-for="item in canalArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
      </el-form-item>-->
      <!-- <el-form-item label="客服">
		    <el-select v-model="formObj.kefu" placeholder="请选择">
		  			    <el-option v-for="item in kefuArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
      </el-form-item>-->
      <!-- <el-form-item label="账户属性">
		    <el-select v-model="formObj.attr" placeholder="请选择">
		  			    <el-option v-for="item in attrArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  			</el-select>
      </el-form-item>-->
      <!-- <el-form-item label="注册时间">
		    <el-date-picker 
		    	v-model="formObj.dateValue" 
		    	type="daterange" 
		    	range-separator="-" 
		    	start-placeholder="开始日期" 
		    	end-placeholder="结束日期">
		    </el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-circle-plus">查询</el-button>
      </el-form-item>
    </el-form>

    <el-alert :title="'总计' + pageTotal.total + '个用户'" type="warning" :closable="false"></el-alert>

    <el-table
      ref="userlist"
      stripe
      border
      size="mini"
      v-loading="loading"
      :data="userList"
      tooltip-effect="dark"
      style="width: 100%; margin: 15px 0;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="情说号" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <router-link
            v-if="findPermission(31)"
            target="_blank"
            :to="{path:'/userlist/userDetail', query:{userCode: scope.row.userCode}}"
          >{{ scope.row.userCode }}</router-link>
          <span v-else>{{ scope.row.userCode }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userNickname" label="昵称"></el-table-column>
      <el-table-column prop="createTm" label="注册时间" width="155">
        <template slot-scope="scope">{{ scope.row.createTm | formatDate }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="userSourceName" label="渠道"></el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">￥{{ scope.row.moneyBalance | moneyFilter }}</template>
      </el-table-column>
      <el-table-column prop="goldBalance" label="金币"></el-table-column>
      <el-table-column prop="createNm" label="客服"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" v-hasPermission="30">
            <el-button size="mini" @click="edit(scope.row)" type="text" icon="iconfont icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip content="禁用" placement="top" v-hasPermission="58" v-if="scope.row.isDel == 0">
            <el-button size="mini" @click="del(scope.row, scope.$index)" type="text" icon="iconfont icon-lock" style="color: #F56C6C;"></el-button>
          </el-tooltip>
          <el-tooltip content="启用" placement="top" v-hasPermission="58" v-else>
            <el-button size="mini" @click="del(scope.row, scope.$index)" type="text" icon="iconfont icon-unlock" style="color: #67C23A;"></el-button>
          </el-tooltip>
          <!-- <el-tooltip content="分配客服" placement="top">
            <el-button size="mini" @click="allot(scope.row)" type="text" icon="iconfont icon-cluster" style="color: #00A5FF;"></el-button>
          </el-tooltip> -->
          <el-tooltip content="重置密码" placement="top" v-hasPermission="59">
            <el-button size="mini" @click="changePass(scope.row)" type="text" icon="iconfont icon-edit-square" style="color: #F56C6C;"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :span="12">
          <el-button v-hasPermission="11" type="primary" size="small" icon="el-icon-circle-plus" @click="addUser">添加用户</el-button>
          <!-- <el-button type="primary" size="small" icon="el-icon-circle-plus">添加IM账号</el-button> -->
          <!-- <el-button type="primary" size="small" icon="el-icon-rank" @click="batchAllot()">批量分配客服</el-button> -->
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

    <!-- 申请导师或主播 -->
    <el-dialog title="提示" :visible.sync="applicationVisible" width="30%">请选择：
      <el-select v-model="application" placeholder="请选择">
        <el-option label="申请导师" value="1"></el-option>
        <el-option label="申请主播" value="2"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applicationVisible = false">取 消</el-button>
        <el-button type="primary" @click="applicationVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配客服 -->
    <el-dialog title="提示" :visible.sync="kefuVisible" width="30%">客服：
      <el-select v-model="kefu" placeholder="请选择">
        <el-option label="无" value="0"></el-option>
        <el-option label="客服一号" value="1"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="kefuVisible = false">取 消</el-button>
        <el-button type="primary" @click="kefuVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog title="提示" :visible.sync="passVisible" width="30%">
      <el-input v-model="passObj.userPassword" placeholder="请输入新密码"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passVisible = false">取 消</el-button>
        <el-button type="primary" @click="editpass">确 定</el-button>
      </div>
    </el-dialog>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
import PageNum from "base/page-num/page-num";
import { formatDate } from "common/js/format";

export default {
  name: "userlist",
  data() {
    return {
      loading: false,
      formObj: {
        userCode: "",
        userName: "",
        userNickname: ""
      },
      userList: [],
      multipleSelection: [],
      pageTotal: {
        //分页数据
        total: 0,
        pageSize: 15,
        page: 1
      },
      application: "1", //申请导师或主播
      applicationVisible: false,
      kefu: "0", //分配客服
      kefuVisible: false,
      passObj: {
        userId: "",
        userPassword: "" //重置密码
      },
      passVisible: false
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    moneyFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = Number(value).toFixed(2); // num.toFixed(2)获取的是字符串
      return realVal;
    }
  },
  created() {
    this.getList();
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
        userType: 0,
        thisPage: this.pageTotal.page,
        limit: this.pageTotal.pageSize,
        userCode: this.formObj.userCode,
        userName: this.formObj.userName,
        userNickname: this.formObj.userNickname
      };
      this.loading = true;
      this.$axios({
        method: "post",
        url: "/system/user/queryForList",
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
            this.userList = result.data.list;
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
        path: "/userlist/addUser"
      });
    },
    edit(row) {
      //编辑用户
      this.$router.push({
        path: "/userlist/editUser",
        query: {
          userCode: row.userCode
        }
      });
    },
    del(row, index) {
      let title, isdel
      if (row.isDel == 0) { //启用
        title = '是否禁用该用户？'
        isdel = 1
      } else { //禁用
        title = '是否启用该用户？'
        isdel = 0
      }
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/system/user/deleteForUser",
            data: this.$qs.stringify({
              userId: row.userId,
              isDel: isdel
            })
          })
            .then(res => {
              let result = res.data;
              if (result.code == 200) {
                this.userList[index].isDel = isdel
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    onSubmit() {
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.map(v => {
        this.multipleSelection.push(v.userId);
      });
    },
    add(row) {
      //添加导师或主播
      this.applicationVisible = true;
    },
    allot(row) {
      //分配客服
      this.kefuVisible = true;
    },
    changePass(row) {
      //重置密码
      this.passVisible = true;
      this.passObj.userId = row.userId;
    },
    //提交密码修改
    editpass() {
      this.$axios({
        method: "post",
        url: "/system/user/editForPassword",
        data: this.$qs.stringify(this.passObj)
      })
        .then(res => {
          let result = res.data;
          if (result.code == 200) {
            this.$message.success("密码修改成功");
            this.passVisible = false;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    batchAllot() {
      //批量分配客服
      if (!this.multipleSelection.length) {
        this.$message.error("请至少选择一项");
        return;
      }
      this.kefuVisible = true;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "userlist") {
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

<style type="text/css">
  .el-table .el-loading-mask {
    z-index: 50;
  }
</style>