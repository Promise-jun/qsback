<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentpage"
    :page-size="pageSize"
    :layout="layout"
    background
    :total="total">
  </el-pagination>
</template>
<script>
  export default {
    name: 'pageNum',
    props: {
      pageSize: [Number, String],
      currentpage: [Number, String],
      total: [Number, String],
      options: [Object],  // 分页发生变化赋值给options
      render: [Function], // 跳转触发的请求
      layout: {
        type: String,
        default: 'prev, pager, next'
      }
    },
    methods: {
      handleSizeChange(val) {
        this.options.page = 1;
        this.options.pageSize = val;
        this.render();
      },
      handleCurrentChange(val) {
        this.options.page = val;
        this.render();
      }
    }
  };
</script>