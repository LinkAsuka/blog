---
title: 用简单的方法获取URL传参
createTime: 2024-06-21
tags:
  - 高效编码
permalink: /article/i8b0g6qs/
---
# 用简单的方法获取URL传参

URLSearchParams

<!-- more -->

ES6 提供了`URLSearchParams`对象用来接收一个`URL`的查询字符串
如果将 `window.location.search` 传入后，再通过实体的 `get()` 方法
即可方便地获取当前页面路径中对应参数的值
```js
// https://fehub.com/?name=lmx&age=18&book=santi&book=mingchaonaxieshier
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("name"));// lmx
console.log(searchParams.get("age"));// 18
console.log(searchParams.getAll('book'));//['santi', 'mingchaonaxieshier']
```
`URLSearchParams`会自己移除从`window`方法中拿到的`?`
```js
// https://fehub.com/?name=lmx&age=18&book=santi&book=mingchaonaxieshier&lang=zh_CN
const searchParams = new URLSearchParams(window.location.search);
searchParams.append("foo", "bar");// 添加参数
searchParams.delete("lang");// 删除参数
searchParams.toString(); // "name=lmx&age=18&book=santi&book=mingchaonaxieshier&foo=bar"
```