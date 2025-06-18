"use client"

import { AppProvider } from "../shared/providers/app-provider"
import MainApplication from "../navigation/main-application"
import { useState } from "react"
import dynamic from "next/dynamic"
const SplashScreen = dynamic(() => import("../app/splash"), { ssr: false })
const Onboarding = dynamic(() => import("../app/onboarding"), { ssr: false })

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [appReady, setAppReady] = useState(false)

  if (showSplash) {
    return <SplashScreen onFinish={() => {
      setShowSplash(false)
      setShowOnboarding(true)
    }} />
  }
  if (showOnboarding) {
    return <Onboarding onFinish={() => {
      setShowOnboarding(false)
      setAppReady(true)
    }} />
  }
  if (appReady) {
    return (
      <AppProvider>
        <MainApplication />
      </AppProvider>
    )
  }
  return null
}
