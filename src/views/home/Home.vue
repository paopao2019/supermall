<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="scroll-content" ref="scroll"
            :probe-type="3"
            @scrollPosition="scrollPosition"
            :pull-up-load="true" @pullingUp="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--推荐信息-->
      <home-recommend :recommends="recommends"/>
      <home-feature></home-feature>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <!-- 商品 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--回到顶部按钮 .native - 监听组件根元素的原生事件。这个v-on的修饰符 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper"
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";

  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import {getHomeMultiData, getHomeGoods} from '../../network/home';
  import {debounce} from '../../common/utils'
  import {backTopMixin} from "../../mixins";
  import {BACKTOP_DISTANCE} from 'common/const.js'


  export default {
    name: "Home",
    components: {
      TabControl,
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      GoodsList,
      Scroll,
    },
    mixins: [backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        // 初始化商品数据
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 609,
        isTabFixed: false,
        savePosition: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 请求多个数据  这个地方不要放很多逻辑，逻辑都封装在 methods方法中
      this.getHomeMultiDataM()
      // 2. 请求商品数据
      this.getHomeGoodsM('pop', this.goods.pop.page + 1)
      this.getHomeGoodsM('new', this.goods.pop.page + 1)
      this.getHomeGoodsM('sell', this.goods.pop.page + 1)


    },
    mounted() {
      // 1. 监听item中图片加载完成
      /**
       * 优化：　每一张图片load完成都要 触发refresh这个动作 性能有点差 这个地方要做 防抖
       * */
        // 每次执行防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('itemImgLoad', ()=>{
        // this.$refs.scroll.refresh()
        refresh()
      })

    },
    activated() {
      // 返回到之前记录的位置
      this.$refs.scroll.bs.scrollTo(0, this.savePosition,1)
      this.$refs.scroll.bs.refresh()

    },

    deactivated() {
      // 记录之前的位置
      this.savePosition = this.$refs.scroll.bs.y
    },
    methods: {
      /**
       * 网络请求方法
       */
      getHomeMultiDataM() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch( err => {
          console.log("获取数据失败")
        })
      },
      getHomeGoodsM(type, page) {
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page

        })
      },
      /**
       *
       * 事件监听方法
       */
      tabClick(index) {
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让两个tabControl中的currentIndex保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      scrollPosition(position) {
        // 1. 监听返回按钮是否显示
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
        // 2. 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('加载的页码:' + this.goods[this.currentType].page + 1)
        this.getHomeGoodsM(this.currentType, this.goods[this.currentType].page + 1)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad() {
        // console.log('加载图片完成');
        //  赋值给tabOffsetTop
        // 所有组件都有一个属性$el, 用于获取组件中的元素 元素中都有offsetTop属性 (组件是没有offsetTop属性的)
        // 图片未加载完成会干扰 距离布局，所以需要等图片加载完成在计算距离 这里以轮播图为准
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

      }

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    background-color: #F6F6F6;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    /*元素js滚动的时候才需要 fixed 到顶端, 利用了better-scroll后 home-nav不在scroll滚动范围， 所以不需要*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 1;*/
    background-color: var(--color-tint);
    color: #FFFFFF;
  }

  /*开发到后面 这个是不能用的 */
  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px ;*/
  /*  z-index: 10;*/
  /*}*/

  .tab-control {
    position: relative;
    z-index: 9;
    margin-top: -1px;
  }
  .scroll-content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


  /*fixed 属性 在scroll 中是不不能用的 和scroll实现原理有关 translate属性*/
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
