<template>
  <div>
    <div class="titles">为你推荐</div>
    <div>
      <goods-list :goods="recommends"></goods-list>
    </div>
  </div>
</template>

<script>
  import GoodsList from "../../../components/content/goods/GoodsList";
  export default {
    name: "DetailRecommendInfo",
    components: {
      GoodsList
    },
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }

  }
</script>

<style scoped>

  .titles {
    padding: 10px;
    color: black;
  }
</style>
