'use client'

import { memo, useRef, lazy, Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Lazy load only what's on screen
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
)

const IconsComponent = lazy(() => import('@/components/icons-optimized').then(mod => ({ default: mod.FeatureIcons })))
const Reveal = lazy(() => import('@/components/reveal').then(mod => ({ default: mod.Reveal })))

// Static content - server render where possible
const HeroContent = memo(() => (
  <>
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
      Design furniture for
      <br />
      <span className="italic font-light">spaces that breathe.</span>
    </h1>
    <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
      Designed in Belgium, crafted to endure — timeless pieces for modern living.
    </p>
  </>
))

HeroContent.displayName = 'HeroContent'

const HeroUltraOptimized = memo(function HeroUltraOptimized() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background Image - optimized for LCP */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png-EslKdscYhdWOUeP4RBajclEejxh8iO.jpeg"
        alt="Design furniture for spaces that breathe"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={70}
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="container-custom text-center text-white max-w-4xl">
          {/* Conditionally render animation based on motion preference */}
          {prefersReducedMotion ? (
            <HeroContent />
          ) : (
            <Suspense fallback={<HeroContent />}>
              <Reveal>
                <HeroContent />
              </Reveal>
            </Suspense>
          )}
        </div>
      </div>

      {/* Features Panel - lazy load icons */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-6">
        <div className="mx-6 px-6 py-4 bg-black/24 backdrop-blur-md border border-white/20 rounded-lg">
          <Suspense fallback={<div className="h-6 w-64" />}>
            <IconsComponent />
          </Suspense>
        </div>
      </div>
    </section>
  )
})

HeroUltraOptimized.displayName = 'HeroUltraOptimized'

export default HeroUltraOptimized
