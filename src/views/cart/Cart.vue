<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
<!--    当state中有商品时才展示-->

    <cart-list  v-if="this.length !== 0" />
    <span v-else>Tips:当前购物车为空</span>

    <!--底部汇总-->
    <cart-bottom-bar/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'; //mapGetters为vuex提供的辅助函数

  export default {
    name: "Cart",
    data() {
      return {
        isShow: false
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //...mapGetters会将vuex中getters里面的所有方法解构到当前组件的计算属性中
      //1.数组形式，直接使用
      // ...mapGetters(['cartList'])

      //2.对象形式，可以映射为新名称
     ...mapGetters({
        length: 'cartLength',
        // list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 500;
    letter-spacing: 3px;
  }
  span {
    /*background-color: #f00;*/
    position: absolute;
    margin: 80px 65px;
    color: #d9d9d9;
    font-size: 26px;
  }
</style>
