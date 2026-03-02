/**
 * Lazy load Framer Motion to avoid blocking main thread
 * Only loaded when needed (scroll-based or interaction)
 */

let framerMotionModule: any = null

export async function loadFramerMotion() {
  if (framerMotionModule) {
    return framerMotionModule
  }

  try {
    framerMotionModule = await import('framer-motion')
    return framerMotionModule
  } catch (error) {
    console.error('Failed to load framer-motion:', error)
    return null
  }
}

/**
 * Lazy component wrapper for Framer Motion
 * Loads motion library only when component is in viewport
 */
export function createLazyMotionComponent<T>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function LazyMotionWrapper(props: T) {
    // This is a placeholder - actual motion library loaded on demand
    return <Component {...props} />
  }
}
