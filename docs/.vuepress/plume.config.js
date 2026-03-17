import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'
/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo:"/images/asuka.png",
  appearance: true,
  // profile: {
  //   avatar: 'https://theme-plume.vuejs.press/plume.png',
  //   name: 'Asuka',
  //   description: 'Asuka',
  //   circle: true,
  // },
 
  navbar,
  notes,
  // social: [
  //   { icon: 'github', link: '/' },
  // ],

})
