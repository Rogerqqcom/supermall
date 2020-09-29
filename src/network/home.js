import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

let arr = []

const nums = [11, 22, 33]

//把数组的内容放到arr空数组里面
//1.
// for(let n of nums) {
//   arr.push(n)
// }
//2.利用push的...语法将原来的数组进行一个个解析，然后一个个放到新数组
// arr.push(...nums)
