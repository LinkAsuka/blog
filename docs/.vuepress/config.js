// .vuepress/config.js
module.exports = {
  base: "/vuepress/",
  // base:'./',
  dest: "./dist",
  themeConfig: {
    logo: "https://www.vuepress.cn/hero.png",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "前端基础",
        items: [
          {
            text: "环境相关",
            items: [
              { text: "nvm安装", link: "/views/basis/nvm安装node" },
              { text: "git使用", link: "/views/basis/git使用" },
              { text: "vscode拓展和设置", link: "/views/basis/vscode拓展" },
            ],
          },
          {
            text: "前端三大件",
            items: [
              {
                text: "HTML",
                link: "https://www.w3school.com.cn/html/index.asp",
              },
              {
                text: "CSS",
                link: "https://www.w3school.com.cn/css/index.asp",
              },
              {
                text: "JavaScript",
                link: "https://www.w3school.com.cn/js/index.asp",
              },
              { text: "js一些方法", link: "/views/basis/js基础" },
            ],
          },
          {
            text: "jQuery",
            items: [
              {
                text: "w3教程",
                link: "https://www.w3school.com.cn/jquery/index.asp",
              },
              { text: "在线手册", link: "http://hemin.cn/jq/" },
              { text: "案例1", link: "/views/basis/task1" },
              { text: "案例2", link: "/views/basis/task2" },
            ],
          },
        ],
      },
      {
        text: "服务端",
        items: [
          {
            text: "nodejs",
            items: [
              { text: "nodejs学习", link: "/views/server/nodejs1" },
              { text: "nodejs服务端", link: "/views/server/nodejs2" },
              { text: "express1", link: "/views/server/express1" },
              { text: "express2", link: "/views/server/express2" },
              { text: "SQL", link: "/views/server/sql" },
              {
                text: "websocket基本使用",
                link: "/views/server/websocket基本使用",
              },
            ],
          },
          {
            text: "Linux相关",
            items: [
              { text: "Linux常用命令", link: "/views/server/Linux常用命令" },
              { text: "Linux安装nginx", link: "/views/server/LINUX安装nginx" },
            ],
          },
        ],
      },
      {
        text: "vue",
        items: [
          { text: "vue官网", link: "https://cn.vuejs.org/" },
          {
            text: "vue3",
            items: [
              { text: "vue3基础", link: "/views/vue/vue3基础" },
              { text: "vue3项目", link: "/views/vue/vue3项目" },
            ],
          },
        ],
      },
      {
        text: "微信小程序",
        items: [
          {
            text: "小程序官方文档",
            link: "https://developers.weixin.qq.com/miniprogram/dev/framework/",
          },
          {
            text: "item",
            items: [
              { text: "2", link: "/2" },
              { text: "3", link: "/3" },
            ],
          },
        ],
      },
      {
        text: "uni-app",
        items: [
          { text: "uni-app官网", link: "https://uniapp.dcloud.net.cn/" },
          { text: "uniapp基础", link: "/views/uniapp/uniapp基础" },
          { text: "支付功能", link: "/views/uniapp/uniapp支付功能" },
          { text: "request封装", link: "/views/uniapp/request封装" },
          { text: "开发总结", link: "/views/uniapp/uniapp开发总结" },
          { text: "自定义组件", link: "/views/uniapp/components" },
          { text: "插件", link: "/views/uniapp/uniapp插件" },
        ],
      },
      {
        text: "React",
        items: [
          { text: "React官网", link: "https://react.docschina.org/" },
          {
            text: "item",
            items: [
              { text: "2", link: "/2" },
              { text: "3", link: "/3" },
            ],
          },
        ],
      },
      {
        text: "前端面试题",
        items: [
          { text: "面试题2020", link: "/views/question/前端面试题整合" },
          {
            text: "字节面试题",
            link: "/views/question/字节面试题",
          },
        ],
      },
      {
        text: "link",
        items: [
          { text: "vuepress", link: "http://caibaojian.com/vuepress/" },
          {
            text: "本项目地址",
            link: "https://gitee.com/feng644586334/vuepress",
          },
        ],
      },
    ],
    // sidebar: [
    //     {
    //         title: 'Group 1',   // 必要的
    //         path: '/1',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //         collapsable: false, // 可选的, 默认值是 true,
    //         sidebarDepth: 1,    // 可选的, 默认值是 1
    //         children: [
    //             {
    //                 title: '一啊',
    //                 path: '/1',
    //             },
    //             {
    //                 title: '二啊',
    //                 path: '/2',
    //             },
    //         ]
    //     },
    //     {
    //         title: 'Group 2',
    //         children: [ /* ... */],
    //         initialOpenGroupIndex: -1 // 可选的, 默认值是 0
    //     }
    // ]
  },
};
