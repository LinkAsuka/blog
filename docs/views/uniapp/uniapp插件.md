---
sidebar: auto
---

# uniapp插件

插件市场

<https://ext.dcloud.net.cn/>

### 1.预览pdf

<https://ext.dcloud.net.cn/plugin?id=11924>

使用：

```vue
<!-- 预览文件
pdfUrl  在线链接
fileType  1.预览图片，2.预览文件，3.预览视频 -->
<template>
 <view>
  <sz-nav-bar :title="title" bgColor="#fff" textColor="#333"></sz-nav-bar>
  <ss-preview :fileUrl="pdfUrl" fileType="2"></ss-preview>
 </view>
</template>

<script>
 export default {
  data() {
   return {
    pdfUrl: '',
    title: '',
   }
  },
  onLoad(e) {
   this.pdfUrl = e.url
   if (e.title) {
    this.title = e.title
   } else {
    this.title = '文件预览'
   }
  },
  methods: {}
 }
</script>
```

问题：真机上不显示导航栏

解决办法：

/ss-preview/components/ss-preview/ss-preview.vue

```js
  created() {
   // #ifdef APP-PLUS
   // 争对需要预留顶部导航栏高度的操作

   let navbar_h = 0; // 导航栏高度
   let _height = 0; //定义动态的高度变量
   let statusbar = 0; // 动态状态栏高度
   uni.getSystemInfo({ // 获取当前设备的具体信息
    success: (sysinfo) => {
     navbar_h = sysinfo.platform === 'android' ? 48 : 44;
     statusbar = sysinfo.statusBarHeight;
     _height = sysinfo.windowHeight;
    }
   });
   let currentWebview = this.$parent.$scope.$getAppWebview(); //获取当前web-view
   setTimeout(function() {
    let wv = currentWebview.children()[0];
    wv.setStyle({ //设置web-view距离顶 部的距离以及自己的高度，单位为px
     top: statusbar + navbar_h, //此处是距离顶部的高度，应该是你页面的头部
     height: _height - statusbar
    })
   }, 200);

   // #endif    
  },
```
