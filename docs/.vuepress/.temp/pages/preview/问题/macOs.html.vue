<template><div><!-- more -->
<p>在 <strong><em>macOS</em></strong> 系统中使用 <code v-pre>pnpm i -g pnpm</code> 报错：<code v-pre>ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory</code></p>
<blockquote>
<p>[root@VM–8 test]# pnpm i -g pnpm
Nothing to stop. No server is running for the store at /root/.local/share/pnpm/store/v3
ERR_PNPM_NO_GLOBAL_BIN_DIR Unable to find the global bin directory
Run “pnpm setup” to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the PATH.</p>
</blockquote>
<h2 id="解决办法" tabindex="-1"><a class="header-anchor" href="#解决办法"><span>解决办法</span></a></h2>
<div class="language-haskell line-numbers-mode" data-ext="haskell" data-title="haskell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>    pnpm setup</span></span>
<span class="line"><span>    source ~/.zshrc</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因"><span>原因</span></a></h2>
<p><code v-pre>pnpm setup</code> 其实是在环境变量中添加了一些 <code v-pre>pnpm</code> 的配置，虽然去查看环境变量已存在，但是并没有生效。</p>
<p>因为缺少了一个重要步骤，那就是 <code v-pre>source ~/.bashrc</code>，这样才能使环境变量生效。</p>
</div></template>


