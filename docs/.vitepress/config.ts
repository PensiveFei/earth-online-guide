import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '地球Online指南',
  description: '从蒸米饭到坐高铁——写给「第一次」的全场景生活技能手册',
  base: '/earth-online-guide/',
  cleanUrls: false,
  lastUpdated: true,
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
