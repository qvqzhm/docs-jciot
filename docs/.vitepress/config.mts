import { defineConfig } from 'vitepress'

import { nav } from "./relConfig";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "docs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    search: {
      provider: 'local'
    },
    sidebar: [
      {text: 'ICC', link: '/baidu'},
      {
        text: 'Examples',
        items: [
          {
            text: '',
            items: [
              { text: 'Runtime API Examples', link: '/api-examples' },
              { text: '', items: [
                  { text: 'Markdown Examples', link: '/markdown-examples' },
                ] }
            ]
          }
        ]
      },
    ],

    outline: {
      level: [2, 6],
      label: '目录'
    }

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
