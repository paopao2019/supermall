<template>
  <div class="toast"  v-show="isShowToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShowToast: false
      }
    },
    methods: {
      show(message='默认值', duration = 2000) {
        this.isShowToast = true
        this.message = message

        setTimeout(() => {
          this.isShowToast = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    /*保证永远在最外层*/
    z-index: 999;
    /*水平左右居中*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: rgba(0,0,0,.8);
    color: #FFFFFF;
    padding: 8px 10px;
    border-radius: 20px;
  }
</style>
