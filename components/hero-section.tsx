'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { PackageCheck, Rocket, ShieldCheck } from 'lucide-react'
import { Reveal } from './reveal'
import { BlurPanel } from './blur-panel'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image - Optimized */}
      <div className="absolute inset-0">
        <Image
           src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png-EslKdscYhdWOUeP4RBajclEejxh8iO.jpeg"
           alt="Design furniture for spaces that breathe"
           fill
           className="object-cover"
           priority
           fetchPriority="high"
           sizes="100vw"
           quality={50}
           loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content - CSS animations only */}
      <div className="relative z-10 h-full flex items-center justify-center animate-in fade-in duration-1000">
        <div className="container-custom text-center text-white">
          <Reveal>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
              Design furniture for
              <br />
              <span className="italic font-light">spaces that breathe.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-800 fill-mode-both"
               style={{ animationDelay: '700ms' }}>
              Designed in Belgium, crafted to endure — timeless pieces for modern living.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Features Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-800 fill-mode-both"
           style={{ animationDelay: '1200ms' }}>
        <BlurPanel className="mx-6 mb-6 px-6 py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm">Ready to Move</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-sm">Quick Handover</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Legal Approved</span>
            </div>
          </div>
        </BlurPanel>
      </div>
    </section>
  )
}
