---
title: runtime-core 源码解析
createTime: 2025/01/10 14:30:54
tags:
  - VUE3源码
permalink: /article/dpahzzu8/
---

packages/runtime-core/src/index.ts

<!-- more -->

## runtime-core 用来做什么

runtime-dom 的作用是给 runtime-core 提供对 DOM 操作的 API 封装，要动这些 DOM 节点我们就要用到
runtime-core 是 Vue 3 的运行时核心负责实现组件渲染、虚拟节点管理、渲染函数、辅助函数和工具等功能

1. 响应式系统：
   `runtime-core` 提供了响应式系统，使您能够轻松地创建和管理响应式数据对象。当响应式数据对象发生变化时，runtime-core 会自动更新受其影响的视图。

2. 虚拟 DOM diff 算法：
   `runtime-core` 提供了高效的虚拟 `DOM diff 算法`，它能够快速地计算出需要更新的 DOM 元素，从而减少不必要的 DOM 操作。

3. 组件系统：
   `runtime-core` 提供了组件系统，使您能够创建和使用可重用的组件。组件系统可以帮助您构建模块化、可维护的 Vue.js 应用。
   
它主要的模块有

- `createVNode` 创建虚拟 DOM
- `h` 用于创建虚拟 DOM 节点
- `renderer` 负责将虚拟 DOM 渲染为实际的 DOM
- `createApp` 创建应用




### 渲染流程
1. 在 `h`的调用过程中，用`createVNode` 创建虚拟 DOM
2. 用`renderer` 渲染器中的 `render` 函数将虚拟 DOM 渲染为实际的 DOM
   renderer 用了很多算法来优化浏览器的渲染性能，如果没有更新的节点或是只是变了位置的节点，尽可能的不会修改 DOM 去更新它

::: tabs
@tab packages/runtime-core/src/index.ts

```ts
export * from './h'
export * from './createVNode'
export * from './renderer'
```
:::
