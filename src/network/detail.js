import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: './detail',
    params: {
      iid
    }
  })
}
//把商品详情的基本信息汇总成一个对象
export class Goods {
  //把三个数据对象就行汇总
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//目的：让组件面向这一个对象开发就行
/*const g = new Goods()
g.title;
g.desc;*/

// es6创建类对象
/*
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const p = new Person('roger', 18)
*/

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
export function getRecommend() {
  return request({
    url: '/recommend'
  })

}
