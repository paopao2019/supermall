<template>
  <div class="recommends">
    <ul>
      <li v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
        <h5>{{item.title}}</h5>

      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
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
  .recommends {
    height: 132px;
    background-color: #FFFFFF;
    padding-top: 15px;
    border-bottom: 2px solid #eee;
  }
  ul {
    display: flex;
    height: 100%;
  }

  .recommends .recommend-item {
    height: 100% ;
    flex: 1;
    margin-left: 10px;
    text-align: center;
  }

  .recommends .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
