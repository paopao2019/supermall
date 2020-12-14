<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scrollPosition="scrollPosition">
      <!--轮播图-->
      <detail-swiper :top-images="topImages" class="detail-swiper"></detail-swiper>
      <!--这个商品的基本信息 价格 销量 收藏等信息-->
      <detail-base-info :goods="goodsInfo" ref="goods"></detail-base-info>
      <!--这个商品的店铺信息 总销量 全部宝贝 商店评分等-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--此商品的详情 如:　商品的介绍和穿着效果多图片-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!--商品参数 如衣服的长度尺寸 -->
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <!-- 评论信息 -->
      <detail-comment-info :comment-info="commentInfo" class="detail-comment-info" ref="comment"></detail-comment-info>
      <!-- 推荐信息 这个作品里的推荐信息 只是展示 图片不能点击-->
      <detail-recommend-info :recommends="recommends" class="detail-recommends-info" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" ></detail-bottom-bar>
    <!--回到顶部按钮 .native - 监听组件根元素的原生事件。这个v-on的修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import {getDetail, DetailGoods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "../../components/content/backTop/BackTop";


  export default {
    name: "Detail",
    components: {
      DetailRecommendInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [0, 0, 0, 0],  // 默认初始值
        currentIndex: 0,
        isShowBackTop: false,
        tabOffsetTop: 609,
      }
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.bs.refresh()
        // 图片加载完成后 获取title的offsetTop才是正确的  -> 后面优化 这里最好子组件里不做事件判断，用防抖函数
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      },
      titleClick(index) {
        // 滚动到主题标题位置
        this.$refs.scroll.bs.scrollTo(0, -this.themeTopYs[index],200)
      },
      scrollPosition(position) {
        // console.log(position);
        const positionY = -position.y
        // 判断滚动到的位置
        // [0, 6213, 7015, 7230]
        /*
        0 - 6213  到  index = 0
        =6213 - 7015 到 index = 1
        =7015 - 7230 到 index = 2
        =7230-          index = 3
         */
        const len = this.themeTopYs.length
        for (let i=0; i<len; i++) {
          if (this.$refs.nav.currentIndex !== i && positionY < this.themeTopYs[i+1] && positionY >= this.themeTopYs[i] ||
            (i === len -1 && positionY > this.themeTopYs[len -1] && this.$refs.nav.currentIndex !== i)) {
            console.log(i)
            this.$refs.nav.currentIndex = i
          }
        }
        // 1. 控制返回按钮是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      backClick() {
        console.log('点击回到顶部');
        // console.log(this.$refs.scroll.message);
        this.$refs.scroll.scrollTo(0, 0)
      },

      addToCart() {
        console.log('detail 购物车')
        // 1. 获取购物车需要展示的信息 加入购物车
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        // 最低价格 这里作为购物车的真实价格
        product.price = this.goodsInfo.lowNowPrice
        product.iid = this.iid

        console.log(product)
        // 2. 将商品加入购物车中
        this.$store.dispatch('addCart', product)
      }

    },
    created() {
      // 1. 保存存入的id
      this.iid = this.$route.params.iid
      // 2. 详情数据请求
      getDetail(this.iid).then(res => {
        const data = res.result
        // 2.1 获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages
        console.log(res)
        // 2.2. 获取商品详细信息
        this.goodsInfo = new DetailGoods(data.itemInfo, data.columns, data.shopInfo.services);
        // 2.3.获取店铺/商店信息
        this.shop = new Shop(data.shopInfo);
        // 2.4.获取商品的详细信息
        this.detailInfo = data.detailInfo;
        // 2.5 获取商品的参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 2.6 评论信息
        if (data.rate.cRate !== 0 )  {
          this.commentInfo = data.rate.list[0];
        }
      }).catch(err => {
        console.log('网络请求异常')

      })
      // 2.7 推荐信息
      getRecommend().then((res) => {
        this.recommends = res.data.list
      })
    }

  }
</script>

<style scoped>

  .detail-swiper {
    height: 300px;
  }

  #detail {
    height: 100vh;
    position: relative;
    /* 把全局的的tarbar给隐藏掉*/
    z-index: 1;
    background-color: #fff;
  }

  .detail-content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;

   /*用计算的高度设置长度 100% 是相对父高度100%*/
   /* height: calc(100% - 49px);*/
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-comment-info, .detail-recommends-info {
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
  }

</style>
