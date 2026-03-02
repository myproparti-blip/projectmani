"use client"

import dynamic from 'next/dynamic'
import { memo } from 'react'

// Lazy load motion component only when needed
const MotionSpan = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.span })),
  { ssr: false }
)

interface AnimatedTextProps {
  text: string
  delay?: number
  skipAnimation?: boolean
}

// Memoize to prevent unnecessary re-renders
const CharacterSpan = memo(({ char, index, delay }: { char: string; index: number; delay: number }) => {
  // Skip animation on slow devices
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    return <span>{char === " " ? "\u00A0" : char}</span>
  }

  return (
    <MotionSpan
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: delay + index * 0.02,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </MotionSpan>
  )
})

CharacterSpan.displayName = 'CharacterSpan'

export const AnimatedTextOptimized = memo(function AnimatedText({ 
  text, 
  delay = 0, 
  skipAnimation = false 
}: AnimatedTextProps) {
  if (skipAnimation) {
    return <span>{text}</span>
  }

  return (
    <span>
      {text.split("").map((char, index) => (
        <CharacterSpan 
          key={`${char}-${index}`} 
          char={char} 
          index={index} 
          delay={delay}
        />
      ))}
    </span>
  )
})
