import { defineConfig } from 'vitepress'
import { BASE, SITE_NAME, SITE_URL, transformHead, transformPageData } from './seo'

export default defineConfig({
  lang: 'zh-CN',
  title: '地球Online指南',
  description: '从蒸米饭到坐高铁——写给「第一次」的全场景生活技能手册',
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,

  // 问题 1：构建时自动生成 sitemap.xml
  sitemap: {
    hostname: SITE_URL + BASE
  },

  // 问题 4：favicon / apple-touch-icon
  head: [
    ['link', { rel: 'icon', href: BASE + 'favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: BASE + 'favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: BASE + 'favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', href: BASE + 'apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#2e5d43' }]
  ],

  // 问题 3 / 5 / 6 / 7：见 seo.ts
  transformPageData,
  transformHead,

  themeConfig: {
    nav: [
      { text: '新手指南', link: '/' },
      {
        text: '内容板块',
        items: [
          { text: '🍚 饮食做饭', link: '/cooking/' },
          { text: '🚄 出行交通', link: '/travel/' },
          { text: '🏠 租房搬家', link: '/renting/' },
          { text: '🏥 就医问诊', link: '/medical/' },
          { text: '🛒 购物防骗', link: '/shopping/' },
          { text: '🧺 日常家务', link: '/housework/' }
        ]
      },
      { text: '投稿与协作', link: '/contributing' },
      { text: '免责声明', link: '/disclaimer' }
    ],
    outline: { label: '本页目录' },
    lastUpdated: { text: '最后更新' },
    footer: { message: 'CC BY-SA 4.0 · 内容仅供参考，不构成医疗或法律建议' },
    search: { provider: 'local' }
  }
})
