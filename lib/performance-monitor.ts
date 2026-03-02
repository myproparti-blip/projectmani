// Monitor Core Web Vitals
export function initPerformanceMonitoring() {
  // Only run in production
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return
  }

  // Monitor LCP
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      // Ignore observer errors
    }
  }

  // Monitor CLS
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        console.log('CLS:', clsValue)
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      // Ignore observer errors
    }
  }

  // Monitor FID/INP
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('INP:', (entry as any).duration)
        }
      })
      observer.observe({ entryTypes: ['first-input', 'interaction'] })
    } catch (e) {
      // Ignore observer errors
    }
  }
}

// Report TBT
export function reportTBT() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).duration > 50) {
          console.warn('Long task detected:', {
            duration: (entry as any).duration,
            name: entry.name,
            startTime: entry.startTime,
          })
        }
      }
    })
    observer.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    // Long Task API not supported
  }
}
