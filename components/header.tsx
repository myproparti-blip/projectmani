"use client"

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Inline SVG icons - zero bundle impact
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const Header = memo(function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const connectDropdownRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Optimize scroll listener with debouncing and IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 20)
      }, 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true, capture: false })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Click outside handler - only active when dropdown is open
  useEffect(() => {
    if (!connectDropdownOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (connectDropdownRef.current && !connectDropdownRef.current.contains(event.target as Node)) {
        setConnectDropdownOpen(false)
      }
    }

    // Use capture phase for better performance
    document.addEventListener("click", handleClickOutside, { capture: true })
    return () => document.removeEventListener("click", handleClickOutside, { capture: true })
  }, [connectDropdownOpen])

  const navItems = useMemo(() => [
    { label: "VIRTUAL TOUR", href: "/virtual-tour" },
    { label: "PORTFOLIO", href: "/portfolio" },
    { label: "VALUATION SERVICES", href: "/valuation-services" },
    { label: "JOIN US", href: "/join-us" },
  ], [])

  const connectMenuItems = useMemo(() => [
    { label: "WhatsApp", href: "https://wa.me/917046127242", description: "Chat with us" },
    { label: "Email", href: "mailto:mahimhr01@gmail.com", description: "Send an email" },
    { label: "Instagram", href: "https://instagram.com/mahim99arch", description: "Follow us" },
  ], [])

  const toggleConnectDropdown = useCallback(() => {
    setConnectDropdownOpen(prev => !prev)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeDropdown = useCallback(() => {
    setConnectDropdownOpen(false)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-4 left-4 right-4 z-50 transition-all duration-500 px-6 lg:px-8 py-3 rounded-3xl will-change-auto",
        isScrolled
          ? "bg-black/85 backdrop-blur-2xl border border-amber-500/40 shadow-2xl"
          : "bg-black/70 backdrop-blur-xl border border-amber-500/20 shadow-xl",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 hidden sm:flex items-center">
          <Image
            src="/images/comp logo/logoo.png"
            alt="MAHIM Architect"
            width={80}
            height={32}
            className="h-auto"
            style={{ backgroundColor: "transparent" }}
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation - CSS transitions only */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
          <Link href="/" className={cn(
            "text-xs lg:text-sm font-semibold transition-colors duration-300 whitespace-nowrap",
            pathname === "/" ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
          )}>
            HOME
          </Link>

          <Link href="/welcome" className={cn(
            "text-xs lg:text-sm font-semibold transition-colors duration-300 whitespace-nowrap",
            pathname === "/welcome" ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
          )}>
            ABOUT US
          </Link>

          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={cn(
              "text-xs lg:text-sm font-semibold transition-colors duration-300 whitespace-nowrap",
              pathname === item.href ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
            )}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Connect Button */}
        <div ref={connectDropdownRef} className="relative hidden sm:flex">
          <button
            onClick={toggleConnectDropdown}
            className="px-4 py-2 rounded-full border border-amber-500/60 text-amber-400 text-sm font-semibold hover:bg-amber-500/15 transition-all duration-300 flex items-center gap-2"
          >
            <IconMail />
            <span>Connect</span>
          </button>

          {/* Dropdown - CSS only, no animation */}
          {connectDropdownOpen && (
            <div className="absolute top-full right-0 mt-4 w-56 bg-black/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden">
              {connectMenuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                  onClick={closeDropdown}
                  className="flex items-start gap-4 px-6 py-3.5 text-sm text-gray-300 hover:bg-amber-500/15 transition-colors duration-200 border-b border-amber-500/10 last:border-b-0"
                >
                  <div className="text-amber-400 flex-shrink-0 mt-0.5">
                    <IconMail />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-200 hover:text-amber-400 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="md:hidden flex-shrink-0">
          <Image
            src="/images/comp logo/logoo.png"
            alt="MAHIM Architect"
            width={60}
            height={24}
            className="h-auto"
            loading="eager"
          />
        </Link>

        {/* Mobile Menu Button - CSS animation only */}
        <button
          className="md:hidden flex flex-col gap-1 w-6 h-6 justify-center"
          onClick={toggleMobileMenu}
        >
          <div className={cn(
            "w-5 h-0.5 bg-amber-500 rounded-full transition-all duration-300",
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          )} />
          <div className={cn(
            "w-4 h-0.5 bg-amber-500 rounded-full transition-all duration-300",
            mobileMenuOpen ? "opacity-0" : "opacity-100"
          )} />
          <div className={cn(
            "w-5 h-0.5 bg-amber-500 rounded-full transition-all duration-300",
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          )} />
        </button>
      </div>

      {/* Mobile Menu - CSS only, no animation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-4 bg-black/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden md:hidden">
          <div className="p-4 max-h-96 overflow-y-auto">
            <Link href="/" onClick={closeMobileMenu} className="block">
              <div className={cn(
                "px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/" ? "text-amber-400 bg-amber-500/15" : "text-gray-300 hover:text-amber-400 hover:bg-amber-500/15"
              )}>
                HOME
              </div>
            </Link>
            <Link href="/welcome" onClick={closeMobileMenu} className="block">
              <div className={cn(
                "px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/welcome" ? "text-amber-400 bg-amber-500/15" : "text-gray-300 hover:text-amber-400 hover:bg-amber-500/15"
              )}>
                ABOUT US
              </div>
            </Link>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMobileMenu} className="block">
                <div className={cn(
                  "px-4 py-3 text-sm font-semibold rounded-lg transition-colors",
                  pathname === item.href ? "text-amber-400 bg-amber-500/15" : "text-gray-300 hover:text-amber-400 hover:bg-amber-500/15"
                )}>
                  {item.label}
                </div>
              </Link>
            ))}
            <div className="border-t border-amber-500/20 my-2" />
            {connectMenuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                onClick={closeMobileMenu}
                className="block"
              >
                <div className="px-4 py-3 text-sm font-semibold text-gray-300 hover:text-amber-400 hover:bg-amber-500/15 rounded-lg transition-colors">
                  {item.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
})

Header.displayName = "Header"

export { Header }
