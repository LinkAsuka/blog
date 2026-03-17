---
title: reactivity-reactive源码解析
createTime: 2024-12-16
tags:
  - VUE3源码
permalink: /article/3atxtl54/
---

# reactivity-reactive 源码解析

packages/reactivity/src/reactive.ts

<!-- more -->

> reactive 的原理就是通过 Proxy 中的 get 和 set 来实现数据的拦截，从而实现双向绑定

1. 响应式核心功能
   `reactive` 让数据变成响应式数据
   `effect` 数据变化后让 effect 重新执行， 组件 、watch 、computed 都是基于 effect 来实现的

2. 引入 reactive.ts 文件
   想要打包的时候带 reactive.ts 玩

::: tabs
@tab packages/reactivity/src/index.ts

```ts
export * from './reactive' // [!code focus]
export * from './effect'
```

:::

### reactive 的实现

::: code-tabs
@tab reactive.ts

```ts
import { isObject } from '@vue/shared'
import { handler, ReactiveFlags } from './baseHandler'
// 用于记录代理后的结果 存储对象的键值对 用WeakMap是因为不用的时候可以被回收
const reactiveMap = new WeakMap()
// 用于判断是不是代理对象 处理代理了之后又代理的情况
function createReactiveObject(target: any) {
  //  如果是对象才有响应式
  if (!isObject(target)) {
    // 如果不是一个对象，做不了响应式 就返回他自己
    return target
  }
  // 如果被响应过 就会有 ReactiveFlags.IS_REACTIVE 直接返回
  if ((target as any)[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  // 处理复用同一个对象的情况,如果有就直接返回
  const exits = reactiveMap.get(target)
  if (exits) {
    return exits
  }
  /**
   * 使用 Proxy 是因为当数据发生变化时，能够自动触发相关的更新操作
   * Proxy还可以
   * 1. 可以在调用 API 时进行拦截，添加日志记录、权限验证等操作
   * 2. 通过 Proxy 拦截对虚拟节点的操作，实现更高效的更新机制
   */
  let proxy = new Proxy(target, handler) //-> baseHandler.ts // [!code warning]
  reactiveMap.set(target, proxy)

  return proxy
}

export function reactive(target: any) {
  return createReactiveObject(target)
}
```

@tab baseHandler.ts

```ts
/**
 * baseHandler 用来处理 Proxy 的set 和 get 操作
 * 在 reactive 中主要用来防止嵌套调用 reactive 的情况
 */
export const ReactiveFlags: { IS_REACTIVE: string } = {
  IS_REACTIVE: '__v_isReactive',
}
export const handler: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (ReactiveFlags.IS_REACTIVE === key) {
      return true
    }
  },
  set(target, key, value, receiver) {},
}
```

-

:::
::: info 用于理解的 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>响应式</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { reactive } from './reactivity.js'
      const state = reactive({
        name: 'link',
        age: '28',
      })
      const state1 = reactive({
        name: 'asuka',
        age: '18',
      })
      // exits处理一个对象复用的情况
      const state2 = state
      // 处理代理了之后又代理的情况
      // 如果state被代理过一定有 get 和 set 方法
      const state3 = reactive(state)
      console.log(state1 === state) //false
      console.log(state2 === state) //true
      console.log(state3 === state) //true
    </script>
  </body>
</html>
```

:::
