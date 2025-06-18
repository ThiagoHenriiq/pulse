"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Music, DollarSign, Heart, Focus, Zap, User } from "lucide-react"
import { EnhancedCopilotScreen } from "../features/copilot/enhanced-copilot-screen"
import { NotificationCenter } from "../shared/components/notification-center"

type TabType = "home" | "learn" | "studio" | "finance" | "health" | "flow" | "playground" | "profile"

const tabs = [
  { id: "home", label: "Home", icon: Home, color: "text-blue-400" },
  { id: "learn", label: "Learn", icon: BookOpen, color: "text-green-400" },
  { id: "studio", label: "Studio", icon: Music, color: "text-purple-400" },
  { id: "finance", label: "Finance", icon: DollarSign, color: "text-yellow-400" },
  { id: "health", label: "Health", icon: Heart, color: "text-red-400" },
  { id: "flow", label: "Flow", icon: Focus, color: "text-indigo-400" },
  { id: "playground", label: "Playground", icon: Zap, color: "text-orange-400" },
  { id: "profile", label: "Profile", icon: User, color: "text-gray-400" },
] as const

export default function MainApplication() {
  const [activeTab, setActiveTab] = useState<TabType>("home")

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <EnhancedCopilotScreen />
      case "learn":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Learn Module - Enhanced Version Coming Soon</div>
      case "studio":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Studio Module - Enhanced Version Coming Soon</div>
      case "finance":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Finance Module - Enhanced Version Coming Soon</div>
      case "health":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Health Module - Enhanced Version Coming Soon</div>
      case "flow":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Flow Module - Enhanced Version Coming Soon</div>
      case "playground":
        return (
          <div className="flex-1 p-4 bg-neutral-900 text-white">Playground Module - Enhanced Version Coming Soon</div>
        )
      case "profile":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Profile Module - Enhanced Version Coming Soon</div>
      default:
        return <EnhancedCopilotScreen />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white relative">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">{renderTabContent()}</div>

      {/* Enhanced Bottom Navigation */}
      <div className="border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-sm">
        <div className="flex justify-around items-center py-3 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all duration-200 ${
                  isActive
                    ? `text-white bg-neutral-800 ${tab.color}`
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? tab.color : ""}`} />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && <div className={`w-1 h-1 rounded-full ${tab.color.replace("text-", "bg-")}`} />}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter />
    </div>
  )
}
