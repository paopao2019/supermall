<template>
  <div id="app">
    <!--让Home不要随意销毁掉 但是用了better-scroll的 还是需要进一步防止 需要定位记录每次离开的 positon-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

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
