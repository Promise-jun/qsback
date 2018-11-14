<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  	  <el-breadcrumb-item v-for="(item, index) in dataPath" :key="index">{{ item }}</el-breadcrumb-item>
  	</el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadCrumb',
  props: ['dataPath'],
  data () {
    return {
      
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
