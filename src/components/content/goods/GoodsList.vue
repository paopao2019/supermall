<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods-item="item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }

  }
</script>

<style scoped>

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-left: 3px;
    padding-right: 3px;

  }
</style>
