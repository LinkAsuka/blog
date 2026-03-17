---
title: 请求头和响应头的含义
createTime: 2024-11-21
tags:
  - 基础
permalink: /article/fyfk7d2y/
---
# 请求头和响应头的含义
请求头是客户端带给服务端，响应头是服务端带给客户端

<!-- more -->

## 什么是请求头和响应头

简单说请求头和响应头就是 HTTP 协议的组成部分，请求头和响应头用于在客户端(浏览器)和服务器之间携带传递额外的属性，这些属性内容会用于控制 HTTP 请求和响应的行为。

## 常见请求头含义

- 当客户端用接口请求时，设置 Accept 会告诉服务器要返回合适的类型格式
  `Accept` 表示指定客户端能够接受哪些类型的内容

```js
accept: application/json, text/plain,
```

`Accept-Charset` 表示指定客户端能够接受哪些类型的字符集

```js
Accept-Charset: utf-8, iso-8859-1;q=0.5
```

`Cookie` 表示用于存储用户特有信息，让用品去识别用户的具体身份
```js
Cookie: session=abPC9527; user=tty
```

`Origin` 表示跨域相关信息，用于设置CORS的请求。通过Origin 头，防止陌生的域进行请求
```js
Origin: https://expo.com
```

`Referer` 表示当前的请求是从哪个url链接过来的。
```js
Referer: https://tty.com/pageone
```
`User-Agent`  表示包含发起请求的用户的一些代理信息，例如浏览器的具体版本和具体类型
```js
User-Agent: Mozilla/3.0 (Windows NT 9.0; Win32; x64) AppleWebKit/517.36 (KHTML, like Gecko) Chrome/56.0.3029.110 Safari/517.3
```
`Range` 表示指定第一个字节到指定最后字节之间的位置，用于告诉服务器想取那个范围的数据
```js
Range: bytes=0-255
```

## 常见响应头含义
`Access-Control-Allow-Origin` 表示用于配置CORS跨域相关，指定允许访问资源的域名，如果配置为*表示所有可访问
```js
Access-Control-Allow-Origin: *
```
`Cache-Control` 表示缓存机制的缓存策略
```js
Cache-Control:public  // 响应会被缓存
Cache-Control:must-revalidate  // 指定条件下会缓存重用
Cache-Control:no-cache  // 直接向服务器端请求最新资源,不缓存
Cache-Control:max-age=10 // 设置缓存的有效时间
Cache-Control:no-store  // 在任何条件下，响应都不会被缓存
```
`Content-Type` 表示响应体的具体数据格式是什么
```js
Content-Type: application/json
```
`ETag` 表示用于验证缓存，确保当前的资源未被修改过。如果没有更改过则返回304状态码，减少不必要传输
```js
ETag: "1234952790pc"
```
`Location` 表示用于重定向，指向一个新的URL
```js
Location: https://tty.com/new-page
```
`Set-Cookie` 表示服务器通过这个请求头把cookie带到客户端。客户端会在后面请求中自动将这cookie放在请求头中
```js
Set-Cookie: session=pc9527; Path=/; HttpOnly; Secure
```
`Server` 表示告诉这个服务器软件的信息，例如版本
```js
Server: Apache/1.4.38 (Ubuntu)
```
`Expires` 跟缓存相关，表示指定资源的过期时间，这个时间前都不过期
```js
Expires: Wed, 21 Oct 2024 07:21:00 GMT
```