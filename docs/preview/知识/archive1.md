---
title: 使用 netlify 部署静态网站
createTime: 2024-01-23
tags:
  - 工具
  - 部署
permalink: /article/bwb67p0v/
---
# 使用 netlify 部署静态网站
[https://app.netlify.com/](https://app.netlify.com/)

<!-- more -->

## 登录你的账号
Link your site to a Git repository

## 部署

在 `Build & deploy` 中
1. 选择 `Dependency management` 设置 Node 版本
2. 在 `Build & deploy` 中选择 `Build command` 为 `npm run build` （ build 命令 ）
3. 在 `Build & deploy` 中选择 `Publish directory` 为 `docs/.vuepress/dist` （ dist 路径 ）
 
### 发布

在 `Site settings` 中
1. 在 `Site name` 中输入你的站点名称
2. 在 `Site URL` 中输入你的站点 URL
3. 在 `Deploy` 中点击 `Deploy site` 按钮
