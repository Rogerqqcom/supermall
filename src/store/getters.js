export default {
  cartLength(state) {
    //可以直接拿，当拿的次数比较多的话，可以在vuex中封装一个getters
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
