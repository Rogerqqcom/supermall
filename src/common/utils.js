/*
* 防抖动函数
* */
export function debounce(func, delay = 50) {
  let timer = null
  return function (...args) {
    //首先如果timer有值，把之前的timer取消掉
    if(timer) clearTimeout(timer)
    //让func只调用一次
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
/**
 * 格式化时间的封装方法（正则表达式）
 *正则表达式： 作用：字符串匹配  利器（规则多）
 * */
export function formatDate(date, fmt) {
  //1.获取年份
  //y+
  // +  表示一个或者多个y
  //y*  表示0个或多个y
  //y?  表示0个或者1个y

  /*
  比如传入2019
  则fmt.replace("yyyy", (2019).substr(0));  //(2019).substr(0)截取0个
  * */
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  //M+ -> 正则表达式的规则
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  // 对上面的信息左统一处理
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  //如果发现不足两位的话，用0补齐
  return ('00' + str).substr(str.length);
};


