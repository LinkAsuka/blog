<template><div><p>scripts/dev.js</p>
<!-- more -->
<ol>
<li>初始化项目 <code v-pre>yarn init -y</code></li>
<li>创建其他的子包</li>
<li>安装 ts 安装在外层要加 -W <code v-pre>yarn add typescript -D -W</code>
配置 tsconfig.json <code v-pre>npx tsc --init</code></li>
<li>打包配置 安装 rollu 的相关依赖 <code v-pre>yarn add rollup -D</code>
yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve esbuil -D -W
<code v-pre>rollup-plugin-typescript2</code> 处理 ts 的
<code v-pre>@rollup/plugin-node-resolve</code> 处理解析第三方插件的
<code v-pre>@rollup/plugin-json</code>处理 json 格式的
<code v-pre>esbuil</code> 处理子进程的用的，打包的时候会把子包一同打包
配置子页面打包，shared 页面同理<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>"buildOptions": {</span></span>
<span class="line"><span> "name": "VueReactivity", </span></span>
<span class="line"><span> "formats": ["cjs","esm-bundler","global"]</span></span>
<span class="line"><span>}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><code v-pre>name</code> iife 打包的时候要用
<code v-pre>formats</code> 处理打包的格式
<code v-pre>cjs</code> 处理 node 的
<code v-pre>esm-bundler</code> 处理 js 将 es6 变成 es5
<code v-pre>global</code> 处理全局属性的</li>
<li>配置命令
添加 scripts dev.js 文件
配置项</li>
</ol>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>"scripts": {</span></span>
<span class="line"><span>   "dev": "node scripts/dev.js" //还可以再后面加上 -d -w -g -m -f esm -o 等配置</span></span>
<span class="line"><span>}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>配置 dev.js 文件</li>
</ol>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>// 打包 packge 的文件</span></span>
<span class="line"><span>import esbuild from 'esbuild'</span></span>
<span class="line"><span>import minimist from 'minimist'</span></span>
<span class="line"><span>import { createRequire } from 'module'</span></span>
<span class="line"><span>import { dirname, resolve } from 'path'</span></span>
<span class="line"><span>import { fileURLToPath } from 'url'</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// node 命令函数通过 process 来获取 argv</span></span>
<span class="line"><span>// 截取前两个node命令，后面的才是传过来的参数</span></span>
<span class="line"><span>// process.argv[0]: Node.js 可执行文件的路径。</span></span>
<span class="line"><span>// process.argv[1]: 正在执行的脚本文件的路径。</span></span>
<span class="line"><span>// args现在打印出的是 { _: [ 'reactivity' ], f: 'esm' }</span></span>
<span class="line"><span>const args = minimist(process.argv.slice(2))</span></span>
<span class="line"><span>// createRequire 用于在 ES 模块中创建一个 require 函数</span></span>
<span class="line"><span>const require = createRequire(import.meta.url)</span></span>
<span class="line"><span>// 打包的哪个项目</span></span>
<span class="line"><span>const target = args._[0] || 'reactivity'</span></span>
<span class="line"><span>// 打包后的模块规范</span></span>
<span class="line"><span>const format = args.f || 'iife'</span></span>
<span class="line"><span>// 获取当前文件的绝对路径 fileURLToPath返回的 file ,用dirname 处理成路径</span></span>
<span class="line"><span>const __dirname = dirname(fileURLToPath(import.meta.url))</span></span>
<span class="line"><span>// 统一用 src/index.ts 作为入口文件 用pathgh.resolve'来解析路径</span></span>
<span class="line"><span>const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)</span></span>
<span class="line"><span>//entry现在打印出的是 /Users/yeanqi/Desktop/workplace/未命名文件夹/packages/reactivity/src/index.ts</span></span>
<span class="line"><span>const pkg = require(`../packages/${target}/package.json`)</span></span>
<span class="line"><span>// 根据需要进行打包</span></span>
<span class="line"><span>esbuild</span></span>
<span class="line"><span>  .context({</span></span>
<span class="line"><span>    // 入口</span></span>
<span class="line"><span>    entryPoints: [entry],</span></span>
<span class="line"><span>    // 出口</span></span>
<span class="line"><span>    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),</span></span>
<span class="line"><span>    // reactivity -> shared会打包在一起</span></span>
<span class="line"><span>    bundle: true,</span></span>
<span class="line"><span>    // 环境</span></span>
<span class="line"><span>    platform: 'browser',</span></span>
<span class="line"><span>    // 可以调试源码</span></span>
<span class="line"><span>    sourcemap: true,</span></span>
<span class="line"><span>    // 打包格式</span></span>
<span class="line"><span>    format: format,</span></span>
<span class="line"><span>    // 文件名称</span></span>
<span class="line"><span>    globalName: pkg.buildOptions?.name,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .then((ctx) => {</span></span>
<span class="line"><span>    // 监控入口文件持续进行打包处理</span></span>
<span class="line"><span>    return ctx.watch()</span></span>
<span class="line"><span>  })</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


