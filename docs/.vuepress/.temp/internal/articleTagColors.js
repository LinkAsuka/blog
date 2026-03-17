import './articleTagColors.css'
export const articleTagColors = {"VUE3源码":"nl6x","正则":"lqd6","基础":"ybsp","学习网站":"ybsp","工具":"t414","部署":"ybsp","markdown":"kwru","问题":"o1in","macOs":"60y1","高效编码":"f05n","样式":"zxr1"}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateArticleTagColors) {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ articleTagColors }) => {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  })
}
