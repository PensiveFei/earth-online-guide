<script setup lang="ts">
import { withBase } from 'vitepress'
import AppIcon from './AppIcon.vue'

const props = defineProps<{
  link: string
  title: string
  desc: string
  icon?: string
  linktext?: string
}>()
</script>

<template>
  <a class="article-card" :href="withBase(props.link)">
    <span v-if="props.icon" class="article-card-icon"><AppIcon :name="props.icon" /></span>
    <span class="article-card-body">
      <span class="article-card-title">{{ props.title }}</span>
      <span class="article-card-desc">{{ props.desc }}</span>
      <span v-if="props.linktext" class="article-card-linktext">{{ props.linktext }}<span class="vpi-arrow-right article-card-arrow" /></span>
    </span>
  </a>
</template>
