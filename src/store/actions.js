import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mustation-types";


export default {
  addCart(context, payload) {
    //这里是异步操作，可以返回一个Promise对象
   return new Promise((resolve, reject) => {
     //1.查找之前数组中是否有该商品
     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
     //2.判断oldProduct
     if(oldProduct) { ///oldProduct有值
       // oldProduct.count += 1  //让之前那个商数量加1
       context.commit(ADD_COUNTER, oldProduct)
       resolve('当前的商品数量+1')
     } else {//添加新的商品
       payload.count = 1 //否则（即之前没有此商品），给新的商品数量赋值为1
       //并把它添加到cartList中
       context.commit(ADD_TO_CART, payload)
       resolve('添加了新的商品')
     }
    })
  }
}
