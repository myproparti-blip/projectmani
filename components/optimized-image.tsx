'use client'

import Image from 'next/image'
import { CSSProperties } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: CSSProperties
  sizes?: string
  quality?: number
  fill?: boolean
}

/**
 * Optimized Image Component
 * - Always uses next/image for automatic optimization
 * - Supports WebP/AVIF modern formats
 * - Lazy loads by default
 * - Respects LCP optimization when priority=true
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      quality={quality}
      sizes={sizes}
      // Preload sizes for faster loading
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  )
}
