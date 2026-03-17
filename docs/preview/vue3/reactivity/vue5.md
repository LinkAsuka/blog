---
title: reactivity-ref 源码解析
createTime: 2024/12/26 16:17:32
tags:
  - VUE3源码
permalink: /article/u0zpe6pv/
---

packages/reactivity/src/ref.ts

<!-- more -->

> ref 的原理是通过把传来的值变成可劫持的对象进行数据处理的

1. 响应式核心功能

   `reactive` 让数据变成响应式数据

   `effect` 数据变化后让 effect 重新执行， 组件 、watch 、computed 都是基于 effect 来实现的

   `ref` 是用 reactive 和 effect 一起实现的 基础数据劫持功能

   `toRef` 是 reactive 的语法糖，将 reactive 数据转换为 ref

2. 都有了 reactive 还要 ref 干什么

   reactive 只能处理对象和数组，不能直接处理基本数据类型，但是 ref 可以做到

   在实际开发中我们通常会结合使用 ref 和 reactive，但是 reactive 想要整个替换对象的时候就很恶心，我是不爱用的

   对于基本类型和简单对象，使用 ref。对于复杂对象，使用 reactive

3. 引入 ref.ts 文件

   想要打包的时候带 ref.ts 玩

::: tabs
@tab packages/reactivity/src/index.ts

```ts
export * from './reactive'
export * from './effect'
export * from './ref' // [!code focus]
```

:::

## ref 的实现

还是来聊一下 ref 是怎么玩的

1. 我们都知道 ref 是怎么使用的，在 js 中调用的时候要创建一个对象，然后通过 .value 来获取和设置值

   - 为什么需要通过.value 来获取和设置值呢？

     因为 ref 需要是一个对象，如果传的设置的那个值不是对象，是不好做到数据劫持的，也就做不了双向绑定

2. 所以我们需要把 ref 传入的值变成一个对象，然后通过 proxy 代理，实现对值的修改和读取
   ref 需要的格式大概是
   ```ts
   let flag = {
     __v: flase,
     get value() {
       //搜集 effect
       return this.__v
     },
     set value(newValue) {
       //更新 effect
       this.__v = newValue
     },
   }
   ```
3. 通过 reactive 中的 `toReactive` 方法将数据变成可代理的对象，进入 proxy 代理实现对值的修改和读取
4. 通过 effect 来进行依赖搜集和触发数据的更新

::: code-tabs
@tab ref.ts

```ts
import { activeEffect, trackEffect, triggerEffect } from './effect'
import { toReactive } from './reactive'
import { createDep } from './reactiveEffect'

/**
 * 这里要做的事拿到传过来的值然后把他变成像这样的结构
 * 会变成这种形式，因为数据是不好拦截的。变成对象可以进行拦截操作
 * let flag = {
 *  _v:flase,
 *  get value(){ //搜集 effect
 *      return this._v
 *  },
 *  set value(newValue){ //更新 effect
 *      this._v = newValue
 *  }
 * }
 * */
export function ref(val: any) {
  return createRef(val)
}
function createRef(val: any) {
  return new RefImpl(val)
}
class RefImpl {
  public __v_isRef = true //唯一标识
  public _value: any //保存当前 ref 的值
  public dep: any //依赖收集 用于ref 的数据更新
  constructor(public _rawValue: any) {
    // 把值变成响应式的，如果值是对象的话 const aaa = ref({})
    this._value = toReactive(_rawValue) // -> reactive.ts // [!code warning]
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (newValue !== this._value) {
      // 如果有区别级更新
      this._rawValue = newValue //更新值
      this._value = newValue
      triggerRefValue(this)
    }
  }
}
function trackRefValue(ref: any) {
  if (activeEffect) {
    // createDep传两个值 cleanup 和 key
    // 这里是因为ref.dep不是一个 Map 类型，所以要把他转成 Map
    trackEffect(activeEffect,ref.dep = ref.dep || createDep(()=>(ref.dep = undefined),'undefined'))
    trackEffect(activeEffect, ref.dep)
  }
}
function triggerRefValue(ref: any) {
  let dep = ref.dep
  if (dep) {
    triggerEffect(dep)
  }
}
```

@tab reactive.ts

```ts
export function toReactive(val: any) { // [!code ++]
  return isObject(val) ? reactive(val) : val // [!code ++]
} // [!code ++]
```

:::

## ref 的扩展功能

我们设置 ` const state = reactive({name: 'aaa',age:18})`

### toRef

toRef 是 reactive 的语法糖，将 reactive 数据转换为 ref  
 它需要传两个参数，第一个是 reactive 数据，第二个是 reactive 数据中的某个属性 `toRef(state,'name')`

我有一个 reactive 传过来，我可以通过循环 reactive 修改里面 key 的数据。
从而实现吧 reactive 数据变成 ref  
 **当 `name.value` 的时候，相当于取 `state.name`**

```ts
class ObjectRefImp {
  public __v_isRef = true //唯一标识
  constructor(public _object: any, public _key: any) {}
  get value() {
    return this._object[this._key]
  }
  set value(newValue) {
    this._object[this._key] = newValue
  }
}

export function toRef(object: any, key: any) {
  return new ObjectRefImp(object, key)
}
```

### toRefs

toRef 一个个的转实在是难绷，其实写起来用的不多，如果能有一个批量转换的功能就好了，这个功能就是 toRefs  
 它只需要传一个参数 reactive 数据 `toRefs(state)`

只传了一个 reactive 过来，我这不就可以通过套娃循环把 toRef 用上了

```ts
export function toRefs(object: any) {
  const res = {}
  for (let key in object) {
    res[key] = toRef(object, key)
  }
  return res
}
```

## proxyRefs

proxyRefs 通过代理机制，实现了对 ref 对象的取值和修改功能的封装。在取值时，；在修改时，它会判断被修改属性是否为 ref 类型，并相应地更新其.value 属性或替换整个 ref 对象。

我们在 html 中用模板使用 ref 的时候可没有用`.value`哦

```ts
export function proxyRefs(objectWithRefs: any) {
  return new Proxy(objectWithRefs, {
    get(target, key, receiver) {
      let r = Reflect.get(target, key, receiver)
      // 如果是 ref 的话就返回 ref 的 value，自动脱掉 ref
      return r.__v_isRef ? r.value : r
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      if (oldValue.__v_isRef) {
        // 如果老值是 ref 需要给 ref 赋值
        oldValue.value = value
        return true
      } else {
        return Reflect.set(target, key, value, receiver)
      }
    },
  })
}
```

## 源码

那么完整的 ref 代码我也放在这里

::: code-tabs
@tab ref.ts

```ts
import { activeEffect, trackEffect, triggerEffect } from './effect'
import { toReactive } from './reactive'
import { createDep } from './reactiveEffect'

/**
 * 这里要做的事拿到传过来的值然后把他变成像这样的结构
 * 会变成这种形式，因为数据是不好拦截的。变成对象可以进行拦截操作
 * let flag = {
 *  _v:flase,
 *  get value(){ //搜集 effect
 *      return this._v
 *  },
 *  set value(newValue){ //更新 effect
 *      this._v = newValue
 *  }
 * }
 * */
export function ref(val: any) {
  return createRef(val)
}
function createRef(val: any) {
  return new RefImpl(val)
}
class RefImpl {
  public __v_isRef = true //唯一标识
  public _value: any //保存当前 ref 的值
  public dep: any //依赖收集 用于ref 的数据更新
  constructor(public _rawValue: any) {
    // 把值变成响应式的，如果值是对象的话 const aaa = ref({})
    this._value = toReactive(_rawValue)
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (newValue !== this._value) {
      // 如果有区别级更新
      this._rawValue = newValue //更新值
      this._value = newValue
      triggerRefValue(this)
    }
  }
}
function trackRefValue(ref: any) {
  if (activeEffect) {
    // createDep传两个值 cleanup 和 key
    // 这里是因为ref.dep不是一个 Map 类型，所以要把他转成 Map
    trackEffect(activeEffect,ref.dep = ref.dep || createDep(()=>(ref.dep = undefined),'undefined'))
    trackEffect(activeEffect, ref.dep)
  }
}
function triggerRefValue(ref: any) {
  let dep = ref.dep
  if (dep) {
    triggerEffect(dep)
  }
}

// 这里开始我开始做 toRef
class ObjectRefImp {
  public __v_isRef = true //唯一标识
  constructor(public _object: any, public _key: any) {}
  get value() {
    return this._object[this._key]
  }
  set value(newValue) {
    this._object[this._key] = newValue
  }
}

export function toRef(object: any, key: any) {
  return new ObjectRefImp(object, key)
}

// 这里开始我开始做 toRefs
// 这里开始我把 ts 类型验证去掉了，烦死了
export function toRefs(object: any) {
  const res = {}
  for (let key in object) {
    res[key] = toRef(object, key)
  }
  return res
}
// 这里开始我开始做 proxyRefs
// 用proxy 来写是因为Proxy可以自动识别ref
export function proxyRefs(objectWithRefs: any) {
  return new Proxy(objectWithRefs, {
    get(target, key, receiver) {
      // 如果他是一个 ref ，r 就是ref本身
      let r = Reflect.get(target, key, receiver)
      // 如果是 ref 的话就返回 ref 的 value，自动脱掉 ref
      return r.__v_isRef ? r.value : r
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      if (oldValue.__v_isRef) {
        // 如果老值是 ref 需要给 ref 赋值
        oldValue.value = value
        return true
      } else {
        // 如果不是 ref 就直接赋值
        return Reflect.set(target, key, value, receiver)
      }
    },
  })
}
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
    <title>响应式 ref</title>
</head>

<body>
    <div id="app">
    </div>
    <script type="module">
        import { reactive, effect,ref,toRef,toRefs,proxyRefs } from './reactivity.js'
        const app = document.getElementById('app')
        const flag = ref(false)
        const state = reactive({
            name: 'link',
            age: "18"
        })
        // let {name,age} = toRefs(state)
        // let name = toRef(state,'name')
        // let age = toRef(state,'age')
        // console.log(name,age);

        let proxy = proxyRefs({...toRefs(state)})
        proxy.age = 100
        app.innerHTML = `
        <div>
            <p>name:${proxy.name}</p>
            <p>age:${proxy.age}</p>
        </div>
        `
    </script>
    </script>
</body>

</html>
```

:::
