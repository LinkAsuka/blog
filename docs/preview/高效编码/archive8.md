---
title: 返回顶部的几种方法
createTime: 2024-10-02
tags:
  - 高效编码
permalink: /article/hwjc84kp/
---
# 返回顶部的几种方法
top

<!-- more -->

## 金色传说
曾几何时编写一个返回顶部函数麻烦得要死，需scrollTop、定时器和条件判断三者配合才能完成。其实DOM对象里隐藏了一个很好用的函数可完成上述功能，一行核心代码就能搞定。
该函数就是scrollIntoView，它会滚动目标元素的父容器使之对用户可见，简单概括就是相对视窗让容器滚动到目标元素位置。
它有三个可选参数能让scrollIntoView滚动起来更优雅。
- 「behavior」：动画过渡效果，默认auto无，可选smooth平滑
- 「inline」：水平方向对齐方式，默认nearest就近对齐，可选start顶部对齐、center中间对齐和end底部对齐
- 「block」：垂直方向对齐方式，默认start顶部对齐，可选center中间对齐、end底部对齐和nearest就近对齐
```js
	const gotopBtn = document.getElementById("gotop-btn");
	openBtn.addEventListener("click", () =>
			document.body.scrollIntoView({ behavior: "smooth" })
	 );
```
当然还可滚动到目标元素位置，只需将document.body修改成目标元素的DOM对象。一行核心代码就能搞掂的事情为何还编写那么多代码去完成，不累吗？

## 弟弟方法
### 方法一（到顶部会消失,有动画平滑）
```html
	<html>
	<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>JS点击按钮到页面最底部/返回页面顶部代码</title>
    <style type="text/css">
    #back-to-top{ position: fixed; bottom: 50px; right: 10%; }
    </style>
	</head>
	<body>
	 <div>这里是页面代码</div>
	<div id="back-to-top">
	 <a href="#top" rel="external nofollow" >返回顶部</a>
	</div>
	<script src="http://libs.baidu.com/jquery/2.0.0/jquery.js"></script>
	<script type="text/js">
	 $(document).ready(function(){
		$("#back-to-top").hide();
		$(function () {
			$(window).scroll(function(){
				if ($(window).scrollTop()>100){
				$("#back-to-top").fadeIn(100);
				}else{
				$("#back-to-top").fadeOut(100);
				}
			});
			$("#back-to-top").click(function(){
				$('body,html').animate({scrollTop:0},"speed");
				return false;
			});
			});
		});
	</script>
	</body>
	</html>
```
### 方法二（无动画反应快）
```js
	window.scrollTo(0,0);  
```

### 方法三 (有动画流畅版)
```js
	(function smoothscroll(){
			var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
			if (currentScroll > 0) {
					 window.requestAnimationFrame(smoothscroll);
					 window.scrollTo (0,currentScroll - (currentScroll/5));
			}
	})();
```

### 方法四（jquery动画流畅到顶部会消失）
```html
	<span style="font-size:14px"><p id="back-to-top"><a href="#top"><span></span>返回顶部</a></p></span> 
```

```css
	p#back-to-top{
			position:fixed;
			display:none;
			bottom:100px;
			right:80px;
	}
	p#back-to-top a{
			text-align:center;
			text-decoration:none;
			color:#d1d1d1;
			display:block;
			width:64px;
			/*使用CSS3中的transition属性给跳转链接中的文字添加渐变效果*/
			-moz-transition:color 1s;
			-webkit-transition:color 1s;
			-o-transition:color 1s;
	}
	p#back-to-top a:hover{
			color:#979797;
	}
	p#back-to-top a span{
			background:transparent url(/static/imgs/sprite.png?1202) no-repeat -25px -290px;
			border-radius:6px;
			display:block;
			height:64px;
			width:56px;
			margin-bottom:5px;
			/*使用CSS3中的transition属性给<span>标签背景颜色添加渐变效果*/
			-moz-transition:background 1s;
			-webkit-transition:background 1s;
			-o-transition:background 1s;
	}
	#back-to-top a:hover span{
			background:transparent url(/static/imgs/sprite.png?1202) no-repeat -25px -290px;
	}
```

```js
	<script src="http://ajax.microsoft.com/ajax/jQuery/jquery-1.7.2.min.js"></script>
	$(function(){
					//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
					$(function () {
							$(window).scroll(function(){
									if ($(window).scrollTop()>100){
											$("#back-to-top").fadeIn(1500);
									}
									else
									{
											$("#back-to-top").fadeOut(1500);
									}
							});

							//当点击跳转链接后，回到页面顶部位置
							$("#back-to-top").click(function(){
									//$('body,html').animate({scrollTop:0},1000);
					if ($('html').scrollTop()) {
									$('html').animate({ scrollTop: 0 }, 1000);
									return false;
							}
							$('body').animate({ scrollTop: 0 }, 1000);
									 return false;            
						 });       
			 });    
	});
```
