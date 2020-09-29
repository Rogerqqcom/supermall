<template>
  <div class="normal-list">
    <div class="item"  v-for="(item, index) in listItem" :key="index">
      <span class="icon">
        <!--动态绑定图标-->
        <img :src="imgUrl(item)" alt="">
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NormalListView",
    props: {
      listItem: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgUrl(item) {
        // 根据item.icon去导入图标
        return require('assets/img/profile/' + item.icon)
      }
    }
  }
</script>

<style scoped>
  .normal-list {
    background-color: #e4e4e4;
    margin-top: 15px;
  }
  .item {
    width: 100%;
    height: 45px;
    background-color: #fff;
    display: flex;
  }
  .item .icon {
    width: 10%;
  }
  .item .icon img{
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-top: 13px;

  }
  .item .info {
    width: 90%;
    margin-left: 5px;
    margin-top: 13px;
    border-bottom: 1px solid #eee;
  }
</style>
