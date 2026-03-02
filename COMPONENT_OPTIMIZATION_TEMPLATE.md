# Component Optimization Template

## Quick Checklist for Each Component

### Before Publishing:
- [ ] Remove `'use client'` if component is purely static
- [ ] Wrap in `memo()` if component receives props
- [ ] Use specific imports (NOT barrel imports)
- [ ] Heavy libraries wrapped in dynamic + lazy
- [ ] No console.log statements in production
- [ ] useCallback on event handlers
- [ ] useMemo on expensive computations

---

## Pattern 1: Static Server Component
```tsx
// ✅ NO 'use client' needed
export function Footer() {
  return (
    <footer>
      <p>© 2024 Mahim Architects</p>
    </footer>
  )
}
```

---

## Pattern 2: Interactive Client Component (Memoized)
```tsx
'use client'

import { memo, useCallback } from 'react'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

// ✅ Memoized to prevent unnecessary re-renders
export const Button = memo(function Button({ onClick, children }: ButtonProps) {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <button onClick={handleClick} className="px-4 py-2 bg-blue-600 text-white rounded">
      {children}
    </button>
  )
})
```

---

## Pattern 3: Heavy Library - Dynamic Import
```tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// ✅ Lazy load framer-motion only when needed
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse" />
  }
)

export function AnimatedSection() {
  return (
    <Suspense fallback={<div className="h-64 bg-gray-100" />}>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Animated content
      </MotionDiv>
    </Suspense>
  )
}
```

---

## Pattern 4: Icons - Specific Imports
```tsx
'use client'

import { memo } from 'react'

// ❌ BAD - imports entire lucide library
// import * as Icons from 'lucide-react'

// ✅ GOOD - only what you need
import { Check, ChevronDown, Menu } from 'lucide-react'

export const IconButtons = memo(function IconButtons() {
  return (
    <>
      <Check className="w-5 h-5" />
      <ChevronDown className="w-5 h-5" />
      <Menu className="w-5 h-5" />
    </>
  )
})
```

---

## Pattern 5: Expensive Calculation - useMemo
```tsx
'use client'

import { useMemo, memo } from 'react'

interface DataProcessorProps {
  items: Item[]
  filterType: string
}

export const DataProcessor = memo(function DataProcessor({ 
  items, 
  filterType 
}: DataProcessorProps) {
  // ✅ Only recalculate when items or filterType changes
  const filteredItems = useMemo(() => {
    return items.filter(item => item.type === filterType)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [items, filterType])

  return (
    <ul>
      {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
})
```

---

## Pattern 6: Large List - Dynamic Import + Virtualization
```tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense, memo } from 'react'

// Lazy load large list component
const VirtualList = dynamic(
  () => import('@/components/virtual-list'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

interface ListProps {
  items: string[]
}

export const LargeList = memo(function LargeList({ items }: ListProps) {
  return (
    <Suspense fallback={<div>Loading list...</div>}>
      <VirtualList items={items} />
    </Suspense>
  )
})
```

---

## Pattern 7: Modal/Dialog - Code Split
```tsx
'use client'

import dynamic from 'next/dynamic'
import { useState, memo } from 'react'

// Lazy load dialog only when opened
const DialogContent = dynamic(
  () => import('@/components/dialog-content'),
  { ssr: false }
)

export const ModalButton = memo(function ModalButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <DialogContent onClose={() => setIsOpen(false)} />}
    </>
  )
})
```

---

## Pattern 8: Scroll Animation - Respect prefers-reduce-motion
```tsx
'use client'

import { useEffect, useState, memo } from 'react'
import dynamic from 'next/dynamic'

const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
)

export const ScrollAnimatedSection = memo(function ScrollAnimatedSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (prefersReducedMotion) {
    return <div>Static content</div>
  }

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      Animated section
    </MotionDiv>
  )
})
```

---

## Checklist for Radix UI Components

When using Radix components, import ONLY what you need:

```tsx
// ❌ BAD
import * as AlertDialog from '@radix-ui/react-alert-dialog'

// ✅ GOOD
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from '@radix-ui/react-alert-dialog'
```

---

## Performance Utils Usage

```tsx
'use client'

import { debounce, throttle, deferWork, prefersReducedMotion } from '@/lib/performance-utils'
import { useCallback, useEffect, memo } from 'react'

export const SearchBox = memo(function SearchBox() {
  // ✅ Debounced search (waits 300ms after user stops typing)
  const handleSearch = useCallback(
    debounce((query: string) => {
      // Fetch search results
      console.log('Search:', query)
    }, 300),
    []
  )

  // ✅ Defer non-critical analytics
  useEffect(() => {
    deferWork(() => {
      // Non-critical tracking
    })
  }, [])

  return (
    <input 
      onChange={(e) => handleSearch(e.target.value)} 
      placeholder="Search..."
    />
  )
})
```

---

## Testing Your Optimization

### 1. Bundle Size Check
```bash
npm run build
# Look for chunk sizes in output
# Main JS should be < 150kb
```

### 2. Lighthouse Test
```
npm run dev
# Open Chrome DevTools → Lighthouse
# Target: 95+ Performance, <100ms TBT
```

### 3. GTmetrix Test
- Visit gtmetrix.com
- Test your production URL
- Target: Grade A, <100ms TBT

### 4. Profile in DevTools
```
Chrome DevTools → Performance → Record
- Scroll page
- Interact with UI
- Stop recording
- Check "Main" thread → look for long tasks
```

---

## Common Mistakes to Avoid

❌ **Mistake 1**: Using arrow functions in renders
```tsx
// ❌ Creates new function every render
<button onClick={() => handleClick()}>Click</button>

// ✅ Use useCallback
const memoizedClick = useCallback(() => handleClick(), [])
<button onClick={memoizedClick}>Click</button>
```

❌ **Mistake 2**: Importing entire libraries
```tsx
// ❌ 50kb+ bundle
import * as lucide from 'lucide-react'
<lucide.Check />

// ✅ Tree-shaking friendly
import { Check } from 'lucide-react'
<Check />
```

❌ **Mistake 3**: Forgetting dependencies in useCallback/useMemo
```tsx
// ❌ Stale closure
const memoized = useMemo(() => items.length, [])

// ✅ Proper dependencies
const memoized = useMemo(() => items.length, [items])
```

❌ **Mistake 4**: Not memoizing child components
```tsx
// ❌ Child re-renders on every parent render
function Parent() {
  return <Child />
}

// ✅ Child only re-renders if props change
const Child = memo(function Child() {
  return <div>Child</div>
})
```

---

## Summary

**For 255ms → <100ms TBT transformation:**

1. ✅ Split heavy components with `dynamic()`
2. ✅ Memoize all interactive components
3. ✅ Use specific imports (tree-shaking)
4. ✅ Debounce scroll/resize handlers
5. ✅ Respect `prefers-reduce-motion`
6. ✅ Remove `'use client'` when possible
7. ✅ Cache expensive calculations with `useMemo`
8. ✅ Remove console.log in production

**Expected improvement: 60-70% TBT reduction**
