"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Music, DollarSign, Heart, Focus, Zap, User } from "lucide-react"

// Import feature screens
import { CopilotScreen } from "../features/copilot/copilot-screen"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, Mic, Calculator, Camera, Target, Timer, Brain, Settings } from "lucide-react"

type TabType = "home" | "learn" | "studio" | "finance" | "health" | "flow" | "playground" | "profile"

const tabs = [
  { id: "home", label: "Home", icon: Home, color: "bg-blue-500" },
  { id: "learn", label: "Learn", icon: BookOpen, color: "bg-green-500" },
  { id: "studio", label: "Studio", icon: Music, color: "bg-purple-500" },
  { id: "finance", label: "Finance", icon: DollarSign, color: "bg-yellow-500" },
  { id: "health", label: "Health", icon: Heart, color: "bg-red-500" },
  { id: "flow", label: "Flow", icon: Focus, color: "bg-indigo-500" },
  { id: "playground", label: "Playground", icon: Zap, color: "bg-orange-500" },
  { id: "profile", label: "Profile", icon: User, color: "bg-gray-500" },
] as const

export default function MainTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("home")

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <CopilotScreen />
      case "learn":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Learn Screen - Coming Soon</div>
      case "studio":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Studio Screen - Coming Soon</div>
      case "finance":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Finance Screen - Coming Soon</div>
      case "health":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Health Screen - Coming Soon</div>
      case "flow":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Flow Screen - Coming Soon</div>
      case "playground":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Playground Screen - Coming Soon</div>
      case "profile":
        return <div className="flex-1 p-4 bg-neutral-900 text-white">Profile Screen - Coming Soon</div>
      default:
        return <CopilotScreen />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">{renderTabContent()}</div>

      {/* Bottom Tab Navigation */}
      <div className="border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-sm">
        <div className="flex justify-around items-center py-2 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  isActive ? "text-white bg-neutral-800" : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Home Screen - Copilot Global
function HomeScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">PulseApp Copilot</h1>
        <Button size="sm" variant="outline">
          <Bell className="w-4 h-4" />
        </Button>
      </div>

      <Card className="bg-neutral-800 border-neutral-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI Suggestions</span>
          </div>
          <p className="text-neutral-300 text-sm mb-3">
            Based on your recent activity, I suggest reviewing your finance goals and adding today's workout.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">
              Accept
            </Button>
            <Button size="sm" variant="ghost">
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <QuickActionCard icon={Plus} title="New Note" subtitle="Quick capture" />
        <QuickActionCard icon={DollarSign} title="Add Transaction" subtitle="Track expense" />
        <QuickActionCard icon={Heart} title="Log Workout" subtitle="Fitness tracking" />
        <QuickActionCard icon={Mic} title="Voice Note" subtitle="Audio capture" />
      </div>
    </div>
  )
}

// Learn Screen - Studies/Productivity
function LearnScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Learn</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Notebook
        </Button>
      </div>

      <div className="space-y-3">
        <NotebookCard title="Mathematics" notes={12} lastModified="2 hours ago" />
        <NotebookCard title="Computer Science" notes={8} lastModified="1 day ago" />
        <NotebookCard title="Physics" notes={15} lastModified="3 days ago" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <ToolCard icon={Calculator} title="Calculator" subtitle="Scientific calc" />
        <ToolCard icon={Brain} title="Study Copilot" subtitle="AI assistance" />
      </div>
    </div>
  )
}

// Studio Screen - Music/Creation
function StudioScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Studio</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card className="bg-neutral-800 border-neutral-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Current Project: Beat 001</span>
            <Badge variant="secondary">Recording</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <Music className="w-4 h-4" />
              </div>
              <span className="text-sm">Track 1 - Drums</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <Music className="w-4 h-4" />
              </div>
              <span className="text-sm">Track 2 - Bass</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Finance Screen
function FinanceScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Finance</h1>
        <Button size="sm">
          <Camera className="w-4 h-4 mr-2" />
          Scan Receipt
        </Button>
      </div>

      <Card className="bg-neutral-800 border-neutral-700">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">$2,450.00</div>
            <div className="text-sm text-neutral-400">Current Balance</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <ToolCard icon={Plus} title="Add Transaction" subtitle="Quick entry" />
        <ToolCard icon={Target} title="Goals" subtitle="Savings targets" />
      </div>
    </div>
  )
}

// Health Screen
function HealthScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Health</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Log Activity
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-red-400" />
            <div className="text-xl font-bold">72</div>
            <div className="text-xs text-neutral-400">BPM</div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-800 border-neutral-700">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-xl font-bold">8,432</div>
            <div className="text-xs text-neutral-400">Steps</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Flow Screen - Focus Mode
function FlowScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Flow Mode</h1>
        <div className="text-6xl font-mono">25:00</div>
        <div className="text-neutral-400">Focus Session</div>
        <Button size="lg" className="w-32">
          <Timer className="w-4 h-4 mr-2" />
          Start
        </Button>
      </div>
    </div>
  )
}

// Playground Screen - AI Lab
function PlaygroundScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Playground</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Agent
        </Button>
      </div>

      <Card className="bg-neutral-800 border-neutral-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="font-medium">Local AI Models</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">GPT-4 Mini</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Llama 3.2</span>
              <Badge variant="outline">Idle</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Profile Screen
function ProfileScreen() {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-neutral-700 rounded-full mx-auto flex items-center justify-center">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-neutral-400">john@example.com</p>
        </div>
      </div>

      <div className="space-y-2">
        <SettingItem icon={Settings} title="Settings" />
        <SettingItem icon={Bell} title="Notifications" />
        <SettingItem icon={Heart} title="Privacy & Data" />
      </div>
    </div>
  )
}

// Helper Components
function QuickActionCard({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <Card className="bg-neutral-800 border-neutral-700 hover:bg-neutral-750 cursor-pointer transition-colors">
      <CardContent className="p-4 text-center">
        <Icon className="w-6 h-6 mx-auto mb-2 text-neutral-300" />
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-neutral-400">{subtitle}</div>
      </CardContent>
    </Card>
  )
}

function NotebookCard({ title, notes, lastModified }: { title: string; notes: number; lastModified: string }) {
  return (
    <Card className="bg-neutral-800 border-neutral-700 hover:bg-neutral-750 cursor-pointer transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-neutral-400">{notes} notes</p>
          </div>
          <span className="text-xs text-neutral-500">{lastModified}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ToolCard({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <Card className="bg-neutral-800 border-neutral-700 hover:bg-neutral-750 cursor-pointer transition-colors">
      <CardContent className="p-4 text-center">
        <Icon className="w-6 h-6 mx-auto mb-2 text-neutral-300" />
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-neutral-400">{subtitle}</div>
      </CardContent>
    </Card>
  )
}

function SettingItem({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <Card className="bg-neutral-800 border-neutral-700 hover:bg-neutral-750 cursor-pointer transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-neutral-300" />
          <span className="font-medium">{title}</span>
        </div>
      </CardContent>
    </Card>
  )
}
