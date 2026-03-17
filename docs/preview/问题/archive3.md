---
title: Swiper不能与display none共用解决办法
createTime: 2024-08-13
tags:
  - 问题
permalink: /article/sdw5hjm6/
---
# Swiper不能与display none共用解决办法

<!-- more -->

  修改swiper自己或子元素时，自动初始化`swiper:observer:true`

  修改swiper的父元素时，自动初始化swiper:`observeParents:true`

```js
var mySwiper1 = new Swiper('#swiper-checkcar-style', {
  observer:true,
  observeParents:true
});
```