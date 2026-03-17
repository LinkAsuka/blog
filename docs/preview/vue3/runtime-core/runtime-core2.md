---
title: runtime-core -> createVNode函数 源码解析
createTime: 2025/01/11 12:30:22
tags:
  - VUE3源码
permalink: /article/wcz2pan9/
---

packages/runtime-core/src/createVNode.ts

<!-- more -->

## createVNode 函数

前面`h`函数是用来创建节点的函数，那么它到底是怎么创建节点的？
从代码上来看，每次都会调用`createVNode`函数来创建虚拟节点，那么我们需要知道`createVNode`函数的传参思路和运行逻辑

createVNode 函数接收 3 个参数 `createVNode(type, props, children?)` 都是从`h`传过来的

- `type`: 节点的类型
- `props`: 节点的属性
- `children`: 节点的子节点 ·

### createVNode 函数的运行逻辑

1. 首先我们要知道 `createVNode` 到底是核心的功能是在做什么，其实他最主要做了 生成 `vnode` ，并计算了 `vnode` 里面的 `shapeFlag`标识位
2. `vnode` 的结构

```ts
const vnode = {
  __v_isVNode: true,
  type,
  props,
  children,
  key: props?.key, //diff 算法后面需要用的 key
  el: null, //虚拟节点需要对应的真实节点
  shapeFlag, //标识位
}
```

3. shapeFlag 逻辑的理解

shapeFlag 可以理解为对元素形状的判断

```ts
export const enum ShapeFlags {
  ELEMENT = 1, // 表示一个普通的HTML元素
  FUNCTIONAL_COMPONENT = 1 << 1, // 函数式组件
  STATEFUL_COMPONENT = 1 << 2, // 有状态组件
  TEXT_CHILDREN = 1 << 3, // 子节点是文本
  ARRAY_CHILDREN = 1 << 4, // 子节点是数组
  SLOTS_CHILDREN = 1 << 5, // 子节点是插槽
  TELEPORT = 1 << 6, // 表示vnode描述的是个teleport组件
  SUSPENSE = 1 << 7, // 表示vnode描述的是个suspense组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 表示需要被keep-live的有状态组件
  COMPONENT_KEPT_ALIVE = 1 << 9, // 已经被keep-live的有状态组件
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT, // 组件，有状态组件和函数式组件的统称
}
```

1. 一个 vnode 可以是多个不同的的类型 `vnode.shapeFlag = ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN`
2. shapeFlag 中的与：ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN` 标志合并为一个新的标志
3. shapeFlag 中的并：ShapeFlags.ELEMENT & ShapeFlags.ARRAY_CHILDREN` 检查 ELEMENT 标志是否包含 ARRAY_CHILDREN 标志

::: tabs
@tab packages/runtime-core/src/h.ts

```ts
// 基于它来重写 ,结构化并且计算shapeFlag的值
// renderer 的时候会通过shapeFlag来
import { isObject, isString, ShapeFlags } from '@vue/shared'

export function createVNode(type, props, children?) {
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObject(type) ? ShapeFlags.STATEFUL_COMPONENT : 0
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    children,
    key: props?.key, //diff 算法后面需要用的 key
    el: null, //虚拟节点需要对应的真实节点
    shapeFlag, //标识位
  }
  if (children) {
    // 如果是数组
    if (Array.isArray(children)) {
      vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
      // 是对象
    } else if (isObject(children)) {
      vnode.shapeFlag |= ShapeFlags.SLOTS_CHILDREN
      // 是文本
    } else {
      vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    }
  }
  return vnode
}
```

@tab packages/shared/src/shapeFlags.ts

```ts
// 对元素形状的判断
// 1 | 16 = 17 可以理解成 二进制有一个是1就是1
// 9 & 8 可以理解成 二进制全是1才是1
export enum ShapeFlags {
  ELEMENT = 1, // 1
  FUNCTIONAL_COMPONENT = 1 << 1, //2
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}
```

:::
