/**
 * Performance utility hooks and helpers for TBT reduction
 */

// Debounce function for scroll/resize handlers
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for high-frequency events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Request animation frame wrapper for smooth animations
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null
  return function (...args: Parameters<T>) {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      func.apply(this, args)
      rafId = null
    })
  }
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduce-motion: reduce)').matches
}

// Check for slow device
export function isSlowDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const connection = (navigator as any).connection
  if (!connection) return false
  return connection.effectiveType === '4g' || 
         connection.effectiveType === '3g' ||
         connection.saveData === true
}

// Defer non-critical work using requestIdleCallback
export function deferWork(callback: IdleRequestCallback): void {
  if (typeof window === 'undefined') return
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: 2000 })
  } else {
    setTimeout(callback, 1000)
  }
}

// Remove console logs in production
export const log = (() => {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    }
  }
  return console
})()
