<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center" >商品分类</div></nav-bar>
    <div class="content">
      <!--侧边导航栏-->
      <left-list></left-list>
     <!--   右边分类 -->
       <scroll id="tab-content">
         <div>
           <tab-control
             :titles="['综合', '新品', '销量']"
           />
           <ul>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
             <li>sdkojfdsk</li>
           </ul>
         </div>
       </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";

  import leftList from "./childComps/leftList";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabControl,
      Scroll,
      leftList
    },
    data() {
      return {
        scroll: null,
      }
    }
  }


</script>

<style scoped>
  .category {
    height: 100vh;
    overflow: hidden;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  /*控制滚动内容高度*/
  #tab-content {
    height: calc(100vh - 93 - 40);
    /*height: 100%;*/
    flex: 1;
    overflow: hidden;
  }
</style>
