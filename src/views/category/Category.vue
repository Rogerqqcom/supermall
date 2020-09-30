<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center" >商品分类</div></nav-bar>
    <div class="content">
      <!--侧边导航栏-->
      <left-list :categories="categories" @selectItem="selectItem"/>
     <!--   右边分类 -->
      <tab-control
        :titles="['综合', '新品', '销量']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      />
     <scroll id="tab-content"
             :data="[categoryData]"
             ref="scroll"
             :probe-type="3"
             @scroll="contentScroll"
             >
       <right-top-content :subcategories="showSubcategory" @RTopImgLoad="RTopImgLoad"/>
       <tab-control
         :titles="['综合', '新品', '销量']"
         @tabClick="tabClick"
         ref="tabControl2"
         v-show="!isTabFixed"
       />
       <good-list :goods="showCategoryDetail"/>

     </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";
  import BackTop from "components/content/backTop/BackTop";


  import leftList from "./childComps/leftList";
  import RightTopContent from "./childComps/RightTopContent";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "common/const";
  import {tabControlMixin, itemListenerMixin} from "common/mixin";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabControl,
      Scroll,
      GoodList,
      BackTop,

      leftList,
      RightTopContent
    },
    data() {
      return {
        //分类数据
        categories: [],
        //右边内容数据
        categoryData: {
        },
        currentIndex: -1,

        isShowBackTop: false,
        /*tabControl的吸顶值*/
        tabOffsetTop: 0,
        //默认tabControl1不显示
        isTabFixed: false,
        saveY: 0

      }
    },
    mixins: [tabControlMixin, itemListenerMixin],
    created() {
      // 1.请求分类数据
      this.GetCategory()

      // 2.监听图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.refresh()
      })
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        //返回当前下标的右边顶部数据
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        //返回的是一个数组类型
        if (this.currentIndex === -1) return []
        //返回根据当前下标当前类型的右边底部数据
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      // 1.请求分类数据
      GetCategory() {
        getCategory().then(res => {
          //1.获取分类数据
          this.categories = res.data.category.list
          // console.log(res);
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this.GetSubcategories(0)

        })
      },

      // 3.请求第一个分类的数据
      GetSubcategories(index) {
        this.currentIndex = index;
        //获取分类数据里面的maitKey
        const  maitKey = this.categories[index].maitKey;
        //根据maitKey请求右边的顶部的子分类内容
        getSubcategory(maitKey).then(res => {
          //获取到右边顶部的内容
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          // console.log(this.categoryData);
          //根据传入类型进行请求不同的数据
          this.GetCategoryDetail(POP)
          this.GetCategoryDetail(NEW)
          this.GetCategoryDetail(SELL)
        })
      },
      //请求右边底部内容数据
      GetCategoryDetail(type) {
        //1.首先获取到分类数据里面的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;

        //2.发送请求，传入miniWallkey和type来请求数据
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取到的数据保存到对应类型的数组中
          // console.log(res);
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this.GetSubcategories(index)
      },
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
        this.isShowBackTop = (-position.y) > 2000
        //2.决定tabControl是否吸顶（position： fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop / 2.9
      },
      RTopImgLoad() {
        //1.获取tabControl的offsetTop, 即tabControl距离顶部的高度
        //所以组件都有一个属性$el：用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        // console.log(this.$refs.tabControl2.$el.offsetTop / 2.9);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
    ,
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
  .category {
    height: 100vh;
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
    /*在滚动内容区关闭原生滚动*/
    /*overflow: hidden;*/
    display: flex;
  }
  /*控制滚动内容高度*/
  #tab-content {
    /*//设置滚动区域的固定高度*/
    overflow: hidden;
    position: absolute;
    top:0;
    bottom: 0;
    left: 100px;
    right: 0;
    /*height: calc(100vh - 93 - 40);*/
    /*height: 100%;*/
    /*width: 100%;*/
    flex: 1;
    /*overflow: hidden;*/
  }
  .tab-control {
    position: relative;
    background-color: #f3f3f3;
    z-index: 99;
    width: 275px;
    /*width: calc(100vw - 100);*/
    top:-1px;
  }
</style>
