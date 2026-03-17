---
title: 常用正则功能
createTime: 2024-06-30
tags:
  - 正则
permalink: /article/ebmpoxea/
---
# 常用的正则表达式
<!-- more -->

## 常用正则功能

- 怎么用正则表达式进行判断呢
```js
function checkPhone(){ 
    var phone = document.getElementById('phone').value;
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
}
```
- 用正则获取某个特定字符前面和后面的内容
```js
  var original= "fromt 前面的内容/back后面的内容"
  var reg = /([/][^/]+)$/;
  var fromt = original.replace(reg, ""); 
  var reg2 = /([^/]+)$/; 
  var back= original.match(reg2)[1];
```
- 手机号隐藏中间4位
`'11954644318'.replace(/(\d{3})(\d{4})/, '$1****')`
- 校验密码强度
密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$`
- 校验中文
字符串仅能是中文
`^[\\u4e00-\\u9fa5]{0,}$`
- 由数字、26个英文字母或下划线组成的字符串
`^\\w+$`
- 校验E-Mail 地址
`/\w+@[a-z0-9]+\.[a-z]{2,4}/;`
- 校验身份证号码
15位：
`^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$`
18位：
`^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$`
- 校验日期
“yyyy-mm-dd“ 格式的日期校验，已考虑平闰年。
```js
^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])
|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])
|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$
 ```
- 校验金额
金额校验，精确到2位小数。
`^[0-9]+(.[0-9]{2})?$`
- 校验手机号
下面是国内 13、15、18开头的手机号正则表达式。（可根据目前国内收集号扩展前两位开头号码）
`^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$`
- 判断IE的版本
`^.*MSIE [5-8](?:\\.[0-9]+)?(?!.*Trident\\/[5-9]\\.0).*$`
- 检查URL的前缀
应用开发中很多时候需要区分请求是HTTPS还是HTTP，通过下面的表达式可以取出一个url的前缀然后再逻辑判断
`url:(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
- 提取URL链接
下面的这个表达式可以筛选出一段文本中的URL
`^(f|ht){1}(tp|tps):\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?`
- 文件路径及扩展名校验
验证windows下文件路径和扩展名（下面的例子中为.txt文件）
`^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(l)?$`
- 提取网页图片
假若你想提取网页中所有图片信息，可以利用下面的表达式
`\\< *[img][^\\\\>]*[src] *= *[\\"\\']{0,1}([^\\"\\'\\ >]*)`

## 常用正则
- 校验数字表达式
  1. 数字：`^[0-9]*$`
  2. n位的数字：`^\d{n}$`
  3. 至少n位的数字：`^\d{n,}$`
  4. m-n位的数字：`^\d{m,n}$`
  5. 零和非零开头的数字：`^(0|[1-9][0-9]*)$`
  6. 非零开头的最多带两位小数的数字：`^([1-9][0-9]*)+(.[0-9]{1,2})?$`
  7. 带1-2位小数的正数或负数：`^(\-)?\d+(\.\d{1,2})?$`
  8. 正数、负数、和小数：`^(\-|\+)?\d+(\.\d+)?$`
  9. 有两位小数的正实数：`^[0-9]+(.[0-9]{2})?$`
  10. 有1~3位小数的正实数：`^[0-9]+(.[0-9]{1,3})?$`
  11. 非零的正整数：`^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$`
  12. 非零的负整数：`^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$`
  13. 非负整数：`^\d+$ 或 ^[1-9]\d*|0$`
  14. 非正整数：`^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$`
  15. 非负浮点数：`^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$`
  16. 非正浮点数：`^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$`
  17. 正浮点数：`^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$`
  18. 负浮点数：`^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$`
  19. 浮点数：`^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$`

- 校验字符的表达式
  1. 汉字：`^[\u4e00-\u9fa5]{0,}$`
  2. 英文和数字：`^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$`
  3. 长度为3-20的所有字符：`^.{3,20}$`
  4. 由26个英文字母组成的字符串：`^[A-Za-z]+$`
  5. 由26个大写英文字母组成的字符串：`^[A-Z]+$`
  6. 由26个小写英文字母组成的字符串：`^[a-z]+$`
  7. 由数字和26个英文字母组成的字符串：`^[A-Za-z0-9]+$`
  8. 由数字、26个英文字母或者下划线组成的字符串：`^\w+$ 或 ^\w{3,20}$`
  9. 中文、英文、数字包括下划线：`^[\u4E00-\u9FA5A-Za-z0-9_]+$` 
  10. 中文、英文、数字但不包括下划线等符号：`^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$`
  11. 可以输入含有^%&',;=?$\"等字符：`[^%&',;=?$\x22]+ 12 禁止输入含有~的字符：[^~\x22]+`


## 直接在input上进行判断
1. 文本框只能输入数字代码(小数点也不能输入)
```js
<input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" />
```
2. 只能输入数字,能输小数点.
```js
<input onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"/>
<input name="txt1" onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
```
3. 数字和小数点方法二
```js
<input type="text" 
onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value" 
onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value" 
onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
/>
```
4. 只能输入字母和汉字
```js
<input type="text" onkeyup="value=value.replace(/[\d]/g,'')" 
onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" maxlength="10" name="Numbers"/>
```
5. 只能输入英文字母和数字,不能输入中文
```js
<input type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"/>
```
6. 只能输入数字和英文
```js
<input type="text" onkeyup="value=value.replace(/[^\d|chun]/g,'')"/>
```
7. 小数点后只能有最多两位(数字,字母,中文都可输入),可以输入运算符号:
```js
<input type="text" onkeyup="this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"/>
```
8. 输入中文:
```js
<input type="text" onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"/>
```
9. 输入数字:
```js
<input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')"/>  
```
10. 输入英文:
```js
<input type="text" onkeyup="this.value=this.value.replace(/[^a-zA-Z]/g,'')"/>
```
11. 三个合在一起
```js
<input type="text" onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')"/>
```
12. 只输入数字和字母
```js
<input type="text"  onkeyup="value=value.replace(/[\W]/g,'')"/>
```
13. 除了英文的标点符号以为 其他的人都可以中文，英文字母，数字，中文标点
```js
<input type="text" onkeyup="this.value=this.value.replace(/^[^!@#$%^&amp;*()-=+]/g,'')"/>
```
