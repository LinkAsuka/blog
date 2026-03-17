import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Asuka',
  description: 'Asuka',
  head: [
    ['link', { rel: 'icon', href: '/images/asuka.png' }]
  ],
  bundler: viteBundler(),

  theme: plumeTheme({
    blog: {
      excerpt: false,
      postCover: {
        layout: 'top',
        // ratio: '16:9',
        compact: true,
      },
    },
    // 添加您的部署域名
    // hostname: 'https://your_site_url',
    // your git repo url
    docsRepo: '',
    docsDir: 'docs',
    footer: false,
    contributors: false,
    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        //  ["js","html","css","ts","haskell"]
        languages: ['shell', 'bash', 'typescript', 'javascript', 'js', 'html', 'css'],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
        //   include: true,
        //   chart: true,
        //   echarts: true,
        //   mermaid: true,
        //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      markdownPower: {
        // pdf: true,
        caniuse: true,
        plot: true,
        // bilibili: true,
        // youtube: true,
        icons: true,
        codepen: true,
        replit: true,
        codeSandbox: true,
        // jsfiddle: true,
        // repl: {
        //   go: true,
        //   rust: true,
        //   kotlin: true,
        // },
      },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   category: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
  }),
})
