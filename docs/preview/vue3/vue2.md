---
title: vue3 - 配置入口文件
createTime: 2024-12-13
tags:
  - VUE3源码
permalink: /article/i3yb3hm1/
---
# vue3 - 配置入口文件 
scripts/dev.js

<!-- more -->

1. 初始化项目 `yarn init -y`
2. 创建其他的子包
3. 安装 ts 安装在外层要加 -W `yarn add typescript -D -W`
   配置 tsconfig.json `npx tsc --init`
4. 打包配置 安装 rollu 的相关依赖 `yarn add rollup -D`
   yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve esbuil -D -W
   `rollup-plugin-typescript2` 处理 ts 的
   `@rollup/plugin-node-resolve` 处理解析第三方插件的
   `@rollup/plugin-json`处理 json 格式的
   `esbuil` 处理子进程的用的，打包的时候会把子包一同打包
   配置子页面打包，shared 页面同理
   ```js
   "buildOptions": {
    "name": "VueReactivity", 
    "formats": ["cjs","esm-bundler","global"]
   }
   ```
   `name` iife 打包的时候要用
   `formats` 处理打包的格式
   `cjs` 处理 node 的
   `esm-bundler` 处理 js 将 es6 变成 es5
   `global` 处理全局属性的
5. 配置命令
   添加 scripts dev.js 文件
   配置项

```js
"scripts": {
   "dev": "node scripts/dev.js" //还可以再后面加上 -d -w -g -m -f esm -o 等配置
}
```

6. 配置 dev.js 文件

```js
// 打包 packge 的文件
import esbuild from 'esbuild'
import minimist from 'minimist'
import { createRequire } from 'module'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// node 命令函数通过 process 来获取 argv
// 截取前两个node命令，后面的才是传过来的参数
// process.argv[0]: Node.js 可执行文件的路径。
// process.argv[1]: 正在执行的脚本文件的路径。
// args现在打印出的是 { _: [ 'reactivity' ], f: 'esm' }
const args = minimist(process.argv.slice(2))
// createRequire 用于在 ES 模块中创建一个 require 函数
const require = createRequire(import.meta.url)
// 打包的哪个项目
const target = args._[0] || 'reactivity'
// 打包后的模块规范
const format = args.f || 'iife'
// 获取当前文件的绝对路径 fileURLToPath返回的 file ,用dirname 处理成路径
const __dirname = dirname(fileURLToPath(import.meta.url))
// 统一用 src/index.ts 作为入口文件 用pathgh.resolve'来解析路径
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
//entry现在打印出的是 /Users/yeanqi/Desktop/workplace/未命名文件夹/packages/reactivity/src/index.ts
const pkg = require(`../packages/${target}/package.json`)
// 根据需要进行打包
esbuild
  .context({
    // 入口
    entryPoints: [entry],
    // 出口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
    // reactivity -> shared会打包在一起
    bundle: true,
    // 环境
    platform: 'browser',
    // 可以调试源码
    sourcemap: true,
    // 打包格式
    format: format,
    // 文件名称
    globalName: pkg.buildOptions?.name,
  })
  .then((ctx) => {
    // 监控入口文件持续进行打包处理
    return ctx.watch()
  })
```
