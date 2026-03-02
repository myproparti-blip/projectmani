'use client'

import { memo } from 'react'

// Import only the icons we need - NOT from lucide-react barrel export
import { PackageCheck } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'
import { Rocket } from 'lucide-react'

const FeatureIcon = memo(({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-5 h-5" aria-hidden="true" />
    <span className="text-sm font-medium">{label}</span>
  </div>
))

FeatureIcon.displayName = 'FeatureIcon'

export const FeatureIcons = memo(function FeatureIcons() {
  return (
    <div className="flex items-center justify-center gap-6 text-white/90 flex-wrap md:flex-nowrap">
      <FeatureIcon icon={PackageCheck} label="Hand-crafted" />
      <div className="hidden sm:block">
        <FeatureIcon icon={ShieldCheck} label="Premium Quality" />
      </div>
      <div className="hidden md:block">
        <FeatureIcon icon={Rocket} label="Fast Delivery" />
      </div>
    </div>
  )
})
