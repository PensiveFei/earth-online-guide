import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Cards from './Cards.vue'
import ArticleCard from './ArticleCard.vue'
import Breadcrumb from './Breadcrumb.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Breadcrumb)
    }),
  enhanceApp({ app }) {
    app.component('Cards', Cards)
    app.component('ArticleCard', ArticleCard)
  }
}
