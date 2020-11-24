<template>
  <div class="tar-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot  name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  },
  computed: {
    isActive() {
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果没有找到匹配的字符串则返回 -1, 找到则为0
      return this.$route.path.indexOf(this.path) == 0
      // return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // js中的三目运算符
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
.tar-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tar-bar-item img {
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}

.tar-bar-item .active {
  color: red;
}
</style>
