<template><div><!-- more -->
<h2 id="解决办法" tabindex="-1"><a class="header-anchor" href="#解决办法"><span>解决办法</span></a></h2>
<p>有些网站写 a 标签跳转后跳过去的的页面显示不成功,但是复制地址再到浏览器回车就能够显示出来
<code v-pre>会出现这样的问题是因为有些网站为了防止爬虫做了处理</code></p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">a</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> href</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">https://www.aaa.com/</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">_blank</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> rel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">noopener noreferrer</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">  跳转到一个新页面</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加了<code v-pre>rel=&quot;noopener noreferrer&quot;</code>之后就能够跳过去</p>
<h2 id="原理说明" tabindex="-1"><a class="header-anchor" href="#原理说明"><span>原理说明</span></a></h2>
<ol>
<li>noopener:•	当您在一个链接中使用 target=&quot;_blank&quot; 时，新的浏览器标签页或窗口会获得对原始页面的窗口对象访问权限（通过 window.opener）
<ul>
<li>这意味着新标签页或窗口可以通过 window.opener 来访问和操作打开它的原始页面。这在某些情况下可能导致安全问题，例如执行恶意脚本或重定向用户</li>
<li>使用 rel=&quot;noopener&quot; 可以防止新窗口访问原始窗口，确保安全性</li>
</ul>
</li>
<li>noreferrer:•	当您使用 noreferrer 时，除了阻止新标签页访问原页面外，它还会阻止浏览器发送 HTTP 引荐头（Referer Header）。这意味着新窗口无法知道用户是从哪个页面点击进入的
<ul>
<li>这有助于保护用户隐私，特别是在从一个网站导航到另一个网站时。为什么有些网站加了这句话就能“跳过去”</li>
<li>有时网站使用 rel=&quot;noopener noreferrer&quot; 来实现更好的用户体验。通过使用这些属性，网站可以减小潜在的安全风险（如通过 window.opener 的跨窗口攻击）</li>
<li>加上这两个属性后，用户点击链接时会确保新的页面不会影响原页面的状态，从而避免了可能的重定向或弹窗干扰</li>
<li>这也可能是一种优化策略，减少由于页面之间不必要的相互访问而导致的性能开销</li>
</ul>
</li>
</ol>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>使用 <code v-pre>rel=&quot;noopener noreferrer&quot;</code> 是一种常见的安全实践，特别是在链接到其他站点时，能有效保护原始页面，防止新窗口操控原窗口，同时也保护用户的隐私。</p>
</div></template>


