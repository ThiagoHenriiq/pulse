"use client"

import type { LucideIcon } from "lucide-react"
import { Card } from "./card"

type QuickActionProps = {
  icon: LucideIcon
  title: string
  subtitle: string
  onClick?: () => void
  color?: string
}

export function QuickAction({ icon: Icon, title, subtitle, onClick, color = "text-neutral-300" }: QuickActionProps) {
  return (
    <Card onClick={onClick} className="text-center">
      <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="text-xs text-neutral-400">{subtitle}</div>
    </Card>
  )
}
