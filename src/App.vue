<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>

  import MainTabBar from 'components/content/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
  }
}
</script>

<style>
  /*assets是个别名 已经配置过了*/
  @import "assets/css/base.css";
</style>
