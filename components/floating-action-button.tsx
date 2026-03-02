"use client"

import { MessageCircle } from "lucide-react"

export function FloatingActionButton() {
  return (
    <a
      href="https://wa.me/917046127242"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 will-change-transform"
      style={{ animationDelay: '800ms', animationFillMode: 'both' }}
    >
      <MessageCircle size={24} className="will-change-transform" />
    </a>
  )
}
