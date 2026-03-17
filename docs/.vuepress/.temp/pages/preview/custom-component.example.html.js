import comp from "/Users/yeanqi/Desktop/workplace/blog/docs/.vuepress/.temp/pages/preview/custom-component.example.html.vue"
const data = JSON.parse("{\"path\":\"/preview/custom-component.example.html\",\"title\":\"使用 netlify 部署静态网站\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"使用 netlify 部署静态网站\",\"createTime\":\"2024-01-23T00:00:00.000Z\",\"tags\":[\"工具\",\"部署\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.41,\"words\":124},\"filePathRelative\":\"preview/custom-component.example.md\",\"categoryList\":[{\"id\":\"5ebeb6\",\"sort\":10000,\"name\":\"preview\"}],\"bulletin\":false}")
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
