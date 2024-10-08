---
sidebar: auto
---
# nvm安装node

### 下载安装

地址：https://github.com/coreybutler/nvm-windows/releases

### 查看版本

```
nvm -v
```

### 查看可安装node列表

```
nvm ls available
```

### 安装nodejs

```
nvm install 18.16
```

### 使用nodejs

```
nvm use 18.16
```

### 查看安装的node

nvm ls

### 设置淘宝镜像源

可能的报错：

npm ERR!request to https://registry.npm.taobao.org/vue failed,reason:certificate has expired

解决办法
将npm的下载源恢复为默认的官方源，可以使用以下命令：

```shell
npm config set registry https://registry.npmjs.org
```

最新的配置淘宝镜像的淘宝官方提供的方法

```shell
npm config set registry https://registry.npmmirror.com
```

查看是否修改成功

```shell
npm config get registry
```

