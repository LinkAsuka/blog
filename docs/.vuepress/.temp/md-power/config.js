import { defineClientConfig } from 'vuepress/client'
import Tabs from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue'
import CodeTabs from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue'
import Replit from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/Replit.vue'
import CodeSandbox from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/CodeSandbox.vue'
import Plot from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import CanIUse from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/CanIUse.vue'
import FileTreeItem from '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'

import '/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.123_markdown-it@14.1.0_typescript@5.7.2_vuepress@2.0.0-rc.1_2ys2uy4qv2davmfnrnp4ly36ea/node_modules/vuepress-plugin-md-power/lib/client/styles/index.css'

export default defineClientConfig({
  enhance({ router, app }) {
    app.component('Tabs', Tabs)
    app.component('CodeTabs', CodeTabs)
    app.component('ReplitViewer', Replit)
    app.component('CodeSandboxViewer', CodeSandbox)
    app.component('Plot', Plot)
    app.component('CanIUseViewer', CanIUse)
    app.component('FileTreeItem', FileTreeItem)
  }
})
