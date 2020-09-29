<template>
    <div class="tab-bar-item " @click="itemClick">
<!--      <img src="../../assets/img/tabbar/home1.png">-->
<!--      首页-->
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
<!--      <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props: {
        path: String,
        activeColor: {
          type: String,
          default: 'red'
        }
      } ,
      data() {
          return {
            // isActve:true
          }
      },
      computed: {
        isActive() {
          // /home -> item(/home)  = true
          // /home -> item(/category)  = false
          // /home -> item(/cart)  = false
          // /home -> item(/mine)  = false
          // ...
          //this.$route.path为当前处于活跃的path，而indexOf(this.path)为查找父级传过来path，
          // 返回值为字符所在的索引，总之要是有就返回一个非负数
          return this.$route.path.indexOf(this.path) !== -1  //不等于-1时isActive为true
        },
        activeStyle() {
          // return this.isActive ? {color: this.activeColor} : {}
          return this.isActive ? {'color': '#1296db'} : {}
        }
      },
      methods:{
        itemClick() {
          this.$router.replace(this.path).catch(err=>{})
          console.log('item');
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px ;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /*.active {*/
  /*  color: blue;*/

  /*}*/
</style>
