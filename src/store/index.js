import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
//1.安装插件
Vue.use(Vuex)

const state = {
    //购物车列表数据
    cartList: []
}
//2.创建store对象
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters

  /*
  * mutations 唯一的目的就是修改的state中的状态
  * mutations 中的每一个方法尽可能的完成的事件比较单一，
  * */
  /*mutations: {
    //添加商品到state中
    /!*addCart(state, payload) {
      //payload为新添加的商品
      /!*数组常用的方法有： push/pop/unshift/shift/sort/reverse/map/filter/reduce/join/find*!/
      /!*
      1.方法1
      let oldProduct = null
      for (let item of state.cartList) { //遍历cartList里面的商品
        if(item.iid === payload.iid) { //如果cartList的商品iid等于新加入的商品的iid
          oldProduct = item //将此商品赋给oldProduct这个变量
        }
      }
       if(oldProduct) { ///oldProduct有值
        oldProduct.count += 1  //让之前那个商数量加1
      } else {
        payload.count = 1 //否则（即之前没有此商品），给新的商品数量赋值为1
        //并把它添加到cartList中
        state.cartList.push(payload)
      }
      *!/
      //方法2   //查找是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct) { ///oldProduct有值
        oldProduct.count += 1  //让之前那个商数量加1
      } else {
        payload.count = 1 //否则（即之前没有此商品），给新的商品数量赋值为1
        //并把它添加到cartList中
        state.cartList.push(payload)
      }
    }*!/
/!*    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }*!/
  },*/
})

//3.挂载到Vue实例上
export default store
