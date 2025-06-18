"use client"

import { useNotifications } from "../providers/notification-provider"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

export function NotificationCenter() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "info":
        return <Info className="w-4 h-4 text-blue-400" />
      default:
        return <Info className="w-4 h-4 text-neutral-400" />
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 shadow-lg animate-in slide-in-from-right-full"
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white">{notification.title}</h4>
              <p className="text-sm text-neutral-300 mt-1">{notification.message}</p>
              {notification.action && (
                <Button size="sm" variant="outline" className="mt-2" onClick={notification.action.onClick}>
                  {notification.action.label}
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeNotification(notification.id)}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
