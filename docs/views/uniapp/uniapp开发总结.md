---
sidebar: auto
---

# uniapp开发总结

## 一、uniapp的app端

### 1.page样式失效

在css设置了page样式，h5中有效，app中无效

```css
page {
		background-color: #F4F4F4;
	}
```

可能是因为style上设置了scoped

解决办法：

页面最外层元素加 .page 类

```css
	.page {
		width: 750rpx;
		height: 100vh;
		background-color: #F4F4F4;
	}
```

另外写一个style里写page

```css
<style>
	page {
		background-color: red;
	}
</style>
<style lang="scss" scoped>
	// ...
</style>
```

### 2.font-weight

app中设置字重，只有一种效果

font-weight值为normal正常，

bold和bolder显示的加粗效果一样





## 二、常用方法

### 1.对象合并

需要提交的formInfo字段一定，返回的resInfo字段多个。把resInfo的数据赋值给formInfo。

```
				formInfo: {
					name: '',
					age: '',
				},
				resInfo: {
					name: '张三',
					age: '18',
					like: '啦啦啦',
					sex: '1',
				},

				Object.keys(this.formInfo).forEach((key) => {
					this.formInfo[key] = this.resInfo[key]
				})			
```

### 2.时间转换

，‘2023-12-21’ ，安卓转时间戳可以，ios则失效，需要把‘-’替换为‘/’

```
let timeStr1 = '2023-12-21'
let date1 = new Date(timeStr1.replace(/-/g, '/')).getTime() / 1000
```

### 3.比较两个时间大小

timeStr1：时间1        2024-03-01

timeStr2：时间2        2024-02-01

错误提示：msg          时间1不能大于时间2

```js
			checkTime(timeStr1, timeStr2, msg) {
				let date1 = new Date(timeStr1.replace(/-/g, '/')).getTime() / 1000
				let date2 = new Date(timeStr2.replace(/-/g, '/')).getTime() / 1000
				let date3 = (date2 - date1) * 1000; //时间差的毫秒数
				// console.log(timeStr1,timeStr2,date1,date2)
				if (date3 < 0) {
					uni.showToast({
						icon: 'none',
						title: msg
					})
					return false
				}
				return true
			},
```



### 4.判断数字整数和小数位数

e0：原数值       e1：整数部分长度        e2：小数部分长度         msg：提示标题

```js
			checkNum(e0, e1, e2, msg) {
				if (!e0) {
					this.toast(msg + '未输入')
					return false
				}
				let num = e0.toString()
				if (num <= 0) {
					this.toast(msg + '必须大于0')
					return false
				} else {
					let numList = num.split('.')
					if (numList.length == 1) {
						if (numList[0].length > e1) {
							this.toast(msg + '整数位数不能大于' + e1)
							return false
						}
					} else if (numList.length == 2) {
						if (numList[0].length > e1) {
							this.toast(msg + '整数位数不能大于' + e1)
							return false
						}
						if (numList[1].length > e2) {
							this.toast(msg + '小数位数不能大于' + e2)
							return false
						}
					}
				}
				return true
			},
```

### 5.输入框限制整数、小数位数

如限制2位小数时，当输入小数第3位，则第3位清除，还原为2位小数

e 输入框值         field 绑定的属性名       n1 整数长度        n2 小数长度

```js
			valChange(e, field, n1, n2) {
				if (e && field) {
					console.log(e, field)
					this.$nextTick(() => {
						let num = e
						let numList = num.split('.')
						if (numList.length == 1) {
							if (numList[0].length > n1) {
								let strz = numList[0].slice(0, n1)
								this.formValue[field] = strz
							}
						} else if (numList.length == 2) {
							if (numList[1].length > n2) {
								let strx = numList[1].slice(0, n2)
								let strz = numList[0]
								this.formValue[field] = Number(strz + '.' + strx)
							}
						}
					})
				}
			},
```

