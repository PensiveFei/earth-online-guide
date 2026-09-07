import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Cards from './Cards.vue'
import ArticleCard from './ArticleCard.vue'
import AppIcon from './AppIcon.vue'
import HomeFeatures from './HomeFeatures.vue'
import Breadcrumb from './Breadcrumb.vue'
import DocFeedback from './DocFeedback.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Breadcrumb),
      'doc-after': () => h(DocFeedback)
    }),
  enhanceApp({ app }) {
    app.component('Cards', Cards)
    app.component('ArticleCard', ArticleCard)
    app.component('AppIcon', AppIcon)
    app.component('HomeFeatures', HomeFeatures)
  }
}
