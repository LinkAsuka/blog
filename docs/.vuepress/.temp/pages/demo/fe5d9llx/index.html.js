import comp from "/Users/yeanqi/blog1/docs/.vuepress/.temp/pages/demo/fe5d9llx/index.html.vue"
const data = JSON.parse("{\"path\":\"/demo/fe5d9llx/\",\"title\":\"bar\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"bar\",\"createTime\":\"2024/12/24 11:37:39\",\"permalink\":\"/demo/fe5d9llx/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":11},\"filePathRelative\":\"notes/demo/bar.md\",\"bulletin\":false}")
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
