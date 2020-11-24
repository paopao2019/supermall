<template>
<div>
  <h2>我是首页</h2>
  <p>我是首页内容</p>

<!--  嵌套路由-->
  <router-link to="/home/news">新闻</router-link>
  <router-link to="/home/message">消息</router-link>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "Home",
  created() {
    console.log('home 创建');
  },
  destroyed() {
    console.log('home 销毁');
  }

}
</script>

<style scoped>

</style>
