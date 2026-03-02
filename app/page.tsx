'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'

// Minimal fallback for faster perceived load
const loadingPlaceholder = <div className="h-80 bg-neutral-100 animate-pulse" />

// Lazy load below-the-fold components - Framer Motion deferred
const CollectionStrip = dynamic(
  () => import('@/components/collection-strip').then(mod => ({ default: mod.CollectionStrip })),
  { loading: () => loadingPlaceholder, ssr: true }
)

const MaterialsSection = dynamic(
  () => import('@/components/materials-section').then(mod => ({ default: mod.MaterialsSection })),
  { loading: () => loadingPlaceholder, ssr: true }
)

const EthosSection = dynamic(
  () => import('@/components/ethos-section').then(mod => ({ default: mod.EthosSection })),
  { loading: () => loadingPlaceholder, ssr: true }
)

const NewsletterSection = dynamic(
  () => import('@/components/newsletter-section').then(mod => ({ default: mod.NewsletterSection })),
  { loading: () => <div className="h-64 bg-neutral-100 animate-pulse" />, ssr: true }
)

const Footer = dynamic(
  () => import('@/components/footer').then(mod => ({ default: mod.Footer })),
  { loading: () => <div className="h-32 bg-neutral-100 animate-pulse" />, ssr: true }
)

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <Suspense fallback={<div className="h-80 bg-neutral-100" />}>
        <CollectionStrip />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-neutral-100" />}>
        <MaterialsSection />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-neutral-100" />}>
        <EthosSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-neutral-100" />}>
        <NewsletterSection />
      </Suspense>
      <Suspense fallback={<div className="h-32 bg-neutral-100" />}>
        <Footer />
      </Suspense>
    </main>
  )
}
