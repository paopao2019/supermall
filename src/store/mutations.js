const mutations = {
  // mutations 唯一目的就是修改state中的状态
  // mutations 中的每一个方法尽可能完成一个功能 完成的事件单一
  addToCart(state, payload) {
    // 默认是选中的
    payload.checked = true
    state.cartList.push(payload)
  },
  addCounter(state, payload) {
    payload.count ++
  }
}

export default mutations



