<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!--<div>
        <ul>
          <li v-for="item in $store.state.cartList">
            {{item}}
          </li>
        </ul>
      </div>-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <hr>
      <span style="margin: 10px 40%">热销推荐</span>
      <hr>
      <good-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    data() {
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        //获取对应的offsetTop
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar
    },
    created() {
      //获取处于活跃状态的iid, 并保存
      // console.log(this.$route.params);
      this.iid = this.$route.params.iid

      //2.根据iid请求的详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.获取全部数据
        const data = res.result
        //2.获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages

        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //5.获取商品详细信息
        this.detailInfo = data.detailInfo

        //6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //7.取出评论信息
        //有些商品是没有评论信息的，所以先判断
        if (data.rate.cRate !== 0) {
          //取出1条
          this.commentInfo = data.rate.list[0]
        }

        /*
        //1.第一次获取，值不对：this.$refs.params.$el压根没有渲染
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);*/
/*
        //2.通过this.$nextTick()确保dom渲染完成
        this.$nextTick(() => {
          //根据最新的数据， 对应的dom是已经被渲染处理
          //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
          //offsetTop值不对的时候，都是因为图片的问题
          this.themeTopYs = []

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        })*/

      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE) //添加一个最大值
        // console.log(this.themeTopYs);
      }, 100)

    },
    methods: {
      ...mapActions(['addCart']),
      /*
      //方法1的
      imageLoad() {
        this.$refs.scroll.refresh()
      }*/
      detailImageLoad() {
        this.refresh()
        this.getThemeTopY()
      },

      titleClick(index) {
        // console.log(index);
        //监听滚动到某个特定位置
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] , 200)
      },
      //监听滚动到某个位置后标题的改变
      contentScroll(position) {
        // console.log(position);
        //1.获取y值
        const positionY = -position.y

        //2.positionY和主题中的值进行对比
        /*
        * positionY 在 0 - 6792 之间， index = 0
        * positionY 在 0 - 7792 之间， index = 1
        * positionY 在 0 - 8792 之间， index = 2
        * positionY 超过 8792 时， index = 3
        * */
    /*    for (let i in this.themeTopYs) {
          console.log(i); //这里的i是字符串
          if(positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i)+1]) {
            console.log(i);
          }
        }*/
        let length = this.themeTopYs.length
        /*for (let i = 0; i < length; i++) {
          /!*if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) { //这样获取不到最后一个i
            console.log(i);
          }*!/
          /!*!//方法1
          //this.currentIndex !== i为防止调用过于频繁
          if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY <
            this.themeTopYs[i+1]) || (i === length-1) && positionY >= this.themeTopYs[i]) {
            console.log(i);
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }*!/
        }*/
        //方法2
        for (let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //3.判断BackTop是否显示,
        // this.isShowBackTop = (-position.y) > BACk_POSITION
        //可以写在混入里面，再调用
        this.listenShowBackTop(position)

        //4.决定tabControl是否吸顶（position： fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
/*      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      },*/
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        // product.price = this.goods.newPrice /*这个价格可能时一个区间*/
        product.price = this.goods.realPrice
        product.iid = this.iid;

        //2.将商品加到购物车（先将商品保存到vuex中）
        // this.$store.cartList.push(product) //此法不建议，应该通过mutations修改
        // this.$store.commit('addCart', product); //此方法不能很好的跟踪添加方法的变化
        /*//a.
        this.$store.dispatch('addCart', product).then(res => {
          console.log(res);
        })*/
        //b.可以使用mapActions映射到方法里面，
          this.addCart(product).then(res => {
            console.log(res);
            this.$toast.show(res)
          })
      }

    },
    /*热销推荐的图片高度计算，监听图片加载完*/
    mixins:  [itemListenerMixin, backTopMixin],
    mounted() {
      /*//方法2.图片加载完成的事件监听,使用防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //$bus.on监听DetailGoodsInfo组件传过来的事件，监听详情页图片加载完
      this.$bus.$on('goodsImageLoad', () => {
        // console.log('---');
        //在图片加载完了之后调用refreash()重新计算高度
        refresh()
      })*/


    },
    destroyed() {
      //离开当前组件时要 取消 混入的事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
    /*    updated() {
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        }*/
  }
</script>

<style scoped>
  #detail {
    /*把底部的导航隐藏掉*/
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
  /*设置滚动区域的固定高度*/
    height: calc(100% - 93px);
    background-color: #fff;
    overflow: hidden;  /*//关闭原生滚动*/

  }
/*  .content {
    !*!/设置滚动区域的固定高度*!
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #fff;

  }*/
</style>
