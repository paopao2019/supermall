const actions = {
  addCart(context, payload) {
    // 判断是否是旧商品
    let productExist = context.state.cartList.find(function (item) {
      return item.iid === payload.iid
    })

    if (productExist) {
      context.commit('addCounter', productExist)
    } else {
      payload.count = 1
      context.commit('addToCart', payload)

    }
  }
}

export default actions
