import { defineClientConfig } from 'vuepress/client'
import CustomHome from './layouts/CustomHome.vue'

// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'
import '../.vuepress/public/css/home.scss'

export default defineClientConfig({
  // layouts: {
  //  CustomHome
  // },
  enhance({ app }) {
    app.component('CustomHome', CustomHome)
    // app.component('RepoCard', RepoCard)
    // app.component('CustomComponent', CustomComponent)
  },
})
