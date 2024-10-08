---
sidebar: auto
---

## js基础

## 一、dom操作

### 1.获取节点

document.**getElementById**(idName)      //通过id名来获取元素，返回一个元素对象

document.**getElementsByName**(name)    //通过name属性获取元素，返回元素对象数组

document.**getElementsByClassName**(className)  //通过class名来获取元素，返回元素对象数组（ie8以上）

document.**getElementsByTagName**(tagName)    //通过标签名获取元素，返回元素对象数组

### 2.创建节点

document.**createElement**("h3")    //创建一个html元素，这里以创建h3元素为例

document.**createTextNode**(String); //创建一个文本节点；

document.**createAttribute**("class"); //创建一个属性节点，这里以创建class属性为例

### 3.增加节点

element.**appendChild**(Node);  //往element内部最后面添加一个节点，参数是节点类型

elelment.**insertBefore**(newNode,existingNode); //在element内部的中在existingNode前面插入newNode

### 4.删除节点

element.**removeChild**(Node)   //删除当前节点下指定的子节点，删除成功返回该被删除的节点，否则返回null

### 5.获取元素相关的节点

element.**parentNode**//返回当前元素的父节点对象

element.**chlidren**//返回当前元素所有子元素节点对象，只返回HTML节点

element.**chilidNodes** //返回当前元素多有子节点，包括文本，HTML，属性节点。（回车也会当做一个节点）

element.**firstChild** //返回当前**节点**的第一个子节点对象    （**节点**）

element.**firstElementChild** //返回当前**元素**的第一个子节点对象   （**元素**）

element.**lastChild**//返回当前**节点**的最后一个子节点对象    （**节点**）

element.**lastElementChild** //返回当前**元素**的第一个子节点对象   （**元素**）

element.**nextSibling**//返回当前**节点**的下一个同级**节点** 没有就返回null  （**节点**）

element.**nextElementSibling**//返回当前**元素**的下一个同级**元素** 没有就返回null  （**元素**）

element.**previousSibling** //返回当前**节点**上一个同级**节点** 没有就返回null  （**节点**）

element.**previousElementSibling** //返回当前**元素**上一个同级**元素** 没有就返回null  （**元素**）

### 6.获取元素文本

element.**innerHTML**//返回元素的所有文本，包括html代码

element.**innerText** //返回当前元素的自身及子代所有文本值，只是文本内容，不包括html代码

### 7.样式操作

document.getElementById(  " id "  ).style.color="red";

















### 字符串方法

String charAt 返回在指定位置的字符。 charCodeAt 返回在指定的位置的字符的 Unicode 编码。 IndexOf 返回某个指定的字符串值在字符串中首次出现的位置。 slice 提取字符串的片断，并在新的字符串中返回被提取的部分。 split 把字符串分割为字符串数组。 toLowerCase 把字符串转换为小写。 toUpperCase 把字符串转换为大写。 trim 去除字符串两边的空白

模板字符串

```
let name = '张三'
let str1 = `名字${name}`
```

### 数组方法

- join()

  数组转字符串，参数为分隔符。返回字符串，原数组不变。

- push()和pop()

  向数组的末尾添加元素，返回数组长度，原数组改变。

  删除数组的末尾元素，返回删除的元素，原数组改变

- shift() 和 unshift()

  删除数组的第一个元素，返回删除元素，原数组改变。

  向数组的开头增加元素，返回数组长度，原数组改变。

- sort()

  对数组的元素进行排序，默认按照字符编码排序，参数为函数。返回新数组，原数组改变。

  ```
      let arr1 = arr.sort(function (a, b) {
          return a - b
      }) // 升序排序
  ```

- reverse() 反转数组的元素顺序。返回新数组，原数组改变。

- concat() 合并数组，返回新数组，原数组不变。

- slice() 数组截取

  arrayObject.slice(start,end)，返回所选范围的元素的数组，原数组不变。

  ```
      // let arr1 = arr.slice(1,3) //从索引为1开始到索引为3之前结束
      // let arr1 = arr.slice(2) //从索引为2开始全部
      // let arr1 = arr.slice(-1)  // 从末尾元素开始选
  ```

- splice() 删除或新增

  arrayObject.splice(index,howmany,item1,.....,itemX)

  从数组中添加或删除元素，返回被删除的元素数组，原数组改变

  ```
  let arr1 = arr.splice(1, 2, 'new') //从索引为1开始删除两个元素，并在该位置添加元素
  ```

- indexOf()和 lastIndexOf()

  返回参数在数组中的位置，原数组不变。

  返回参数在数组中最后出现的位置，原数组不变。

- includes() 判断一个数组是否包含一个指定的值。返回布尔值，原数组不变。

- find()和findIndex()

  返回数组中符合条件的第一个元素，参数为函数，原数组不变。

  ```
      let arr1 = arr.find(function (e) {
          return e > 2
      })  
  ```

  返回数组中符合条件的第一个元素的索引。

- flat() 多维数组转一维数组，返回新数组，原数组不变。

- forEach() 和map()

  遍历数组，forEach没有返回，map返回新数组。

  ```
      // arr.forEach(e, i, arr => {
      //     console.log(e, i, arr)
      // });
      let arr1 = arr.map(e, i, arr => {
          return e = e + 1
      })
  ```

- filter() 返回数组中符合条件的全部元素，参数为函数，原数组不变。

  ```
      let arr1 = arr.filter((e) => {
          return e > 3
      })
  ```

- every() 和 some()

  every()是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true。

  some()是对数组中每一项运行给定函数，如果该函数对任一项返回true,则返回true。

### Date时间对象

getFullYear 从 Date 对象以四位数字返回年份。 getMonth 从 Date 对象返回月份 (0 ~ 11)。 getDate 从 Date 对象返回一个月中的某一天 (1 ~ 31)。 getHours 返回 Date 对象的小时 (0 ~ 23)。 getMinutes 返回 Date 对象的分钟 (0 ~ 59)。 getSeconds 返回 Date 对象的秒数 (0 ~ 59)。 getDay 从 Date 对象返回一周中的某一天 (0 ~ 6)。 getTime 返回 1970 年 1 月 1 日至今的毫秒数。

```
    let time = new Date()
    let year = time.getFullYear()
    let mon = time.getMonth() + 1
    let day = time.getDate()
    let hou = time.getHours()
    let min = time.getMinutes()
    let timeStr = time.getTime()
    console.log(time)
    console.log(year, mon, day, hou, min)
    console.log(timeStr)
```

### 数据类型

1.基本数据类型（栈）：Number，String，Boolean，Undefined，Null，Symbol(es6)

2.引用数据类型（堆）：Object,Array,Function , Date

```
    // 判断数据类型  Object.prototype.toString.call()
    console.log(Object.prototype.toString.call('1')) //[object String]
    console.log(Object.prototype.toString.call(true)) //[object Boolean]
    console.log(Object.prototype.toString.call([])) //[object Array]
    console.log(Object.prototype.toString.call({})) //[object Object]
```

### new操作符在创建实例的经历的阶段

new创建了一个对象，共经历了4个阶段：

\1. 创建一个空对象

\2. 设置原型链

\3. 让实例化对象中的this指向对象，并执行函数体

\4. 返回创建的对象

### 闭包

函数内部嵌套的函数

有权访问另一个函数作用域中的变量的函数。常见方式，就是在一个函数内部创建另一个函数。

功能：在函数外，访问函数内的变量；保持引用，不被回收。创建私有环境

缺点：内存泄漏

```
        function fn() {
            let a = 11
            return function () {
                console.log(a)
            }
        }
        console.log(fn())
        let fn1 = fn()
        fn1()
```

### 原型

1.每一个函数都有一个'prototype'属性,即显示原型。prototype(对象属性)的所有属性和方法，都会被构造函数的实例继承。

2.每一个实例对象都有一个'__ proto __ '属性，即隐式原型。

原型链

获取对象属性时，如果对象本身没有这个属性，就会去找这个对象'__ proto __ '属性指向上一个对象，一直找到最顶层(`Object.prototype`)为止。Object.prototype对象也有**proto**属性值为null

```
    // 原型
    // 获取原型的方法
    // 1.对象的 '__proto__'
    // 2.构造函数的prototype

    // let cat = {
    //     name: '喵喵'
    // }
    // cat.__proto__.eat = function () {
    //     console.log('吃鱼')
    // }
    // cat.eat()

    // function Cat(name, age) {
    //     this.name = name
    //     this.age = age
    // }

    // let cat = new Cat('喵喵', 2)
    // Cat.prototype.eat = function () {
    //     console.log('吃鱼')
    // }
    // console.log(cat)
    // cat.eat()
```

### 深拷贝

```
    // 深拷贝浅拷贝

    // Object.assign() 对象只有一层时是深拷贝
    // let obj = {
    //     name: '张三',
    //     age: 18
    // }

    // let obj1 = Object.assign({}, obj)
    // obj.age = 20
    // console.log(obj)
    // console.log(obj1)

    // JSON.stringify 和 JSON.parse 实现深拷贝，但不能拷贝对象中的方法
    // let obj = {
    //     name: '张三',
    //     age: 18,
    //     like: {
    //         a: 11,
    //         b: 22
    //     }
    // }
    // let str = JSON.stringify(obj)
    // let obj1 = JSON.parse(str)
    // obj.like.a = 10
    // console.log(obj)
    // console.log(obj1)

    // 递归实现深拷贝
    let obj = {
        name: '张三',
        age: 18,
        like: {
            a: 11,
            b: 22
        },
        arr: [1, 2, 3, 4]
    }

    function copy(obj) {
        let newObj = obj.constructor === Array ? [] : {};
        for (let i in obj) {
            if (obj[i] instanceof(Object || Array)) {
                newObj[i] = copy(obj[i])
            } else {
                newObj[i] = obj[i]
            }
        }
        return newObj
    }

    let obj1 = copy(obj)
    obj.age = 20
    obj.like.a = 15
    obj.arr.push(5)
    console.log(obj)
    console.log(obj1)
```

### ES6

1.let 和const

var定义变量，会有变量声名提升，let不会。

var定义全局的变量，let和const定义块级的变量。

const定义常量。for循环用let。

2.模板字符串

```
// 模板字符串
    let box = document.getElementById('box')
    let name = '张三'
    let age = '18'
    let str = "<ul><li>" + name + "</li></ul>"
    let str1 = `<ul><li>${name}</li></ul>`
    box.innerHTML = str1
```

3..函数默认值

```
    // 函数默认值
    function add(a = 10, b = 20) {
        return a + b
    }
    console.log(add()) //30
```

函数剩余参数

```
    // 剩余参数 将多个参数合并为一个数组

    function fn(...arg) {
        console.log(arg)
    }
    fn(1, 2, 3, 4, 5, 6)
```

4.拓展运算符

```
    // 拓展运算符 将数组分离为多项参数

    console.log(Math.max(1, 2, 3))
    let arr = [1, 2, 3, 4, 6, 8, 4, 9, 7]
    console.log(Math.max(...arr))
```

5.箭头函数

```
    // 箭头函数
    let fn = (a, b) => a + b
    console.log(fn(1, 2))
```

箭头函数没有this指向

箭头函数不能使用new来实例化对象

this指向：

1.普通函数，this指向window

2.谁调用指向谁

3.call、apply、bind这三个方法将this指向绑定在传入的对象上

4.new实例化后指向实例对象

5.箭头函数 ，根据外层作用域来决定this

call，apply，bind的区别？

call和apply改变this指向，bind则是绑定this指向后返回新函数。

call和apply立即执行，bind需要调用才执行。

call如果传的多个参数，依次填，apply则是第二个参数是数组。

```
    let boy = {
        name: '小小',
        fn() {
            console.log(this.name)
        },
        like(a, b) {
            console.log('喜欢' + a + '和' + b)
        }
    }

    let man = {
        name: '王大',
    }
    boy.fn()
    boy.fn.call(man)
    boy.like.call(man, '吃饭', '唱歌')
    boy.like.apply(man, ['睡觉', '玩'])
    let fn1 = boy.like.bind(man, '吃饭1', '唱歌1')
```

6.解构赋值

```
    // 解构赋值 赋值运算符的拓展
    let man = {
        name: '张三',
        age: 18
    }
    let {
        name,
        age
    } = man
    console.log(name, age)
    let arr = [1, 2, 3]
    let [a, b, c] = arr
    console.log(a, b, c)
```

7.对象的方法

```
    // 对象的方法

    // 1.'is()'  等价于 '==='  比较两个值相等否
    console.log(Object.is(NaN, NaN))


    // 2. assign() 对象的合并
    // Object.assign(obj, obj1, obj2) obj为目标对象

    let obj = {}
    let obj1 = {
        name: '张三'
    }
    let obj2 = {
        age: 18
    }
    Object.assign(obj, obj1, obj2)
    console.log(obj)
    console.log(obj1)
    console.log(obj2)
```

8.set和map

```
    // Set  Set允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
    let arr = [1, 2, 2, 3, 5, 5, 6, 6, 7, 7, 7, 8]
    let set = new Set(arr)
    set.add(10)
    set.delete(8)
    console.log(set.has(10))
    console.log(set)
    let arr1 = [...set]
    console.log(arr1)

    // Set 是无重复值的有序列表,有点像数组。
    // Map 是有序的键值对，其中的键允许是任何类型，有点像对象。

    let map = new Map()
    map.set('name', '张三')
    console.log(map)
```

### Promise

Promise 是异步编程的一种解决方案

`Promise`对象是一个构造函数，用来生成`Promise`实例

```
    // promise 
    let pro = new Promise((res, rej) => {
        let man = {
            name: '张三',
            age: '18'
        }
        res(man)
    })
    pro.then(res => {
        // console.log(res)
    })
    // console.log(pro)
    let pro1 = new Promise((res, rej) => {
        res(1)
    })
    // console.log(pro1)
    async function getdata() {
        let a = await pro1
        console.log(a)
    }
    getdata()
```

10.class类

```
    // es6 类与继承

    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age
        }
    }
    let cat = new Cat('大喵', 3)
    Cat.prototype.like = function () {
        console.log('猫喜欢睡觉')
    }
    cat.like()

    class Dog extends Cat {
        wang() {
            console.log('旺旺')
        }
    }
    let wc = new Dog('旺财',4)
    console.log(wc)
    wc.wang()

	// 原型的继承
	//有 A,B两个类，B要继承A，让B的prototype = A 的实例
    B.prototype = new A()
```

### http的状态码

1XX：信息状态码

2XX：成功状态码

3XX：重定向

4XX：客户端错误

5XX：服务器错误

常见状态码：

304 自从上次请求后，请求的网页未修改过。

401 没有权限，请求要求身份验证。

403 服务器已经理解请求，但是拒绝执行它。

404 请求失败

500 服务器遇到一个未曾预料的情况，导致无法完成对请求的处理

503 由于请示服务器维护或者过载，服务器当前无法处理请求

### get与post的区别

GET在浏览器回退时是无害的，而POST会再次提交请求

GET产生的URL地址可被Bookmark，而POST不可以

GET请求会被浏览器主动cache缓存，而POST不会，除非手动设置

GET请求只能进行url编码，而POST支持多种编码方式。

GET请求参数会被完整的保留在浏览器历史记录中，而POST中的参数不会被保留

GET请求在URL中传送的参数是有长度限制的，而POST没有

对参数的数据类型，GET只接受ASCII字符，而POST没有限制

GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息

GET参数通过URL传递，POST放在Request body中

### ajax的过程

```
    // 1.创建xhr对象
    var xhr = new XMLHttpRequest()
    // 2.设置请求方式
    xhr.open('method', URL, async);
    // 3.设置回调函数
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            console.log(111)
        } else {
            console.log(000)
        }
    }
    // 4.发送请求
    xhr.send()
    // 5.结果处理
```

