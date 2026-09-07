import { h, provide } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Cards from './Cards.vue'
import ArticleCard from './ArticleCard.vue'
import AppIcon from './AppIcon.vue'
import HomeFeatures from './HomeFeatures.vue'
import Breadcrumb from './Breadcrumb.vue'
import DocFeedback from './DocFeedback.vue'
import { revealTheme } from './theme-transition'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const { isDark } = useData()
      // 拦截主题切换：先播圆形扩散动画，动画结束再切换主题
      provide('toggle-appearance', (e: MouseEvent) => {
        const target = !isDark.value
        const x = e?.clientX ?? window.innerWidth / 2
        const y = e?.clientY ?? window.innerHeight / 2
        revealTheme(x, y, target, () => {
          isDark.value = target
        })
      })
      return () =>
        h(DefaultTheme.Layout, null, {
          'doc-before': () => h(Breadcrumb),
          'doc-after': () => h(DocFeedback)
        })
    }
  },
  enhanceApp({ app }) {
    app.component('Cards', Cards)
    app.component('ArticleCard', ArticleCard)
    app.component('AppIcon', AppIcon)
    app.component('HomeFeatures', HomeFeatures)
  }
}
