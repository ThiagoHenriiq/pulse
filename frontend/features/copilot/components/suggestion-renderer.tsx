"use client"

import { useState } from "react"
import { Card } from "../../../shared/components/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, MessageSquare } from "lucide-react"

type Suggestion = {
  id: string
  type: "action" | "insight" | "reminder"
  title: string
  description: string
  confidence: number
  context: string
}

type SuggestionRendererProps = {
  suggestions: Suggestion[]
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onFeedback: (id: string) => void
}

export function SuggestionRenderer({ suggestions, onAccept, onReject, onFeedback }: SuggestionRendererProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getTypeColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "action":
        return "bg-blue-500"
      case "insight":
        return "bg-green-500"
      case "reminder":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className="relative">
          <div className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(suggestion.type)} animate-pulse`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {suggestion.type}
                </Badge>
                <span className="text-xs text-neutral-500">{Math.round(suggestion.confidence * 100)}% confidence</span>
              </div>

              <h3 className="font-medium text-white mb-1">{suggestion.title}</h3>
              <p className="text-sm text-neutral-300 mb-3">{suggestion.description}</p>

              {expandedId === suggestion.id && (
                <div className="mb-3 p-2 bg-neutral-900 rounded text-xs text-neutral-400">
                  Context: {suggestion.context}
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" onClick={() => onAccept(suggestion.id)} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => onReject(suggestion.id)}>
                  <XCircle className="w-3 h-3 mr-1" />
                  Dismiss
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setExpandedId(expandedId === suggestion.id ? null : suggestion.id)}
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
