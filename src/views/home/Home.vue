<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <featrue-view class="fv"/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      />
      <!--    <good-list :goods="goods[currentTyep].list"/>-->
      <good-list :goods="showGoods"/>
    </scroll>

<!--    监听整个组件(加监听原生事件时的修饰符 .native)-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  //子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatrueView from "./childComps/FeatrueView"

  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodList from "components/content/goods/GoodList";
  import scroll from "components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  //方法或数据
  import {getHomeMultidata, getHomeGoods} from "network/home"
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin";

  //插件(不要在单个组件里使用Better-scroll，要另外封装成一个可复用的组件)
  // import BScroll from 'better-scroll'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatrueView,

      NavBar,
      TabControl,
      GoodList,
      scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        //将后端请求到的数据保存到goods中
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        /*tabControl的吸顶值*/
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      console.log('home create');
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      //这里只需要传类型
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    //2.混入
    mixins: [itemListenerMixin],
    mounted() {
      /*//1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //$bus.on监听GoodsListItem组件传过来的事件
      this.$bus.$on('itemImageLoad', () => {
        // console.log('---');
        //在图片加载完了之后调用refreash()重新计算高度
        refresh()
      })*/
      // console.log('我是Home里面的mounted内容');

    },
    methods: {
      /*
      * 事件监听相关
      * */
      /* 对于refresh非常频繁的问题, 进行防抖操作

        * 防抖debounce/节流throttle
        * 防抖函数起作用的过程:
        * 如果我们直接执行refresh, 那么refresh函数会被执行30次.
        * 可以将refresh函数传入到debounce函数中, 生成一个新的函数.
        * 之后在调用非常频繁的时候, 就使用新生成的函数.
        * 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么会将上一次取消掉*/
      //参数：函数，延迟多久,  debounce(func, delay) {
      /*debounce(func, delay) {
        let timer = null
        return function (...args) {
          //首先如果timer有值，把之前的timer取消掉
          if(timer) clearTimeout(timer)
          //让func只调用一次
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },*/
      tabClick(index) {
        // console.log('000');
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //让两个tabControll保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        //scrollTo(0, 0, 500)better-scroll里面的方法,500ms回到顶部
        //直接调用
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        //调用Scroll的方法
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //2.决定tabControl是否吸顶（position： fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)

      },
      swiperImageLoad() {
        //1.获取tabControl的offsetTop, 即tabControl距离顶部的高度
        //所以组件都有一个属性$el：用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      * 网络请求相关
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //页码加1计算，根据类型拿到页码的数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          //将第一页的数据放到goods的list数组中
          this.goods[type].list.push(...res.data.list)
          //页码加1
          this.goods[type].page += 1

          //等数据请求完成，并且将新的数据展示出来后, .finishPullUp()进行下一次的上拉加载
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    destroyed() {
      console.log('home destrory');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    //离开时保存位置信息
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.scrollY

      //2. 离开当前组件时要 取消 混入的事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;/*视口高度为100%*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 16px;
   /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;*/
  }
/*  .tab-control{
    !*粘性定位。*!
    !*position: sticky; 基于用户的滚动位置来定位。*!
    !*position: -webkit-sticky; !* Safari *!*!
    !*当使用better-scroll进行滚动时, position: sticky不起效果了*!
    !*position: sticky;*!
    top:44px;
  }*/
  .content {
  /*//设置滚动区域的固定高度*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    background-color: #f3f3f3;
    z-index: 9;
    top:-1px;
  }




  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
