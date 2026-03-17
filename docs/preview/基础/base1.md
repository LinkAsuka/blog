---
title: 常用的数据处理方法
createTime: 2023-03-12
tags:
  - 基础
permalink: /article/0j4n79c1/
---
# 常用的数据处理方法
<!-- more -->

字符串

增

- concat

删

- slice
- substr 
- substring

改

- trim
- repeat
- padStart
- toUpperCase
- toLowerCase

查

- charAt
- indexOf
- startsWith
- includes 

转换

- split
- match 
- search
- replace 

数组

增

- push
- unshift
- splice 
- concat

删

- shift
- pop
- splice
- slice

改

- splice

查

- find
- indexOf
- includes

排序

- reverse
- sort

转换

- join

迭代(不改变数组)

- some
- every
- forEach
- filter
- map

## 字符串

### 增

- `concat` 连接字符串

```js
const str1 = 'Hello'
const str2 = 'World'
const result = str1.concat(' ', str2)
console.log(result) // 输出: 'Hello World'
```

### 删

- `slice` 从字符串中提取特定部分

```js
const str = 'Hello World';
const sliced = str.slice(0, 5);
console.log(sliced); // 输出: 'Hello'
```

- `substr` 起始位置和截取长度

```js
const str = 'Hello World';
const sub = str.substr(6, 5);
console.log(sub); // 输出: 'World'
```
- `substring` 起始位置和结束位置

```js
const str = 'Hello World';
const subStr = str.substring(0, 5);
console.log(subStr); // 输出: 'Hello'
```
### 改

- `trim` 去除字符串首尾空白

```js
const str = '   Hello World   ';
const trimmed = str.trim();
console.log(trimmed); // 输出: 'Hello World'
```

- `repeat` 重复字符串指定次数

```js
const str = 'Hello';
const repeated = str.repeat(3);
console.log(repeated); // 输出: 'HelloHelloHello'
```

- `padStart` 在字符串前面补充指定长度的字符

```js
const str = '5';
const padded = str.padStart(2, '0');
console.log(padded); // 输出: '05'
```

- `toUpperCase` 转换为大写

```js
const str = 'Hello World';
const upper = str.toUpperCase();
console.log(upper); // 输出: 'HELLO WORLD'
```

- `toLowerCase` 转换为小写

```js
const str = 'Hello World';
const lower = str.toLowerCase();
console.log(lower); // 输出: 'hello world'
```

### 查

- `charAt` 返回指定位置的字符

```js
const str = 'Hello';
const char = str.charAt(0);
console.log(char); // 输出: 'H'
```

- `indexOf` 返回字符串中首次出现某个指定值的索引

```js
const str = 'Hello World';
const index = str.indexOf('World');
console.log(index); // 输出: 6
```

- `startsWith` 判断字符串是否以指定字符串开头

```js
const str = 'Hello World';
const starts = str.startsWith('Hello');
console.log(starts); // 输出: true
```

- `includes` 判断字符串是否包含指定的字符串

```js
const str = 'Hello World';
const includesWorld = str.includes('World');
console.log(includesWorld); // 输出: true
```

### 转换

`split` 将字符串分割成数组

```js
const str = 'Hello World';
const arr = str.split(' ');
console.log(arr); // 输出: ['Hello', 'World']
```

### 正则表达式

- `match` 查找匹配的字符串

```js
const str = 'Hello World';
const matches = str.match(/o/g);
console.log(matches); // 输出: ['o', 'o']
```

- `search` 返回第一个匹配正则表达式的位置

```js
const str = 'Hello World';
const pos = str.search(/World/);
console.log(pos); // 输出: 6
```

- `replace` 替换匹配的字符串

```js
const str = 'Hello World';
const newStr = str.replace('World', 'JavaScript');
console.log(newStr); // 输出: 'Hello JavaScript'
```

## 数组

### 增

- `push` 向数组末尾添加一个或多个元素

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // 输出: [1, 2, 3, 4]
```

- `unshift` 向数组开头添加一个或多个元素

```js
const arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // 输出: [0, 1, 2, 3]
```

- `splice` 起始位置和要删除的元素数量和要插入的元素

```js
const arr = [1, 2, 3];
arr.splice(1, 0, 1.5); // 在索引1处插入1.5
console.log(arr); // 输出: [1, 1.5, 2, 3]
```

- `concat` 连接两个或多个数组

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = arr1.concat(arr2);
console.log(combined); // 输出: [1, 2, 3, 4, 5, 6]
```

### 删

- `shift` 删除数组开头的元素

```js
const arr = [1, 2, 3];
const first = arr.shift();
console.log(first); // 输出: 1
console.log(arr); // 输出: [2, 3]
```

- `pop` 删除数组末尾的元素

```js
const arr = [1, 2, 3];
const last = arr.pop();
console.log(last); // 输出: 3
console.log(arr); // 输出: [1, 2]
```

- `splice` 删除指定位置的元素

```js
const arr = [1, 2, 3];
const removed = arr.splice(1, 1); // 删除索引1的元素
console.log(removed); // 输出: [2]
console.log(arr); // 输出: [1, 3]
```

- `slice` 返回一个新数组，包含原数组中的一部分

```js
const arr = [1, 2, 3, 4, 5];
const slicedArr = arr.slice(1, 3);
console.log(slicedArr); // 输出: [2, 3]
```

### 改

- `splice` 修改指定位置的元素

```js
const arr = [1, 2, 3];
arr.splice(1, 1, 1.5); // 在索引1处替换为1.5
console.log(arr); // 输出: [1, 1.5, 3]
```

### 查

- `find` 查找数组中符合条件的第一个元素

```js
const arr = [1, 2, 3, 4];
const found = arr.find(num => num > 2);
console.log(found); // 输出: 3
```

- `indexOf` 查找元素的索引

```js
const arr = [1, 2, 3];
const index = arr.indexOf(2);
console.log(index); // 输出: 1
```

- `includes` 判断数组是否包含某个值

```js
const arr = [1, 2, 3];
const includesTwo = arr.includes(2);
console.log(includesTwo); // 输出: true
```

### 排序

- `reverse` 反转数组

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // 输出: [3, 2, 1]
```

- `sort` 排序数组

```js
const arr = [3, 1, 2];
arr.sort();
console.log(arr); // 输出: [1, 2, 3]
```

### 转换

- `join` 将数组元素连接成字符串

```js
const arr = [1, 2, 3];
const joined = arr.join('-');
console.log(joined); // 输出: '1-2-3'
```

### 迭代(不改变数组)

- `some` 检查数组中是否至少有一个元素满足条件

```js
const arr = [1, 2, 3];
const hasEven = arr.some(num => num % 2 === 0);
console.log(hasEven); // 输出: true
```

- `every` 检查数组中是否所有元素满足条件

```js
const arr = [1, 2, 3];
const allEven = arr.every(num => num % 2 === 0);
console.log(allEven); // 输出: false
```

- `forEach` 对数组的每个元素执行指定函数

```js
const arr = [1, 2, 3];
arr.forEach(num => console.log(num * 2)); // 输出: 2, 4, 6
```

- `filter` 创建一个新数组，包含所有符合条件的元素

```js
const arr = [1, 2, 3, 4];
const evens = arr.filter(num => num % 2 === 0);
console.log(evens); // 输出: [2, 4]
```

- `map` 返回一个新数组，包含对每个元素调用函数后的结果

```js
const arr = [1, 2, 3];
const squares = arr.map(num => num * num);
console.log(squares); // 输出: [1, 4, 9]
```
