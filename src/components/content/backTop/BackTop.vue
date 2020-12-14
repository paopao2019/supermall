<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>

  .back-top {
    position: fixed;
    z-index: 11;
    right: 10px;
    bottom: 50px;
  }

  .back-top img {
    width: 34px;
    height: 34px;
  }

</style>
