import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from "./components/common/toast/index";
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 用到总线事件 涉及到复杂的非父子组件通信
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 安装图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png'),
  preLoad: 1.3,
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
