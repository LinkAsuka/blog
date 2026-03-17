---
title: 面试 - css
createTime: 2023-06-21
tags:
  - 基础
permalink: /article/wk0acs77/
---
# 面试 - css
css

<!-- more -->

## 1.盒模型
```css
/* 红色区域的大小是多少？200 - 20*2 - 20*2 = 120 */ 
  .box {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 20px;
    background: red;
    border: 20px solid black;
    /* 标准模型 */
    box-sizing:content-box;
    /*IE模型*/
    box-sizing:border-box;
    }
```
### 知识点解析
  当没有设置box-sizing: border-box;的时候，红色的区域就是concent的面积为240x240,要加上padding拓展的20*2px啊
  当设置了box-sizing: border-box;了之后，pading和border会内卷，内容宽度为120但是我觉得这个题目出的有毛病，padding又不会影响红色的渲染，不也还是红的，所以红色区域应该是160x160
## 2.如何实现一个最大的正方形
  - 用padding-bottom 撑开边距
  `width:100%;padding-bottom:100%;`
## 3.一行水平居中，多行居左
```html
  <style>
    div{
      text-align: center;
    }
    div span{
      display:inline-block;
      text-align:left;
    }
  </style>
  <div><span>我是多行文字。我是多行文字。我是多行文字。我是多行文字。我是多行文字。我是多行文 字。我是多行文字。我是多行文字。我是多行文字。我是多行文字。</span></div>
  <div><span>我是一行文字</span></div>
```
## 4.水平垂直居中
  - 1.单文字水平居中：text-align:center;
  - 2.定位absolute加margin:0 auto;left:0;right:0;
  - 3.定位absolute加transform: translate(-50%,0);
  - 4.定位absolute加margin-left:-0.5*宽度
  - 5.display:flex;justify-content: center;
  - 6.margin: auto;

## 5.垂直居中
  - 1.单行的时候lin-height：高度 
  - 2.父元素display:flex;align-items:center
  - 3.定位absolute加transform: translate(-50%,-50%);
  - 4.定位absolutetop: 50%;margin-top: -0.5宽度;height: 宽度;
  - 5.父元素display:table;子元素display:table-cell;vertical-align:middle;
  - 6.若元素是行内块级元素, 基本思想是使用display: inline-block, vertical-align: middle和一个伪元素让内容块处于容器中央.
```css
    .parent::after, .son{ display:inline-block; vertical-align:middle; }
    .parent::after{ content:''; height:100%; }
```
## 6.两栏布局，左边固定，右边自适应，左右不重叠
```css
  .left {
    float: left;
    width: 300px;
    margin-right: 10px;
    background: red;
    }

  .right {
    overflow: hidden;
    /* 创建BFC */
    background: yellow;
  }
```

## 7.如何实现左右等高布局
  `display: grid;grid-template-columns: 1fr 1fr;`
  `display: flex;flex:1`
  `display: table;display: table-cell;`
## 8.画三角形
```css
  .shape {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 50px solid transparent;
    border-bottom: 50px solid blue;
    background: white;
  }
```
## 9.link @import导入css
link可以加载其他东西，import只能加载css。link可以在载入页面的时候加载，import只能在页面加载完后加载。link可以通过js改变样式import不行
但是import还是后处的，总结一下就是import就是个弟弟
  1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS
  2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载
  3. link无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持
  4. link支持使用Javascript控制DOM去改变样式；而@import不支持
## 10.BFC理解
- BFC触发条件：
  1. 根元素，即html
  2. float的值不为none（默认）
  3. position的值为absolute或fixed
  4. overflow的值不为visible（默认）
  5. display的值为inline-block、table-cell、table-caption
  
- BFC特性：
  1. 内部的Box会在垂直方向上一个接一个放置。
  2. Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
  3. 每个元素的margin box 的左边，与包含块border box的左边相接触。
  4. BFC的区域不会与float box重叠。（可用于清浮动）
  5. BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
  6. 计算BFC的高度时，浮动元素也会参与计算。