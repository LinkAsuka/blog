import comp from "/Users/yeanqi/blog1/docs/.vuepress/.temp/pages/demo/index.html.vue"
const data = JSON.parse("{\"path\":\"/demo/\",\"title\":\"Demo\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Demo\",\"createTime\":\"2024/12/24 11:37:39\",\"permalink\":\"/demo/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":13},\"filePathRelative\":\"notes/demo/README.md\",\"bulletin\":false}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
