<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button @click="test">调试</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    test() {
      this.$axios({
        method: 'post',
        url: '/system/user/findAccount',
        data: this.$qs.stringify({
          name: 'pan'
        })
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
