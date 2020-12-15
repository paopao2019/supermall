import Toast from "./Toast";

// 把toast变成一个插件，用起来更简单 Vue.use安装好后
// 引用只需要使用 this.$toast.show('message') 即可弹出需要的消息
// 因为很多地方都需要使用弹框 所以需要使用起来越简单越好 -> 如果当成传统组件使用则用起来比较麻烦

const obj = {}

// 插件的引用会之间执行 .install
obj.install = function (Vue) {
  console.log('toast 执行 install')
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2. new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor()

  // 3. 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4. toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  // 原型上定义它们使其在每个 Vue 的实例中可用(全局)
  Vue.prototype.$toast = toast
}

export default obj
