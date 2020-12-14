<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        bs: null,
        message: '我是scroll'
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        // 严谨写法
        console.log(y, time)
        this.bs && this.bs.scrollTo && this.bs.scrollTo(0,0, time)
      },
      finishPullUp() {
        this.bs.finishPullUp()
      },
      refresh() {
        // console.log('刷新scroll')
        this.bs && this.bs.refresh()
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        // 注意: click button按钮可以不设置click 但是div设置一定要设置click等于true
        click: true,

      })

      // 2. 监听滚动的位置
      // 测试的这个probeType 无论设置啥都生效 所以加个判断
      if (this.probeType) {
        this.bs.on('scroll', (position) => {
          this.$emit('scrollPosition', position)
        })
      }

      // 3. 监听上拉事件
      this.bs.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

  }


</script>

<style scoped>

</style>
