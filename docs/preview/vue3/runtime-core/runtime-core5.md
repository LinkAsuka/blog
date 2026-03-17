---
title: runtime-core -> 组件的实现
createTime: 2025/01/13 14:20:42
tags:
  - VUE3源码
permalink: /article/45kgqjni/
---

packages/runtime-core/src/component.ts

<!-- more -->

## 组件原理

我们写 vue3 的时候，编辑器会给你一个模板，这个模板长什么样，想必大家都知道一个组件的组成部分有
`data`,`props`等

- 那为什么在编辑器里写这些，浏览器就能修改 dom 节点达到你想要的效果呢
  因为其实把组件看成是一个调用`render`方法的函数就能理解了  
  `render(h(VueComponent, {'组件的attrs属性'}), '实例')`
  - h(VueComponent) = vnode 产生的是组件类的虚拟节点
  - 其实 template 就是 render 函数
  - render 函数返回的虚拟节点才是最终要渲染的虚拟节点 = subTree

### 组件运行逻辑

1. 我们有一个普通的`VueComponent`

```ts
const VueComponent = {
  data() {
    return {
      name: 'zhangsan',
      age: 18,
    }
  },
  props: {
    msg: {
      name: String,
      default: 'hello',
    },
  },
  render(proxy) {
    // this ==> VueComponent 内部不会通过类来产生实力
    return h(Fragment, [h(Text, 'my name：' + proxy.$attrs.a + 'a'), h('div', proxy.$attrs.b)])
  },
}
render(h(VueComponent, {}), app)
```

2. renderer 渲染器接收到了来自组件的传值开始用核心渲染方法`patch`方法渲染,用`shapeFlag`判断到传值过来是组件,就调用`processComponent`对组件进行处理
3. 处理组件`processComponent(n1, n2, container, anchor)`  
   如果`n1`是空的话说明是第一次渲染,调用`mountComponent`
   如果`n1`不为空的话说明需要更新组件,调用`updateComponent`
4. 创建组件`mountComponent(vnode, container, anchor)`
5. 先创建组件实力
   实例是这样

```ts
const instance = {
  data: null, //状态
  vnode: vnode, //组件虚拟节点
  subTree: null, //子树
  isMounted: false, //组件是否挂载
  update: null, //更新组件的函数
  proxy: null, // 代理对象
  props: {}, //响应式属性
  attrs: {}, //非响应式属性
  propsOptions: vnode.type.props, //组件的props配置
  component: null,
}
```

2. 给实例的组件赋值

- 组件的属性分为`props`和`attrs`,`props`来的属性是响应式的,`attrs`不是响应式的  
  `属性 = attrs(非响应式的，自己拥有的) + props(响应式的,其他组件传来的)`
- 通过组件定义的 `propsOptions` 来判断哪些是 props 哪些是 attrs,并把他们存到 `instance.vnode.props`中
- 用 `new Proxy`把`instance.props`变成响应式的
- 处理 `data` 把 data 里的数据变成响应式的

3. 创建一个 effect

- effect 里面调用 `new ReactiveEffect`
- 当组件发生变化的时候，要更新他 我们通过 `ReactiveEffect` 的 `scheduler` 来实现
- 我们通过事件环的机制，延迟更新操作 因为先走宏任务再走微任务的机制，用一个数组拿到要更新的状态，然后再`Promise`里面执行，这样就会先把数组数据存起来，再执行，这样不会出现先更新了再渲染的问题
- 如果没有`isMounted`说明是第一次,需要初始化,然后加上`isMounted`,下回进来的时候就不是第一次了,走更新逻辑
- 如果是由手动变化的话,给`instance`加上`instance.next`。在更新的时候判断是否有`instance.next`有的话更新，更新后清空`next`刷新`instance.vnode`调用更新函数`updataProps`

### 源代码解析

::: tabs
@tab renderer.ts

```ts
// 更新组件
const shouldUpdateComponent = (n1, n2) => {
  const { props: prevProps, children: prevChildren } = n1
  const { props: nextProps, children: nextChildren } = n2

  if (prevChildren || nextChildren) return true //如果是插槽直接渲染

  if (prevProps === nextProps) return false
  return hasPropsChanged(prevProps, nextProps) //判断属性是否更新
}
const updateComponent = (n1, n2) => {
  // 元素更新 n2.el = n1.el
  // 组件更新 n2.component.subTree.el = n1.component.subTree.el
  const instance = (n2.component = n1.component) //复用组件的实例 复用的是 dom 元素
  if (shouldUpdateComponent(n1, n2)) {
    // 如果组件需要更新 记住next 调用更新方法
    instance.next = n2 //next 是用来判断是否是由属性更新
    instance.update() //属性变化手动调用更新方法
  }
}
// 对比Props
function hasPropsChanged(prevProps, nextProps) {
  // 对比两个属性的长度 如果不一样就返回true
  const nextKeys = Object.keys(nextProps)
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i]
    if (nextProps[key] !== prevProps[key]) {
      return true
    }
  }
  return false
}
function updataProps(instance, prevProps, nextProps) {
  // 对比这两个属性有没有变化 true 是有变化
  if (hasPropsChanged(instance, prevProps)) {
    // 如果有变化，赋值
    for (const key in nextProps) {
      //用新的覆盖老的 把新的 props 赋值给 instance.props
      instance.props[key] = nextProps[key]
    }
    // 老的 props 删除
    for (const key in instance.props) {
      // 如果老的不在新的里面 说明被删掉了
      if (!(key in nextProps)) {
        // 删除掉
        delete instance.props[key]
      }
    }
  }
}
// 处理组件
const processComponent = (n1, n2, container, anchor) => {
  if (n1 === null) {
    // 如果是第一次渲染，做初始化操作,挂载上去
    mountComponent(n2, container, anchor)
  } else {
    // 如果不是第一次渲染，做更新操作
    // 组件更新有三种方式 （状态 ， 属性 ， 插槽（也是属性，但是在 props 里面的））
    // 这里是属性插槽变化之后走的位置
    updateComponent(n1, n2)
  }
}
const updataComponentPrRender = (instance, next) => {
  instance.next = null
  instance.vnode = next
  // 更新Props
  updataProps(instance, instance.props, next.props)
}
// 创建实例后 组件用 effect 来实现更新到 dom
// 这里是状态变化之后走更新的位置
function setupRenderEffect(instance, container, anchor) {
  const { render } = instance
  // 当组件发生变化的时候，要更新他 我们通过 ReactiveEffect 的 scheduler 来实现
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      // 获取最新的虚拟节点 （this,proxy）
      const subTree = render.call(instance.proxy, instance.proxy)
      // 更新组件
      patch(null, subTree, container, anchor)
      // 更新虚拟节点
      instance.subTree = subTree
      instance.isMounted = true
    } else {
      const { next } = instance
      // 第二次渲染的 subTree ，基于状态的组件更新
      if (next) {
        // 说明属性和插槽有更新，更新属性或插槽
        updataComponentPrRender(instance, next)
      }
      const subTree = render.call(instance.proxy, instance.proxy)
      patch(instance.subTree, subTree, container, anchor)
      instance.subTree = subTree
    }
  }
  // queueJob对方法进行批量处理
  const effect = new ReactiveEffect(componentUpdateFn, () => queueJob(update)) // [!code warning]
  const update = (instance.update = () => effect.run())
  // 进来先 run 一遍
  update()
}

// 创建组件实例
const mountComponent = (vnode, container, anchor) => {
  //  1. 先创建组件实力
  const instance = (vnode.component = createComponentInstance(vnode)) // [!code warning]
  //  2. 给实例的组件赋值
  setupComponent(instance) // [!code warning]
  // 3. 创建一个 effect
  setupRenderEffect(instance, container, anchor)
}
```

@tab scheduler.ts

```ts
type Job = () => void // 假设 job 是一个函数类型
const queue: Job[] = [] // 显式声明 queue 的类型为 Job[]
let isFlushing = false // 是否正在刷新 true 正在刷新
const resolvePromise = Promise.resolve() // promise

// 如果同时在一个组件中更新多个状态，job 会被重复调用，所以需要去重
export function queueJob(job: Job) {
  // 如果不停的调用 job 就要把他缓存起来
  if (!queue.includes(job)) {
    // 如果队列中不包含 job，才添加到队列中
    queue.push(job) // 将 job 添加到队列中
  }
  if (!isFlushing) {
    isFlushing = true // 设置 isFlushing 为 true，表示正在刷新
    resolvePromise.then(() => {
      //当事情做完了，把他重置成 false
      isFlushing = false
      const copy = queue.slice(0) //先拷贝在执行
      queue.length = 0 //清空队列
      copy.forEach((job) => job())
      copy.length = 0 //清空队列
    })
  }
}
// 通过事件环的机制，延迟更新操作 因为先走宏任务再走微任务
/**
 * queueJob(job1);
 * queueJob(job2);
 * queueJob(job1);
 * 就会变成先把 push 调用完了job1，job2，job3再进入Promise微任务进行循环
 */
```

@tab component.ts

```ts
import { reactive } from '@vue/reactivity'
import { hasOwn, isFunction } from '@vue/shared'

export function createComponentInstance(vnode) {
  const instance = {
    data: null, //状态
    vnode: vnode, //组件虚拟节点
    subTree: null, //子树
    isMounted: false, //组件是否挂载
    update: null, //更新组件的函数
    proxy: null, // 代理对象
    props: {}, //响应式属性
    attrs: {}, //非响应式属性
    propsOptions: vnode.type.props, //组件的props配置
    component: null,
  }
  return instance
}
// 处理 props 和 attrs
const initProps = (instance, rawProps) => {
  const props = {}
  const attrs = {}
  const propsOptions = instance.propsOptions || {} //组件中定义的
  if (rawProps) {
    for (let key in rawProps) {
      //循环所有的
      const value = rawProps[key]
      if (key in propsOptions) {
        //如果在组件中定义的放到 props
        props[key] = value
      } else {
        attrs[key] = value //如果在组件中没有定义的放到 props
      }
    }
  }

  instance.props = reactive(props) // 这里应该用shallowReactive，遵循单向数据流原则
  instance.attrs = attrs
}
const publicProperty = {
  $attrs: (instance) => instance.attrs,
  $props: (instance) => instance.props,
  $el: (instance) => instance.vnode.el,
  $data: (instance) => instance.data,
}
const PublicInstanceProxyHandlers = {
  get(target, key) {
    const { data, props } = target
    // 先判断 data里面有没有这个属性，没有就看props里面有没有
    if (data && hasOwn(data, key)) {
      return data[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }
    // 对于一些无法进行修改的属性， $slots $attrs 等
    const getter = publicProperty[key] //通过不同的策略来访问对应的方法
    if (getter) {
      return getter(target)
    }
  },
  set(target, key, value) {
    const { data, props } = target
    if (data && hasOwn(data, key)) {
      data[key] = value
    } else if (hasOwn(props, key)) {
      props[key] = value
    }
    return true
  },
}
export function setupComponent(instance) {
  // 属性 = attrs(非响应式的，自己拥有的) + props(响应式的,其他组件传来的)
  // 根据propsOptions区分出 attrs和 props 所有属性 - propsOptions = attrs
  const { props, type } = instance.vnode
  // 初始化 props 和 attrs 用 propsOptions当区别分开储存
  initProps(instance, props)
  // 响应式 proxy
  instance.proxy = new Proxy(instance, PublicInstanceProxyHandlers)
  const data = type.data
  if (data) {
    if (!isFunction(data)) {
      console.warn('The data option must be a function.')
    } else {
      // 初始化 data
      instance.data = reactive(data.call(instance.proxy))
    }
  }
  // 把render放入 instance
  instance.render = type.render
}
```

:::


::: info 用于理解的 html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>

<body>
  <div id="app">
  </div>
  <script type="module">

    import { render, h, createVNode, Text, Fragment } from './runtime-dom.js'
    let app = document.getElementById("app")
    // 这就是一个 vue 组件
    // 属性 = attrs(非响应式的，自己拥有的) + props(响应式的,其他组件传来的)
    // 所有属性 - propsOptions = atters
    const VueComponent = {
      data() {
        return {
          name: "zhangsan",
          age: 18
        }
      },
      props: {
        msg: {
          name: String,
          default: "hello"
        }
      },
      render(proxy) {
        // this ==> VueComponent 内部不会通过类来产生实力
        return h(Fragment,  [
          h(Text, "my name："+ proxy.$attrs.a +"a"),
          h("div",proxy.$attrs.b)
        ])
      }
    }
    // render(h(VueComponent,{a:1,b:2}),app)
    const RenderComponent ={
     props:{
      address:String
     },
      render() {
        return h(Fragment, [
          h(Text, this.address),
        ])
      }
    }
    const VueComponent1 = {
      data() {
        return {
          falg: true, addrerr: '武汉'
        }
      },
      render() {
        return h(Fragment, [
          h('button', { onClick: () => { this.falg = !this.falg } },'点我'),
          h(RenderComponent,{address:this.falg ? '武汉' : '长沙'})
        ])
      }
    }

    render(h(VueComponent1, {}), app)

    // 其实 template 就是 render 函数
    // 组件的两个虚拟节点组成
    // h(VueComponent) = vnode 产生的是组件类的虚拟节点
    // render 函数返回的虚拟节点才是最终要渲染的虚拟节点 = subTree

    // 组件更新有三种方式 （状态 ， 属性 ， 插槽）
  </script>
</body>

</html>
```

:::
