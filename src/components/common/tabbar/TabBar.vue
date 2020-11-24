<template>
  <div id="tar-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TarBar"
}
</script>

<style scoped>

#tar-bar {
  /*按均等分 利用flex进行布局*/
  display: flex;
  background-color: #f6f6f6;
  /*让在底部*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0px -3px 1px rgba(100,100,100,0.03);
}

</style>
