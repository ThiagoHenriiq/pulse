"use client"

import type { ReactNode } from "react"
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Star, Bookmark } from "lucide-react"

type EnhancedCardProps = {
  title?: string
  description?: string
  children?: ReactNode
  className?: string
  onClick?: () => void
  priority?: "low" | "medium" | "high"
  starred?: boolean
  bookmarked?: boolean
  metadata?: Record<string, any>
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: "default" | "secondary" | "outline" | "ghost"
  }>
  loading?: boolean
}

export function EnhancedCard({
  title,
  description,
  children,
  className = "",
  onClick,
  priority,
  starred,
  bookmarked,
  metadata,
  actions,
  loading,
}: EnhancedCardProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-transparent"
    }
  }

  return (
    <UICard
      className={`bg-neutral-800 border-neutral-700 hover:bg-neutral-750 transition-all duration-200 border-l-4 ${getPriorityColor(priority)} ${className} ${loading ? "animate-pulse" : ""}`}
      onClick={onClick}
    >
      {title && (
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-white text-base">{title}</CardTitle>
                {priority && (
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      priority === "high"
                        ? "border-red-500 text-red-400"
                        : priority === "medium"
                          ? "border-yellow-500 text-yellow-400"
                          : "border-green-500 text-green-400"
                    }`}
                  >
                    {priority}
                  </Badge>
                )}
              </div>
              {description && <p className="text-neutral-400 text-sm mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-1">
              {starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
              {bookmarked && <Bookmark className="w-4 h-4 text-blue-400 fill-current" />}
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="pt-0">
        {children}
        {metadata && (
          <div className="mt-3 pt-3 border-t border-neutral-700">
            <div className="flex flex-wrap gap-2">
              {Object.entries(metadata).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key}: {String(value)}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {actions && actions.length > 0 && (
          <div className="flex gap-2 mt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant={action.variant || "default"}
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick()
                }}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </UICard>
  )
}
