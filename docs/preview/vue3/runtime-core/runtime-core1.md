---
title: runtime-core -> h函数 源码解析
createTime: 2025/01/10 15:30:14
tags:
  - VUE3源码
permalink: /article/i0f924b7/
---
packages/runtime-core/src/h.ts
<!-- more -->

## h 函数

`h 函数` 是用来创建虚拟节点的函数，它接收三个参数：（type, propsOrChildren?, children?）

- `type` 是节点的类型，可以是字符串、对象、函数等，它用来创建节点的实例。
- `propsOrChildren `属性 | h(虚拟节点)
- `children`是节点的子节点

### h 函数的传参思路

h 的穿着大有说头，虽然我也不知道他为什么要做这么混乱的定义

1. 如果只有两个参数，第二个参数 `属性 | h(虚拟节点) `
   - 第二个参数是`数组`，那么他就是`儿子`，其他情况是属性
   - 第二个参数是`文本`，那么他是儿子但返回`文本`
2. 如果有三个参数，第二个参数必须是`属性`，第三个参数必须是`儿子`
3. 如果有大于三个的参数，比如串了 4 个参数，那么`第三个儿子后`的传参都是`儿子`

### h 函数的运行逻辑

1. 首先要明确一点 `createVNode` 函数是用来做什么的，因为它是下一篇要写的。他的作用是：创建虚拟节点的函数
2. 先拿到传参的个数，毕竟这个很重要，上面也说了是根据个数和类型来判断第二个参数是什么的，分等于 2 个参数，等于 3 个参数，大于3个参数三种情况
3. 如果传参的个数等于 2，那么 先判断是不是对象
   - 如果不是对象直接更新文字
   - 如果是对象不是数组 就判断是不是虚拟节点（h），是虚拟节点就把他变成数组用`createVNode`创建
   - 如果对象是数组 就直接用`createVNode`创建
4. 如果传参等于 3 个，那么第二个参数是属性，第三个参数是儿子
   就在调用`createVNode`的时候把 propsOrChildren 传给第二个参数，也就是`属性`，把第三个参数变成数组传给第三个参数，就是儿子
5. 如果传参大于 3 个，那么第二个参数是属性，第三个参数是儿子，用`Array.prototype.slice.call`把第三个参数变成数组传给第三个参数，就是儿子
6. 如何判断虚拟节点，虚拟节点有个属性 `__v_isVNode` 有的话就是虚拟节点没有则不是，这个属性是在`createVNode`函数中添加的

::: tabs
@tab packages/runtime-core/src/h.ts

```ts
import { isObject } from '@vue/shared'
import { createVNode } from './createVNode'
// h 函数的作用是 创建虚拟节点
export function h(type, propsOrChildren?, children?) {
  const l = arguments.length
  if (l === 2) {
    // 只有属性，或者一个元素儿子的时候
    if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        // h('div',h('span'))
        // propsOrChildren是虚拟节点
        return createVNode(type, null, [propsOrChildren])  // [!code warning]
      }
      // propsOrChildren是属性
      return createVNode(type, propsOrChildren) // h('div',{style:{color:'red'}});  // [!code warning]
    } else {
      // 传递儿子列表的情况
      // 是数组就直接放上去
      return createVNode(type, null, propsOrChildren) // h('div',null,[h('span'),h('span')])  // [!code warning]
    }
  } else {
    if (l > 3) {
      // 超过3个除了前两个都是儿子
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      // 等于3的情况下，children一定是儿子 变成数组
      children = [children] // 儿子是元素将其包装成 h('div',null,[h('span')])
    }
    // propsOrChildren是属性 children是儿子
    return createVNode(type, propsOrChildren, children) // h('div',null,'jw')  // [!code warning]
  }
}
// 判断是否是虚拟节点
function isVNode(value) {
  return value?.__v_isVNode
}
```

:::
