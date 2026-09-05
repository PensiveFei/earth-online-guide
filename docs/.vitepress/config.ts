import { defineConfig } from 'vitepress'
import { BASE, SITE_NAME, SITE_URL, transformHead, transformPageData } from './seo'
import { buildSidebar } from './sidebar'

const REPO = 'https://github.com/PensiveFei/earth-online-guide'

/** 问题 15：CJK 分词——整词 + 二元组 + 单字兜底，让「米饭」能命中「蒸米饭」 */
function cjkTokenize(text: string): string[] {
  const tokens = new Set<string>()
  for (const word of text.split(/[^\p{L}\p{N}]+/u)) {
    if (!word) continue
    if (/[\u3400-\u9FFF]/.test(word)) {
      tokens.add(word)
      for (let i = 0; i < word.length - 1; i++) tokens.add(word.slice(i, i + 2))
      if (word.length > 2) for (const ch of word) tokens.add(ch)
    } else {
      tokens.add(word.toLowerCase())
    }
  }
  return [...tokens]
}

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

    // 问题 9：板块侧边栏（由板块卡片自动生成）；问题 10：配置侧边栏后自动出现上一篇/下一篇
    sidebar: buildSidebar(),

    // 问题 11：仓库入口（导航栏 GitHub 图标）
    socialLinks: [{ icon: 'github', link: REPO }],

    // 问题 12：编辑此页
    editLink: {
      pattern: REPO + '/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 问题 16：界面中文化
    outline: { label: '本页目录' },
    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'long' }
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题外观',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    skipToContentLabel: '跳转到正文',
    notFound: {
      title: '页面走丢了',
      quote: '这个任务还没收录，或者链接已经失效。回首页重新探索吧。',
      linkText: '回到首页',
      linkLabel: '回到首页'
    },

    footer: { message: 'CC BY-SA 4.0 · 内容仅供参考，不构成医疗或法律建议' },

    // 问题 14 / 15：搜索界面中文化 + CJK 分词
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc 键'
                }
              }
            }
          }
        },
        miniSearch: {
          options: {
            tokenize: cjkTokenize
          }
        }
      }
    }
  }
})
