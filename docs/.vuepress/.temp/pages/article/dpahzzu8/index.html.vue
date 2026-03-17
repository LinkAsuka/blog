<template><div><p>packages/runtime-core/src/index.ts</p>
<!-- more -->
<h2 id="runtime-core-用来做什么" tabindex="-1"><a class="header-anchor" href="#runtime-core-用来做什么"><span>runtime-core 用来做什么</span></a></h2>
<p>runtime-dom 的作用是给 runtime-core 提供对 DOM 操作的 API 封装，要动这些 DOM 节点我们就要用到
runtime-core 是 Vue 3 的运行时核心负责实现组件渲染、虚拟节点管理、渲染函数、辅助函数和工具等功能</p>
<ol>
<li>
<p>响应式系统：
<code v-pre>runtime-core</code> 提供了响应式系统，使您能够轻松地创建和管理响应式数据对象。当响应式数据对象发生变化时，runtime-core 会自动更新受其影响的视图。</p>
</li>
<li>
<p>虚拟 DOM diff 算法：
<code v-pre>runtime-core</code> 提供了高效的虚拟 <code v-pre>DOM diff 算法</code>，它能够快速地计算出需要更新的 DOM 元素，从而减少不必要的 DOM 操作。</p>
</li>
<li>
<p>组件系统：
<code v-pre>runtime-core</code> 提供了组件系统，使您能够创建和使用可重用的组件。组件系统可以帮助您构建模块化、可维护的 Vue.js 应用。</p>
</li>
</ol>
<p>它主要的模块有</p>
<ul>
<li><code v-pre>createVNode</code> 创建虚拟 DOM</li>
<li><code v-pre>h</code> 用于创建虚拟 DOM 节点</li>
<li><code v-pre>renderer</code> 负责将虚拟 DOM 渲染为实际的 DOM</li>
<li><code v-pre>createApp</code> 创建应用</li>
</ul>
<h3 id="渲染流程" tabindex="-1"><a class="header-anchor" href="#渲染流程"><span>渲染流程</span></a></h3>
<ol>
<li>在 <code v-pre>h</code>的调用过程中，用<code v-pre>createVNode</code> 创建虚拟 DOM</li>
<li>用<code v-pre>renderer</code> 渲染器中的 <code v-pre>render</code> 函数将虚拟 DOM 渲染为实际的 DOM
renderer 用了很多算法来优化浏览器的渲染性能，如果没有更新的节点或是只是变了位置的节点，尽可能的不会修改 DOM 去更新它</li>
</ol>
<Tabs id="67" :data='[{"id":"packages/runtime-core/src/index.ts"}]'>
<template #title0="{ value, isActive }">packages/runtime-core/src/index.ts</template><template #tab0="{ value, isActive }"><div class="language-ts line-numbers-mode" data-ext="ts" data-title="ts"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> *</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">./h</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> *</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">./createVNode</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> *</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">./renderer</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template></Tabs></div></template>


