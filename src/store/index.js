import Vue from 'vue'
import Vuex from 'vuex'


// 1. 安装插件
Vue.use(Vuex)

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// 2. 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters,
  mutations,
  actions,

})

// 3. 挂载到vue实例上
export default store
