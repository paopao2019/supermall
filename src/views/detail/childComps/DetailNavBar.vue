<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="titles">
        <span v-for="(item, index) in titles" class="title"
              :class="{'active': index===currentIndex}" @click="titleClick(index)">{{item}}  </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.go(-1)
      },

    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
  }

  .title {
    flex: 1;
  }

  .active {
    color: #00a98f;
  }

  .back img {
    margin-top: 10px;
    margin-right: 20px;
  }
</style>
