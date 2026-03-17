<template><div><p>packages/reactivity/src/effect.ts</p>
<!-- more -->
<blockquote>
<p>effect 通过监听数据的变化，当数据发生变化时，让 effect 重新执行来实现一些 watch、computed ..等功能</p>
</blockquote>
<ol>
<li>
<p>响应式核心功能
<code v-pre>reactive</code> 让数据变成响应式数据
<code v-pre>effect</code> 数据变化后让 effect 重新执行， 组件 、watch 、computed 都是基于 effect 来实现的</p>
</li>
<li>
<p>引入 effect.ts 文件
想要打包的时候带 effect.ts 玩</p>
</li>
</ol>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>// packages/reactivity/src/index.ts</span></span>
<span class="line"><span>export * from './effect'</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="effect-的实现" tabindex="-1"><a class="header-anchor" href="#effect-的实现"><span>effect 的实现</span></a></h3>
</div></template>


