---
title: 面试 - 手写
createTime: 2023-06-21
tags:
  - 基础
permalink: /article/n9scn7od/
---
# 面试 - 手写
手写

<!-- more -->

- 1.实现 new 方法
- 2.实现 Promise
- 3.实现一个 call 函数
- 4.实现一个 apply 函数
- 5.实现一个 bind 函数
- 6.浅拷贝、深拷贝的实现
- 7.实现一个节流函数
- 8.实现一个防抖函数
- 9.instanceof 的原理
- 10.Object.create 的基本实现原理
- 11.实现一个双向数据绑定
- 12.实现一个简单路由
- 13.实现懒加载
- 14.rem 基本设置
- 15.手写实现 AJAX

## 1.实现 new 方法
当我们new一个构造器，主要有三步：
 • 创建一个空对象，将它的引用赋给 this
 • 继承函数的原型。
 • 通过 this 将属性和方法添加至这个对象
 • 最后返回 this 指向的新对象，也就是实例（如果没有手动返回其他的对象）
 ```js
 function _new(fun){
 	return function(){
 		var obj = {
 			__proto__:__proto__.fun
 		}
 		// 执行pre
 		fun.apply(obj,arguments);
 		return obj;
 	}
 }
 function pre(name){
 	this.name = name;
 }
 var obj = _new(pre)('yeanqi')
 //_new(pre) return function(){...}
 ```
## 2.实现 Promise
这个先不管
## 3.实现一个 call 函数
```js
	function func() {
		console.log(`my name is ${this.name} and i'am ${this.age} years old`)
	}
	let obj2 = {
		name: "susan",
		age: "19"
	}
var oj = func.mycall(obj2,1,3,4)
var oj = func.myapply(obj2,[1,3,4])
var oj = func.mubind(obj2,[1,3,4])(22)
```
解释一下call吧，比如一个单位分房子(func),老李家里有夫妻两人(name,age)，现在公司要登记了
func.mycall(obj2,1,3,4)啊，房子func给老李和他的老婆。偶尔还要住他的亲戚1，2，3
mycall就是公司的保障部门开始运作了，context要住这个房子。如果有人可以分配话就分配，没有就是公家的(window)
就是把房子拿过来用机器猫的复制灯复制了一个房子然后一家人住了进去最后不想住了把房子拆了的故事


思路： 将要改变this指向的方法挂到目标this上执行并返回 
```js
	Function.prototype.mycall = function(context) {
		// 赋值作用域参数，如果没有则默认为 window，即访问全局作用域对象
		context = context || window
		// 绑定调用函数
		context.fn = this
		//截取作用域对象参数后面的参数
		let arg = [...arguments].slice(1)
		// 调用函数，把值传进去
		let result = context.fn(...arg)
		// 销毁调用函数，以免作用域污染
		delete context.fn
		return result
	}

 }
```
## 4.实现一个 apply 函数
 思路：将要改变this指向的方法挂到目标this上执行并返回
```js
Function.prototype.myapply = function(context) {
	context = context || window 
	context.fn = this
	let result
	// 判断有没有参数，如果有就加参数,arguments为参数与this也建立了链接
	if (arguments[1]) {
		result = context.fn(...arguments[1])
	} else {
	// 如果没有就直接调用,this会跟过去
		result = context.fn()
	}
	delete context.fn
	return result
}
```
## 5.实现一个 bind 函数
 思路：类似call，但返回的是函数
```js
Function.prototype.mybind = function(context) {
	let _this = this
	let arg = [...arguments].slice(1)
	return function F() {
		// 处理函数使用new的情况 
		if (this instanceof F) {
			return new _this(...arg, ...arguments)
		} else {
		// 用apply给func绑定this并且传值arg为mybind的传参,arguments为函数的传参
			return _this.apply(context, arg.concat(...arguments))
		}
	}
}
```
## 6.浅拷贝、深拷贝的实现
- 浅拷贝
```js
var a = {name:'name'}
数组
1.var b = a.concat();
2.var b = a.slice(0);
对象
3.var b = Object.assign(a);
4.var b = a
```
- 深拷贝
```js
var a = {name:'name'}
1. var b = JSON.parse(JSON.stringify(a))
2. var b = [...arr];
3. 递归
```
## 7.实现一个节流函数
- 节流：
    鼠标不断点击触发，mousedown(单位时间内只触发一次)
    监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
```js
document.getElementById('button1').onclick = thor(fn, 2000);

		function fn(){
			console.log("dayyinp")
		}
		
		function thor(fn, time){
			let timer2;
			return function() {
				if (!timer2) {
					timer2 = setTimeout(function() {
						fn()
						timer2 = null;
					}, time)
				}
			}
		}
```
## 8.实现一个防抖函数
 - 防抖：
    search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
    window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
```js
	let input = document.getElementById('input');
	let demo  = fd(1000,fn);
	input.addEventListener('keyup', function(e) {
		demo(e.target.value)
	})

	function fd(time,fn) {
		let timer;
		return function(text){
			clearTimeout(timer)
			timer = setTimeout(function(){
				fn(text)
			},time)
		}
	}
	function fn(e){
		console.log(e)
	}
```
## 9.instanceof 的原理
这个玩意主要是吧右边变量的原型存在于坐标变量的原型上就完了
```js
function instanceOf(left, right) { 
	let leftValue = left.__proto__ 
	let rightValue = right.prototype 
	while (true) { 
		if (leftValue === null) { return false }
		if (leftValue === rightValue) { return true }
		leftValue = leftValue.__proto__ 
		} 
	}
```
## 10.Object.create 的基本实现原理
Object.create就是一个创建新对象的方法,使用现有的对象来提供新创建的对象的__proto__
所以新建一个方法把原来的塞进prototype就完事了
```js
function create(obj) {
	function F() {} 
	F.prototype = obj 
	return new F() 
}
```
## 11.实现一个双向数据绑定
```js
	let obj = {}
	let input = document.getElementById('input') let span = document.getElementById(
		'span') // 数据劫持 
	Object.defineProperty(obj, 'text', {
		configurable: true,
		enumerable: true,
		get() {
			console.log('获取数据了')
		},
		set(newVal) {
			console.log('数据更新了') input.value = newVal span.innerHTML = newVal
		}
	}) // 输入监听 
	input.addEventListener('keyup', function(e) {
		obj.text = e.target.value
	})

```
## 12.实现一个简单路由
```js
	class Route {
		constructor() { // 路由存储对象 
			this.routes = {} // 当前hash
			this.currentHash = '' // 绑定this，避免监听时this指向改变
			this.freshRoute = this.freshRoute.bind(this) // 监听
			window.addEventListener('load', this.freshRoute, false) 
			window.addEventListener('hashchange', this
				.freshRoute, false)
		} // 存储 
		storeRoute(path, cb) {
			this.routes[path] = cb || function() {}
		} // 更新 
		freshRoute() {
			this.currentHash = location.hash.slice(1) || '/'
			this.routes[this.currentHash]()
		}
```
## 13.实现懒加载
```html
<ul>
	<li><img src="./imgs/default.png" data="./imgs/7.png" alt=""></li>
	<li><img src="./imgs/default.png" data="./imgs/8.png" alt=""></li>
	<li><img src="./imgs/default.png" data="./imgs/9.png" alt=""></li>
	<li><img src="./imgs/default.png" data="./imgs/10.png" alt=""></li>
</ul>
```
```js
	let imgs = document.querySelectorAll('img') // 可视区高度 
	let clientHeight = window.innerHeight ||document.documentElement.clientHeight || document.body.clientHeight
	function lazyLoad() { // 滚动卷去的高度 
	   let scrollTop =window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		for (let i = 0; i < imgs.length; i++) { // 图片在可视区冒出的高度 
			let x=clientHeight + scrollTop - imgs[i].offsetTop // 图片在可视区内 
			if (x> 0 && x < clientHeight + imgs[i].height) {
			imgs[i].src = imgs[i].getAttribute('data')
			}
	 }
	}
```
## 14.rem 基本设置
```js
// 要先调用,它自己是不会动的
setRem() 
// 原始配置 
function setRem () { 
	let doc = document.documentElement 
	let width = doc.getBoundingClientRect().width 
	let rem = width / 75 
	doc.style.fontSize = rem + 'px' 
	}
// 监听窗口变化 
addEventListener("resize", setRem)
```
## 15.手写实现 AJAX
### 最简单的方法往往不够用
```js
let xhr = new XMLHttpRequest() // 初始化 
	xhr.open(method, url, async) // 发送请求 
	xhr.send(data) // 设置状态变化回调处理请求结果 
	xhr.onreadystatechange = () => { 
		if (xhr.readyStatus === 4 && xhr.status === 200) { 
			console.log(xhr.responseText)
	  } 
}
```
### 用promise方法看起来吊吊哒
```js
function ajax (options) {
	// 请求地址 
	const url = options.url
	 // 请求方法 
	 const method = options.method.toLocaleLowerCase() || 'get' 
	 // 默认为异步
	 true const async = options.async 
	 // 请求参数 
	 const data = options.data 
	 // 实例化 
	 const xhr = new XMLHttpRequest() 
	 // 请求超时 
	 if (options.timeout && options.timeout > 0) { 
		 xhr.timeout = options.timeout 
	 }
	// 返回一个Promise实例 
	 return new Promise ((resolve, reject) => {
	 xhr.ontimeout = () => reject && reject('请求超时') 
	 // 监听状态变化回调 
	 xhr.onreadystatechange = () => { 
		 if (xhr.readyState == 4) {
			 // 200-300 之间表示请求成功，304资源未变，取缓存 
			 if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) { 
				 resolve && resolve(xhr.responseText) 
				 }else { 
					 reject && reject() 
					 } 
				   } 
				}// 错误回调 
				 xhr.onerror = err => reject && reject(err) 
				 let paramArr = [] 
				 let encodeData 
				 // 处理请求参数 
				 if (data instanceof Object) { 
				   for (let key in data) { 
					// 参数拼接需要通过encodeURIComponent 进行编码 
				    paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key])) 
					 }
				 encodeData = paramArr.join('&') 
				 }
				 // get请求拼接参数 
				 if (method === 'get') { 
				 // 检测url中是否已存在 ? 及其位置 
					const index = url.indexOf('?') 
						if (index === -1) url += '?' 
						else if (index !== url.length -1) 
						 url += '&' 
						 // 拼接url 
						 url += encodeData 
					}
		// 初始化 
		xhr.open(method, url, async)
```