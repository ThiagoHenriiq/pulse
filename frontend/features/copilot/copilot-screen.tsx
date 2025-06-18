"use client"

import { SuggestionRenderer } from "./components/suggestion-renderer"
import { QuickAction } from "../../shared/components/quick-action"
import { useCopilot } from "./hooks/use-copilot"
import { Button } from "@/components/ui/button"
import { Bell, Plus, DollarSign, Heart, Mic, BookOpen, RefreshCw } from "lucide-react"

export function CopilotScreen() {
  const { suggestions, loading, fetchSuggestions, acceptSuggestion, rejectSuggestion } = useCopilot()

  return (
    <div className="flex-1 p-4 space-y-6 bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">PulseApp Copilot</h1>
          <p className="text-neutral-400 text-sm">Your AI-powered productivity assistant</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={fetchSuggestions} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" variant="outline">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AI Suggestions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Smart Suggestions</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <SuggestionRenderer
            suggestions={suggestions}
            onAccept={acceptSuggestion}
            onReject={rejectSuggestion}
            onFeedback={(id) => console.log("Feedback for:", id)}
          />
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickAction icon={Plus} title="New Note" subtitle="Quick capture" color="text-green-400" />
          <QuickAction icon={DollarSign} title="Add Transaction" subtitle="Track expense" color="text-yellow-400" />
          <QuickAction icon={Heart} title="Log Workout" subtitle="Fitness tracking" color="text-red-400" />
          <QuickAction icon={Mic} title="Voice Note" subtitle="Audio capture" color="text-blue-400" />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Recent Activity</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-neutral-800 rounded-lg">
            <BookOpen className="w-4 h-4 text-green-400" />
            <div className="flex-1">
              <p className="text-sm text-white">Added note to Mathematics notebook</p>
              <p className="text-xs text-neutral-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neutral-800 rounded-lg">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <div className="flex-1">
              <p className="text-sm text-white">Logged expense: Coffee - $4.50</p>
              <p className="text-xs text-neutral-400">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neutral-800 rounded-lg">
            <Heart className="w-4 h-4 text-red-400" />
            <div className="flex-1">
              <p className="text-sm text-white">Completed 30-minute workout</p>
              <p className="text-xs text-neutral-400">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
