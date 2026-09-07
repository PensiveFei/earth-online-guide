<script setup lang="ts">
import { computed } from 'vue'
import { ICONS } from './icons'

const props = defineProps<{ name: string }>()
const svg = computed(() => ICONS[props.name] ?? '')
</script>

<template>
  <svg
    class="app-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="svg"
  />
</template>
