<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

    export default {
      name: "HomeSwiper",
      components: {
        Swiper,
        SwiperItem
      },
      props: {
        banners: Array,
        default: function () {
          return []
        }
      },
      data() {
        return {
          isLoad: false
        }
      },
      methods: {
        imageLoad() {
          // console.log('图片加载完成');
          // 优化: 多个图片加载只需要 发送一次事件
          if (!this.isLoad) {
            this.$emit('swiperImageLoad')
            this.isLoad = true
          }
        }
      }
    }
</script>

<style scoped>

</style>
