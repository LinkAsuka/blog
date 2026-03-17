<template><div><p>html</p>
<!-- more -->
<h2 id="_1-h5的新特性有哪些" tabindex="-1"><a class="header-anchor" href="#_1-h5的新特性有哪些"><span>1.H5的新特性有哪些</span></a></h2>
<p>画布(Canvas) API
地理(Geolocation) API
音频、视频API(audio,video)
localStorage和sessionStorage
webworker和 websocket
header,nav,footer,aside,article,section</p>
<h3 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展"><span>扩展</span></a></h3>
<ul>
<li>关于localStorage和sessionStorage
常用的缓存方法有Cookie、session以及H5新加的localStorage、sessionStorage
<strong>Cookie</strong>
cookie保存在浏览器端</li>
</ul>
<ol>
<li>大小受限</li>
<li>用户可以操作</li>
<li>(禁用）cookie，使功能受限</li>
<li>安全性较低</li>
<li>cookie数据有路径（path）的概念，可以限制cookie只属于某个路径下
<strong>session</strong>
session保存在服务器端</li>
<li>Session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大</li>
<li>依赖于cookie（sessionID保存在cookie），如果禁用cookie，则要使用URL重写，不安全</li>
<li>创建Session变量有很大的随意性，过度使用session变量将会导致代码不可读而且不好维护
<strong>localStorage</strong>
localStorage和sessionStorage都是本地存储
localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在
保存数据语法：<code v-pre>localStorage.setItem(&quot;key&quot;, &quot;value&quot;)</code>
读取数据语法：<code v-pre>var lastname = localStorage.getItem(&quot;key&quot;)</code>
删除数据语法：<code v-pre>localStorage.removeItem(&quot;key&quot;)</code>
<strong>sessionStorage</strong>
localStorage和sessionStorage都是本地存储
sessionStorage 的有效期是页面会话持续，如果页面会话（session）结束（关闭窗口或标签页），sessionStorage 就会消失
保存数据语法：<code v-pre>sessionStorage.setItem(&quot;key&quot;, &quot;value&quot;)</code>
读取数据语法：<code v-pre>var lastname = sessionStorage.getItem(&quot;key&quot;)</code>
删除指定键的数据语法：<code v-pre>sessionStorage.removeItem(&quot;key&quot;)</code></li>
</ol>
<ul>
<li>webworker和 websocket
Websocket 是tcp/ip 协议用于客户端，WebService 是http协议
webworker是运行在浏览器后台的js程序，他不影响主程序的运行，是另开的一个js线程，可以用
这个线程执行复杂的数据操作，然后把操作结果通过postMessage传递给主线程，这样在进行复杂
且耗时的操作时就不会阻塞主线程了</li>
</ul>
<h2 id="_2-label的作用是什么-是怎么用的" tabindex="-1"><a class="header-anchor" href="#_2-label的作用是什么-是怎么用的"><span>2.Label的作用是什么？是怎么用的？</span></a></h2>
<p>label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Name</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Number:</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">“text“name</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Name</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Name</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">/></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Date:</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">text</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">B</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">/>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-html5的form如何关闭自动完成功能" tabindex="-1"><a class="header-anchor" href="#_3-html5的form如何关闭自动完成功能"><span>3.HTML5的form如何关闭自动完成功能</span></a></h2>
<p>给不想要提示的 form 或某个 input 设置为 autocomplete=off</p>
<h2 id="_4-dom如何实现浏览器内多个标签页之间的通信" tabindex="-1"><a class="header-anchor" href="#_4-dom如何实现浏览器内多个标签页之间的通信"><span>4.dom如何实现浏览器内多个标签页之间的通信?</span></a></h2>
<p>使用缓存 localstorage 或cookie</p>
<h2 id="_5-实现不使用-border-画出1px高的线-在不同浏览器的标准模式与怪异模式下都能保持一致的效果" tabindex="-1"><a class="header-anchor" href="#_5-实现不使用-border-画出1px高的线-在不同浏览器的标准模式与怪异模式下都能保持一致的效果"><span>5.实现不使用 border 画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果</span></a></h2>
<p><code v-pre>&lt;div style=&quot;height:1px;overflow:hidden;background:red&quot;&gt;&lt;/div&gt;</code>
主要考的是在IE6下DIV有个默认的高度大约10-12px，当你试图定义一个高度小于这个默认值的div的时候，IE会固执的认为这个层的高度不应该小于字体的行高
同理在IE6的情况下给一个字体很小的时候应该<code v-pre>&lt;span style=&quot;font-size:0;height:1px&quot;&gt;&lt;/span&gt;</code></p>
<h2 id="_6-title与h1的区别、b与strong的区别、i与em的区别" tabindex="-1"><a class="header-anchor" href="#_6-title与h1的区别、b与strong的区别、i与em的区别"><span>6.title与h1的区别、b与strong的区别、i与em的区别？</span></a></h2>
<p>他们表现出来的样式都是一样的
- title属性没有明确意义只表示是个标题，H1则表示层次明确的标题
- b表示强调，strong是标明重点内容，有语气加强的含义
- i内容展示为斜体，me表示强调的文本；
Physical Style Elements -- <code v-pre>自然样式标签</code>
b, i, u, s, pre
Semantic Style Elements -- <code v-pre>语义样式标签</code>
strong, em, ins, del, code</p>
<h2 id="_7-你做的页面在哪些流览器测试过-这些浏览器的内核分别是什么" tabindex="-1"><a class="header-anchor" href="#_7-你做的页面在哪些流览器测试过-这些浏览器的内核分别是什么"><span>7.你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?</span></a></h2>
<ul>
<li>Trident内核:IE系列</li>
<li>Gecko内核:Firefox</li>
<li>Webkit内核:Safari</li>
<li>Blink内核：是基于Webkit内核的子项目,使用的浏览器有：Chrome/opera等除IE、Firefox、Safari之外的几乎所有浏览器
几乎所有国产双内核浏览器（Trident/Blink）如360、猎豹、qq、百度等</li>
</ul>
<h2 id="_8-每个html文件里开头都有个很重要的东西-doctype-知道这是干什么的吗" tabindex="-1"><a class="header-anchor" href="#_8-每个html文件里开头都有个很重要的东西-doctype-知道这是干什么的吗"><span>8.每个HTML文件里开头都有个很重要的东西，Doctype，知道这是干什么的吗？</span></a></h2>
<p>文档声明
此标签可告知浏览器文档使用哪种 HTML 或XHTML 规范。（重点：告诉浏览器按照何种规范解析页面）
IE下如不书写文档声明会使用怪异模式解析网页导致一系列CSS兼容性问题</p>
<h2 id="_9-div-css的布局较table布局有什么优点" tabindex="-1"><a class="header-anchor" href="#_9-div-css的布局较table布局有什么优点"><span>9.div+css的布局较table布局有什么优点</span></a></h2>
<p>table在失去css的情况下可以依然保持代码结构
div+css的方法则结构分明，语义性更好更符合html的标准</p>
<h2 id="_10-img的alt与title有何异同-strong与em的异同" tabindex="-1"><a class="header-anchor" href="#_10-img的alt与title有何异同-strong与em的异同"><span>10.img的alt与title有何异同？ strong与em的异同</span></a></h2>
<p>img的alt是在图片没有加载出来的时候鼠标移到图片上的解释，title是对图片的解释
strong是加粗，em是斜体。strong在强调方面强于em</p>
<h2 id="_11-简述一下src与href的区别" tabindex="-1"><a class="header-anchor" href="#_11-简述一下src与href的区别"><span>11.简述一下src与href的区别</span></a></h2>
<p>src用于替换当前元素，href是引用资源
在请求src资源时会将其指向的资源下载并应用到文档内而href是建立当前元素与资源之间的关系
介绍一个朋友给另一个朋友认识，src的做法是吧朋友请到家里来认识。href的做法是把朋友1的微信给朋友2</p>
<h2 id="_12-知道的网页制作会用到的图片格式有哪些" tabindex="-1"><a class="header-anchor" href="#_12-知道的网页制作会用到的图片格式有哪些"><span>12.知道的网页制作会用到的图片格式有哪些</span></a></h2>
<p>png，jpeg，gif，svg , WebP(重点)</p>
<h2 id="_13-在css-js代码上线之后开发人员经常会优化性能-从用户刷新网页开始-一次js请求一般情况下有哪些地方会有缓存处理" tabindex="-1"><a class="header-anchor" href="#_13-在css-js代码上线之后开发人员经常会优化性能-从用户刷新网页开始-一次js请求一般情况下有哪些地方会有缓存处理"><span>13.在css/js代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次js请求一般情况下有哪些地方会有缓存处理</span></a></h2>
<p>dns缓存，cdn缓存，浏览器缓存，服务器缓存</p>
<h3 id="扩展-1" tabindex="-1"><a class="header-anchor" href="#扩展-1"><span>扩展</span></a></h3>
<ul>
<li>什么是dns
全称 Domain Name System ,即域名系统,有dns的地方,就有缓存
<ul>
<li>什么是cdn
全称 Content Delivery Network,即内容分发网络,在浏览器本地缓存失效后,浏览器会向CDN边缘节点发起请求</li>
</ul>
</li>
</ul>
<h2 id="_14-一个页面上有大量的图片-大型电商网站-加载很慢-你有哪些方法优化这些图片的加载-给用户更好的体验" tabindex="-1"><a class="header-anchor" href="#_14-一个页面上有大量的图片-大型电商网站-加载很慢-你有哪些方法优化这些图片的加载-给用户更好的体验"><span>14.一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优化这些图片的加载，给用户更好的体验</span></a></h2>
<ol>
<li>图片懒加载，在页面上的未可视区域可以添加一个滚动条事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。</li>
<li>如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。</li>
<li>如果图片为css图片，可以使用CSSsprite，SVGsprite，Iconfont、Base64等技术。</li>
<li>如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。</li>
<li>如果图片展示区域小于图片的真实大小，则因在服务器端根据业务需要先行进行图片压缩，图片压缩后大小与展示一致</li>
</ol>
<h2 id="_15-你如何理解html结构的语义化" tabindex="-1"><a class="header-anchor" href="#_15-你如何理解html结构的语义化"><span>15.你如何理解HTML结构的语义化</span></a></h2>
<ol>
<li>更符合W3C统一的规范标准，是技术趋势。</li>
<li>没有样式时浏览器的默认样式也能让页面结构很清晰。</li>
<li>对功能障碍用户友好。屏幕阅读器（如果访客有视障）会完全根据你的标记来“读”你的网页。</li>
<li>对其他非主流终端设备友好。例如机顶盒、PDA、各种移动终端。</li>
<li>对SEO友好。</li>
</ol>
<h2 id="_16-谈谈以前端角度出发做好seo需要考虑什么" tabindex="-1"><a class="header-anchor" href="#_16-谈谈以前端角度出发做好seo需要考虑什么"><span>16.谈谈以前端角度出发做好SEO需要考虑什么</span></a></h2>
<p>搜索引擎主要以:
外链数量和质量,网页内容和结构等来决定某关键字下的网页搜索排名。
前端应该注意网页结构和内容方面的情况：
1. Meta标签优化：主要包括主题（Title)，网站描述(Description)。还有一些其它的隐藏文字比如Author（作者），Category（目录），Language（编码语种）等，符合W3C规范的语义性标签的使用
2. 如何选取关键词并在网页中放置关键词：搜索就得用关键词。关键词分析和选择是SEO最重要的工作之一。首先要给网站确定主关键词（一般在5个上下），然后针对这些关键词进行优化，包括关键词密度（Density），相关度（Relavancy），突出性（Prominency）等等。</p>
<h2 id="_17-html5有哪些新特性、移除了那些元素" tabindex="-1"><a class="header-anchor" href="#_17-html5有哪些新特性、移除了那些元素"><span>17.html5有哪些新特性、移除了那些元素</span></a></h2>
<p>新特性：
1. 拖拽释放(Drag and drop) API
2. 语义化更好的内容标签（header,nav,footer,aside,article,section） 3）音频、视频API(audio,video)
4. 画布(Canvas) API
5. 地理(Geolocation) API
6.  本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
7. sessionStorage 的数据在浏览器关闭后自动删除
8. 表单控件，calendar、date、time、email、url、search
9. 新的技术webworker, websocket, Geolocation
移除的元素：
1. 纯表现的元素：basefont，big，center，font, s，strike，tt，u；
2. 对可用性产生负面影响的元素：frame，frameset，noframes；</p>
<h3 id="扩展-2" tabindex="-1"><a class="header-anchor" href="#扩展-2"><span>扩展</span></a></h3>
<ul>
<li>拖拽释放(Drag and drop)
在拖动目标上触发事件 (源元素):
ondragstart - 用户开始拖动元素时触发
ondrag - 元素正在拖动时触发
ondragend - 用户完成元素拖动后触发</li>
</ul>
<p>释放目标时触发的事件:
ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
ondrop - 在一个拖动过程中，释放鼠标键时触发此事件</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">body</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">draggable</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> draggable</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">true</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ondragstart</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dataTransfer</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">setData</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">text/plain</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">null</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">              这是可以拖拽的DIV、\、\</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">、\、、、、、、、、、</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">body</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">        var</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> dragged</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dragstart</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========dragstart 开始被拖拽==========一次拖动只执行一次</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            dragged</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">opacity</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> .5</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">drag</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">           console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========drag==========拖拽时会一直监听，直到放下元素</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dragover</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">           console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========dragover==========拖拽时会一直监听，直到放下元素</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">preventDefault</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dragenter</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========dragenter 拖曳元素 进入目标元素==========对应着dragleave</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">            if</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">className</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> ==</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">background</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">purple</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">            }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dragleave</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========dragleave 拖曳元素 离开目标元素==========对应着dragenter</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">            if</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">className</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> ==</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">null</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">background</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">null</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">            }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">drop</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========drop 放下元素==========一次拖动只执行一次，在dragenter前触发</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">preventDefault</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">            if</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">className</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> ==</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dropzone</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">background</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> ""</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                dragged</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">parentNode</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">removeChild</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">dragged</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">appendChild</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">dragged</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        document</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">addEventListener</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">dragend</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">==========dragend 结束拖拽==========一次拖动只执行一次</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">            event</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">target</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">opacity</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> ""</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        },</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_18-如何处理html5新标签的浏览器兼容问题" tabindex="-1"><a class="header-anchor" href="#_18-如何处理html5新标签的浏览器兼容问题"><span>18.如何处理HTML5新标签的浏览器兼容问题</span></a></h2>
<p>IE8/IE7/IE6支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持
HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式（当然最好的方式是直接使用成熟的
框架、使用最多的是html5shim框架）：</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">&#x3C;!--[if lt IE 9]> </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">&#x3C;script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"&#x3C;/script> </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">&#x3C;![endif]--></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_19-如何区分html和html5" tabindex="-1"><a class="header-anchor" href="#_19-如何区分html和html5"><span>19.如何区分HTML和HTML5？</span></a></h2>
<p>DOCTYPE声明新增的结构元素、功能元素</p>
<h2 id="_20-html5-canvas元素有什么用" tabindex="-1"><a class="header-anchor" href="#_20-html5-canvas元素有什么用"><span>20.HTML5 Canvas元素有什么用</span></a></h2>
<p>Canvas 元素用于在网页上绘制图形，该元素标签强大之处在于可以直接在 HTML 上进行图形操作</p>
<h2 id="_21-如何在-html5-页面中嵌入音频" tabindex="-1"><a class="header-anchor" href="#_21-如何在-html5-页面中嵌入音频"><span>21.如何在 HTML5 页面中嵌入音频</span></a></h2>
<p>支持的格式包括 MP3、Wav 和 Ogg
<code v-pre>&lt;audio&gt;&lt;/&lt;audio&gt;</code></p>
<ul>
<li>autoplay 	如果出现该属性，则音频在就绪后马上播放。</li>
<li>controls 	如果出现该属性，则向用户显示控件，比如播放按钮。</li>
<li>loop 	 	如果出现该属性，则每当音频结束时重新开始播放。</li>
<li>muted 	规定视频输出应该被静音。</li>
<li>preload 	如果出现该属性，则音频在页面加载时进行加载，并预备播放。</li>
</ul>
<h2 id="_22-如何在html5页面中嵌入视频" tabindex="-1"><a class="header-anchor" href="#_22-如何在html5页面中嵌入视频"><span>22.如何在HTML5页面中嵌入视频</span></a></h2>
<p>支持的格式包括：MP4、WebM 和 Ogg
<code v-pre>&lt;video&gt;&lt;/&lt;video&gt;</code></p>
<ul>
<li>autoplay   如果出现该属性，则视频在就绪后马上播放。</li>
<li>controls   如果出现该属性，则向用户显示控件，比如播放按钮。</li>
<li>loop     	 如果出现该属性，则当媒介文件完成播放后再次开始播放。</li>
<li>muted 	 规定视频的音频输出应该被静音。</li>
<li>preload 	 如果出现该属性，则视频在页面加载时进行加载，并预备播放。</li>
<li>poster 	 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。</li>
<li>width 	 设置视频播放器的宽度。</li>
<li>height 	 设置视频播放器的高度。</li>
</ul>
<h2 id="_23-html5引入什么新的表单属性" tabindex="-1"><a class="header-anchor" href="#_23-html5引入什么新的表单属性"><span>23.HTML5引入什么新的表单属性</span></a></h2>
<ul>
<li>datalist:<datalist>候选值</datalist>写在input下面，当输入对的上时候显示</li>
<li>datetime:用来定义input是个时间input</li>
<li>output:用来定义不同类型的输出</li>
<li>createTime:时间选择年月日</li>
<li>month:时间选择月日 只支持IE和谷歌呵呵哒</li>
<li>week:时间以周为范围选择 只支持IE和谷歌呵呵哒</li>
<li>time:时间上午下午几时几分</li>
<li>number:数字选择器</li>
<li>range:拖动条</li>
<li>emailurl:地址</li>
</ul>
<h2 id="_24-语义化的理解" tabindex="-1"><a class="header-anchor" href="#_24-语义化的理解"><span>24.语义化的理解</span></a></h2>
<p>用正确的标签做正确的事情！
html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；
在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。
搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解</p>
<h2 id="_25-介绍一下你对浏览器内核的理解" tabindex="-1"><a class="header-anchor" href="#_25-介绍一下你对浏览器内核的理解"><span>25.介绍一下你对浏览器内核的理解</span></a></h2>
<ul>
<li>渲染引擎：负责取得网页的内容（HTML、XML、图像等等）</li>
<li>JS引擎则：解析和执行javascript来实现网页的动态效果</li>
</ul>
<h2 id="_26-浏览器是怎么对html5的离线储存资源进行管理和加载的呢" tabindex="-1"><a class="header-anchor" href="#_26-浏览器是怎么对html5的离线储存资源进行管理和加载的呢"><span>26.浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢</span></a></h2>
<p>在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问
app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过
app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的
manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么
就会重新下载文件中的资源并进行离线存储。
离线的情况下，浏览器就直接使用离线存储的资源</p>
<h2 id="_27-请描述一下cookies-sessionstorage-和localstorage的区别" tabindex="-1"><a class="header-anchor" href="#_27-请描述一下cookies-sessionstorage-和localstorage的区别"><span>27.请描述一下cookies，sessionStorage 和localStorage的区别</span></a></h2>
<p>cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递
sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存</p>
<ul>
<li>存储大小：
cookie数据大小不能超过4k
sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大</li>
<li>有期时间：
localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
sessionStorage 数据在当前浏览器窗口关闭后自动删除
cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭</li>
</ul>
<h2 id="_28-css-sprite是什么-有什么优缺点" tabindex="-1"><a class="header-anchor" href="#_28-css-sprite是什么-有什么优缺点"><span>28.css sprite是什么,有什么优缺点</span></a></h2>
<p>概念：将多个小图片拼接到一个图片中。通过background-position和元素尺寸调节需要显示的背景图案。
- 优点：
减少HTTP请求数，极大地提高页面加载速度
增加图片信息重复度，提高压缩比，减少图片大小更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现
- 缺点：
图片合并麻烦维护麻烦，修改一个图片可能需要从新布局整个图片，样式</p>
<h2 id="_29-弹性盒子模型-flex-box区别" tabindex="-1"><a class="header-anchor" href="#_29-弹性盒子模型-flex-box区别"><span>29.弹性盒子模型? flex|box区别?</span></a></h2>
<ul>
<li>引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的条目进行排列、对齐和分配空白空间。
即便容器中条目的尺寸未知或是动态变化的，弹性盒布局模型也能正常的工作。在该布局模型中，容器会根据布局的需要，调整其中包含的条目的尺寸和顺序来最好地填充所有可用的空间。当容器的尺寸由于屏幕大小或窗口尺寸发生变化时，其中包含的条目也会被动态地调整。比如当容器尺寸变大时，其中包含的条目会被拉伸以占满多余的空白空间；当容器尺寸变小时，条目会被缩小以防止超出容器的范围。弹性盒布局是与方向无关的。</li>
<li>在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。
<strong>flex和box的区别:</strong> display：box 是老规范，要兼顾古董机子就加上它； 父级元素有display:box;属性之后。他的子元素里面加上box-flex属性。可以让子元素按照父元素的宽度进行一定比例的分占空间。flex是最新的，董机老机子不支持的；父元素设置display:flex后，子元素宽度会随父元素宽度的改变而改变，而display:box不会。 AndroidUC浏览器只支持display: box语法；而iOS UC浏览器则支持两种方式。</li>
</ul>
<h2 id="_30-解释在ie低版本下的怪异盒模型和c3的怪异盒模型-和-弹性盒模型" tabindex="-1"><a class="header-anchor" href="#_30-解释在ie低版本下的怪异盒模型和c3的怪异盒模型-和-弹性盒模型"><span>30.解释在ie低版本下的怪异盒模型和c3的怪异盒模型 和 弹性盒模型?</span></a></h2>
<h3 id="普通模式" tabindex="-1"><a class="header-anchor" href="#普通模式"><span>普通模式</span></a></h3>
<ul>
<li>IE当padding+border的值小于width或者height:
盒模型的宽度=margin(左右)+width（width已经包含了padding和border的值）
盒模型的高度=margin(上下)+height（height已经包含了padding和border的值）</li>
<li>当padding+border的值大于width或者height:
盒模型的宽度=margin(左右)+padding(左右)+border(左右)
盒模型的高度=margin(上下)+padding(上下)+border(上下)+19px （加一个默认行高 19px）
所以相当于是padding+border和width或者height比大小，谁大取谁。</li>
</ul>
<h3 id="怪异模式" tabindex="-1"><a class="header-anchor" href="#怪异模式"><span>怪异模式</span></a></h3>
<p>以上几种DOCTYPE都是标准的文档类型，无论使用哪种模式完整定义DOCTYPE，都会触发标准模式，
而如果DOCTYPE缺失则在ie6，ie7，ie8下将会触发怪异模式（quirks 模式） CSS3box-sizing有两个值一个是content-box，另一个是border-box。
<strong>当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；</strong>
<strong>当设置为box-sizing:border-box时，将采用怪异模式解析计算；</strong>
Css3弹性盒模型引入了新的盒子模型—弹性盒模型，该模型决定一个盒子在其他盒子中的分布方式以及如何处理可用的空间。
使用该模型，可以很轻松的创建自适应浏览器窗口的流动布局或自适应字体大小的弹性布局。</p>
</div></template>


