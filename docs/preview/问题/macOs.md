---
title: MAC 系统 pnpm 升级报错 ERR_PNPM_NO_GLOBAL_BIN_DIR
createTime: 2024-10-12
tags:
  - 问题
  - macOs
permalink: /article/x7321n94/
---
# MAC 系统 pnpm 升级报错 ERR_PNPM_NO_GLOBAL_BIN_DIR

<!-- more -->

在 **_macOS_** 系统中使用 `pnpm i -g pnpm` 报错：`ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory`

> [root@VM–8 test]# pnpm i -g pnpm
> Nothing to stop. No server is running for the store at /root/.local/share/pnpm/store/v3
> ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory
> Run “pnpm setup” to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.

## 解决办法

```haskell
    pnpm setup
    source ~/.zshrc
```

## 原因

`pnpm setup` 其实是在环境变量中添加了一些 `pnpm` 的配置，虽然去查看环境变量已存在，但是并没有生效。

因为缺少了一个重要步骤，那就是 `source ~/.bashrc`，这样才能使环境变量生效。
