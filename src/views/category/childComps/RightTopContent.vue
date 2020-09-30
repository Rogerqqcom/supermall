<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" :itemSpace="8" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="RTopImgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from "components/common/gridView/GridView";
  export default {
    name: "RightTopContent",
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      GridView
    },
    methods: {
      RTopImgLoad() {
        //只发送一次事件监听图片的高度就行
        if(!this.isLoad) {
          this.$emit('RTopImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }
  .item-img {
    width: 80%;
  }
  .item-text {
    margin-top: 15px;
  }
</style>
