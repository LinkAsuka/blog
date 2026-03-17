<template><div><p>虚拟 DOM 的底层原理</p>
<!-- more -->
<h2 id="虚拟-dom-是什么" tabindex="-1"><a class="header-anchor" href="#虚拟-dom-是什么"><span>虚拟 DOM 是什么</span></a></h2>
<p>我们来看看官方文档怎么说</p>
<p>虚拟 DOM 这个功能为 React 和 Vue 带来了跨平台的能力
实际上它只是一层对真实 DOM 的抽象，以 JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上
在 Javascript 对象中，虚拟 DOM 表现为一个 Object 对象。并且最少包含<code v-pre>标签名 (tag)</code>、<code v-pre>属性 (attrs)</code> 和<code v-pre>子元素对象 (children)</code> 三个属性，不同框架对这三个属性的名命可能会有差别
创建虚拟 DOM 就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟 DOM 对象的节点与真实 DOM 的属性一一照应</p>
<h2 id="虚拟-dom-优化了什么" tabindex="-1"><a class="header-anchor" href="#虚拟-dom-优化了什么"><span>虚拟 DOM 优化了什么</span></a></h2>
<p>写一些官方文字也看不下去，大白话就是 以前的 dom 做更新，比如有 10 个节点需要更新就会更新 10 次，而虚拟 DOM 就只更新一次，通过 <code v-pre>diff</code> 算法来计算出需要更新的节点，然后更新到页面上</p>
<p>很多人认为虚拟 DOM 最大的优势是 diff 算法，减少 JavaScript 操作真实 DOM 的带来的性能消耗。虽然这一个虚拟 DOM 带来的一个优势，但并不是全部。虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种 GUI</p>
<h2 id="虚拟-dom-的用法" tabindex="-1"><a class="header-anchor" href="#虚拟-dom-的用法"><span>虚拟 DOM 的用法</span></a></h2>
<ul>
<li>h 函数（创建一个虚拟 DOM 对象）
虚拟 DOM 的创建，是通过 h 函数来创建的，h 函数接受三个参数，第一个参数是标签名，第二个参数是属性，第三个参数是子元素，返回一个虚拟 DOM 对象</li>
<li>render 函数（渲染 DOM 的元素）
render 函数的作用是把虚拟 DOM 对象渲染到页面上，它接受一个参数，就是虚拟 DOM 对象，返回一个函数，这个函数就是渲染函数，调用这个函数就可以把虚拟 DOM 对象渲染到页面上</li>
<li>cteatRender 函数 （自己提供渲染方式）
createRender 函数的作用是创建一个渲染函数，它接受一个参数，就是虚拟 DOM 对象，返回一个函数，这个函数就是渲染函数，调用这个函数就可以把虚拟 DOM 对象渲染到页面上</li>
</ul>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 我们用内置的 render 函数来渲染到页面上</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ele</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> h</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">div</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">nihao xixixi</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">render</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">ele</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">body</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 也可以先创建渲染器 用自己的渲染器渲染到页面上</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> renderer</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> createRender</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // 创建元素</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    createElement</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">tag</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">        return</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">createElement</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">h1</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // 创建节点中的文字</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setElementText</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">el</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> text</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        el</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">textContent</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> text</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // 插入元素</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    insert</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">el</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> parent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        parent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">appendChild</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">el</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">})</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">renderer</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">render</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">ele</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">body</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来的 vue 源码就要来写 cteatRender、render 和 h 函数</p>
</div></template>


