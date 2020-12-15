const actions = {
  addCart(context, payload) {
    // 判断是否是旧商品
    return new Promise((resolve, reject) => {
      let productExist = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      if (productExist) {
        context.commit('addCounter', productExist)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }

    })

  }
}

export default actions
