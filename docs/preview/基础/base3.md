---
title: import 和 require
createTime: 2024-03-12
tags:
  - 基础
permalink: /article/dsa296lc/
---
# import 和 require
的区别

<!-- more -->

## 模块基本概念

- require： 是`CommonJS`模块规范，主要应用于`Node.js`环境。

- import：是`ES6`模块规范，主要应用于现代浏览器和现代`js`开发(适用于例如各种前端框架)。

## 编译规则

- 模块 `A` 代码

```js
console.log('moduleA1...');
const moduleB = require('./myModuleB');
console.log('moduleA2...');
```
- 模块 `B` 代码

```js
console.log('moduleB2...');
```
### require

`require` 执行时会把导入的模块进行缓存，下次再调用会返回同一个实例。

在ES6模块规范中，因此默认是同步的。import有引用提升置顶效果，也就是放在何处都会默认在最前面。

```js
// moduleA1...
// moduleB2...
// moduleA2...
```

### import

`import` 默认是静态编译的，也就是在编译过程就已经确认了导入的模块是啥。

在CommonJS模块规范中，require默认是同步的。当我们在某个模块中使用require调用时，会等待调用完成才接着往下执行。

```js
// import是同步的

// 通过import（）动态引入是异步的，并且是在执行中加载的
component: () => import('@/components/dutest.vue')
```

## 基本用法差异

### require

```js
// 导入模块
const os = require('os');
os.platform()
// 导入本地写好的模块
module.exports = {
  add: (a, b) => a + b,
};
// 使用
const { add } = require('../test/utils');
add(2, 3);
```

### import

```js
//  静态引入
import test from '@/components/test.vue';
// 动态引入
component: () => import('@/components/dutest.vue')
// 动态引入
const MyTest = await import('@/components/MyTest.vue');
```

## 性能对比

`ES6` 支持 `Tree Shaking` 摇树优化，因此可以更好地去除一些没用的代码，能很好减小打包体积。 所以`import`有更好的性能。

`import()`能动态导入模块性能更好，而`require`不支持动态导入