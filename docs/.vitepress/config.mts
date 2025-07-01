import { defineConfig } from 'vitepress'
import withMindMap from '../../src/index'
// https://vitepress.dev/reference/site-config
export default withMindMap(defineConfig({
  title: "Vite Press Drawio",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [

        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
}))
