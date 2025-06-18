"use client"

import { AppProvider } from "../shared/providers/app-provider"
import MainApplication from "../navigation/main-application"

export default function App() {
  return (
    <AppProvider>
      <MainApplication />
    </AppProvider>
  )
}
