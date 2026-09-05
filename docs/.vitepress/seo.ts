import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { HeadConfig, PageData } from 'vitepress'

export const SITE_URL = 'https://pensivefei.github.io'
export const BASE = '/earth-online-guide/'
export const SITE_NAME = '地球Online指南'
export const SITE_DESC = '从蒸米饭到坐高铁——写给「第一次」的全场景生活技能手册'

const SECTIONS: Record<string, string> = {
  cooking: '饮食做饭',
  travel: '出行交通',
  renting: '租房搬家',
  medical: '就医问诊',
  shopping: '购物防骗',
  housework: '日常家务'
}

const SECTION_DESC: Record<string, string> = {
  cooking: '蒸米饭、煮面条、煎鸡蛋……一个人也能把自己喂好',
  travel: '高铁、飞机、地铁、打车……第一次出远门也不慌',
  renting: '找房、看房、合同、押金、搬家的全流程',
  medical: '挂号、医保、常见小病处理、体检的常识与流程',
  shopping: '网购避坑、二手交易、电信诈骗识别、维权渠道',
  housework: '洗衣、拖地、清洗家电、换锁疏通……居家小事不求人'
}

// 各板块的 OG 封面；杂页（投稿/免责声明等）回退到首页封面
const SECTION_OG: Record<string, string> = {
  cooking: 'og/cooking.jpg',
  travel: 'og/travel.jpg',
  renting: 'og/renting.jpg',
  medical: 'og/medical.jpg',
  shopping: 'og/shopping.jpg',
  housework: 'og/housework.jpg'
}

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/* ---------- 工具函数 ---------- */

function readMd(relativePath: string): string {
  try {
    return fs.readFileSync(path.join(docsRoot, relativePath), 'utf8')
  } catch {
    return ''
  }
}

function cleanMd(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function stripFrontmatter(md: string): string {
  return md.replace(/^---[\s\S]*?---\s*/, '')
}

/** 文章的第一段正文（跳过标题、HTML 块、列表等），用作兜底的 description */
function firstParagraph(md: string): string {
  for (const raw of stripFrontmatter(md).split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (/^[#<>|\-\*`]/.test(line)) continue
    const text = cleanMd(line)
    if (text.length >= 8) return text.length > 120 ? text.slice(0, 117) + '…' : text
  }
  return ''
}

/** 从各板块 index.md 的 ArticleCard 提取 路径 → 一句话简介 */
let cardDescMap: Record<string, string> | null = null
function getCardDescMap(): Record<string, string> {
  if (cardDescMap) return cardDescMap
  cardDescMap = {}
  for (const section of Object.keys(SECTIONS)) {
    const md = readMd(`${section}/index.md`)
    const re = /<ArticleCard[^>]*link="([^"]+)"[^>]*desc="([^"]*)"[^>]*\/?>/g
    let m: RegExpExecArray | null
    while ((m = re.exec(md))) {
      const rel = m[1].replace(/^\//, '') + '.md'
      cardDescMap[rel] = m[2]
    }
  }
  return cardDescMap
}

const EXTRA_DESC: Record<string, string> = {
  'contributing.md': '向地球Online指南投稿：Fork 仓库、新建分支、提交 PR，一个 PR 一篇指南',
  'disclaimer.md': '免责声明：本站内容仅供参考，不构成医疗、法律、金融等专业建议'
}

/** 每页 description：frontmatter > 板块卡片简介 > 板块简介 > 首段正文 > 全站简介 */
export function resolveDescription(pageData: PageData): string {
  const rel = pageData.relativePath
  if (pageData.frontmatter.description) return pageData.frontmatter.description
  const card = getCardDescMap()[rel]
  if (card) return card
  const section = rel.split('/')[0]
  if (rel === `${section}/index.md` && SECTION_DESC[section]) return SECTION_DESC[section]
  if (EXTRA_DESC[rel]) return EXTRA_DESC[rel]
  if (rel !== 'index.md') {
    const para = firstParagraph(readMd(rel))
    if (para) return para
  }
  return SITE_DESC
}

/** 页面 URL 路径（cleanUrls 形式，不含 base） */
export function pagePath(relativePath: string): string {
  const p = relativePath.replace(/\.md$/, '')
  if (p === 'index') return ''
  if (p.endsWith('/index')) return p.slice(0, -'/index'.length) + '/'
  return p
}

export function pageUrl(relativePath: string): string {
  return SITE_URL + BASE + pagePath(relativePath)
}

function ogImageFor(relativePath: string): string {
  const section = relativePath.split('/')[0]
  const img = SECTION_OG[section] ?? 'og/home.jpg'
  return SITE_URL + BASE + img
}

/* ---------- JSON-LD 生成 ---------- */

function jsonLdBreadcrumb(pageData: PageData) {
  const rel = pageData.relativePath
  if (rel === 'index.md') return null
  const items: any[] = [
    { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL + BASE }
  ]
  const section = rel.split('/')[0]
  if (SECTIONS[section]) {
    items.push({
      '@type': 'ListItem', position: 2,
      name: SECTIONS[section], item: SITE_URL + BASE + section + '/'
    })
  }
  if (!rel.endsWith('index.md')) {
    items.push({
      '@type': 'ListItem', position: items.length + 1,
      name: pageData.title, item: pageUrl(rel)
    })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

function jsonLdWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'Earth Online Guide',
    url: SITE_URL + BASE,
    description: SITE_DESC,
    inLanguage: 'zh-CN'
  }
}

/** 各 h2 并列为主题而非顺序步骤的文章（生成 HowTo 会语义失真，跳过） */
const NON_SEQUENTIAL = new Set([
  'travel/anti-scam.md',     // 骗局分类
  'travel/packing-list.md',  // 物品分类
  'travel/tickets.md',       // 票种并列
  'travel/taxi.md',          // 网约车/出租车并列
  'travel/lost-documents.md',// 按证件类型分场景
  'medical/medical-insurance.md', // 医保专题并列
  'medical/common-ailments.md',   // 常备物品/轻症/就医判断
  'cooking/kitchen-safety.md',    // 燃气/用电专题
  'shopping/telecom-scams.md',    // 类型/识别/应对
  'renting/shared-housing.md'     // 合租专题并列
])

/** 元信息小节（流程到此为止，之后是物品/费用/避坑清单） */
const META_SECTION = /必要物品|容易踩错|费用与|周期与费用|原则$/

/** 解析单个「操作流程/操作」小节：有 h3 则每个 h3 为一步，否则每个自然段为一步 */
function parseStepsFromSection(body: string): any[] {
  const steps: any[] = []
  const h3parts = body.split(/^### /m).slice(1)
  if (h3parts.length) {
    for (const p of h3parts) {
      const nl = p.indexOf('\n')
      const name = p.slice(0, nl).trim()
      const text = cleanMd(p.slice(nl + 1))
      if (name && text.length >= 8) steps.push({ name, text })
    }
  } else {
    for (const para of body.split(/\n\s*\n/)) {
      const text = cleanMd(para)
      if (text.length >= 8 && !text.startsWith('#')) steps.push({ text })
    }
  }
  return steps
}

/**
 * 提取 HowTo 步骤：
 * 1. 有「## 操作流程」或「## 操作」→ 解析该小节内部
 * 2. 否则把元信息小节之前的顺序 h2 视为步骤（如 购票→安检→候车→乘车→出站）
 */
function parseHowToSteps(md: string): any[] {
  const sec = /^## 操作流程?\s*$/m.exec(md)
  if (sec) {
    const rest = md.slice(sec.index + sec[0].length)
    const endM = /^## /m.exec(rest)
    return parseStepsFromSection(endM ? rest.slice(0, endM.index) : rest)
  }
  const steps: any[] = []
  const h2re = /^## (.+)$/gm
  let m: RegExpExecArray | null
  const sections: { name: string; start: number; end: number }[] = []
  while ((m = h2re.exec(md))) sections.push({ name: m[1].trim(), start: m.index, end: h2re.lastIndex })
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]
    if (META_SECTION.test(s.name)) break
    const bodyStart = s.end
    const bodyEnd = i + 1 < sections.length ? sections[i + 1].start : md.length
    const text = cleanMd(md.slice(bodyStart, bodyEnd))
    if (text.length >= 8) steps.push({ name: s.name, text })
  }
  return steps
}

function jsonLdHowTo(pageData: PageData) {
  const rel = pageData.relativePath
  if (!rel.includes('/') || rel.endsWith('index.md')) return null
  if (NON_SEQUENTIAL.has(rel)) return null
  const steps = parseHowToSteps(readMd(rel))
  if (steps.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: pageData.title,
    description: resolveDescription(pageData),
    inLanguage: 'zh-CN',
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, ...s }))
  }
}

/* ---------- VitePress 钩子 ---------- */

/** 问题 7：把每页 description 写进 frontmatter + pageData.description（VitePress 的 meta description 读的是后者），让每页输出独立的 meta description */
export function transformPageData(pageData: PageData) {
  if (!pageData.frontmatter.description) {
    const desc = resolveDescription(pageData)
    pageData.frontmatter.description = desc
    ;(pageData as unknown as { description: string }).description = desc
  }
}

/** 问题 3 / 5 / 6：OG、Twitter Card、canonical、JSON-LD */
export function transformHead({ pageData }: { pageData: PageData }): HeadConfig[] {
  const rel = pageData.relativePath
  const isHome = rel === 'index.md'
  const isArticle = rel.includes('/') && !rel.endsWith('index.md')
  const url = pageUrl(rel)
  const desc = resolveDescription(pageData)
  const title = isHome ? SITE_NAME : `${pageData.title} | ${SITE_NAME}`
  const image = ogImageFor(rel)

  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: desc }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:image:width', content: '1024' }],
    ['meta', { property: 'og:image:height', content: '541' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: desc }],
    ['meta', { name: 'twitter:image', content: image }]
  ]
  if (isArticle && pageData.lastUpdated) {
    head.push(['meta', { property: 'article:modified_time', content: new Date(pageData.lastUpdated).toISOString() }])
  }

  const schemas = [
    isHome ? jsonLdWebSite() : null,
    jsonLdBreadcrumb(pageData),
    jsonLdHowTo(pageData)
  ].filter(Boolean)
  for (const schema of schemas) {
    head.push(['script', { type: 'application/ld+json' }, JSON.stringify(schema)])
  }
  return head
}
