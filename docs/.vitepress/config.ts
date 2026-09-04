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
      { text: '内容板块', link: '/cooking/' },
      { text: '投稿与协作', link: '/contributing' }
    ],
    sidebar: [
      {
        text: '🌍 新手指南',
        items: [{ text: '欢迎来到地球Online', link: '/' }]
      },
      {
        text: '🍚 饮食做饭',
        items: [
          { text: '总览', link: '/cooking/' },
          { text: '蒸米饭', link: '/cooking/steam-rice' },
          { text: '煮面条', link: '/cooking/noodles' },
          { text: '煎鸡蛋', link: '/cooking/fried-egg' },
          { text: '蒸蛋羹', link: '/cooking/steamed-egg-custard' },
          { text: '煮速冻水饺', link: '/cooking/frozen-dumplings' },
          { text: '炒青菜', link: '/cooking/stir-fried-greens' },
          { text: '煮粥', link: '/cooking/congee' },
          { text: '炖一锅汤', link: '/cooking/soup' },
          { text: '切菜基础', link: '/cooking/knife-skills' },
          { text: '厨房安全：燃气与用电', link: '/cooking/kitchen-safety' }
        ]
      },
      {
        text: '🚄 出行交通',
        items: [
          { text: '总览', link: '/travel/' },
          { text: '坐高铁全流程', link: '/travel/high-speed-rail' },
          { text: '坐飞机全流程', link: '/travel/flight' },
          { text: '买票 · 改签 · 退票', link: '/travel/tickets' },
          { text: '坐地铁', link: '/travel/metro' },
          { text: '坐公交', link: '/travel/bus' },
          { text: '打车', link: '/travel/taxi' },
          { text: '住酒店', link: '/travel/hotel' },
          { text: '出行打包清单', link: '/travel/packing-list' },
          { text: '证件丢了怎么办', link: '/travel/lost-documents' },
          { text: '旅途防骗', link: '/travel/anti-scam' }
        ]
      },
      {
        text: '🏠 租房搬家',
        items: [
          { text: '总览', link: '/renting/' },
          { text: '找房渠道', link: '/renting/finding-a-place' },
          { text: '看房清单', link: '/renting/viewing-checklist' },
          { text: '合同避坑', link: '/renting/contract-pitfalls' },
          { text: '押金与退租', link: '/renting/deposit-moveout' },
          { text: '搬家流程', link: '/renting/moving-process' },
          { text: '合租注意事项', link: '/renting/shared-housing' }
        ]
      },
      {
        text: '🏥 就医问诊',
        items: [
          { text: '总览', link: '/medical/' },
          { text: '挂号全流程', link: '/medical/registration' },
          { text: '医保怎么用', link: '/medical/medical-insurance' },
          { text: '常见小病怎么处理', link: '/medical/common-ailments' },
          { text: '体检', link: '/medical/health-checkup' }
        ]
      },
      {
        text: '🛒 购物防骗',
        items: [
          { text: '总览', link: '/shopping/' },
          { text: '网购避坑', link: '/shopping/online-shopping' },
          { text: '二手交易', link: '/shopping/second-hand' },
          { text: '电信诈骗识别', link: '/shopping/telecom-scams' },
          { text: '维权渠道', link: '/shopping/rights-protection' }
        ]
      },
      {
        text: '关于',
        items: [
          { text: '🤝 投稿与协作', link: '/contributing' },
          { text: '⚠️ 免责声明', link: '/disclaimer' }
        ]
      }
    ],
    outline: { label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    footer: { message: 'CC BY-SA 4.0 · 内容仅供参考，不构成医疗或法律建议' },
    search: { provider: 'local' }
  }
})
