<template>
  <div class="goods-item" @click="toDetail">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{GoodsItem.title}}</p>
      <span class="price">{{GoodsItem.price}}</span>
      <span class="collect">{{GoodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      GoodsItem: {
        type: Object,
        default() {
          return {}
        }

      }
    },
    computed: {
      showImage() {
        // home首页中的数据key是img 在推荐中的数据手image
        return this.GoodsItem.image|| this.GoodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        // 把事件放入总线
        this.$bus.$emit('itemImgLoad')
      },
      toDetail() {
        // js代码是线路由跳转
        this.$router.push('/detail/' + this.GoodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
