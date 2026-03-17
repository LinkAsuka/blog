---
title: 遍历方法大全
createTime: 2023-03-12
tags:
  - 基础
permalink: /article/u3xxketi/
---
# 遍历方法大全
<!-- more -->

## reduce 方法

> 如果数组为空，且未提供初始值，则 reduce 方法会抛出一个 TypeError。在处理可能为空的数组时，要确保提供了合适的初始值或进行适当的错误处理。

```js
// 对每个元素执行累积操作，并返回累积结果
const result = array.reduce(function (accumulator, element, index, array) {
  return accumulatedValue
}, initialValue)
```

- `accumulator`累计器：累积操作的结果，初始值为`initialValue`或数组的第一个元素。
- `element`当前元素：数组中的每个元素。
- `index`当前元素的索引
- `array`正在遍历的数组

  ### 例子

  ```js
  const array = [1, 2, 3, 4, 5]
  const result = array.reduce(function (accumulator, element) {
    return accumulator + element
  }, 0)
  console.log(result) // 输出: 15
  ```

## some 方法

> some 方法在找到满足条件的元素后会立即停止遍历，不会继续遍历剩余的元素。
> some 方法**不会改变**原数组，会返回一个布尔值。

some 相当于逻辑关系中的或（||），只要有一个参数满足条件，就会中断逻辑，返回 true，遍历结束，没有找到合适的参数，就返回 false

```js
const result = array.some(function (element, index, array) {
  // 返回一个布尔值，表示是否满足条件
})
```

- `element`当前元素：数组中的每个元素
- `index`当前元素的索引
- `array`正在遍历的数组

  # 例子

  ```js
  const array = [1, 2, 3, 4, 5]
  const result = array.some(function (element) {
    return element > 3
  })
  console.log(result) // 输出: true
  ```

## every 方法

> every 方法在找到满足条件的元素后会立即停止遍历，不会继续遍历剩余的元素。
> every 方法**不会改变**原数组，会返回一个布尔值。

every 相当于逻辑关系中的且（&&），只有所有参数满足条件的时候，才会返回 true，如果有一个不满足，就会逻辑中断，返回 false,

```js
const result = array.every(function (element, index, array) {
  // 返回一个布尔值，表示是否满足条件
})
```

- `element`当前元素：数组中的每个元素
- `index`当前元素的索引
- `array`正在遍历的数组

  # 例子

  ```js
  const array = [1, 2, 3, 4, 5]
  const result = array.every(function (element) {
    // 返回一个布尔值，表示是否满足条件
    return element > 0 // 判断是否所有元素都大于0
  })
  console.log(result) // 输出: true
  ```

## filter 方法

> filter 方法会返回一个新的数组，该数组包含满足指定条件的元素。 请确保在回调函数中返回一个布尔值，表示是否保留该元素。
> filter 方法不会对空数组进行检测。

```js
const newArray = array.filter(function (element, index, array) {
  // 返回一个布尔值，表示是否保留该元素
}, thisArg)
// 如果省略了thisArg参数，回调函数中的this将指向全局对象（在浏览器中为window对象）
```

- `element`当前元素：数组中的每个元素
- `index`当前元素的索引
- `array`正在遍历的数组

  # 例子

  ```js
  const array = [1, 2, 3, 4, 5]
  const newArray = array.filter(function (element) {
    // 返回一个布尔值，表示是否保留该元素
    return element % 2 === 0 // 保留偶数元素
  })
  console.log(newArray) // 输出: [2, 4]
  ```

## map 方法

> map 方法不会修改原始数组，而是返回一个新的数组。
> map 方法无法遍历对象，仅适用于数组的遍历。
> map 方法不会对空数组进行检测；

```js
const newArray = array.map(function (element, index, array) {
  // 对每个元素执行操作，并返回新的值
  return modifiedElement
})
```

- `element`当前元素：数组中的每个元素
- `index`当前元素的索引
- `array`正在遍历的数组

  # 例子

  ```js
  const newArray = array.map(function (element) {
    // 对每个元素执行操作，并返回新的值
    return element * 2
  })
  ```
