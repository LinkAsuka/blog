---
title: reactivity-computed 源码解析
createTime: 2024/12/30 11:13:16
tags:
  - VUE3源码
permalink: /article/xigaordd/
---

packages/reactivity/src/computed.ts

<!-- more -->

> computed 的原理是 通过 dirty 属性来判断是不是脏数据，如果是就用 effect 来收集依赖，当依赖的数据发生变化的时候，就触发 effect 的更新，更新完之后，就重新计算，然后返回新的值

1. 计算属性维护了一个 `dirty` 属性，用于判断是否需要计算，如果变化了 `dirty` 为 true，则需要计算，如果没有变化 `dirty` 为 false，则不需要计算
2. 计算属性也是一个 `effect` ，所以可以收集依赖，依赖的属性会搜集这个计算的属性，当前后值变化后，会让 `computedEffect` 里面的 `dirty` 变为 true ，从而触发计算属性的更新
3. computed 执行后的结果是一个 ref 的值，这个值是不可变的
4. 可以通过.value 去获取到计算属性的值，但是不能通过 `.value` 修改，只能通过 `.value` 获取

### computed 逻辑梳理

1. 引入 ref.ts 文件

 想要打包的时候带 computed.ts 玩

::: tabs
@tab packages/reactivity/src/index.ts

```ts
export * from './reactive'
export * from './effect'
export * from './ref'
export * from './computed' // [!code focus]
```

:::

2. 处理 getter 和 setter

 computed 可以有两种写法

::: code-tabs
@tab 传入函数

```ts
// 传方法进来
const double = computed(() => {
  console.log('double被调用了')
})
```

@tab 传入对象

```ts
// 传对象进来
const double = computed({
  get(oldValue) {
    console.log('get被调用了')
    return state.name + state.age
  },
  set() {
    console.log('set被调用了')
  },
})
```

:::

`const aaa = computed(处理中...) `

- 如果传的是对象，那么 set 是可以修改值的，可以通过 aaa.value 修改 aaa，这样就能触发 set
- 如果传的是函数，那么 set 是没有意义的，所以随便给一个方法，这样 set 就不会报错了

我们先判断传的是函数还是对象，如果是函数那么 get 就是传过来的函数本身如果是对象那么 get 和 set 就可以对应上

3. 创建 dirty 和 noDirty 函数
   `dirty` 函数用来设置 是脏数据，`noDirty` 函数用来设置 不是脏数据
   如果是脏数据就要更新，入柜不是脏数据就可以返回原来的，第一次进 get 的时候 dirty 默认为 true，是一定能进去的。第二次就要通过情况去判断了。

4. 在 effect 里面判断是否是脏数据
   执行 run()的时候就应该把 `dirty` 从默认值为 true 变为 false，如果下次来的是相同的数据就可以不更新。在 `triggerEffect` 更新的时候里面判断 `dirty` 的值，如果他不是脏数据，就把他变成脏数据

5. 创建一个 `class` 来处理 effect
   因为 `computed` 在数值更新的时候也要更新，所以会涉及到依赖搜集所以要用 `effect` 来写
   使用 `effect.ts` 中的 `ReactiveEffect` 来创建一个响应式的 `effect`
   因为 `computed` 要返回的是 ref ，所以用的 `ref.ts` 里面的关于 effect 的方法 `trackRefValue`和`triggerRefValue` 来进行依赖的搜集和更新

::: code-tabs
@tab constants.ts

```ts
// 这里新建了一个constants把标记性质的值做统一处理

// reactive的唯一值 用于判断这个数据是否已经被响应过
export const ReactiveFlags = {
  IS_REACTIVE: '__v_isReactive',
}

// computed的判断值
export const DirtyLevels = {
  Dirty: 4, // 脏值，取值的时候要更新计算属性
  NoDirty: 0, //不脏，取值的时候就用上一次的返回结果，不需要重新计算
}
```

@tab effect.ts

```ts
export class ReactiveEffect {
  _trackId = 0
  _depsLength = 0
  _running = 0 //是否正在运行
  _dirtyLevel = DirtyLevels.Dirty //判断是不是脏数据 computed用的  // [!code ++]
  deps = []
  // constructor 是一种用于创建和初始化 class 对象实例的特殊方法
  // 如果 fn 的数据发生变化 就会执行 scheduler 调用 run()
  public active = true

  constructor(public fn: any, public scheduler: any) {}
  // 一个用于测试的文件，如果返回true 说明他是一个脏数据  // [!code ++]
  public get dirty() { // [!code ++]
    return this._dirtyLevel === DirtyLevels.Dirty // [!code ++]
  } // [!code ++]
  // 一个用于转换的工具val为 true 的时候这条就是脏数据  // [!code ++]
  public set dirty(val) {  // [!code ++]
    this._dirtyLevel = val ? DirtyLevels.Dirty : DirtyLevels.NoDirty // [!code ++]
  } // [!code ++]
  run() {
    this._dirtyLevel = DirtyLevels.NoDirty //每次执行完成之后，我就把他变成不脏的  // [!code ++]
    // 让 fn 执行
    if (!this.active) {
      // 不是响应式 执行后不用做其他事
      return this.fn()
    }
    // 是响应式进行依赖搜集
    let lastEffect = activeEffect // 用于构建当前激活的effect
    try {
      // 执行这个函数 然后通过 finally 至空 activeEffect
      // 避免不是 effect 里面的数据收集
      activeEffect = this
      // effect 重新执行前要将上一次的依赖清空
      preCleanEffect(this)
      this._running++
      return this.fn()
    } finally {
      postCleanEffect(this)
      this._running--
      activeEffect = lastEffect
    }
  }
  stop() {
    this.active = false
  }
}
// 更新 effect
export const triggerEffect = (dep: any) => {
  // 依次执行 dep 中的 effect 更新它
  for (const effectItme of dep.keys()) {
    //  4 或 0                          4 // [!code ++]
    if (effectItme._dirtyLevel < DirtyLevels.Dirty) { // [!code ++]
      // 如果依赖项是脏的，就执行 effect  // [!code ++]
      effectItme._dirtyLevel = DirtyLevels.Dirty // [!code ++]
    } // [!code ++]
    if (!effectItme._running) {
      // 正在执行的项目不给更新，防止死循环  
      if (effectItme.scheduler) {
        // 调用 run 方法更新 effect 
        effectItme.scheduler() //-> run() 
      }
    }
  }
}
```

@tab computed.ts

```ts
import { isFunction } from '@vue/shared'
import { ReactiveEffect } from './effect'
import { trackRefValue, triggerRefValue } from './ref'

class ComputedRefImpl {
  public _value
  public effect
  public dep
  constructor(getter, public setter) {
    // ReactiveEffect 创建一个响应式的 effect。在数据变化后会重新执行
    // 第一个值传 fn 第二个传的是 scheduler 也就是run()的时候触发的
    this.effect = new ReactiveEffect( // [!code warning]
      () => getter(this._value),
      () => {
        // 计算属性依赖发生变化，需要触发effect 重新执行run()
        triggerRefValue(this) // 触发依赖后需要触发重新渲染，将 dirty 设置为true -> effect.ts -> triggerEffect // [!code warning]
      }
    )
  }
  // 获取计算属性的时候触发
  get value() {
    if (this.effect.dirty) {
      // 默认取值一定是 true,但是执行一次之后拿的就是 noDirty 了 -> effect.ts
      this._value = this.effect.run()
      // 如果当前在 effect 中访问了计算属性 ，计算属性就可以搜集这个 effect
      // 这个方法接受一个 ref,用于 ref的依赖搜集
      trackRefValue(this) // [!code warning]
    }

    // 如果有重复，那么就直接返回
    return this._value
  }
  // 设置计算属性的时候触发，但是函数调用是用不到的
  set value(value) {
    // 这里就是 ref 的 setter
    this.setter(value)
  }
}
export function computed(getterOrOptions) {
  // 判断 getterOrOptions 是不是个函数
  let onlyGetter = isFunction(getterOrOptions) // [!code warning]
  let getter
  let setter
  if (onlyGetter) {
    // 是个函数 function
    getter = getterOrOptions
    setter = () => {}
  } else {
    // 不是函数
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  //   console.log(getter,setter);
  return new ComputedRefImpl(getter, setter)
}
```

@tab shared/src/index.ts

```ts
// 判断是不是一个对象
export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object'
}

// 判断是不是一个函数 // [!code ++]
export function isFunction(value: any): value is Function {  // [!code ++]
  return typeof value === 'function' // [!code ++]
} // [!code ++]
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
    <title>响应式 computed</title>
</head>

<body>
    <div id="app">
    </div>
    <script type="module">
        import { reactive, effect, ref, toRef, toRefs, proxyRefs, computed } from './reactivity.js'
        const app = document.getElementById('app')
        const flag = ref(false)
        let obj = {
            name: 'link',
            age: "18",
        }
        const state = reactive(obj)
        const aaa1 = computed(()=>{
            console.log('计算属性被调用了')
            return state.name+'***'
        })
        const aaa2 = computed({
            get(oldValue) {
                console.log('get被调用了，了，老数据是', oldValue)
                return state.name + '***'
            },
            set(value) {
                console.log('set被调用了，改成了',value)
            }
        })

        effect(() => {
            console.log(aaa1.value);
            console.log(aaa1.value);
            console.log(aaa1.value);
            console.log(aaa2.value)
            console.log(aaa2.value)
            console.log(aaa2.value)
        })
        setTimeout(() => {
         state.name = 'link1'
        }, 1000)
         aaa2.value = 'xxx'
    </script>
    </script>
</body>

</html>
```

:::
