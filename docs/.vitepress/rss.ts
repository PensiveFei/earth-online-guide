import fs from 'node:fs'
import path from 'node:path'
import type { SiteConfig, PageData } from 'vitepress'
import { SITE_URL, BASE, SITE_NAME, SITE_DESC, pagePath } from './seo'

interface RssItem {
  title: string
  description: string
  updated: number
  url: string
}

const collected = new Map<string, RssItem>()

/**
 * 在 transformPageData 阶段收集每页的标题/描述/最后更新时间。
 * buildEnd 的 siteConfig.pages 只是页面 id 列表，不含 PageData，
 * 所以在这里借用 VitePress 已算好的数据。
 */
export function collectRssPage(pageData: PageData): void {
  const rel = pageData.relativePath
  if (!rel.endsWith('.md') || rel === 'index.md') return
  collected.set(rel, {
    title: pageData.title || SITE_NAME,
    description: pageData.description || SITE_DESC,
    updated: pageData.lastUpdated ?? Date.now(),
    url: SITE_URL + BASE + pagePath(rel)
  })
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(ms: number): string {
  return new Date(ms).toUTCString()
}

/** 构建结束后把全站页面生成为 RSS 2.0 feed.xml，供读者订阅更新 */
export function buildRssFeed(siteConfig: SiteConfig): void {
  const items = siteConfig.pages
    .filter((id) => id.endsWith('.md') && id !== 'index.md')
    .map((id) => collected.get(id))
    .filter((it): it is RssItem => Boolean(it))
    .sort((a, b) => b.updated - a.updated)

  const itemXml = items
    .map(
      (it) => `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${escapeXml(it.url)}</link>
      <guid isPermaLink="true">${escapeXml(it.url)}</guid>
      <pubDate>${toRfc822(it.updated)}</pubDate>
      <description>${escapeXml(it.description)}</description>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(SITE_URL + BASE)}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-CN</language>
    <atom:link href="${escapeXml(SITE_URL + BASE + 'feed.xml')}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${toRfc822(Date.now())}</lastBuildDate>
${itemXml}
  </channel>
</rss>
`

  fs.writeFileSync(path.join(siteConfig.outDir, 'feed.xml'), xml, 'utf8')
}
