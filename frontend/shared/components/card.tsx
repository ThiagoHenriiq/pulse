"use client"

import type { ReactNode } from "react"
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CardProps = {
  title?: string
  description?: string
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ title, description, children, className = "", onClick }: CardProps) {
  return (
    <UICard
      className={`bg-neutral-800 border-neutral-700 hover:bg-neutral-750 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-white">{title}</CardTitle>
          {description && <p className="text-neutral-400 text-sm">{description}</p>}
        </CardHeader>
      )}
      <CardContent className="pt-0">{children}</CardContent>
    </UICard>
  )
}
