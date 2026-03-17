---
title: runtime-dom 的原理和源码解析
createTime: 2025/01/06 10:05:27
tags:
  - VUE3源码
permalink: /article/jjwb76y5/
---

packages/runtime-dom/src/index.ts

<!-- more -->

> runtime-dom 的作用是提供一些 DOM 的 api，把这些 api 传给里层 runtime-core 去处理 DOM

## 虚拟 DOM 是什么

我们来看看官方文档怎么说

虚拟 DOM 这个功能为 React 和 Vue 带来了跨平台的能力
实际上它只是一层对真实 DOM 的抽象，以 JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上
在 Javascript 对象中，虚拟 DOM 表现为一个 Object 对象。并且最少包含`标签名 (tag)`、`属性 (attrs)` 和`子元素对象 (children)` 三个属性，不同框架对这三个属性的名命可能会有差别
创建虚拟 DOM 就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟 DOM 对象的节点与真实 DOM 的属性一一照应

## 虚拟 DOM 优化了什么

写一些官方文字也看不下去，大白话就是 以前的 dom 做更新，比如有 10 个节点需要更新就会更新 10 次，而虚拟 DOM 就只更新一次，通过 `diff` 算法来计算出需要更新的节点，然后更新到页面上

很多人认为虚拟 DOM 最大的优势是 diff 算法，减少 JavaScript 操作真实 DOM 的带来的性能消耗。虽然这一个虚拟 DOM 带来的一个优势，但并不是全部。虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种 GUI

## 虚拟 DOM 的用法

- h 函数（创建一个虚拟 DOM 对象）
  虚拟 DOM 的创建，是通过 h 函数来创建的，h 函数接受三个参数，第一个参数是标签名，第二个参数是属性，第三个参数是子元素，返回一个虚拟 DOM 对象
- render 函数（渲染 DOM 的元素）
  render 函数的作用是把虚拟 DOM 对象渲染到页面上，它接受一个参数，就是虚拟 DOM 对象，返回一个函数，这个函数就是渲染函数，调用这个函数就可以把虚拟 DOM 对象渲染到页面上
- cteatRender 函数 （自己提供渲染方式）
  createRender 函数的作用是创建一个渲染函数，它接受一个参数，就是虚拟 DOM 对象，返回一个函数，这个函数就是渲染函数，调用这个函数就可以把虚拟 DOM 对象渲染到页面上

```js
// 我们用内置的 render 函数来渲染到页面上
let ele = h('div', "nihao xixixi")
render(ele, document.body)

// 也可以先创建渲染器 用自己的渲染器渲染到页面上
const renderer = createRender({
    // 创建元素
    createElement(tag) {
        return document.createElement('h1')
    }
    // 创建节点中的文字
    setElementText(el, text) {
        el.textContent = text
    }
    // 插入元素
    insert(el, parent) {
        parent.appendChild(el)
    }
})
renderer.render(ele, document.body)
```

让我们先看看源码，他一共写了这些方法

### 源码都提供了哪些 Api

- createRenderer 函数区创建了一个渲染器。options 传入对应操作 dom 的函数

```js
export default function createRenderer(options) {
  const {
    insert: hostInsert, //插入元素
    remove: hostRemove, //删除元素
    patchProp: hostPatchProp, //节点元素的属性操作 class style event 等
    createElement: hostCreateElement, //新建元素
    createText: hostCreateText, //新建文本
    createComment: hostCreateComment, //设置描述
    setText: hostSetText, //给文本节点设置文本
    setElementText: hostSetElementText, //创建节点中的文字
    parentNode: hostParentNode, //获取父节点
    nextSibling: hostNextSibling, //获取兄弟节点
    setScopeId: hostSetScopeId = NOOP, //设置作用域的 id 默认为空
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent,
  } = options
}
```

## 自己来写

### index / *

::: code-tabs
@tab index.ts

```ts
export * from '@vue/reactivity'
// 主要是对节点元素的增删改查
import { nodeOps } from './nodeOps'
// 主要是节点元素的属性操作 class style event 等
import patchProp from './patchProp'
// 合并 nodeOps 和 patchProp
const renderOptions = {
  patchProp,
  ...nodeOps,
}

export const render = (vnode,container)=>{
    return createRenderer(renderOptions).render(vnode,container)
};
export * from "@vue/runtime-core"

```

@tab nodeOps.ts

```ts
// 主要是对节点元素的增删改查
export const nodeOps = {
  // el:要插入的节点 插入到 anchor 前面
  // 如果 anchor 为null，就添加到子节点列表的末尾 等价于调用appendChild
  insert(el, parent, anchor) {
    parent.insertBefore(el, anchor || null)
  },
  // 删除元素
  remove(el) {
    const parent = el.parentNode
    if (parent) {
      parent.removeChild(el)
    }
  },
  // 创建元素
  createElement(tag) {
    return document.createElement(tag)
  },
  // 创建文本节点
  createText(text) {
    return document.createTextNode(text)
  },
  // 给文本节点设置文本
  setText(node, text) {
    node.nodeValue = text
  },
  // 给元素设置文本
  setElementText(el, text) {
    el.textContent = text
  },
  // 获取父节点
  parentNode(node) {
    return node.parentNode
  },
  // 获取下一个兄弟节点
  nextSibling(node) {
    return node.nextSibling
  },
}
```

@tab patchProp.ts

```ts
import patchAttr from './modules/patchAttr'
import patchClass from './modules/patchClass'
import patchEvent from './modules/patchEvent'
import patchStyle from './modules/patchStyle'

export default function patchProp(el, key, prevValue, nextValue) {
  // el元素的 key属性，它之前是prevValue，之后是nextValue
  if (key === 'class') {
    return patchClass(el, nextValue)  // [!code warning]
  } else if (key === 'style') {
    return patchStyle(el, prevValue, nextValue)  // [!code warning]
  } else if (/^on[^a-z]/.test(key)) {
    return patchEvent(el, key, nextValue)  // [!code warning]
  } else {
    return patchAttr(el, key, nextValue)  // [!code warning]
  }
}
```

:::

### modules / *

::: code-tabs
@tab patchClass.ts

```ts
// 主要是节点元素的属性操作 class style event 等
export default function patchClass(el, value) {
  // 如果value是空字符串，那么就移除class属性
  if (value === null || value === undefined) {
    el.removeAttribute('class')
  } else {
    el.className = value
  }
}
```

@tab patchStyle.ts

```ts
export default function patchStyle(el, prevValue, nextValue) {
  if (nextValue) {
    for (let key in nextValue) {
      el.style[key] = nextValue[key] //新样式要全部生效
    }
  }
  if (prevValue) {
    //如果以前有样式，对比以前和现在的
    for (let key in prevValue) {
      // 循环老样式，如果新样式没有这个属性，那么就移除
      if (nextValue[key] == null) {
        el.style[key] = null
      }
    }
  }
}
```

@tab patchEvent.ts

```ts
function createInvoker(_value) {
  // let fn = fn.value 当 fn 为 fn1改成 fn2的时候，修改fn.value为 fn 即可
  const invoker = (e) => invoker.value(e)
  invoker.value = _value //更改invoker中的 value 属性，可以修改对应的函数
  return invoker
}
export default function patchEvent(el, name, nextValue) {
  // 定义一个标记 用来标记事件是否已经绑定 vue_event_invoke
  // 缓存的是一个.value能点出来的函数
  let invokers = el._vei || (el._vei = {})
  // event不能是 on 开头的，也不能是大写所以处理一下
  const eventName = name.slice(2).toLowerCase()
  // 判断是否已经绑定过事件，同名的
  const existingInvoker = invokers[name]
  // !如果有新的绑定，并且以前有绑定的过  // [!code error]
  if (nextValue && existingInvoker) {
    // 事件换绑
    return (existingInvoker.value = nextValue)
  }
  // !有新的绑定，并且以前没有绑定过  // [!code error]
  if (nextValue) {
    //创建一个调用函数，并且内部会执行 nextValue
    const newInvoker = createInvoker(nextValue)
    // 将函数保存到 el._vei 中
    const invoker = (invokers[name] = newInvoker)
    // addEventListener(event, function, useCapture)
    // event 指定事件名 function 指定要事件触发时执行的函数 useCapture 表示事件是否在捕获阶段触发，false 表示在冒泡阶段触发
    el.addEventListener(eventName, invoker)
  }
  // !没有新的绑定，并且以前有绑定的过  // [!code error]
  if (existingInvoker) {
    // 如果以前有绑定，但是现在没有了
    el.removeEventListener(eventName, existingInvoker)
    // 并且清空缓存的
    invokers[name] = undefined
  }
}
```

@tab patchAttr.ts

```ts
// 设置元素的属性值
export default function patchAttr(el, key, value) {
  if (value) {
    el.setAttribute(key, value)
  } else {
    el.removeAttribute(key)
  }
}
```
:::
