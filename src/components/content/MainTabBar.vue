<template>
  <tab-bar class="tab-bar">
    <!--      显示同一个文字同一个图片 使用插槽解决 -->
    <tab-bar-item path="/home"  activeColor="red">
<!--      assets 是设置的别名 dom中使用需要加上前缀 ~-->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="首页图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="首页图片">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <!--      数据传递 -字符串-->
    <tab-bar-item path="/category" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="分类图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="分类图片">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart"  activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="购物车图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="购物车图片">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile"  activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="我的图片">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="我的图片">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  // components 是设置的别名
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

  .tab-bar {
    /*position: fixed;*/
  }
</style>
