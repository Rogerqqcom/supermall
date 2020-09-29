import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

//1.安装
//2.导入
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

//3.解决移动端300ms延迟
FastClick.attach(document.body)

//3.使用懒加载的插件  //4.修改img的src  :src="showImg" -> v-lazy="showImg"
Vue.use(VueLazyLoad, {
  loading:  require('./assets/img/common/imageLazy.jpg') //导入占位图
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
