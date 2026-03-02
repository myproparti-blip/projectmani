'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { PackageCheck, Rocket, ShieldCheck } from 'lucide-react'
import { Reveal } from './reveal'
import { BlurPanel } from './blur-panel'

export default function AnimatedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png-EslKdscYhdWOUeP4RBajclEejxh8iO.jpeg"
          alt="Design furniture for spaces that breathe"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={50}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content with parallax scroll effect */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-custom text-center text-white">
          <Reveal>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
              Design furniture for
              <br />
              <span className="italic font-light">spaces that breathe.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Designed in Belgium, crafted to endure — timeless pieces for modern living.
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Features Panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <BlurPanel className="mx-6 mb-6 px-6 py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5" />
              <span className="text-sm">Hand-crafted</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm">Premium Quality</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              <span className="text-sm">Fast Delivery</span>
            </div>
          </div>
        </BlurPanel>
      </motion.div>
    </section>
  )
}
