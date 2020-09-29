<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">个人信息</div></nav-bar>
    <user-info/>
    <account-info/>
    <normal-list-view :list-item="orderList"/>
    <normal-list-view :list-item="serviceList"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import userInfo from "./childComps/userInfo";
  import AccountInfo from "./childComps/AccountInfo";
  import NormalListView from "./childComps/NormalListView";

    export default {
      name: "Profile",
      components: {
        NavBar,
        userInfo,
        AccountInfo,
        NormalListView
      },
      data() {
        return {
          orderList: [
              {icon: 'message.svg', info: '我的消息'},
              {icon: 'pointer.svg', info: '积分商城'},
              {icon: 'vip.svg', info: '会员卡'},
            ],
          serviceList: [
              {icon: 'cart.svg', info: '我的购物车'},
              {icon: 'shopping.svg', info: '下载购物APP'},
            ]
        }
      }
    }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
