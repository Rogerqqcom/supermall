import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mustation-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    //添加商品时的默认选中属性
    payload.checked = true

    state.cartList.push(payload)
  }
}
