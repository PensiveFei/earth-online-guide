import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** 侧边栏只覆盖六大内容板块；新增板块时在 nav 与此处各加一行 */
const SIDEBAR_SECTIONS: [string, string][] = [
  ['cooking', '饮食做饭'],
  ['travel', '出行交通'],
  ['renting', '租房搬家'],
  ['medical', '就医问诊'],
  ['shopping', '购物防骗'],
  ['housework', '日常家务']
]

/** 解析板块 index.md 里的 ArticleCard，生成侧边栏条目（新增文章加卡片即自动进侧边栏与上下篇） */
function parseCards(section: string): DefaultTheme.SidebarItem[] {
  const md = fs.readFileSync(path.join(docsRoot, section, 'index.md'), 'utf8')
  const items: DefaultTheme.SidebarItem[] = []
  const tagRe = /<ArticleCard\b[^>]*\/?>/g
  let m: RegExpExecArray | null
  while ((m = tagRe.exec(md))) {
    const tag = m[0]
    const link = /link="([^"]+)"/.exec(tag)?.[1]
    const title = /title="([^"]+)"/.exec(tag)?.[1]
    if (link && title) items.push({ text: title, link })
  }
  return items
}

function sectionEmojiTitle(section: string, fallback: string): string {
  const md = fs.readFileSync(path.join(docsRoot, section, 'index.md'), 'utf8')
  return /^#\s+(.+)$/m.exec(md)?.[1]?.trim() || fallback
}

export function buildSidebar(): DefaultTheme.Sidebar {
  const sidebar: DefaultTheme.Sidebar = {}
  for (const [section, name] of SIDEBAR_SECTIONS) {
    sidebar[`/${section}/`] = [
      {
        text: sectionEmojiTitle(section, name),
        link: `/${section}/`,
        collapsed: false,
        items: parseCards(section)
      }
    ]
  }
  return sidebar
}
