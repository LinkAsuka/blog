import CodeDemo from "/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.64_markdown-it@14.1.0_sass-embedded@1.83.0_typescript@5.7_2k2ssrr7tqf3c25qqy2uit7kyq/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/yeanqi/Desktop/workplace/blog/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.64_markdown-it@14.1.0_sass-embedded@1.83.0_typescript@5.7_2k2ssrr7tqf3c25qqy2uit7kyq/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
