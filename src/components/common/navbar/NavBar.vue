<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot>
    </div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nav-bar {
    /*flex 布局方式 */
    display: flex;
    height: 44px;
    /*  文字居中 */
    text-align: center;
    line-height: 44px;
    /*设置黑色阴影*/
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  }

  .left, .right {
    width: 80px;

  }

  .center {
    flex: 1;

  }
</style>
