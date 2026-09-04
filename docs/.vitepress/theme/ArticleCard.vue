<script setup lang="ts">
import { withBase } from 'vitepress'

const props = defineProps<{
  link: string
  title: string
  desc: string
}>()
</script>

<template>
  <a class="article-card" :href="withBase(props.link)">
    <span class="article-card-title">{{ props.title }}</span>
    <span class="article-card-desc">{{ props.desc }}</span>
  </a>
</template>
