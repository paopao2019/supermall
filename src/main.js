import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

// 用到总线事件 涉及到复杂的非父子组件通信
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
