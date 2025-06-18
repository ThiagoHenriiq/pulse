"use client"

import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { AuthProvider } from "./auth-provider"
import { CopilotProvider } from "./copilot-provider"
import { NotificationProvider } from "./notification-provider"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CopilotProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </CopilotProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
