// 圆形扩散主题切换：点击主题按钮后，新主题背景以圆形从点击处向外扩散，
// 覆盖全屏后再真正切换主题（isDark.value），避免整屏瞬间变色。

// VitePress 默认页面背景色（本项目未自定义 --vp-c-bg，故与默认一致）
const DARK_BG = '#1b1b1f'
const LIGHT_BG = '#ffffff'

// 与 style.css 中 .theme-reveal-overlay 的 transition 时长保持一致
const DURATION = 600

let animating = false

export function revealTheme(
  x: number,
  y: number,
  targetDark: boolean,
  apply: () => void
): void {
  if (typeof document === 'undefined') {
    apply()
    return
  }

  // 用户偏好「减少动态效果」时，直接切换
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    apply()
    return
  }

  // 动画进行中忽略重复点击
  if (animating) return
  animating = true

  // 半径：覆盖到距离点击处最远的屏幕角落，再加一点余量
  const radius =
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) + 8

  const overlay = document.createElement('div')
  overlay.className = 'theme-reveal-overlay'
  overlay.style.background = targetDark ? DARK_BG : LIGHT_BG
  // 用像素直接定位圆形，使其圆心正好落在点击处
  overlay.style.left = `${x - radius}px`
  overlay.style.top = `${y - radius}px`
  overlay.style.width = `${radius * 2}px`
  overlay.style.height = `${radius * 2}px`

  document.body.appendChild(overlay)

  // 强制重排，确保初始 scale(0)（不可见）已渲染，再触发扩散过渡
  void overlay.offsetWidth
  overlay.classList.add('is-revealing')

  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    animating = false
    apply()
    overlay.remove()
  }

  overlay.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') finish()
  })
  // 兜底：transitionend 因故未触发时也能完成切换
  setTimeout(finish, DURATION + 150)
}
