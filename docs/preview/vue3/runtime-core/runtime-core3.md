---
title: runtime-core -> renderer函数 源码解析
createTime: 2025/01/11 12:30:22
tags:
  - VUE3源码
permalink: /article/2rfpjri1/
---

packages/runtime-core/src/renderer.ts

<!-- more -->

## renderer 函数

renderer 也可以说是渲染器，前面`h`函数都把节点给创建好了，那要渲染到浏览器还是得靠 renderer，这里就用到了`runtime-dom`中写好的一些对 dom 做处理的 api

renderer 有一个重要的方法`render`，`render`方法是用来渲染虚拟节点到页面上，渲染器会根据虚拟节点的类型，调用对应的渲染函数，渲染到页面上。
我们曾经在 timerun-dom 中看到过,`createRenderer`创建虚拟节点，`render`渲染上去

```ts
export const render = (vnode, container) => {
  return createRenderer(renderOptions).render(vnode, container)
}
```

### renderer 函数的运行逻辑

1. 先解构一下 `runtime-dom` 中用到的方法备用
2. 设置`render`函数
   - 如果传过来的 vnode 为 null，直接删除
   - 如果不为空，调用`patch`更新，用`_vnode`记住节点
3. `patch` 接收 4 个参数（n1, n2, container, anchor?）老虚拟节点，新虚拟节点，实例 ，锚点（ 其实这里传锚点是为了 hostInsert 用的 ）
   判断：
   1. 如果第一次的更新和第二次的数据是不同的节点，删掉第一个把新的赋给 n1
   2. 如果是第一次渲染 (n1 === null) 做初始化操作,挂载上去
   3. 如果是同一个节点，比较他们的节点，做更新操作

先把 `patchKeyChildren` 函数贴在这，这个值得再出一章来讲 4. 创建节点的时候要判断这个节点是文本数组等类型，进行不同的操作，还要通过循环吧 style、class 等属性添加上去 5. 更新节点的时候要判断是否为同一个节点，会对属性进行更新，然后根据老节点和新节点的类型通过算法来减少 DOM 的更新的范围，如果更新的节点还有子节点，子节点也要做循环更新 6. `patchKeyChildren` 这个函数就是对比节点用的核心算法

::: tabs
@tab packages/runtime-core/src/renderer.ts

```ts
import { ShapeFlags } from '@vue/shared'
import { getSequence } from './getSequence'
import { Fragment, Text } from './createVNode'
export function createRenderer(renderOptions) {
  // runtime-core 不关心如何渲染 , 只是用来跨平台
  // 解构一下
  const {
    // insert(el,parent,anchor)
    insert: hostInsert, //插入元素
    // remove(el)
    remove: hostRemove, //删除元素
    // patchProp(el, key, prevValue, nextValue)
    patchProp: hostPatchProp, //节点元素的属性操作 class style event 等
    // createElement(tag)
    createElement: hostCreateElement, //新建元素
    // createText(text)
    createText: hostCreateText, //新建文本
    // setText(node,text)
    setText: hostSetText, //给文本节点设置文本
    // setElementText(node,text)
    setElementText: hostSetElementText, //创建节点中的文字
    // parentNode(node)
    parentNode: hostParentNode, //获取父节点
    // nextSibling(node)
    nextSibling: hostNextSibling, //获取兄弟节点
  } = renderOptions

  // 如果是数组就循环他渲染上去
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
    }
  }

  //   创建虚拟节点
  const mountElement = (vnode, container, anchor) => {
    const { type, children, props, shapeFlag } = vnode
    // 第一次渲染的时候让虚拟节点和真实的 dom 创建关联 用vnode.el = el来记住
    // 第二次渲染也要更新 vnode.el 传了null 也要滞空
    let el = (vnode.el = hostCreateElement(type)) // 创建真实元素，挂载到虚拟节点上 el的来处
    if (props) {
      // 处理属性
      // 如果有属性 style class等,就循环添加
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    // 判断是否为文本 9 & 8 判断9是否在8内
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 如果是文本
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 如果是数组
      mountChildren(children, el)
    }
    hostInsert(el, container, anchor)
  }

  // 比较儿子 删除
  const unmountChildren = (children) => {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i])
    }
  }
  // 判断是否为同一个节点
  const isSameVNodeType = (n1, n2) => {
    return n1.type === n2.type && n1.key === n2.key
  }
  // 如果儿子是数组，循环比较两个的el
  function patchKeyChildren(c1, c2, container) {
    let i = 0
    let e1 = c1.length - 1
    let e2 = c2.length - 1
    // [(a b) c]
    // [(a b) d e]
    while (i <= e1 && i <= e2) {
      //有一方循环结束了就不用比了
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVNodeType(n1, n2)) {
        // 如果是同一个节点，去做递归比对更新
        patch(n1, n2, container)
      } else {
        break
      }
      i++
    }
    // e1 到 c 的位置终止了 e2 到 e 的位置终止了
    // i=2 e1 = 2 e2 = 3

    // [a (b c)]
    // [d e (b c)]
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container)
      } else {
        break
      }
      e1--
      e2--
    }
    // e1 到 c 的位置终止了 e2 到 e 的位置终止了
    // i=0 e1 = 0 e2 = 1

    // 处理增加和删除的特殊情况 [a b c] [a b] | [a b] [a b c] 比较两个数组的差异
    if (i > e1 && i <= e2) {
      //新的多 && 有插入的部分
      const anchor = c2[e2 + 1]?.el // 有值的话，说明存在下一个元素
      while (i <= e2) {
        // 初始化
        patch(null, c2[i], container, anchor)
        i++
      }
    } else if (i > e2 && i <= e1) {
      //旧的多 && 有删除的部分
      while (i <= e1) {
        // 删除多余的 将元素一个个删掉
        unmount(c1[i])
        i++
      }
    }
    // 特殊的对比方式
    // ab(cde)fg -> ab(ecdh)fg
    // i=2 e1 = 4 e2 = 5
    else {
      const s1 = i // 老的
      const s2 = i // 新的
      // 5.1 将新的元素做成一个映射表 <newIndex key, newIndex>
      const keyToNewIndexMap = new Map() //做一个映射表用于快速查找 看老的在新的里面是否还有，没有就删除，有的就更新
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i]
        // 第几个 并不是index
        keyToNewIndexMap.set(nextChild.key, i) // 不写key就是undefined
      }

      // 5.2 循环遍历待修补的旧子节点，并尝试修补匹配节点并删除不再存在的节点
      const toBePatched = e2 - s2 + 1 // 待修补的节点个数
      const newIndexToOldIndexMap = new Array(toBePatched) // 映射表  用新的索引去映射老的索引
      // oldIndex = 0是一个特殊值，表示新节点没有对应的旧节点
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0
      // 倒序整理顺序 通过对比新值的这个元素的前一个
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i]
        let newIndex = keyToNewIndexMap.get(prevChild.key) // 通过key 找到索引·
        if (newIndex === undefined) {
          // 新的里面不存在 删除
          unmount(prevChild)
        } else {
          // 更新映射表  新索引-s2是减去前面一样不更新的 对应的是旧索引+1
          newIndexToOldIndexMap[newIndex - s2] = i + 1 //为了避免前面没有值 0会有歧义 需要+1
          patch(prevChild, c2[newIndex], container)
        }
      }
      // dabe
      // abecd - > dabce
      // 连续性最强 最长递增子序列
      // 求连续性最强的子序列 贪心算法 + 二分查找
      // 2 3 7 6 8 4 9 11 10 -> 求最长子序列的个数 23 68
      let increasingNewIndexSequence = getSequence(newIndexToOldIndexMap) //求最长子序列  // [!code warning]
      let j = increasingNewIndexSequence.length - 1 // 取出最后一个人的索引
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i //[ecdh]   找到h的索引
        const nextChild = c2[nextIndex]
        let anchor = nextIndex + 1 < c2.length ? c2[nextIndex + 1].el : null // 找到当前元素的下一个元素
        if (newIndexToOldIndexMap[i] == 0) {
          // 这是一个新元素 直接创建插入到 当前元素的下一个即可
          patch(null, nextChild, container, anchor)
        } else {
          if (i != increasingNewIndexSequence[j]) {
            hostInsert(nextChild.el, container, anchor) //操作当前的d 以d下一个作为参照物插入
          } else {
            j--
          }
        }
      }
    }
  }
  /**
   *
   * 1. 新的是文本，老的是数组 移除老的
   * 2. 新的是文本，老的也是文本，内容不相同替换
   * 3. 老的是数组，新的也是数组，全 diff 算法
   * 4. 老的是数组，新的不是数组，移除老的节点
   * 5. 老的是文本，新的是空
   * 6. 老的是文本，新的是数组
   *
   */
  // 比较两个节点的子节点，el为当前父节点
  const patchChildren = (el, n1, n2) => {
    const c1 = n1.children
    const c2 = n2.children
    const prevShapeFlag = n1.shapeFlag
    const shapeFlag = n2.shapeFlag
    // !老的是数组新值为文本 删除老数组，插入新文本
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 旧值为数组
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1)
      }
      if (c1 !== c2) {
        hostSetElementText(el, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 新值为数组
        // !老的是数组 新的也是数组
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          patchKeyChildren(c1, c2, el) // 全量更新，同级比较 更新数组
        } else {
          // !老的是数组 新的不是数组 删掉重新加
          unmountChildren(c1)
        }
      } else {
        // !新的是文本
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(el, '')
        }
        //  !新的是文本
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2, el)
        }
      }
    }
  }
  // 对比属性更新
  const patchProps = (oldProps, newProps, el) => {
    // 判断老的没有新的有就上上去
    for (const key in newProps) {
      hostPatchProp(el, key, oldProps[key], newProps[key])
    }
    // 老的有新的没有就删除掉
    for (const key in oldProps) {
      if (!(key in newProps)) {
        //以前有现在没有需要删除掉
        hostPatchProp(el, key, oldProps[key], null)
      }
    }
  }
  const patchElement = (n1, n2, container) => {
    // 比较n1和 n2的差异,需要复用 dom 元素
    // 比较元素的属性和子节点
    let el = (n2.el = n1.el) //对 dom 元素的复用，因为 key 和type 相同所以不用改变
    let oldProps = n1.props || {}
    let newProps = n2.props || {}
    // hostPatchProps 只针对 class style event attr做处理 所以新鞋一个方法来做
    patchProps(oldProps, newProps, el)

    // 继续对比子节点
    patchChildren(el, n1, n2)
  }
  //  核心渲染方法
  const patch = (n1, n2, container, anchor?) => {
    if (n1 == n2) {
      // 两次渲染同一个元素直接跳过
      return
    }
    // 如果第一次的更新和第二次的数据是不同的节点
    if (n1 && !isSameVNodeType(n1, n2)) {
      unmount(n1)
      n1 = null //直接移除老 dom 元素，就可以初始化新的dom 元素
    }
    // 在这里处理传来的类型
    const { type, shapeFlag, ref } = n2
    switch (type) {
      case Text: // [!code warning]
        processText(n1, n2, container) // 处理文本
        break
      case Fragment: // [!code warning]
        processFragment(n1, n2, container) // 处理fragment
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, anchor) // 之前处理元素的逻辑
        }
    }
  }
  const processElement = (n1, n2, container, anchor) => {
    if (n1 === null) {
      // 如果是第一次渲染，做初始化操作,挂载上去
      mountElement(n2, container, anchor)
    } else {
      // 如果两个节点都是 div ，比较他们的节点
      patchElement(n1, n2, container)
    }
  }
  // 处理文本
  function processText(n1, n2, container) {
    if (n1 === null) {
      //新增
      // 虚拟节点关联真实节点
      n2.el = hostCreateText(n2.children)
      // 将节点插入到页面中
      hostInsert(n2.el, container)
    } else {
      // 更新
      const el = (n2.el = n1.el)
      if (n1.children !== n2.children) {
        hostSetText(el, n2.children)
      }
    }
  }
  // 处理 Fragment
  function processFragment(n1, n2, container) {
    if (n1 == null) {
      // 创建
      mountChildren(n2.children, container)
    } else {
      // 更新
      patchChildren(container, n1, n2)
    }
  }

  // 移除当前容器中的dom元素
  const unmount = (vnode) => {
    const { shapeFlag } = vnode
    //如果是来自 Fragment 的元素，则需要遍历子元素进行删除
    if (vnode.type === Fragment) {
      return unmountChildren(vnode.children)
    }
    hostRemove(vnode.el)
  }

  const render = (vnode, container) => {
    if (vnode === null) {
      // 如果 vnode 为空移除当前容器中的dom元素
      if (container._vnode) {
        // 如果有虚拟节点，可以拿到 container._vnode 拿到上一次渲染的虚拟节点
        unmount(container._vnode)
      }
    } else {
      // 将虚拟节点变成真实节点进行渲染，第一次是渲染第二次可能是更新
      patch(container._vnode || null, vnode, container)
      // 保留老节点， 第一次进来传 null，第二次用老的匹配新的
      container._vnode = vnode
    }
  }
  return {
    render,
  }
}
```

@tab packages/shared/src/getSequence.ts

```ts
export function getSequence(arr) {
  // 贪心算法和二分查找
  const result = [0] //结果集 从0开始
  let len = arr.length //数组长度
  const p = arr.slice(0)
  for (let i = 1; i < len; i++) {
    const arrI = arr[i] //当前项
    if (arrI !== 0) {
      //如果数值存在0说明没有被 patch 过是创建节点
      //为了vue3处理了数组中0的情况
      let resultLastIndex = result[result.length - 1] //拿出结果集的最后一项和当前数据比对
      if (arr[resultLastIndex] < arrI) {
        //索引小于当前一项
        p[i] = resultLastIndex // 标记当前前一个对应的索引
        result.push(i).toFixed
        continue //下一次循环
      }
      // 二分查找 结果索引是递增的，使用二分查找可以优化性能
      let start = 0
      let end = result.length - 1
      while (start < end) {
        let mid = Math.floor(start + (end - start) / 2) //获取中间值的向下取整 index
        console.log('arr[result[mid]]=>', arr[result[mid]])
        if (arr[result[mid]] < arrI) {
          // 如果中间值小于当前值，说明应该在它后面，就去找后面
          start = mid + 1
        } else {
          // 如果b[result[mid]]大于当前值，说明应该在它前面，就去找前面
          end = mid
        }
      }

      if (arrI < arr[result[start]]) {
        if (start > 0) {
          // 才需要替换 如果当前值小于它前  一个，那么它应该替换前一个
          p[i] = result[start - 1] // 要将他替换的前一个记住
        }
        // 替换
        result[start] = i
      }
    }
  }

  let i = result.length - 1
  let last = result[result.length - 1]

  while (i >= 0) {
    result[i] = last
    last = p[last]
    i--
  }
  return result
}

// [0 1 2 ]

console.log(getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4]))
```

:::

::: info 用于理解的 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module">
      import { render, h, createVNode, Text, Fragment } from './runtime-dom.js'
      const app = document.getElementById('app')

      // 我们用内置的 render 函数来渲染到页面上
      let ele1 = h('div', { a: 1 })
      let ele2 = h('div', h('div', 'ass'))
      let ele3 = h('div', [1])
      let ele4 = h('div', [h('a'), h('a'), h('c')])
      let ele5 = h('div', 'abc')
      let ele6 = h('div', {}, h('a')) //虚拟节点会包成数组
      let ele7 = h('div', {}, h('a'), h('a'), h('a'))
      // console.log(ele1);
      // console.log(ele2);
      // console.log(ele3);
      // console.log(ele4);
      // console.log(ele5);
      // console.log('ele7'+ele7 );
      let showEle = h(
        'div',
        { style: { color: 'red' } },
        [h('div', 'a1'), h('div', 'b1'), h('div', 'c1')]
        // 为了处理后面的优化，源码中编译后的结果全部采用了 createVNode
        // createVNode的顺序就必须是元素 属性 儿子
        // createVNode("div",{},"c1")
      )
      let showEle1 = h(
        'div',
        { style: { color: 'red' } },
        h('div', 'c1')

        // 为了处理后面的优化，源码中编译后的结果全部采用了 createVNode
        // createVNode的顺序就必须是元素 属性 儿子
        // createVNode("div",{},"c1")
      )
      // let vnode1  = h('h1',{a:1}, 'hello')
      // let vnode2  = h('h1',{style:{color:'red'}},[h("a","1"),h("a","2")])

      let vnode3 = h('h1', [h('div', { key: 'a', style: { color: 'red' } }, 'a'), h('div', { key: 'b' }, 'b'), h('div', { key: 'c' }, 'c')])
      let vnode4 = h('h1', [h('div', { key: 'a', style: { color: '#999' } }, 'a'), h('div', { key: 'b' }, 'b'), h('div', { key: 'c' }, 'c'), h('div', { key: 'd' }, 'd'), h('div', { key: 'e' }, 'e')])

      // render(showEle, app)
      // render(showEle, app),
      render(vnode3, app)
      setTimeout(() => {
        render(vnode4, app)
      }, 3000)

      // 也可以先创建渲染器 用自己的渲染器渲染到页面上
      // const renderer = createRender({
      //     // 创建元素
      //     createElement(tag) {
      //         return document.createElement('h1')
      //     },
      //     // 创建节点中的文字
      //     setElementText(el, text) {
      //         el.textContent = text
      //     },
      //     // 插入元素
      //     insert(el, parent) {
      //         parent.appendChild(el)
      //     }
      // })
      // renderer.render(ele, document.body)
      //    render(h(Text, "wre"),app);
      render(h(Fragment, [h('div', 'hello'), h('div', 'word')]), app)
      setTimeout(() => {
        // render(h(Text,'123'),app)
        // render(null,app)
        render(h(Fragment, [h('div', 'hello'), h('div', '234')]), app)
      }, 1200)
    </script>
  </body>
</html>
```

:::
