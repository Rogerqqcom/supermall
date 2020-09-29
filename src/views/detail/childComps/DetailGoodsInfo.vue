<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imageLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	   /*
	   //方法1：（不实用，要配合watch使用）
	   imgLoad() {
	      //判断所有图片都加载完了， 那么进行一次回调就可以
        //当counter自增到等于图片最终个数时再执行
        // if (++this.counter === this.imagesLength) {
	        this.$emit('imageLoad')
        // }
	    }*/
      //方法2，图片加载完成，发送一个事件到Detail组件中使用防抖函数计算图片高度
      imageLoad() {
        // console.log('aslllls');
        //通过事件总线进行非父子组件通信，在首页监听
        this.$emit('detailImageLoad')
      }
    },
    /*
    //：配合方法1使用
    watch: {
	    detailInfo() {
	      //获取图片个数
	    	this.imagesLength = this.detailInfo.detailImage[0].list.length
	    }
    }*/
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
