// 部署完成后通知 IndexNow（Bing / Yandex / Naver / Seznam）收录新内容
// 用法：node .github/scripts/indexnow.mjs
// IndexNow key 本身设计为公开文件，无需保密

const KEY = '843e3b52ec86cf6c57ac531f02ecc1ad'
const SITE = 'https://eartholguide.com'
const SITEMAP = SITE + '/sitemap.xml'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const res = await fetch(SITEMAP, { headers: { 'user-agent': 'earth-online-guide-cicd' } })
if (!res.ok) {
  console.error('sitemap fetch failed:', res.status)
  process.exit(1)
}
const xml = await res.text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log('sitemap URLs:', urls.length)
if (!urls.length) {
  console.error('no URLs found in sitemap')
  process.exit(1)
}

const body = JSON.stringify({
  host: 'eartholguide.com',
  key: KEY,
  keyLocation: SITE + '/' + KEY + '.txt',
  urlList: urls.slice(0, 10000)
})
const pr = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body
})
console.log('indexnow status:', pr.status, pr.statusText)
if (!pr.ok) {
  console.error(await pr.text())
  process.exit(1)
}
console.log('IndexNow notified OK')
