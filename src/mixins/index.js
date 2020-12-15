
// 什么是mixins（混入）？
// mixins是对vue组件的一种扩展，将一些公用的常用数据或者方法，构建一个可被混入的数据结构，
// 被不同的vue组件进行合并，就可以在不同的vue组件中使用相同的方法或者基础数据。


import BackTop from "../components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      // console.log('点击回到顶部');
      // console.log(this.$refs.scroll.message);
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}
