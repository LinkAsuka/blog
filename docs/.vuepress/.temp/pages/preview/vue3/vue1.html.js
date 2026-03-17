import comp from "/Users/yeanqi/Desktop/workplace/blog/docs/.vuepress/.temp/pages/preview/vue3/vue1.html.vue"
const data = JSON.parse("{\"path\":\"/preview/vue3/vue1.html\",\"title\":\"从源码角度看 VUE3\",\"lang\":\"zh-CN\",\"frontmatter\":{\"createTime\":\"2024-11-11\",\"title\":\"从源码角度看 VUE3\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":5.96,\"words\":1788},\"filePathRelative\":\"preview/vue3/vue1.md\",\"categoryList\":[{\"id\":\"5ebeb6\",\"sort\":10000,\"name\":\"preview\"},{\"id\":\"0cb110\",\"sort\":10001,\"name\":\"vue3\"}],\"bulletin\":false}")
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
