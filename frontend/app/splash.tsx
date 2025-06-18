"use client"

import { useEffect } from "react"

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1800)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 animate-fade-in">
      <img src="/placeholder-logo.png" alt="PulseApp" className="w-20 h-20 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-white mb-2">PulseApp</h1>
      <p className="text-neutral-400 text-sm">Seu assistente inteligente</p>
    </div>
  )
}
