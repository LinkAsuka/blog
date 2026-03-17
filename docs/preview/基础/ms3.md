---
title: 面试 - js
createTime: 2023-06-21
tags:
  - 基础
permalink: /article/il1gp24i/
---
# 面试 - js
js

<!-- more -->

## 1.判断js类型的方式
- typeof() （最常用）
但是typeof()有时候就贼坑，让人窒息
number、boolean、string、object、undefined、function、symbol
```js
typeof 1 // "number"
typeof '1' // "string"
typeof true // "boolean"
typeof Symbol(1) // "symbol"
typeof {} // "object"
typeof [] // "object"，小坑
typeof function(){} // "function"
typeof Symbol(1) // "symbol"
typeof undefined // "undefined"
typeof null // "object"，出了名的坑
```
- a instanceof A（不推荐老坑了）
String、Number、Boolean、Undefined、Null、Symbol
原理是 构造函数的 prototype 属性是否出现在对象的原型链中的任何位置
太简单的东西非要整的很复杂，复杂的东西反而很简单，所以instanceof也是坑货
```js
//它分不清数组和对象
arr instanceof Array // true
arr instanceof Object // true
//它只认识对象形式的数组
let num = 1
num instanceof Number // false
num = new Number(1)
num instanceof Number // true
//但是它判断个方法还是可以的Function
function A() {}
let a = new A()
a instanceof Function // false
a instanceof Object // true
A instanceof Function // true

它最扬眉吐气的就是可以判断person是person
console.log(person instanceof Person); // true

```
-  Object.prototype.toString.call() (复杂情况下推荐)
常用于判断浏览器内置对象,对于所有基本的数据类型都能进行判断，即使是 null 和 undefined
对于 Object.prototype.toString() 方法，会返回一个形如 "[object XXX]" 的字符串。
```js
console.log(Object.prototype.toString.call(obj) === "[object Object]");
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(“abc”);// "[object String]"
Object.prototype.toString.call(123);// "[object Number]"
Object.prototype.toString.call(true);// "[object Boolean]"
```
-  isArray() （判断是否为数组)

## 2.ES5 和 ES6 分别几种方式声明变量
- ES5 有俩种： var 和 function
- ES6 有六种：增加四种， let 、 const 、 class 和 import
注意： let 、 const 、 class 声明的全局变量再也不会和全局对象的属性挂钩
let渣渣  
var虽然是大佬但是不优化
1. let声明的变量只在变量声明时所在的代码块内有效。
```js
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
2. 没有变量提升
```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
## 3.闭包
闭包的概念：闭包就是能读取其他函数内部变量的函数。
一句话：存在自由变量的函数就是闭包。
意思就是就是个备胎受气包，用到的时候大家都可以叫它去修空调，但是他不在任何一个团体里。它和艾主席一样，是自由的。
优点：
1. 避免全局变量的污染
2. 希望一个变量长期存储在内存中（缓存变量）
缺点：
1. 内存泄露（消耗）
2. 常驻内存，增加内存使用量
```js
let a = 1
let b = function(){
    console.log(a)
}

function father () {
    function son () {
    }
}
```
## 4.说出几种浅拷贝的方法
浅拷贝的基本数据类型是不会变化的，例如字符串(存储在栈内存中)
但是引用数据类型会变化，类似数组对象(存储在堆内存中) 因为引用的是地址所以会改变
所以我们只说引用数据类型的拷贝
```js
1.concat Array.prototype.concat()
2.sclie Array.prototype.slice()
3.循环等于
4.Object.assign
5.函数库 lodash clone
```

## 5.说出几种深拷贝的方法
```js
1.JSON.parse(JSON.stringify()) 
这种方法的弊端是
如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失
时间对象会变成字符串形式
如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象

2.递归
function deepCopy(origin,target){
        //目标值先置为空
        var target=null;
        //判断原始对象的数据类型
        if(typeof origin==='object'&&origin!==null){
            //判断拷贝的是数组还是对象
            target=origin instanceof Array?[]:{};
            for(var key in origin){
                //递归拷贝
                target[key]=deepCopy(origin[key],target[key])
            }
        }else{
            //基本类型直接赋值
            target=origin;
        }
        return target;
    }

3.函数库 lodash cloneDeep

var _ = require('lodash');
var obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
```
## 6.数组去重的方法
- 1.ES6 的 Set
```js
let arr = [1,1,2,3,4,5,5,6] let arr2 = [...new Set(arr)]
```
- 2.reduce()
```js
let arr = [1,1,2,3,4,5,5,6] let arr2 = 
arr.reduce(function(ar,cur) { 
	if(!ar.includes(cur)){
	ar.push(cur) 
	}
	return ar 
	},[])
```
- 3.filter()
```js
let arr = [1,1,2,3,4,5,5,6] 
let arr2 = arr.filter(function(item,index) {
	// indexOf() 方法可返回某个指定的 字符串值 在字符串中首次出现的位置 
	return arr.indexOf(item) === index 
	})
```
## 7.DOM 事件有哪些阶段？谈谈对事件代理的理解
分为三大阶段：捕获阶段--目标阶段--冒泡阶段
- 捕获阶段：从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件；
- 目标阶段：在目标节点上触发，称为“目标阶段”
- 冒泡阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；
意思是小张想要关灯于是她叫叶安琪去关灯(捕获阶段)叶安琪说叫爸爸，叶安琪收到了爸爸的称呼把灯关了(目标阶段)，然后叶安琪去小张床上告诉她灯关了并把小张打了一顿（冒泡阶段）

事件代理简单说就是：事件不直接绑定到某元素上，而是绑定到该元素的父元素上，进行触发事件操作时(例如'click')再通过条件判断，执行事件触发后的语句(例如'alert(e.target.innerHTML)')
意思就是老王有三个儿子，三个儿子都要买小汽车，老王一次买了三个小汽车分给了三个儿子。不用事件代理老王要跑三次，买三个小汽车，分别分给三个儿子。这个故事告诉我们不要超生，要不然要买三个小汽车
好处：(1)使代码更简洁；(2)节省内存开销
## 8.介绍下 promise.all
渣渣promise是个啥都不知道，还要假装自己会回答promise.all?
Promise 对象代表了未来将要发生的事件，用来传递异步操作的消息。
意思是一对男女朋友，女人告诉男朋友我想在情人节怀上一个孩子作为我们的情人节礼物，不管怀上还是没有怀上情人节过后我们都领证结婚
女孩提出这个承诺就是创建一个new Promise,如果成功怀孕(resolve)或没有成功怀孕(reject)都会去领证。
如果成功的话女孩称呼男孩为孩子他爹，如果失败的话女孩称呼男孩为老公(resolve,reject都可以传入参在后面进行使用)
如果成功的话女人就用then来告诉男人，如果失败了女人就用catch来告诉男人。不管成功还是不成功都会去领证(finally)
用代码实现
```js
const isPregnant = true;
var promise = new Promise(function(resolve, reject) {
  if (isPregnant) {
	resolve('孩子他爹');
  } else {
	reject('老公');
  }
}
promise.then(function(name) {
	console.log('男人成为'+name);
}).catch(function(name) {
	console.log('男人成为'+name);
}).finally(function(){
  console.log('结婚拉');
});
```
一般可以作用于一些个奇奇怪怪的地方，一个🍐 判断图片它是否裂开来，如果它裂开来的话就用缺省图片替换
```js
var url_ = 'https://imagses.expowh.com/expowh-b2b/prod/20210419/ec32ef80def74b38bf292c8e9b1854c2.png'
const imgPromise = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = url;
		img.onload = () => {
			resolve(url)
		}
		img.onerror = () => {
			reject(new Error('图片有误'))
		}
	})
}
imgPromise(url_).then(name => {
	console.log(name)
}).catch(
	err => {
		url_ = 'https://www.hbwhexpo.com/attachment/20191031/133865465fa3451d8a3ed208490ddf22.png'
		console.log(url_)
	}
)

```
- 那来看看Promise.all方法
Promise.all()方法将多个Promise实例包装成一个Promise对象（p），接受一个数组（p1,p2,p3）作
为参数，数组中不一定需要都是Promise对象，但是一定具有Iterator接口，如果不是的话，就会调用
Promise.resolve将其转化为Promise对象之后再进行处理。
使用Promise.all()生成的Promise对象（p）的状态是由数组中的Promise对象（p1,p2,p3）决定的。
## 9.async 和 await
原理：async 和 await 用了同步的方式去做异步，async 定义的函数的返回值都是 promise，await后面的函数会先执行一遍，然后就会跳出整个 async 函数来执行后面js栈的代码
## 10.js 的垃圾回收机制讲一下
意思就是站着茅坑(内存)不拉屎直到茅坑关了
1. 全局变量 不用 var 声明的变量，相当于挂载到 window 对象上。如：b=1; 解决：使用严格模式
2. 被遗忘的定时器和回调函数
3. 闭包
4. 没有清理的 DOM 元素引用
## 11.对前端性能优化有什么了解？一般都通过那几个方面去优化的？
前端的优化一般都是页面自己的渲染，从页面到服务器，从服务器回来
1. 减少请求数量
2. 减小资源大小
3. 优化网络连接
4. 优化资源加载
5. 减少重绘回流
6. 性能更好的API
7. webpack优化
## 12.class let var const介绍一下
说起他们四个主要说的是作用域
var是顶层对象的属性，window和var是哥们，和其他人都不熟。当var定义了一个值a，你甚至可以window.a看到这个值是啥子
var是可以变量提升的，其他人也都不行
那么这个打出来是几呢，不会吧不会回答1是0-9吧var这里的作用域可是顶层作用域，那么他会是10个10哦
```js
for (var i = 0; i < 5; i++) {
    setTimeout(function(){
        console.log(i);
    },100)
};
```
setTimeout是异步执行的，100毫秒后向任务队列里添加一个任务，只有主线上的全部执行完才会执行任务队列里的任务，所以当主线程for循环执行完之后 i 的值为5，这个时候再去任务队列中执行任务，i全部为5；
因为let  i  的是区块变量，每个i只能存活到大括号结束，并不会把后面的for循环的  i  值赋给前面的setTimeout中的i；而var i  则是局部变量，这个 i 的生命周期不受for循环的大括号限制

而const没有var那么厉害，但是它有漆黑的意志，一旦设置了就不给你变了，你要是改它它就报错给你看。但其实它就是欺软怕硬，单个就报错给你看，组队的对象就给你改算了《漆黑意志》
```js
const a = 1;
console.log(a);//1
a = 2;//报错给你看

const obj = {a:1,b:2};
console.log(obj.a);//1
obj.a = 3;
console.log(obj.a);//3
obj.c = 1;
console.log(obj.c);//1 乖乖给我变
```
class又不常用，不想说了，下回再补吧 😏
 
## 13.transform、translate、transition 分别是什么属性？CSS 中常用的实现动画方式
康康这几个单词的翻译就能知道是干啥的transform(转换)、translate(翻译)、transition(过渡)
- transform 是指变换、变形，是 css3 的一个属性，和 width，height 属性一样；
- translate 是 transform 的属性值，是指元素进行 2D(3D)维度上位移或范围变换;
- transition 是指过渡效果，往往理解成简单的动画，需要有触发条件。

这里可以补充下 transition 和 animation 的比较，前者一般定义开始结束两个状态，需要有触发条件；
而后者引入了关键帧、速度曲线、播放次数等概念，更符合动画的定义，且无需触发条件
