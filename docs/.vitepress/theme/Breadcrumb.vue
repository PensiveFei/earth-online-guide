<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()

const SECTION_NAMES: Record<string, string> = {
  cooking: '饮食做饭',
  travel: '出行交通',
  renting: '租房搬家',
  medical: '就医问诊',
  shopping: '购物防骗',
  housework: '日常家务'
}

// 仅在板块文章页显示：首页 / 板块 / 当前页
const crumbs = computed(() => {
  const rel = page.value.relativePath
  if (!rel.includes('/') || rel.endsWith('index.md')) return []
  const section = rel.split('/')[0]
  const name = SECTION_NAMES[section]
  if (!name) return []
  return [
    { text: '首页', link: '/' },
    { text: name, link: `/${section}/` },
    { text: page.value.title, current: true as const }
  ]
})
</script>

<template>
  <nav v-if="crumbs.length" class="vp-breadcrumb" aria-label="面包屑导航">
    <template v-for="(c, i) in crumbs" :key="i">
      <span v-if="i" class="sep" aria-hidden="true">›</span>
      <a v-if="!c.current" :href="withBase(c.link!)">{{ c.text }}</a>
      <span v-else class="current" aria-current="page">{{ c.text }}</span>
    </template>
  </nav>
</template>

<style scoped>
.vp-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 13px;
  line-height: 1.8;
  margin-bottom: 4px;
  color: var(--vp-c-text-2);
}
.vp-breadcrumb a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.vp-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
.vp-breadcrumb .sep {
  margin: 0 6px;
  opacity: 0.45;
}
.vp-breadcrumb .current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
</style>
