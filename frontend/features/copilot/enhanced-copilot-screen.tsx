"use client"

import { useState, useEffect } from "react"
import { IntelligentSuggestion } from "../../shared/components/intelligent-suggestion"
import { EnhancedCard } from "../../shared/components/enhanced-card"
import { useCopilot } from "../../shared/providers/copilot-provider"
import { useNotifications } from "../../shared/providers/notification-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RefreshCw,
  Settings,
  TrendingUp,
  Activity,
  Plus,
  DollarSign,
  Heart,
  Mic,
  BookOpen,
  Music,
  Focus,
  Zap,
  BarChart3,
  Clock,
} from "lucide-react"

export function EnhancedCopilotScreen() {
  const {
    suggestions,
    loading,
    isActive,
    fetchSuggestions,
    acceptSuggestion,
    rejectSuggestion,
    toggleCopilot,
    getSuggestionsByModule,
  } = useCopilot()

  const { addNotification } = useNotifications()
  const [activeTab, setActiveTab] = useState("all")
  const [stats, setStats] = useState({
    totalSuggestions: 0,
    acceptedToday: 0,
    productivityScore: 0,
    streakDays: 0,
  })

  useEffect(() => {
    // Simulate stats calculation
    setStats({
      totalSuggestions: suggestions.length,
      acceptedToday: 3,
      productivityScore: 87,
      streakDays: 12,
    })
  }, [suggestions])

  const handleAcceptSuggestion = (id: string) => {
    acceptSuggestion(id)
    addNotification({
      type: "success",
      title: "Suggestion Applied",
      message: "Your productivity assistant has been updated with your preference.",
      duration: 3000,
    })
  }

  const handleRejectSuggestion = (id: string, reason?: string) => {
    rejectSuggestion(id, reason)
    addNotification({
      type: "info",
      title: "Suggestion Dismissed",
      message: "Thanks for the feedback. This helps improve future suggestions.",
      duration: 3000,
    })
  }

  const getFilteredSuggestions = () => {
    if (activeTab === "all") return suggestions
    return getSuggestionsByModule(activeTab)
  }

  const quickActions = [
    { icon: Plus, title: "New Note", subtitle: "Quick capture", color: "text-green-400", module: "learn" },
    {
      icon: DollarSign,
      title: "Add Transaction",
      subtitle: "Track expense",
      color: "text-yellow-400",
      module: "finance",
    },
    { icon: Heart, title: "Log Workout", subtitle: "Fitness tracking", color: "text-red-400", module: "health" },
    { icon: Mic, title: "Voice Note", subtitle: "Audio capture", color: "text-blue-400", module: "studio" },
    { icon: Focus, title: "Start Focus", subtitle: "Deep work mode", color: "text-indigo-400", module: "flow" },
    { icon: Zap, title: "Run Model", subtitle: "AI experiment", color: "text-orange-400", module: "playground" },
  ]

  const recentActivity = [
    { icon: BookOpen, text: "Added note to Mathematics notebook", time: "2 hours ago", module: "learn" },
    { icon: DollarSign, text: "Logged expense: Coffee - $4.50", time: "4 hours ago", module: "finance" },
    { icon: Heart, text: "Completed 30-minute workout", time: "Yesterday", module: "health" },
    { icon: Music, text: "Saved project: Beat 001", time: "Yesterday", module: "studio" },
  ]

  return (
    <div className="flex-1 p-4 space-y-6 bg-neutral-900 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">PulseApp Copilot</h1>
          <p className="text-neutral-400 text-sm">Your intelligent productivity companion</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant={isActive ? "default" : "outline"} onClick={toggleCopilot}>
            {isActive ? "Active" : "Inactive"}
          </Button>
          <Button size="sm" variant="outline" onClick={fetchSuggestions} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <EnhancedCard className="text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold text-white">{stats.productivityScore}</div>
          <div className="text-xs text-neutral-400">Productivity Score</div>
        </EnhancedCard>
        <EnhancedCard className="text-center">
          <Activity className="w-6 h-6 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-white">{stats.acceptedToday}</div>
          <div className="text-xs text-neutral-400">Actions Today</div>
        </EnhancedCard>
        <EnhancedCard className="text-center">
          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-white">{stats.totalSuggestions}</div>
          <div className="text-xs text-neutral-400">Active Suggestions</div>
        </EnhancedCard>
        <EnhancedCard className="text-center">
          <Clock className="w-6 h-6 mx-auto mb-2 text-orange-400" />
          <div className="text-2xl font-bold text-white">{stats.streakDays}</div>
          <div className="text-xs text-neutral-400">Day Streak</div>
        </EnhancedCard>
      </div>

      {/* Intelligent Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Smart Suggestions</h2>
          <Badge variant="secondary">{suggestions.length} active</Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-neutral-800">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="studio">Studio</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="flow">Flow</TabsTrigger>
            <TabsTrigger value="playground">Lab</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : getFilteredSuggestions().length > 0 ? (
              <div className="space-y-4">
                {getFilteredSuggestions().map((suggestion) => (
                  <IntelligentSuggestion
                    key={suggestion.id}
                    suggestion={suggestion}
                    onAccept={handleAcceptSuggestion}
                    onReject={handleRejectSuggestion}
                    onFeedback={(id) => console.log("Feedback for:", id)}
                  />
                ))}
              </div>
            ) : (
              <EnhancedCard className="text-center py-8">
                <div className="text-neutral-400 mb-2">No suggestions available</div>
                <div className="text-sm text-neutral-500">
                  {activeTab === "all"
                    ? "Your AI assistant is analyzing your patterns..."
                    : `No suggestions for ${activeTab} module`}
                </div>
              </EnhancedCard>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <EnhancedCard key={index} className="text-center cursor-pointer hover:scale-105 transition-transform">
              <action.icon className={`w-6 h-6 mx-auto mb-2 ${action.color}`} />
              <div className="text-sm font-medium text-white">{action.title}</div>
              <div className="text-xs text-neutral-400">{action.subtitle}</div>
            </EnhancedCard>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <EnhancedCard key={index} className="flex items-center gap-3 py-3">
              <activity.icon className="w-4 h-4 text-neutral-400" />
              <div className="flex-1">
                <p className="text-sm text-white">{activity.text}</p>
                <p className="text-xs text-neutral-500">{activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.module}
              </Badge>
            </EnhancedCard>
          ))}
        </div>
      </div>
    </div>
  )
}
