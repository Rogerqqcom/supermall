import {debounce} from "./utils";
import {TOP_DISTANCE} from "./const";
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";
import {BACk_POSITION} from "common/const"


//图片加载的监听，可以用到任意组件中
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入内容');
  }
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backTop() {
			this.$refs.scroll.scrollTo(0, 0)
		},
		listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACk_POSITION
    }
	}
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
			console.log(this.currentType);
		}
	}
}
