<template>
  <div class="bread-crumb">
      <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.meta.goto">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadCrumb',
  props: ['dataPath'],
  data () {
    return {
      levelList: []
    }
  },
  methods: {
          /**
           * 生成面包屑的方法
           */
    getBreadcrumb() {
      // let matched = this.$route.matched.filter(item => item.name)
      // const first = matched[0]
      /*if (first && first.name !== '首页') {
        matched = [{path: '/home', meta: { title: '首页' }}].concat(matched)
      }*/
      let matched = this.$route.matched
      this.levelList = matched;
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .bread-crumb {
    margin-bottom: 30px;
  }
</style>
