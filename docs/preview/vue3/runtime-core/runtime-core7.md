---
title: runtime-core -> 函数组件
createTime: 2025/12/21 10:28:29
tags:
  - VUE3源码
permalink: /article/3bmj9nnd/
---

packages/runtime-core/src/component.ts

<!-- more -->

> 函数式组件本质就是一个函数，函数的返回值就是虚拟 DOM。 在 Vue 3 中，所有的函数式组件都是用普通函数创建的。换句话说，不需要定义 *{ functional: true }* 组件选项。


## 函数组件使用
```ts
const functionalComponent = (props) => {
  return h("div", "hello" + props.name);
};
render(h(functionalComponent, { name: "jw" }), app);
```
## 函数组件实现原理
```ts
export const createVNode = (type, props, children = null) => {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0;
  // 创建虚拟节点是
};

function initProps(instance, propsOptions, propsData) {
  // ... 属性初始化的时候如果是函数式组件则 attrs就是函数式组件的props
  if (instance.vnode.shapeFlag & ShapeFlags.FUNCTIONAL_COMPONENT) {
    instance.props = attrs;
  }
}

// 产生subTree时, 要根据类型做不同的处理
export function renderComponentRoot(instance) {
  let { render, proxy, vnode, props } = instance;
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    return render.call(proxy, proxy);
  } else {
    return vnode.type(props); // 函数式组件直接调用即可
  }
}
const subTree = renderComponentRoot(instance);

```