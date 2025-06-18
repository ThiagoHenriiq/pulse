"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

type Suggestion = {
  id: string
  type: "action" | "insight" | "reminder" | "optimization"
  title: string
  description: string
  confidence: number
  context: string
  module: string
  priority: "low" | "medium" | "high"
  actionable: boolean
  metadata?: Record<string, any>
}

type CopilotContextType = {
  suggestions: Suggestion[]
  loading: boolean
  isActive: boolean
  contextData: Record<string, any>
  fetchSuggestions: () => Promise<void>
  acceptSuggestion: (id: string) => void
  rejectSuggestion: (id: string, reason?: string) => void
  updateContext: (module: string, data: any) => void
  toggleCopilot: () => void
  getSuggestionsByModule: (module: string) => Suggestion[]
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined)

export function CopilotProvider({ children }: { children: React.ReactNode }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [contextData, setContextData] = useState<Record<string, any>>({})

  const fetchSuggestions = useCallback(async () => {
    if (!isActive) return

    setLoading(true)
    try {
      // Simulate AI processing with context awareness
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockSuggestions: Suggestion[] = [
        {
          id: "1",
          type: "optimization",
          title: "Optimize your study schedule",
          description: "Based on your focus patterns, studying Math between 9-11 AM could improve retention by 23%.",
          confidence: 0.89,
          context: "Analyzed 2 weeks of Flow mode data and Learn module usage",
          module: "learn",
          priority: "high",
          actionable: true,
          metadata: { suggestedTime: "09:00", subject: "Mathematics", improvement: 23 },
        },
        {
          id: "2",
          type: "insight",
          title: "Spending pattern detected",
          description: "Your coffee expenses increased 40% this week. Consider setting a daily limit of $8.",
          confidence: 0.92,
          context: "OCR analysis of 12 receipts and transaction patterns",
          module: "finance",
          priority: "medium",
          actionable: true,
          metadata: { category: "coffee", increase: 40, suggestedLimit: 8 },
        },
        {
          id: "3",
          type: "reminder",
          title: "Workout consistency opportunity",
          description: "You've missed 2 planned workouts. Your best performance days are Tue/Thu/Sat.",
          confidence: 0.85,
          context: "Health tracking and habit analysis",
          module: "health",
          priority: "medium",
          actionable: true,
          metadata: { missedWorkouts: 2, bestDays: ["Tuesday", "Thursday", "Saturday"] },
        },
        {
          id: "4",
          type: "action",
          title: "Creative session recommended",
          description: "Your Studio projects show 67% completion rate. Finish 'Beat 001' to maintain momentum.",
          confidence: 0.78,
          context: "Project completion analysis and creative flow patterns",
          module: "studio",
          priority: "low",
          actionable: true,
          metadata: { project: "Beat 001", completionRate: 67 },
        },
      ]

      setSuggestions(mockSuggestions)
    } catch (error) {
      console.error("Failed to fetch suggestions:", error)
    } finally {
      setLoading(false)
    }
  }, [isActive, contextData])

  const acceptSuggestion = useCallback((id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id))
    // Track acceptance for ML improvement
    console.log("Suggestion accepted:", id)
  }, [])

  const rejectSuggestion = useCallback((id: string, reason?: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id))
    // Track rejection with reason for ML improvement
    console.log("Suggestion rejected:", id, reason)
  }, [])

  const updateContext = useCallback((module: string, data: any) => {
    setContextData((prev) => ({
      ...prev,
      [module]: { ...prev[module], ...data },
    }))
  }, [])

  const toggleCopilot = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const getSuggestionsByModule = useCallback(
    (module: string) => {
      return suggestions.filter((s) => s.module === module)
    },
    [suggestions],
  )

  useEffect(() => {
    fetchSuggestions()
    const interval = setInterval(fetchSuggestions, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [fetchSuggestions])

  return (
    <CopilotContext.Provider
      value={{
        suggestions,
        loading,
        isActive,
        contextData,
        fetchSuggestions,
        acceptSuggestion,
        rejectSuggestion,
        updateContext,
        toggleCopilot,
        getSuggestionsByModule,
      }}
    >
      {children}
    </CopilotContext.Provider>
  )
}

export const useCopilot = () => {
  const context = useContext(CopilotContext)
  if (context === undefined) {
    throw new Error("useCopilot must be used within a CopilotProvider")
  }
  return context
}
