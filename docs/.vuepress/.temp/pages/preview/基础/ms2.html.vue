<template><div><p>css</p>
<!-- more -->
<h2 id="_1-盒模型" tabindex="-1"><a class="header-anchor" href="#_1-盒模型"><span>1.盒模型</span></a></h2>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">/* 红色区域的大小是多少？200 - 20*2 - 20*2 = 120 */</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">box</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    width</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 200</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    height</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 200</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    padding</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 20</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    margin</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 20</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    background</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> red</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    border</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 20</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> solid</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> black</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    /* 标准模型 */</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    box-sizing</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">content-box</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    /*IE模型*/</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    box-sizing</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">border-box</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="知识点解析" tabindex="-1"><a class="header-anchor" href="#知识点解析"><span>知识点解析</span></a></h3>
<p>当没有设置box-sizing: border-box;的时候，红色的区域就是concent的面积为240x240,要加上padding拓展的20*2px啊
当设置了box-sizing: border-box;了之后，pading和border会内卷，内容宽度为120但是我觉得这个题目出的有毛病，padding又不会影响红色的渲染，不也还是红的，所以红色区域应该是160x160</p>
<h2 id="_2-如何实现一个最大的正方形" tabindex="-1"><a class="header-anchor" href="#_2-如何实现一个最大的正方形"><span>2.如何实现一个最大的正方形</span></a></h2>
<ul>
<li>用padding-bottom 撑开边距
<code v-pre>width:100%;padding-bottom:100%;</code></li>
</ul>
<h2 id="_3-一行水平居中-多行居左" tabindex="-1"><a class="header-anchor" href="#_3-一行水平居中-多行居左"><span>3.一行水平居中，多行居左</span></a></h2>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      text-align</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> center</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    div</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      display</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">inline-block</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      text-align</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">left</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">我是多行文字。我是多行文字。我是多行文字。我是多行文字。我是多行文字。我是多行文 字。我是多行文字。我是多行文字。我是多行文字。我是多行文字。</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">我是一行文字</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-水平垂直居中" tabindex="-1"><a class="header-anchor" href="#_4-水平垂直居中"><span>4.水平垂直居中</span></a></h2>
<ul>
<li>1.单文字水平居中：text-align:center;</li>
<li>2.定位absolute加margin:0 auto;left:0;right:0;</li>
<li>3.定位absolute加transform: translate(-50%,0);</li>
<li>4.定位absolute加margin-left:-0.5*宽度</li>
<li>5.display:flex;justify-content: center;</li>
<li>6.margin: auto;</li>
</ul>
<h2 id="_5-垂直居中" tabindex="-1"><a class="header-anchor" href="#_5-垂直居中"><span>5.垂直居中</span></a></h2>
<ul>
<li>1.单行的时候lin-height：高度</li>
<li>2.父元素display:flex;align-items:center</li>
<li>3.定位absolute加transform: translate(-50%,-50%);</li>
<li>4.定位absolutetop: 50%;margin-top: -0.5宽度;height: 宽度;</li>
<li>5.父元素display:table;子元素display:table-cell;vertical-align:middle;</li>
<li>6.若元素是行内块级元素, 基本思想是使用display: inline-block, vertical-align: middle和一个伪元素让内容块处于容器中央.</li>
</ul>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">parent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">::</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">after</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">son</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> display</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">inline-block</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> vertical-align</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">middle</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">parent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">::</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">after</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> content</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">''</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> height</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91">100</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">%</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-两栏布局-左边固定-右边自适应-左右不重叠" tabindex="-1"><a class="header-anchor" href="#_6-两栏布局-左边固定-右边自适应-左右不重叠"><span>6.两栏布局，左边固定，右边自适应，左右不重叠</span></a></h2>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">left</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    float</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> left</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    width</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 300</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    margin-right</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 10</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    background</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> red</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">right</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    overflow</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> hidden</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    /* 创建BFC */</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    background</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> yellow</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-如何实现左右等高布局" tabindex="-1"><a class="header-anchor" href="#_7-如何实现左右等高布局"><span>7.如何实现左右等高布局</span></a></h2>
<p><code v-pre>display: grid;grid-template-columns: 1fr 1fr;</code>
<code v-pre>display: flex;flex:1</code>
<code v-pre>display: table;display: table-cell;</code></p>
<h2 id="_8-画三角形" tabindex="-1"><a class="header-anchor" href="#_8-画三角形"><span>8.画三角形</span></a></h2>
<div class="language-css line-numbers-mode" data-ext="css" data-title="css"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">shape</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    width</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    height</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    border-left</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 50</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> solid</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> transparent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    border-right</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 50</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> solid</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> transparent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    border-top</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 50</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> solid</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> transparent</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    border-bottom</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 50</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> solid</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> blue</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    background</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> white</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-link-import导入css" tabindex="-1"><a class="header-anchor" href="#_9-link-import导入css"><span>9.link @import导入css</span></a></h2>
<p>link可以加载其他东西，import只能加载css。link可以在载入页面的时候加载，import只能在页面加载完后加载。link可以通过js改变样式import不行
但是import还是后处的，总结一下就是import就是个弟弟</p>
<ol>
<li>link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS</li>
<li>link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载</li>
<li>link无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持</li>
<li>link支持使用Javascript控制DOM去改变样式；而@import不支持</li>
</ol>
<h2 id="_10-bfc理解" tabindex="-1"><a class="header-anchor" href="#_10-bfc理解"><span>10.BFC理解</span></a></h2>
<ul>
<li>
<p>BFC触发条件：</p>
<ol>
<li>根元素，即html</li>
<li>float的值不为none（默认）</li>
<li>position的值为absolute或fixed</li>
<li>overflow的值不为visible（默认）</li>
<li>display的值为inline-block、table-cell、table-caption</li>
</ol>
</li>
<li>
<p>BFC特性：</p>
<ol>
<li>内部的Box会在垂直方向上一个接一个放置。</li>
<li>Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。</li>
<li>每个元素的margin box 的左边，与包含块border box的左边相接触。</li>
<li>BFC的区域不会与float box重叠。（可用于清浮动）</li>
<li>BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。</li>
<li>计算BFC的高度时，浮动元素也会参与计算。</li>
</ol>
</li>
</ul>
</div></template>


