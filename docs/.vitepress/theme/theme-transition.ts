// 圆形扩散主题切换（View Transitions API）：
// 新主题以圆形从点击处向外「揭开」，圆内是新主题、圆外仍是旧主题，内容全程可见。

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

  const startVT = (document as any).startViewTransition

  // 不支持 View Transitions，或用户偏好减少动效：直接切换（回退到 VitePress 默认行为）
  if (typeof startVT !== 'function' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    apply()
    return
  }

  // 动画进行中忽略重复点击
  if (animating) return
  animating = true

  // 半径：覆盖到距离点击处最远的屏幕角落
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  // 把「揭开」圆心写入 CSS 变量，供 ::view-transition-new(root) 使用
  const root = document.documentElement
  root.style.setProperty('--vt-x', `${x}px`)
  root.style.setProperty('--vt-y', `${y}px`)

  const transition = startVT.call(document, () => {
    // 同步切换 html.dark，确保 View Transition 能捕获到新主题快照
    root.classList.toggle('dark', targetDark)
    // 同步 Vue 响应式状态与 localStorage（按钮图标、持久化）
    apply()
  })

  transition.ready.then(() => {
    // 让新主题从点击处的一个点，扩成覆盖全屏的圆
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: DURATION,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })

  transition.finished.finally(() => {
    animating = false
  })
}
