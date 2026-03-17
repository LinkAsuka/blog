---
title: reactivity-effect 源码解析
createTime: 2024-12-20
tags:
  - VUE3源码
permalink: /article/39afxcuq/
---

packages/reactivity/src/effect.ts

<!-- more -->

> effect 的原理就是通过 Proxy 中的 get 和 set 监听，当数据发生变化时，让 effect 重新执行

<!-- !!content!! -->

1. 响应式核心功能
   `reactive` 让数据变成响应式数据
   `effect` 数据变化后让 effect 重新执行， 组件 、watch 、computed 都是基于 effect 来实现的

2. 引入 effect.ts 文件
   想要打包的时候带 effect.ts 玩

::: tabs
@tab packages/reactivity/src/index.ts

```ts
export * from './reactive'
export * from './effect' // [!code focus]
```
:::

首先要弄清楚 effect 是怎么玩的
1. 我们先创建一个 effect 函数接收两个参数
   一个是要执行的方法，一个是配置对象。
2. 先说执行的方法
   进来的时候先调用一次传进来的方法 `fn()`
3. 接下来就是收集依赖了
   依赖搜集的目的是把 effect 过的数据都收集起来，这样当数据发生变化的时候，可以用做数据处理
   进来的时候我们先调用了一次传进来的`fn()`如果这个方法里面涉及到 `reactive` 的数据，就会触发 proxy 中的 get 方法，我们就可以在 get 方法 调用的时候来进行依赖搜集
   搜集采用 Map 来进行存储，格式大概是
   ```js
     // Map:(obj:(属性:Map(effect,effect,effect)))
      {
         //第一层 Map
         key:{name: 'link',age:"18"},
         value:{
            //第二层 Map
            name:{
               key:'name',
               value:effect
            },
            age:{
               key:'age',
               value:effect
            }
         }
      }
   ```
   依赖搜集有两个比较重要的字段
   1. `_trackId ` 用于存储依赖的索引值
   2. `_depsLength` 用于存储依赖的个数
      在依赖搜集的时候我修改这两个的值，来作为依赖的标记，后面依赖清理的时候也可以用到。
      在进行依赖搜集之前我们通常把他俩变成 0
   4. 依赖更新
   搜集了依赖后，我们再执行传进来的 `fn()`，当数据发生变化的时候，就会触发 proxy 中的 set 方法，
   我们就可以在 set 方法 调用的时候来进行依赖执行
   更新了数据之后，我们再执行一次 `fn()`，这样我们的依赖就会执行了
   5. 依赖清理
   在搜集依赖之前我们要清理依赖索引，首先判断有没有更新，如果没有更新就不执行，如果有更新就清理了当前数据把新的数据放进去
      - 为什么要把东西删了再放进去呢？

      因为如果是这种情况 `${state.flag?state.name:state.age} ` 当我的 flag 值改变的时候，name 和 age 都会存在于 `deps` 中，但其实里面应该只有其中之一

### effect 的实现

那么我们来看看代码

::: code-tabs
@tab effect.ts

```ts
export function effect(fn: any, opt?: any) {
  // 创建一个响应式的 effect。在数据变化后会重新执行
  const _effect = new ReactiveEffect(fn, () => {
    // run 使fn重新执行

    _effect.run()
  })
  // 进来的时候要默认执行一次

  _effect.run()
  if (opt) {
    Object.assign(_effect, opt) //用户传递的覆盖掉内置的 scheduler
  }
  let runner = _effect.run.bind(_effect)
  //  runner.effect = _effect;
  return runner // 外界可以自己调用 runner 执行页面更新
}
export let activeEffect: any

class ReactiveEffect {
  _trackId = 0
  deps = []
  _depsLength = 0
  _running = 0 //是否正在运行
  // constructor 是一种用于创建和初始化 class 对象实例的特殊方法
  // 如果 fn 的数据发生变化 就会执行 scheduler 调用 run()
  public active = true
  constructor(public fn: any, public scheduler: any) {}
  run() { //执行了 run 就调用了 proxy -> baseHandler.ts // [!code warning]
    // 让 fn 执行
    let lastEffect = activeEffect; // 用于构建当前激活的effect
    if (!this.active) {
      // 不是响应式 执行后不用做其他事
      return this.fn()
    }
    // 是响应式进行依赖搜集
    try {
      // 执行这个函数 然后通过 finally 至空 activeEffect
      // 避免不是 effect 里面的数据收集
      activeEffect = this  // [!code error]
      // effect 重新执行前要将上一次的依赖清空
      preCleanEffect(this)
      this._running++
      return this.fn()
    } finally {
      this._running--
      postCleanEffect(this)
      activeEffect = lastEffect;
    }
  }
  stop() {
    this.active = false
  }
}

// 记住effect,将不需要的移除掉
// 1. _trackId 用于记录执行次数防止一个属性的多次搜集
// 2. 拿到上一次的依赖和新的依赖做对比
// 3. 和上一次相同的话就通过_depsLength++来跳过搜集
// 4. 和上一次不同的话删除掉原来的依赖数据把新进行搜集
// 5. 每一个子 dep 都通过对比来去掉，如果 oldDep 有但是dep 已经没有了
// 比如 old:{aa,bb,cc}  new:{aa} 就要循环对比进行清理  postCleanEffect
export const trackEffect = (effect: any, dep: any) => {
  if (dep.get(effect) !== effect._trackId) {
    dep.set(effect, effect._trackId)

    let oldDep = effect.deps[effect._depsLength]
    if (oldDep !== dep) {
      // 没有存过
      if (oldDep) {
        // 有，但更新了数据 就删除掉数据再把新的放进去
        cleanDepEffect(effect, oldDep)
      }
      effect.deps[effect._depsLength++] = dep
    } else {
      // 已经存过就不放到 deps 中，length 自增跳过
      effect._depsLength++
    }
  }
  // // 双向记忆，让 effect也记住 dep
  // effect.deps[effect._depsLength++] = dep;
}
// 清理 effect
export const cleanDepEffect = (effect: any, dep: any) => {
  dep.delete(effect)
  if (dep.size === 0) {
    dep.cleanup() //如果父级为空，就不需要了也删除掉
  }
}
export const postCleanEffect = (effect: any) => {
  // 清理 effect [aaa,bbb,ccc] - > [aaa]
  if (effect.deps.length > effect._depsLength) {
    for (let i = effect._depsLength; i < effect.deps.length; i++) {
      cleanDepEffect(effect, effect.deps[i]) //删除映射表对应的 effect
    }
  }
  effect.deps.length = effect._depsLength //更新依赖列表的长度
}

// 更新 effect
export const triggerEffect = (dep: any) => {
  // 依次执行 dep 中的 effect 更新它
  for (const effectItme of dep.keys()) {
    if (effectItme.scheduler) {
      // 调用 run 方法更新 effect
      if (!effectItme._running) {
        // 正在执行的项目不给更新，防止死循环
        effectItme.scheduler() //-> run()
      }
    }
  }
}
// 清理 effect
export const preCleanEffect = (effect: any) => {
  effect._depsLength = 0
  effect._trackId++ // trackId 自增 如果当前是同一个 effect id 会是相同的
}
```

@tab baseHandler.ts

```ts
import { isObject } from '@vue/shared'
import { activeEffect } from './effect'
import { track, trigger } from './reactiveEffect'
import { reactive } from './reactive'

export const ReactiveFlags: { IS_REACTIVE: string } = {
  IS_REACTIVE: '__v_isReactive',
}
/**
 * 使用 Reflect 而不直接返回 target[key] 的原因是要处理一些极端的边界情况
 * 比如要监听的对象里有一个 proxy 属性
 * 使用target[key] this 指向就会丢失 修改this 指向并不会触动 get
 * 使用receiver[key] 就会触发 get 后又触发使用 receiver 变成死循环
 * receiver是代理对象本身 Reflect 会对 receiver[key] 进行代理和拦截
 */
// !! proxy 需要搭配 Reflect 来使用
export const handler: ProxyHandler<any> = {
  get(target, key, receiver) {
    // 当取值的时候应该让响应式属性 和 effect 映射起来
    if (ReactiveFlags.IS_REACTIVE === key) {
      return true
    }
    // effect 收集依赖 activeEffect是 effect 的 this
    track(target, key) //搜集对象的属性，和 effect关联起来 -> reactiveEffect.ts // [!code warning]
    let res = Reflect.get(target, key, receiver)
    if (isObject(res)) {
      // 如果下一层也是个对象，需要对下一层的对象做代理 （递归代理）
      return reactive(res)
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    // 获取老值 可以在写 watch 的方法中用到
    let oldValue = target[key]
    // 找到属性让 effect 重新执行
    let result = Reflect.set(target, key, value, receiver)
    if (oldValue !== value) {
      // 需要触发更新
      trigger(target, key, value, oldValue) // -> reactiveEffect.ts // [!code warning]
    }
    return result
  },
}
```

@tab reactiveEffect.ts

```ts
import { activeEffect, trackEffect, triggerEffect } from './effect'

const targetMap = new WeakMap() //存放依赖搜集的map

export const createDep = (cleanup: any, key: any) => {
  const dep = new Map() as any
  //清理方法 用于删除搜集到的数据
  dep.cleanup = cleanup
  dep.name = key
  return dep
}
export function track(target: any, key: any) {
  //有 this 的activeEffect说明在 effect 中访问的，需要进行搜集
  if (activeEffect) {
    // 1.如果最外层没有搜集过，就创建一个 名字为 depsMap 的 map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    // 2.如果搜集过，判断里面的 key 是否被搜集过，如果没有就创建一个 名字为 dep 的 map
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep(() => depsMap.delete(key), key)))
    }
    // 3.将当前的 effect 添加到 dep 中
    trackEffect(activeEffect, dep) // [!code error]
    console.log(targetMap)
  }
}

// 触发更新
export function trigger(target: any, key: any, newValue: any, oldValue: any) {
  // 1.判断第一层是否有值，找不到直接return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  // 2.根据 key 找到对应的 dep
  let dep = depsMap.get(key)
  if (dep) {
    // 修改的属性对应的 effect，触发更新
    triggerEffect(dep) // [!code error]
  }
}

// Map:(obj:(属性:Map(effect,effect,effect)))
// {
//     {name: 'link',age:"18"},
//     name:{
//         effect：0
//     },
//     age:{
//         effect:0,
//         effect:0
//     }
// }
```

:::


:::
::: info 用于理解的 html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式 effect</title>
</head>

<body>
    <div id="app">
    </div>
    <script type="module">
        import { reactive, effect } from './reactivity.js'
        const app = document.getElementById('app')
        let obj = {
            name: 'link',
            age: "18",
            flag:true,
            address:{
                n:1
            }
        }
        const state = reactive(obj)
    //    let runner = effect(() => {
    //         app.innerHTML = `${state.name} ${state.age}`
    //         // app.innerHTML =`${state.flag?state.name:state.age}`
    //     },
    //     {
    //     scheduler: () => {
    //         // 调度执行，数据更新了但是不重新渲染，走自己的逻辑
    //         console.log("数据更新了，渲染没更新")
    //         runner()
    //         console.log("数据更新了，渲染更新了")
    //     }
    //     })
    //     setTimeout(() => {
    //         // state.flag = false
    //         state.age =10
    //         // setTimeout(()=>{
    //         //     console.log('修改属性后 name 不应该能触发 effect 函数');
    //         //     state.name = 'link2'
    //         // })
    //     }, 1000)
    effect(() => {
        // app.innerHTML = `${state.name}`
        // state.name = Math.random() //这样写他就会一直更新一直触发，进入死循环
           app.innerHTML = `${state.address.n}` //多层属性的代理
    })
    setTimeout(() => {
        state.address.n = 2
    }, 1000)
    </script>
</body>

</html>
  </body>
</html>
```

:::
