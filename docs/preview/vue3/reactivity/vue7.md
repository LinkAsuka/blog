---
title: api-watch 源码解析
createTime: 2024/12/31 09:28:37
tags:
  - VUE3源码
permalink: /article/14m8gyao/
---

packages/reactivity/src/watch.ts(暂定，源码不在这)

<!-- more -->

> watch 的原理是 通过 effect 的 `ReactiveEffect` 方法去创建一个 effect，达到如果传来的 source 改变了，就执行对应的回调函数

==watch 是不基于 reactivity 的，但是又其实也有一定的关联都用了 effect 所以写在一个文件夹里了==

## watch 的作用和衍生的功能

### watch 的作用

1. watch 是一个函数，可以监听一个对象，当对象改变的时候执行回调函数
2. 接收 3 个参数 source,cb,options
   - source 监控的对象，我们因为要进行监听更新需要把他变成函数
   - cb 监听到数据改变后执行的回调
   - options 配置项，可以配置 deep , immediate 等（现在只写这俩）
        - deep 配置项，如果为 true，则深度监听对象
        - immediate 配置项，如果为 true，则立即执行回调函数
3. watch 函数返回 newValue、oldValue、onCleanup，分别是 新旧值 清理函数
   - **在 VUE3 中在使用 watch 的时候会发现怎么新旧值返回的是一样的**
   - 原因：vue 在 watch 监听时：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本
   - 解决办法 1：`watch(state.count,function(new,old){})` 像这样单独监听某个属性
   - 解决办法 2：用计算属性将响应式对象转换为`ComputedRef<string>`的响应式字符串
   ```ts
   let newState = computed(() => {
     return JSON.stringify(state)
   })
   ```

### watchEffect 的作用

1. watchEffect 是 watch 的一个语法糖，可以监听一个函数，当函数的返回值改变的时候就自己 ~ 调 ~ 自己
2. 接收 2 个参数 source , options

- 参数和 watch 其实一样但是没有 cb 因为只调用的自己

3. watchEffect 不像 watch 一样返回 oldValueh 和 newValue

## watch 的实现

1. 引入 watch.ts 文件

想要打包的时候带 watch.ts 玩

::: tabs
@tab packages/reactivity/src/index.ts

```ts
export * from './reactive'
export * from './effect'
export * from './ref'
export * from './computed'
export * from './watch' // [!code focus]
```

:::

2. 把`source`变成函数需要用到递归，因为 `source` 可能是一个生成嵌套的对象，如果直接把他变成对象的话那些深层嵌套的东西就都没有办法被响应到  
3. `source` 的递归可能出现死循环的情况，所以需要用一个 `set` 集合来记录已经访问过的对象，避免死循环，在循环中判断如果 `seen` 里已经有了 `source` 就直接返回 4. 使用 `effect` 中的`ReactiveEffect` 方法去创建一个 effect，达到如果传来的 source 改变了 就会调用 `job` 方法，`job` 方法执行回调函数 `cb(newValue, oldValue,onCleanup)`

::: code-tabs
@tab watch.ts

```ts
// watch 是不基于 reactivity 的，但是又其实也有一定的关联，所以也放在一起
// source 就类似于 reactiveEffect(getter,schedule) 中的 getter
// cd 就类似于 reactiveEffect(getter,schedule) 中的 schedule
import { isFunction, isObject, isReactive } from "@vue/shared";
import { ReactiveEffect } from "./effect"
import { isRef } from "./ref";
// 当 source 发生变化时，会执行 cb
export function watch(source, cb, options = {} as any) {    // 监控的是谁  回调 选项
    return doWatch(source, cb, options)
}
export function watchEffect(source, options = {} as any) { 
    // watchEffect 没有 cd 如果 source发生变化了就调用自己
    return doWatch(source, null, options)
}
// 遍历 traverse 函数的作用是遍历对象的每一层属性，确保这些属性都被 Vue 的依赖收集机制所追踪
// 如果 source 是一个深层嵌套的对象 无法保证所有层级的属性都被追踪到
function traverse(source, depth, currentDepth = 0, seen = new Set()) {
    if (!isObject(source)) { //不是对象直接返回
        return source
    }
    if (depth) {
        if (currentDepth >= depth) { //如果已经达到深度 就直接返回
            return source
        }
        currentDepth++; //根据deep属性来看是否是深度
    }
    if (seen.has(source)) { //如果已经收集过了 就直接返回
        return source
    }
    seen.add(source);
    for (const key in source) {
        traverse(source[key], depth, currentDepth, seen)
    }
    return source; //遍历触发每个属性的 get
}
//做监控 watchEffect也是基于这个来实现的
function doWatch(source, cb, { deep, immediate }) {
    // 将source对像转换成getter 变成一个函数 fn()
    const reactiveGetter = source => traverse(source, deep === false ? 1 : undefined)
    // 如果source是响应式,或者是 ref，就执行
    let getter;
    if (isReactive(source)) { //判断是否是响应式对象 -> @vue/shared // [!code warning]
        getter = () => reactiveGetter(source);
    } else if (isRef(source)) { // -> ref.ts // [!code warning]
        getter = () => source.value;  // 如果是 ref 就直接.value 这样就能直接触发属性的搜集 
    } else if (isFunction(source)) { // -> @vue/shared // [!code warning]
        getter = source // 如果本身就是个函数那么就直接给 
    }
    let oldValue;
    let clean;
    const onCleanup = (fn) => {
        clean =()=>{
            fn()
            clean = undefined;
        }
    }
    const job = () => {
        if (cb) {
            // 得到新值
            const newValue = effect.run()
            if(clean){
                clean() //在执行第二次回调前，先清理上一次的
            }
            // 返回老值和新值之后更新老子
            cb(newValue, oldValue,onCleanup)
            oldValue = newValue;
        }else{
            // 当 effect 的 getter 变化后，如果是watchEffect还是调自己
            effect.run() // watchEffect
        }
    }
    // 创建一个 effect 来达成 如果 getter 变化，就执行 job 函数 的效果
    const effect = new ReactiveEffect(getter, job)  // [!code warning]
    if (cb) {
        if (immediate) {
            job() // 如果有 immediate 就表示马上进来的时候先执行一次用户的回调，传递新值和老值（undefined）
        } else {
            // 调用 effect
            oldValue = effect.run() // 获取老值
        }
    } else {
        // watchEffect 没有回调，就直接执行 effect.run() 第一次进来调用自己
        effect.run()
    }
    // 返回一个函数，用于停止监听 unwatch() 停止监听
    const unwatch = () => {
        effect.stop()
    }
    return unwatch
}

```

@tab effect.ts

```ts
export class ReactiveEffect{
    _trackId = 0;
    _depsLength = 0;
    _running = 0 //是否正在运行
    _dirtyLevel = DirtyLevels.Dirty; //判断是不是脏数据 computed用的
    deps = [];
    // constructor 是一种用于创建和初始化 class 对象实例的特殊方法
    // 如果 fn 的数据发生变化 就会执行 scheduler 调用 run()
    public active = true
    constructor(public fn:any,public scheduler:any){}
    // 一个用于测试的文件，如果返回true 说明他是一个脏数据
    public get dirty() {
        return this._dirtyLevel === DirtyLevels.Dirty;
    }
    // 一个用于转换的工具val为 true 的时候这条就是脏数据
    public set dirty(val){
        this._dirtyLevel = val? DirtyLevels.Dirty : DirtyLevels.NoDirty;
    }
    run(){
        this._dirtyLevel = DirtyLevels.NoDirty; //每次执行完成之后，我就把他变成不脏的 
        // 让 fn 执行
        if(!this.active){
            // 不是响应式 执行后不用做其他事
            return this.fn()
        }
        // 是响应式进行依赖搜集
        let lastEffect = activeEffect; // 用于构建当前激活的effect
        try{
            // 执行这个函数 然后通过 finally 至空 activeEffect 
            // 避免不是 effect 里面的数据收集
            activeEffect = this;
            // effect 重新执行前要将上一次的依赖清空
            preCleanEffect(this); //清理的是索引性质的
            this._running++
            return this.fn();   
        } finally {
            postCleanEffect(this);  //循环进行清理
            this._running--
            activeEffect = lastEffect;
        }
    }
    stop(){ // [!code ++]
        if(this.active){ // [!code ++]
            this.active = false; // [!code ++]
            preCleanEffect(this); // [!code ++]
            postCleanEffect(this); // [!code ++]
        } // [!code ++]
    } // [!code ++]
}

```

@tab ref.ts

```ts
export function isRef(value){ // [!code ++]
    return value && value.__v_isRef // [!code ++]
} // [!code ++]
```

@tab shared/src/index.ts

```ts
// 判断是不是一个响应式 // [!code ++]
export function isReactive(value: any): boolean { // [!code ++]
  return !!(value && value[ReactiveFlags.IS_REACTIVE]) // [!code ++]
} // [!code ++]
```

:::


::: info 用于理解的 html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式 watch</title>
</head>

<body>
    <div id="app">
    </div>
    <script type="module">
    // watchEffect 是如果响应式数据发生变化，就重新调用我自己 ,可以用于值变了重新发请求
    import { reactive, effect, ref, toRef, toRefs, proxyRefs, watch, 
    watchEffect } from './reactivity.js'
    const app = document.getElementById('app')
        // 监控的是谁  回调 选项
        const state = reactive({
            name: 'why',
            age: 18,
            address: [{
                n: 1
            }]
        })
        // watch(state,function(oldValue,newValue){
        //     console.log(oldValue,newValue);
        // },{
        //     deep: true //深度，为true的时候就只监听第一层，如果修改的是 address.n 就不会触发
        // })
        // 我还可以单独监听某个属性
        // onCleanup : 竞速的问题  如果用 watch 来监听一个 input，当inpu 的值改变，那么就会触发两次
        // 返回的数据应该是最后一个触发形成的，但是因为前面返回的数据处理完后可能会比后面的数据速度慢，后返回回来
        // 这样就会出错，所以提供了 onCleanup 的功能
        // 大致的原理就是 第一次响应的东西记下来在第二次响应的时候 取消掉第一次的响应，这样第二次响应的时候就不会有错误了
        
        const unwatch = watch(() => state.name,
            function (oldValue, newValue,onCleanup) {
                console.log(oldValue, newValue );
                onCleanup(()=>{
                    console.log('取消了');
                })
            })  


        // watchEffect(function () {
        //     console.log(state.name);
        // })

        setTimeout(() => {
            state.name = 'link2'
            // unwatch() //停止 watch
             state.name = 'link3'
            // state.address.n = 2 //这个不会响应因为 deep 传的是 true
        }, 1000)
        // setTimeout(() => {
           
        //     // state.address.n = 2 //这个不会响应因为 deep 传的是 true
        // }, 2000)
    </script>
</body>

</html>
```

:::