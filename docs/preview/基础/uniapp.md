---
title: uniapp 在兼容上踩过的坑
createTime: 2025/08/26 17:08:03
permalink: /article/di5zl83z/
---

太惨了

<!-- more -->

# dom 的坑

因为一开始这个项目是要做 H5 的所以也没多想，好多拿高度的地方我用的都是 dom 拿的，结果小程序运行在 JS Core 内，没有 DOM 树和 windiw 对象，无法使用 window 对象和 document 对象 ，所以就只能用 wx.getSystemInfoSync() 拿。

## 写法问题

比如我现在有个组件，用 porps 去接受参数,然后拿 ref 去接收他好对这个数据做一些处理。这样写是不行的，小程序根本就拿不到。想要这么写就要进来之后再赋值

```html
// 拿不到 const props = defineProps({ data: {} }) const dataList = ref(props.data)
```

## scroll-view 无法下拉刷新

在页面渲染太快了的情况下 scroll-view 的高度会拿初始值的高度，需要加`v-if="height"`等计算出来值再显示

## 表单不失焦里面的数据跟滚动条一起动

`<textarea fixed="true" auto-height="true" ></textarea>`

## ios 时间错误

````js
let v = props.values;
if(typeof v === 'string'){
    v = v.replace(/-/g, '/')
}
````
## 拿手机的边距
```js
import { defineStore } from 'pinia';

const useWindowStore = defineStore('windowInfo', {
  state: () => ({
    h: "0px",
    top:"0",
    bottom:"0",
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['windowInfo'],
      },
    ],
  },
  actions: {
    getCodeList(k) {
      return this[k]
    },
    setInfo(data) {
      let h = "";
      let top = "";

      console.log(uni.getWindowInfo());
      const {windowHeight, screenHeight, safeAreaInsets, statusBarHeight} = uni.getWindowInfo();
      //h = windowHeight - statusBarHeight;
      top = safeAreaInsets.top || statusBarHeight;

      // #ifndef H5
      this.h = screenHeight+"px";
      // #endif

      // #ifdef H5
      this.h = windowHeight+"px";
      // #endif

      this.top = top+"px";
      this.bottom = safeAreaInsets.bottom+"px";
    },
  },
})
export default useWindowStore

```