<script setup lang="ts">
import { withBase } from 'vitepress'
import AppIcon from './AppIcon.vue'

const features = [
  { icon: 'bowl-rice', title: '饮食做饭', desc: '蒸米饭、煮面条、煎鸡蛋……一个人也能把自己喂好', link: '/cooking/' },
  { icon: 'train', title: '出行交通', desc: '高铁、飞机、地铁、打车……第一次出远门也不慌', link: '/travel/' },
  { icon: 'house', title: '租房搬家', desc: '找房、看房、合同、押金、搬家的全流程', link: '/renting/' },
  { icon: 'medical-case', title: '就医问诊', desc: '挂号、医保、常见小病处理、体检', link: '/medical/' },
  { icon: 'cart', title: '购物防骗', desc: '网购避坑、二手交易、电信诈骗识别、维权渠道', link: '/shopping/' },
  { icon: 'basket', title: '日常家务', desc: '洗衣、拖地、清洗家电、换锁疏通……居家小事不求人', link: '/housework/' }
]
</script>

<template>
  <div class="home-features">
    <a v-for="f in features" :key="f.link" class="home-feature-card" :href="withBase(f.link)">
      <span class="home-feature-head">
        <AppIcon :name="f.icon" class="home-feature-icon" />
        <span class="home-feature-title">{{ f.title }}</span>
      </span>
      <span class="home-feature-desc">{{ f.desc }}</span>
      <span class="home-feature-link">进入板块<span class="vpi-arrow-right home-feature-arrow" /></span>
    </a>
  </div>
</template>
