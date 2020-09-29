<template>
  <!--ref绑定在子组件上 则通过"this.$refs.refname"获取到的是一个组件对象,
  ref也可以绑定在普通标签元素上面-那么通过this.$refs.refname获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //通过了 this.$refs.wrapper访问到了这个 DOM 对象，并且我们在 mounted 这个钩子函数里，this.$nextTick 的回调函数中初始化 better-scroll 。
      // 因为这个时候，wrapper 的 DOM 已经渲染了，我们可以正确计算它以及它内层 content 的高度，以确保滚动正常。
      // 这里的 this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      // this.$nextTick(() => {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
      // this.scroll.refresh()

      // 3.监听上拉事件(scroll滚动到底部)
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      }
    },
    computed: {
      scrollY() {
        return this.scroll.y
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        //使用this.scroll && 先判断是否scroll组件挂载完成，再调用this.scroll.refresh()
        this.scroll && this.scroll.refresh()
        // console.log('刷新加载');
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // getScrollY() {
      //   return this.scroll ? this.scroll.y : 0
      // }
    }
  }
</script>

<style scoped>

</style>
