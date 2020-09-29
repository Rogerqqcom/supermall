<template>
	<div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {  //mutations里面决定购物车是否选中
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check {
    /*选中时边框的颜色*/
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
