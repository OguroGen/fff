import { computed, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'

const DEFAULT_MIN_CARD_WIDTH = 300

/**
 * コンテナ幅と人数から選手カードを1段または2段に分ける。
 * 2段のとき偶数は上下同数、奇数は上段が1つ多い。
 */
export function usePlayerCardRows(
  playersSource,
  containerRef,
  minCardWidth = DEFAULT_MIN_CARD_WIDTH
) {
  const containerWidth = ref(0)
  let observer = null

  const players = computed(() => {
    const source = typeof playersSource === 'function' ? playersSource() : unref(playersSource)
    return source || []
  })

  const measure = () => {
    const el = unref(containerRef)
    if (el) {
      containerWidth.value = el.clientWidth
      return
    }
    if (typeof window !== 'undefined') {
      containerWidth.value = window.innerWidth
    }
  }

  const observe = (el) => {
    observer?.disconnect()
    observer = null
    if (!el) return
    if (typeof ResizeObserver === 'undefined') return
    observer = new ResizeObserver(measure)
    observer.observe(el)
  }

  onMounted(() => {
    measure()
    observe(unref(containerRef))
    window.addEventListener('resize', measure)
  })

  watch(
    () => unref(containerRef),
    (el) => {
      observe(el)
      measure()
    }
  )

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('resize', measure)
  })

  const isTwoRows = computed(() => {
    const n = players.value.length
    if (n <= 1) return false
    const width = containerWidth.value
    if (!width) return false
    return width / n < minCardWidth
  })

  const topCount = computed(() => {
    const n = players.value.length
    if (!isTwoRows.value) return n
    return Math.ceil(n / 2)
  })

  const topRow = computed(() => players.value.slice(0, topCount.value))

  const bottomRow = computed(() => {
    if (!isTwoRows.value) return []
    return players.value.slice(topCount.value)
  })

  // 2段で枚数が違うときは多い段（上段）にカード幅を揃える
  const cardSlots = computed(() => Math.max(topRow.value.length, 1))

  return { topRow, bottomRow, isTwoRows, cardSlots }
}
