<template>
  <div class="goods-item" @click="itemClick">
    <!--vue中通过@load监听图片是否加载完成,以便在scroll.vue进行refresh()刷新计算可滚动高度 {-->
    <img v-lazy="showImg"  alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price"> {{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        //从goodsItem从出去image或者show里面的img进行展示
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      //图片加载
      imageLoad() {
        // console.log('aslllls');
      //通过事件总线进行非父子组件通信，在首页监听
        //1.根据路由进行判断发送事件给那个组件
       /* if(this.$route.path === '/home') {
          // console.log('---');
          this.$bus.$emit('itemImageLoad')
        }
        else if(this.$route.path === '/detail') {
          this.$bus.$emit('goodsImageLoad')
        }*/
        //2.通过混入实现
        this.$bus.$emit('itemImageLoad')


      },
      itemClick() {
        // console.log('跳转到详情页'); //并传递商品id
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    /*超出文本显示..*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }
  /*收藏前面的小图标*/
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px ;
  }

</style>
