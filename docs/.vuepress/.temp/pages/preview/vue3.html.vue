<template><div><p>packages/reactivity/src/reactive.ts</p>
<!-- more -->
<blockquote>
<p>reactive的原理就是通过 Proxy 中的get 和 set 来实现数据的拦截，从而实现双向绑定</p>
</blockquote>
<ol>
<li>
<p>响应式核心功能
<code v-pre>reactive</code> 让数据变成响应式数据
<code v-pre>effect</code> 数据变化后让 effect 重新执行， 组件 、watch 、computed 都是基于 effect 来实现的</p>
</li>
<li>
<p>引入 reactive.ts 文件
想要打包的时候带 reactive.ts 玩</p>
</li>
</ol>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>// packages/reactivity/src/index.ts</span></span>
<span class="line"><span>export * from './reactive';</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reactive-的实现" tabindex="-1"><a class="header-anchor" href="#reactive-的实现"><span>reactive 的实现</span></a></h3>
<ul>
<li>用于理解的 html</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>&#x3C;!DOCTYPE html></span></span>
<span class="line"><span>&#x3C;html lang="en"></span></span>
<span class="line"><span>  &#x3C;head></span></span>
<span class="line"><span>    &#x3C;meta charset="UTF-8" /></span></span>
<span class="line"><span>    &#x3C;meta name="viewport" content="width=device-width, initial-scale=1.0" /></span></span>
<span class="line"><span>    &#x3C;title>响应式&#x3C;/title></span></span>
<span class="line"><span>  &#x3C;/head></span></span>
<span class="line"><span>  &#x3C;body></span></span>
<span class="line"><span>    &#x3C;div id="app">&#x3C;/div></span></span>
<span class="line"><span>    &#x3C;script type="module"></span></span>
<span class="line"><span>      import { reactive } from './reactivity.js'</span></span>
<span class="line"><span>      const state = reactive({</span></span>
<span class="line"><span>        name: '原神',</span></span>
<span class="line"><span>        age: '18',</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>      const state1 = reactive({</span></span>
<span class="line"><span>        name: '原神1',</span></span>
<span class="line"><span>        age: '181',</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>      // exits处理一个对象复用的情况</span></span>
<span class="line"><span>      const state2 = state</span></span>
<span class="line"><span>      // 处理代理了之后又代理的情况</span></span>
<span class="line"><span>      // 如果state被代理过一定有 get 和 set 方法</span></span>
<span class="line"><span>      const state3 = reactive(state)</span></span>
<span class="line"><span>      console.log(state1 === state)</span></span>
<span class="line"><span>      console.log(state2 === state)</span></span>
<span class="line"><span>      console.log(state3 === state)</span></span>
<span class="line"><span>    &#x3C;/script></span></span>
<span class="line"><span>  &#x3C;/body></span></span>
<span class="line"><span>&#x3C;/html></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>js</li>
</ul>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>import { isObject } from "@vue/shared"</span></span>
<span class="line"><span>// 用于记录代理后的结果 存储对象的键值对 用WeakMap是因为不用的时候可以被回收</span></span>
<span class="line"><span>const reactiveMap = new WeakMap()</span></span>
<span class="line"><span>// 用于判断是不是代理对象 处理代理了之后又代理的情况</span></span>
<span class="line"><span>const ReactiveFlags: { IS_REACTIVE: string } = {</span></span>
<span class="line"><span>    IS_REACTIVE: '__v_isReactive'</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>export function reactive(target: any) {</span></span>
<span class="line"><span>    return createReactiveObject(target)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>    // 方法一 如果是对象才有响应式</span></span>
<span class="line"><span>    function createReactiveObject(target: any){</span></span>
<span class="line"><span>        if(!isObject(target)){</span></span>
<span class="line"><span>            // 如果不是一个对象，做不了响应式 就返回他自己</span></span>
<span class="line"><span>            return target</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 如果被响应过 就会有 ReactiveFlags.IS_REACTIVE 直接返回</span></span>
<span class="line"><span>        if ((target as any)[ReactiveFlags.IS_REACTIVE]) {</span></span>
<span class="line"><span>            return target</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        const handler:ProxyHandler&#x3C;any> = {</span></span>
<span class="line"><span>            get(target, key, receiver) {</span></span>
<span class="line"><span>              if(ReactiveFlags.IS_REACTIVE === key){</span></span>
<span class="line"><span>                return true</span></span>
<span class="line"><span>              }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            set(target, key, value, receiver) {</span></span>
<span class="line"><span>                return true</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        /**</span></span>
<span class="line"><span>          * !! proxy 需要搭配 Reflect 来使用</span></span>
<span class="line"><span>          * 使用 Reflect 而不直接返回 target[key] 的原因是要处理一些极端的边界情况</span></span>
<span class="line"><span>          * 比如要监听的对象里有一个 proxy 属性</span></span>
<span class="line"><span>          * 使用target[key] this 指向就会丢失 修改this 指向并不会触动 get</span></span>
<span class="line"><span>          * 使用receiver[key] 就会触发 get 后又触发使用 receiver 变成死循环</span></span>
<span class="line"><span>          * receiver是代理对象本身 Reflect 会对 receiver[key] 进行代理和拦截</span></span>
<span class="line"><span>        */</span></span>
<span class="line"><span>        export const handler:ProxyHandler&#x3C;any> = {</span></span>
<span class="line"><span>            get(target, key, receiver) {</span></span>
<span class="line"><span>                // 当取值的时候应该让响应式属性 和 effect 映射起来</span></span>
<span class="line"><span>              if(ReactiveFlags.IS_REACTIVE === key){</span></span>
<span class="line"><span>                return true</span></span>
<span class="line"><span>              }</span></span>
<span class="line"><span>              return Reflect.get(target, key, receiver)</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            set(target, key, value, receiver) {</span></span>
<span class="line"><span>                // 找到属性让 effect 重新执行</span></span>
<span class="line"><span>                return Reflect.set(target, key, receiver)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 处理复用同一个对象的情况,如果有就直接返回</span></span>
<span class="line"><span>        const exits = reactiveMap.get(target)</span></span>
<span class="line"><span>        if(exits){</span></span>
<span class="line"><span>            return exits</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        /**</span></span>
<span class="line"><span>         * 使用 Proxy 是因为当数据发生变化时，能够自动触发相关的更新操作</span></span>
<span class="line"><span>         * Proxy还可以</span></span>
<span class="line"><span>         * 1. 可以在调用 API 时进行拦截，添加日志记录、权限验证等操作</span></span>
<span class="line"><span>         * 2. 通过 Proxy 拦截对虚拟节点的操作，实现更高效的更新机制</span></span>
<span class="line"><span>        */</span></span>
<span class="line"><span>      let  proxy = new Proxy(target,handler)</span></span>
<span class="line"><span>      reactiveMap.set(target,proxy)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      return proxy</span></span>
<span class="line"><span>    }</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


