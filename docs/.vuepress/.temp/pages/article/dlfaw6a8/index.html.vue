<template><div><p>都优化了哪几个方面</p>
<!-- more -->
<h2 id="_1-模块管理方式" tabindex="-1"><a class="header-anchor" href="#_1-模块管理方式"><span>1. 模块管理方式</span></a></h2>
<ul>
<li>
<p>Vue 2 代码管理方式是在 src 拆分,根据功能的不同拆分到不同的文件夹下</p>
</li>
<li>
<p>Vue 3 引入了 <code v-pre>monorepo</code> 更好的管理
monorepo 把这些模块拆分到不同的 package 中，并使用 npm 管理依赖关系，每个 package 都有自己独立的 API、自定义类型和用例。这样的好处是更容易理解，提高了代码的可维护性
如果在代码编写只用到了部分功能，就可单独引入需要的模块，从而减少打包后的文件大小。</p>
</li>
<li>
<p>Vue 2 使用 flow 类型检查，但是 flow 对一些复杂类型检查有问题</p>
</li>
<li>
<p>Vue 3 使用了有类型检查的 TypeScrip</p>
</li>
<li>
<p>Vue 3 移除了一些冷门的特征，引入 <code v-pre>tree shaking</code> 优化打包后的文件大小
tree shaking 通过<code v-pre>编译模块的静态分析</code>找到没有引入的模块打上标记，如果你在项目中没有引入的模块，那么这些模块就不会被打包进最终的包中。</p>
</li>
</ul>
<h2 id="_2-响应式系统" tabindex="-1"><a class="header-anchor" href="#_2-响应式系统"><span>2. 响应式系统</span></a></h2>
<p>Vue js 是通过劫持渲染 dom 的时候拦截数据，对数据进行响应式处理，当数据发生变化时，会触发对应的回调函数，从而实现数据的响应式更新。</p>
<ul>
<li>
<p>Vue 2 使用 Object.defineProperty 来实现数据的双向绑定和响应式更新。
但是它其实是存在一些毛病的，想要进行拦截它必须知道要拦截的 key 是什么，虽然它也可以通过 Object.defineProperty 的 getter 和 setter 拦截到所有的 key,但是其实增加了用户的负担</p>
</li>
<li>
<p>Vue 3 引入了基于 Proxy 的全新响应式系统，它劫持了整个对象所以可以直接拦截对象的读取、写入、删除等操作，从而解决了 Vue 2 中的一些局限性。通过 Proxy，
Vue 3 不仅能够监听数组的索引变化，还能够对动态添加的属性进行响应式处理。这使得 Vue 3 的响应式系统更强大且更具性能优势。
** Proxy 并不能监听到内部深层次的对象变化，所以 VUE 3 是在 getter 中递归响应式的 **</p>
</li>
</ul>
<p>对比总结：Vue 3 的响应式系统更灵活，能够更好地处理复杂的数据结构，并且在性能上有所提升。</p>
<h2 id="_3-编译优化" tabindex="-1"><a class="header-anchor" href="#_3-编译优化"><span>3. 编译优化</span></a></h2>
<ul>
<li>Vue 2 触发更新的组件需要遍历所有 vnode 树，</li>
<li>Vue 3 使用了虚拟 DOM，block tree 基于动态节点，每个区块的节点都是固定的，每个区块只要以一个 Array 来追踪只剩包含的动态节点，只对实际变化的部分进行更新，从而实现了更高的性能。</li>
</ul>
<p>slot 的编译优化，事件监听函数的缓存优化 并且在运行时重写了 diff 算法</p>
<h2 id="_2-代码组织方式" tabindex="-1"><a class="header-anchor" href="#_2-代码组织方式"><span>2. 代码组织方式</span></a></h2>
<ul>
<li>Vue 2 使用 Options API
通过 data、methods、computed、watch 等选项来定义组件的功能。虽然这种方式直观且易于理解，但随着组件复杂度的增加，不同逻辑之间的分离变得困难，导致代码的可读性和维护性降低。</li>
<li>Vue 3 引入了 Composition API
它允许开发者通过 setup 函数将逻辑功能分离到单独的模块中。这不仅提高了代码的可复用性，还增强了逻辑的聚合度。通过 Composition API，开发者可以更灵活地组织代码，尤其在大型项目中，能够显著改善代码的结构和可维护性。
对比总结：Vue 3 的 Composition API 提供了更好的逻辑复用和组织方式，适合更复杂和大型的应用开发。</li>
</ul>
<h2 id="_3-组件体系" tabindex="-1"><a class="header-anchor" href="#_3-组件体系"><span>3. 组件体系</span></a></h2>
<ul>
<li>Vue 2 强调单文件组件（SFC），允许开发者将 HTML、CSS 和 JavaScript 代码组合在一个 .vue 文件中。这种组件化开发方式简化了项目的结构和管理，特别适合小型和中型项目。</li>
<li>Vue 3 在保留 Vue 2 组件体系的基础上，引入了一些重要的新特性：
Fragments：允许组件返回多个根节点，减少了不必要的 DOM 包装元素。
Teleport：让组件的 DOM 节点可以渲染到另一个指定的位置，非常适合实现模态框和全局提示等场景。
Suspense：处理异步组件加载，使得异步操作更易管理。</li>
</ul>
<p>对比总结：Vue 3 在组件体系上进行了增强，使得组件更加灵活，能够更好地处理复杂的 UI 场景。</p>
<h2 id="_4-性能优化" tabindex="-1"><a class="header-anchor" href="#_4-性能优化"><span>4. 性能优化</span></a></h2>
<h3 id="_4-1-vue-2-的性能表现" tabindex="-1"><a class="header-anchor" href="#_4-1-vue-2-的性能表现"><span>4.1 Vue 2 的性能表现</span></a></h3>
<p>Vue 2 在性能上已经做了许多优化，足以应对大部分应用的需求。然而，由于其核心实现上的一些技术限制，例如基于 Object.defineProperty 的响应式系统，在处理大量数据或复杂嵌套结构时可能会有性能瓶颈。</p>
<h3 id="_4-2-vue-3-的性能提升" tabindex="-1"><a class="header-anchor" href="#_4-2-vue-3-的性能提升"><span>4.2 Vue 3 的性能提升</span></a></h3>
<p>Vue 3 通过多种方式提升了性能，包括但不限于：</p>
<p>使用 Proxy 实现更高效的响应式系统。
引入 Tree Shaking 减少打包后的代码体积。
改进的虚拟 DOM 和编译优化，使得渲染和更新更加高效。</p>
<p>对比总结：Vue 3 的性能优化使其在处理大型复杂应用时更加高效，且减少了资源消耗。</p>
<h2 id="_5-生态系统与工具支持" tabindex="-1"><a class="header-anchor" href="#_5-生态系统与工具支持"><span>5. 生态系统与工具支持</span></a></h2>
<h3 id="_5-1-vue-2-的生态系统" tabindex="-1"><a class="header-anchor" href="#_5-1-vue-2-的生态系统"><span>5.1 Vue 2 的生态系统</span></a></h3>
<p>Vue 2 拥有丰富的生态系统和成熟的周边工具，如 Vue Router、Vuex 等。这些工具在 Vue 2 的项目中无缝工作，并为开发者提供了广泛的功能支持。</p>
<h3 id="_5-2-vue-3-的生态进化" tabindex="-1"><a class="header-anchor" href="#_5-2-vue-3-的生态进化"><span>5.2 Vue 3 的生态进化</span></a></h3>
<p>Vue 3 的发布也带来了生态系统的更新，如 Vue Router 4 和 Vuex 4 这些工具都经过了重构，以充分利用 Vue 3 的新特性。此外，Vue 3 更好地支持 TypeScript，使得开发者可以更轻松地编写类型安全的代码。
对比总结：Vue 3 的生态系统在继承 Vue 2 成熟工具的基础上，进行了优化和升级，增强了与现代开发工具的兼容性。</p>
<h2 id="_6-迁移与兼容性" tabindex="-1"><a class="header-anchor" href="#_6-迁移与兼容性"><span>6. 迁移与兼容性</span></a></h2>
<h3 id="_6-1-vue-2-的兼容性" tabindex="-1"><a class="header-anchor" href="#_6-1-vue-2-的兼容性"><span>6.1 Vue 2 的兼容性</span></a></h3>
<p>Vue 2 作为一个稳定的框架，支持所有现代浏览器，并且拥有广泛的社区支持。然而，随着前端技术的演进，Vue 2 的一些特性和机制可能逐渐跟不上时代的需求。</p>
<h3 id="_6-2-vue-3-的迁移策略" tabindex="-1"><a class="header-anchor" href="#_6-2-vue-3-的迁移策略"><span>6.2 Vue 3 的迁移策略</span></a></h3>
<p>为了帮助开发者从 Vue 2 平滑迁移到 Vue 3，官方提供了 Vue 迁移工具（Vue Migration Helper），该工具能够自动检测项目中的兼容性问题并提供建议。此外，Vue 3 还发布了兼容版本（Vue 2.7），允许开发者逐步适应 Vue 3 的新特性。
对比总结：Vue 3 的迁移策略非常友好，官方提供了丰富的工具和支持，以确保开发者能够顺利过渡到新版本。</p>
</div></template>


