"use client"

import { useState } from "react"
import { EnhancedCard } from "./enhanced-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Bell,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

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

type IntelligentSuggestionProps = {
  suggestion: Suggestion
  onAccept: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onFeedback?: (id: string) => void
  compact?: boolean
}

export function IntelligentSuggestion({
  suggestion,
  onAccept,
  onReject,
  onFeedback,
  compact = false,
}: IntelligentSuggestionProps) {
  const [expanded, setExpanded] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "action":
        return <Zap className="w-4 h-4 text-blue-400" />
      case "insight":
        return <Lightbulb className="w-4 h-4 text-yellow-400" />
      case "reminder":
        return <Bell className="w-4 h-4 text-orange-400" />
      case "optimization":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      default:
        return <MessageSquare className="w-4 h-4 text-neutral-400" />
    }
  }

  const getModuleColor = (module: string) => {
    const colors = {
      learn: "bg-green-500",
      studio: "bg-purple-500",
      finance: "bg-yellow-500",
      health: "bg-red-500",
      flow: "bg-indigo-500",
      playground: "bg-orange-500",
      profile: "bg-gray-500",
    }
    return colors[module as keyof typeof colors] || "bg-neutral-500"
  }

  return (
    <EnhancedCard priority={suggestion.priority} className="relative overflow-hidden">
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className="mt-1">{getTypeIcon(suggestion.type)}</div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs capitalize">
                {suggestion.type}
              </Badge>
              <div className={`w-2 h-2 rounded-full ${getModuleColor(suggestion.module)}`} />
              <span className="text-xs text-neutral-400 capitalize">{suggestion.module}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {Math.round(suggestion.confidence * 100)}%
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="h-6 w-6 p-0">
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>
            </div>
          </div>

          {/* Content */}
          <h3 className="font-medium text-white mb-1 text-sm">{suggestion.title}</h3>
          <p className="text-sm text-neutral-300 mb-3 leading-relaxed">{suggestion.description}</p>

          {/* Expanded Context */}
          {expanded && (
            <div className="mb-4 p-3 bg-neutral-900 rounded-lg border border-neutral-700">
              <div className="text-xs text-neutral-400 mb-2">Context & Analysis:</div>
              <div className="text-xs text-neutral-300">{suggestion.context}</div>

              {suggestion.metadata && (
                <div className="mt-3 pt-2 border-t border-neutral-700">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(suggestion.metadata).map(([key, value]) => (
                      <div key={key} className="text-xs">
                        <span className="text-neutral-500">{key}:</span>
                        <span className="text-neutral-300 ml-1">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {suggestion.actionable && (
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                onClick={() => onAccept(suggestion.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Accept
              </Button>
              <Button size="sm" variant="outline" onClick={() => onReject(suggestion.id, rejectionReason)}>
                <XCircle className="w-3 h-3 mr-1" />
                Dismiss
              </Button>
              {onFeedback && (
                <Button size="sm" variant="ghost" onClick={() => onFeedback(suggestion.id)}>
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Feedback
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </EnhancedCard>
  )
}
