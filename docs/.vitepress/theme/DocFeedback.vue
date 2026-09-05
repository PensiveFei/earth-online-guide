<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

const REPO = 'https://github.com/PensiveFei/earth-online-guide'

// 仅在板块文章页显示（与面包屑同一条件）
const isArticle = computed(() => {
  const rel = page.value.relativePath
  return rel.includes('/') && !rel.endsWith('index.md')
})

const storageKey = computed(() => 'eog-feedback:' + page.value.relativePath)
const voted = ref<'up' | 'down' | null>(null)

onMounted(() => loadVote())
watch(storageKey, () => loadVote())
function loadVote() {
  try {
    voted.value = (localStorage.getItem(storageKey.value) as 'up' | 'down' | null) ?? null
  } catch {
    voted.value = null
  }
}

function vote(kind: 'up' | 'down') {
  voted.value = kind
  try {
    localStorage.setItem(storageKey.value, kind)
  } catch {}
}

const errataUrl = computed(
  () =>
    REPO +
    '/issues/new?template=errata.yml&title=' +
    encodeURIComponent('[勘误] ' + (page.value.title || ''))
)
const editUrl = computed(() => REPO + '/edit/main/docs/' + page.value.relativePath)
</script>

<template>
  <div v-if="isArticle" class="doc-feedback">
    <div class="fb-row">
      <template v-if="!voted">
        <span class="fb-q">本文对你有帮助吗？</span>
        <button type="button" class="fb-btn" @click="vote('up')">👍 有帮助</button>
        <button type="button" class="fb-btn" @click="vote('down')">👎 没帮助</button>
      </template>
      <template v-else-if="voted === 'up'">
        <span class="fb-thanks">感谢认可！觉得有用可以给仓库点个 <a :href="REPO" target="_blank" rel="noopener noreferrer">Star ⭐</a></span>
        <a class="fb-link" :href="errataUrl" target="_blank" rel="noopener noreferrer">📝 发现错误？点我勘误</a>
      </template>
      <template v-else>
        <span class="fb-thanks">感谢反馈！告诉我们哪里不对：</span>
        <a class="fb-btn" :href="errataUrl" target="_blank" rel="noopener noreferrer">📝 填写勘误表单</a>
        <a class="fb-btn" :href="editUrl" target="_blank" rel="noopener noreferrer">✏️ 直接改</a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.doc-feedback {
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}
.fb-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.fb-q {
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-right: 4px;
}
.fb-btn {
  display: inline-block;
  padding: 5px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.6;
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;
}
.fb-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
}
.fb-thanks {
  color: var(--vp-c-text-1);
}
.fb-thanks a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
}
.fb-link {
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: none;
}
.fb-link:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
