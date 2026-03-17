import comp from "/Users/yeanqi/Desktop/workplace/blog/docs/.vuepress/.temp/pages/preview/friends.html.vue"
const data = JSON.parse("{\"path\":\"/preview/friends.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"preview/friends.md\",\"categoryList\":[{\"id\":\"5ebeb6\",\"sort\":10000,\"name\":\"preview\"}],\"bulletin\":false}")
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
