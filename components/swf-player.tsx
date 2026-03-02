"use client"

import { useEffect, useRef, useState } from "react"

interface SWFPlayerProps {
  src: string
  title?: string
}

declare global {
  interface Window {
    RufflePlayer: any
  }
}

export function SWFPlayer({ src, title }: SWFPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)

  // Prevent scroll from propagating to parent
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
    }

    container.addEventListener("wheel", handleWheel, true)
    return () => {
      container.removeEventListener("wheel", handleWheel, true)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const loadRuffle = () => {
      if (window.RufflePlayer) {
        initPlayer()
        return
      }

      // Defer Ruffle loading to idle callback to avoid blocking main thread
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadRuffleScript(), { timeout: 3000 })
      } else {
        setTimeout(loadRuffleScript, 1000)
      }
    }

    const loadRuffleScript = () => {
      const script = document.createElement("script")
      script.src = "/lib/ruffle/ruffle.js"
      script.async = true
      script.defer = true
      script.onload = () => {
        setTimeout(initPlayer, 300)
      }
      script.onerror = () => {
        setLoading(false)
      }
      document.head.appendChild(script)
    }

    const initPlayer = () => {
      if (!containerRef.current || !window.RufflePlayer) return
      if (playerRef.current) return

      try {
        const ruffle = window.RufflePlayer.newest({
          autoplay: "off",
          unmuteOverlay: "hidden",
          backgroundColor: "#000000",
          quality: "low",
          preferredRenderer: "canvas",
          contextMenu: "off",
        })

        const player = ruffle.createPlayer()
        playerRef.current = player

        player.style.width = "100%"
        player.style.height = "100%"
        player.style.display = "block"

        containerRef.current.appendChild(player)

        setTimeout(() => {
          setLoading(false)
        }, 500)

        player.load(src)
      } catch (error) {
        setLoading(false)
      }
    }

    loadRuffle()

    return () => {
      if (playerRef.current && containerRef.current) {
        try {
          if (containerRef.current.contains(playerRef.current)) {
            containerRef.current.removeChild(playerRef.current)
          }
        } catch (e) {
          // Silently fail
        }
        playerRef.current = null
      }
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div style={{ color: "#999", fontSize: "14px" }}>Loading content...</div>
        </div>
      )}
    </div>
  )
}
