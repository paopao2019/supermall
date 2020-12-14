<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <!--计算底部-->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  // mapGetters是个辅助函数 直接将vuex里的getter转成计算属性
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 哪些get要转成计算属性 有两种用法，这是其中一种，名字相同的对应方式
      // 使用对象展开运算符将getter混入computed对象中
      ...mapGetters(['cartLength']),
      cartList() {
        return this.$store.state.cartList
      }
    }
}
</script>

<style scoped>

  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: #d9441f;
    font-size: 16px;
    color: #FFFFFF;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
