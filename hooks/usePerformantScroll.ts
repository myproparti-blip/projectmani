import { useEffect, useRef, useCallback } from 'react'

export function usePerformantScroll(callback: (scrollY: number) => void, threshold = 20) {
  const rafRef = useRef<number | null>(null)
  const lastScrollRef = useRef(0)
  const isScrolledRef = useRef(false)

  const handleScroll = useCallback(() => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY
      
      // Only update if significant change
      if (Math.abs(scrollY - lastScrollRef.current) > 5) {
        const shouldBeScrolled = scrollY > threshold
        if (shouldBeScrolled !== isScrolledRef.current) {
          isScrolledRef.current = shouldBeScrolled
          callback(scrollY)
        }
        lastScrollRef.current = scrollY
      }
      rafRef.current = null
    })
  }, [callback, threshold])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])
}
