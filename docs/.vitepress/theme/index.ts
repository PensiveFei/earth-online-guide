import DefaultTheme from 'vitepress/theme'
import Cards from './Cards.vue'
import ArticleCard from './ArticleCard.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Cards', Cards)
    app.component('ArticleCard', ArticleCard)
  }
}
