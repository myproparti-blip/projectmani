/**
 * Performance utilities for optimizing TBT and render performance
 * These help prevent unnecessary re-renders and expensive computations
 */

import React from 'react'

/**
 * Memoizes a component to prevent unnecessary re-renders
 * Use for components that:
 * - Have expensive render logic
 * - Receive many props that rarely change
 * - Are in hot-path rendering areas
 *
 * @example
 * const Header = React.memo(({ title }) => <h1>{title}</h1>)
 */
export const memoizeComponent = React.memo

/**
 * Creates a stable callback that doesn't change between renders
 * Use for:
 * - Event handlers passed to memoized children
 * - Effects dependencies
 *
 * @example
 * const handleClick = useCallback(() => {}, [dep1, dep2])
 */
export const { useCallback } = React

/**
 * Memoizes expensive computations
 * Use for:
 * - Complex calculations
 * - Large array operations
 * - Derived state
 *
 * @example
 * const result = useMemo(() => expensiveOperation(data), [data])
 */
export const { useMemo } = React

/**
 * Debounce function for reducing event handler calls
 * Use for:
 * - Scroll events
 * - Resize events
 * - Search input
 * - Animations
 *
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300)
 */
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

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for limiting function calls
 * Use for:
 * - Animation frame callbacks
 * - Rapid event firing
 *
 * @example
 * const throttledScroll = throttle(() => handleScroll(), 100)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load intersection observer hook
 * Use for:
 * - Below-the-fold images
 * - Lazy-loaded sections
 * - Analytics tracking
 *
 * Reduces initial LCP impact by deferring non-critical content
 */
export function useIntersection(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isVisible
}

/**
 * Performance monitoring utility
 * Use for measuring component render times
 *
 * @example
 * const startTime = performance.now()
 * // do work
 * measurePerformance('myComponent', startTime)
 */
export function measurePerformance(
  label: string,
  startTime: number,
  threshold: number = 16 // 60fps = 16ms
): void {
  if (typeof window === 'undefined') return

  const endTime = performance.now()
  const duration = endTime - startTime

  if (process.env.NODE_ENV !== 'production' && duration > threshold) {
    console.warn(`[Performance] ${label} took ${duration.toFixed(2)}ms`)
  }
}

/**
 * Request idle callback fallback for better performance
 * Use for non-critical operations
 */
export function scheduleIdleCallback(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback)
  } else {
    setTimeout(callback, 0)
  }
}

/**
 * Preload image for LCP optimization
 * Use for hero images
 */
export function preloadImage(src: string): void {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

/**
 * Calculate optimal image sizes for responsive design
 * Reduces unnecessary image downloads
 */
export function getOptimalImageSize(
  containerWidth: number,
  maxWidth: number = 2048
): number {
  const sizes = [320, 640, 750, 828, 1080, 1200, 1920, 2048]
  return sizes.find((size) => size >= containerWidth) || maxWidth
}
