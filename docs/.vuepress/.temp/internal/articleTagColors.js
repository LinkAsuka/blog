import './articleTagColors.css'
export const articleTagColors = {"VUE3源码":"j10z","正则":"yd2f","基础":"sl4e","学习网站":"sl4e","工具":"ojxa","部署":"sl4e","markdown":"csv6","问题":"qpaz","macOs":"s4rw","高效编码":"raf0","样式":"n8a3"}

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
