"use client"

import { useState, useEffect } from "react"

type Suggestion = {
  id: string
  type: "action" | "insight" | "reminder"
  title: string
  description: string
  confidence: number
  context: string
}

export function useCopilot() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSuggestions = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockSuggestions: Suggestion[] = [
      {
        id: "1",
        type: "action",
        title: "Review your finance goals",
        description: "You haven't checked your savings progress in 5 days. Consider reviewing your monthly targets.",
        confidence: 0.85,
        context: "Based on your finance activity patterns and goal deadlines",
      },
      {
        id: "2",
        type: "reminder",
        title: "Log today's workout",
        description: "It's been 2 days since your last workout entry. Don't forget to track your progress!",
        confidence: 0.92,
        context: "Based on your health tracking habits and workout schedule",
      },
      {
        id: "3",
        type: "insight",
        title: "Peak productivity time detected",
        description:
          "Your focus sessions are most effective between 9-11 AM. Consider scheduling important tasks during this window.",
        confidence: 0.78,
        context: "Analyzed from 2 weeks of Flow mode usage data",
      },
    ]

    setSuggestions(mockSuggestions)
    setLoading(false)
  }

  const acceptSuggestion = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id))
    // Here you would typically send feedback to your AI service
  }

  const rejectSuggestion = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id))
    // Here you would typically send negative feedback to your AI service
  }

  useEffect(() => {
    fetchSuggestions()
  }, [])

  return {
    suggestions,
    loading,
    fetchSuggestions,
    acceptSuggestion,
    rejectSuggestion,
  }
}
