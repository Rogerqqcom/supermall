<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-all"
                    @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="clacClick">
      <span>去计算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    data() {
      return {
        selectGoods: []
      }
    },
    components: {
      CheckButton
    },
    computed: {
      //全选汇总价格
      totalPrice() {
        if(this.$store.state.cartList.length !== 0){
          //1.通过ES6的高级数组.filter()方法，返回item.cheched的元素并组成一个新数组
          //2.补充：ES6的高级数组.map()方法为原始数组元素调用函数处理后的值组成新数组。
          return '￥'+ this.$store.state.cartList.filter(item => {
            return item.checked
            //3.对上面filter拿到的数组进行数组内的对象内的某个属性进行累加, preValue传入的初始值是0，之后的值为上一次回调函数返回的值
          }).reduce((preValue, item) => {
            return preValue + item.price * item.count
          },0).toFixed(2)//保留2位小数
        }

      },
      //获取商品选中的数量
      checkLength() {
        if(this.$store.state.cartList.length !== 0){
          return this.$store.state.cartList.filter(item => item.checked).length
        }
      },
      //判断是否全部选中
      isSelectAll() {
        //1.会遍历所有的元素，性能低
        // return this.$store.state.cartList.length === 0 ? false : !(this.$store.state.cartList.filter(item => !item.checked).length)  //如果查找到没有被选中的，说明有长度，取反为false
        //2.使用find(), 性能高一点
        // if (this.$store.state.cartList.length === 0) return false
        //如果cartList.length === 0 返回false， 否则，若有些没被选中则返回false
        return this.$store.state.cartList.length === 0 ? false : !(this.$store.state.cartList.find(item => !item.checked))

       /* //3.也可以直接遍历
        if (this.$store.state.cartList.length === 0) return false
        for (let item of this.$store.state.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true*/
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { //部分或全部不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      clacClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择商品')
        }
      /*  else if(this.$store.state.cartList.length !== 0){
          // this.$store.state.cartList = ''
          //跳转前将选中商品保存下来
          this.selectGoods =  this.$store.state.cartList.filter(item => item.checked)
          // this.$store.state.cartList.filter(item => item.checked).remove(this.selectGoods[0])
          this.$router.push('/profile')
          // console.log(this.$store.state.cartList);

          // console.log(this.$store.state.cartList.filter(item => item.checked));
        }*/
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    width: 100vw;
    background-color: #eee;

    /*position: relative;*/
    line-height: 40px;
    display: flex;
    position: fixed;
    top: calc(100% - 90px);
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 100px;
  }
  /*.bottom-bar span {
    width: 150px;
    background-color: #f00;
  }*/

  .check-all {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    /*background-color: #f00;*/
  }
  .price {
    flex: 1;
    margin-left: 20px;
  }
  .calculate {
    width: 90px;
    background-color: var(--color-tint);
    text-align: center;
    color: white;
  }
</style>
