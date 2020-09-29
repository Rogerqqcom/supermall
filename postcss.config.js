module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //iPhone6的设计稿
      viewportWidth: 375,  //视口的宽度
      viewportHeight: 667,  //视口的高度

      unitPrecision: 5,  //保留5位小数，指定‘px‘转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'],  //指定不需要转换的类，
      minPixelValue: 1, //小于等于1px的不作转换为视窗单位
      mediaQuery: false,  //允许在媒体查询中转换’px‘
      exclude: [/TabBar/, /CartBottomBar/] //只能使用正则排除TabBar组件不被转换
    }
  }
}
/*
正则的规则：
1.^abc: 表示匹配的内容，必须以什么内容开头（以abc开头）
2.abc$: 表示匹配的内容，必须以什么内容结尾（以abc结尾）
 */
//*/
