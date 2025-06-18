"use client"

import { useState, useEffect, useRef } from "react"
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
  const [prompt, setPrompt] = useState("")
  const [copilotResult, setCopilotResult] = useState<string | null>(null)
  const [copilotLoading, setCopilotLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Função para enviar prompt para a rota API Copilot
  const handleCopilotPrompt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt) return
    setCopilotLoading(true)
    setCopilotResult(null)
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setCopilotResult(data.result || data.error || "No response")
    } catch (err: any) {
      setCopilotResult("Erro ao consultar a API Copilot")
    } finally {
      setCopilotLoading(false)
      setPrompt("")
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex-1 min-h-screen max-w-md mx-auto bg-gradient-to-br from-neutral-900 via-blue-950 to-neutral-900 relative overflow-x-hidden">
      {/* Cabeçalho fixo estilo iOS */}
      <header className="sticky top-0 z-30 flex flex-col items-center justify-center py-4 bg-neutral-900/80 backdrop-blur-md shadow-md rounded-b-3xl mb-4">
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-2 shadow-lg">
          <img src="/placeholder-logo.png" alt="PulseApp" className="object-contain w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">PulseApp Copilot</h1>
        <p className="text-blue-300 text-xs font-medium">Seu assistente inteligente</p>
      </header>
      {/* Formulário Copilot */}
      <form onSubmit={handleCopilotPrompt} className="flex gap-2 mb-4 px-4">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 rounded-xl px-4 py-3 bg-white/10 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-base shadow-inner backdrop-blur-md"
          placeholder="Pergunte algo ao Copilot..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          disabled={copilotLoading}
        />
        <Button type="submit" size="sm" className="rounded-xl px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-md" disabled={copilotLoading || !prompt}>
          {copilotLoading ? "..." : "Enviar"}
        </Button>
      </form>
      {/* Resposta do Copilot */}
      {copilotResult && (
        <div className="mx-4 mb-4">
          <EnhancedCard className="bg-white/20 border-none shadow-xl rounded-2xl p-4 text-white backdrop-blur-md animate-pop-in">
            <div className="font-semibold mb-1 text-blue-200">Resposta do Copilot:</div>
            <div className="whitespace-pre-line text-blue-100 text-base">{copilotResult}</div>
          </EnhancedCard>
        </div>
      )}
      {/* Dashboard minimalista */}
      <div className="grid grid-cols-2 gap-4 px-4 mb-4">
        <EnhancedCard className="rounded-2xl bg-white/10 shadow-lg text-center py-4 backdrop-blur-md">
          <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-400" />
          <div className="text-xl font-bold text-white">{stats.productivityScore}</div>
          <div className="text-xs text-neutral-300">Produtividade</div>
        </EnhancedCard>
        <EnhancedCard className="rounded-2xl bg-white/10 shadow-lg text-center py-4 backdrop-blur-md">
          <Activity className="w-6 h-6 mx-auto mb-1 text-blue-400" />
          <div className="text-xl font-bold text-white">{stats.acceptedToday}</div>
          <div className="text-xs text-neutral-300">Ações Hoje</div>
        </EnhancedCard>
      </div>
      {/* Quick Actions estilo launcher */}
      <section className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-white mb-2">Ações Rápidas</h2>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <EnhancedCard key={index} className="rounded-2xl bg-white/10 shadow-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:scale-105 transition-transform backdrop-blur-md">
              <action.icon className={`w-8 h-8 mb-2 ${action.color}`} />
              <div className="text-sm font-semibold text-white mb-1">{action.title}</div>
              <div className="text-xs text-neutral-300">{action.subtitle}</div>
            </EnhancedCard>
          ))}
        </div>
      </section>
      {/* Sugestões Inteligentes */}
      <section className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-white mb-2">Sugestões Inteligentes</h2>
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : getFilteredSuggestions().length > 0 ? (
            getFilteredSuggestions().map((suggestion) => (
              <EnhancedCard key={suggestion.id} className="rounded-2xl bg-white/10 shadow-lg p-4 text-white backdrop-blur-md animate-fade-in">
                <IntelligentSuggestion
                  suggestion={suggestion}
                  onAccept={handleAcceptSuggestion}
                  onReject={handleRejectSuggestion}
                  onFeedback={(id) => console.log("Feedback for:", id)}
                />
              </EnhancedCard>
            ))
          ) : (
            <EnhancedCard className="rounded-2xl bg-white/10 shadow-lg text-center py-6 text-neutral-300 backdrop-blur-md">
              Nenhuma sugestão disponível
            </EnhancedCard>
          )}
        </div>
      </section>
      {/* Atividade Recente colapsável */}
      <section className="px-4 mb-8">
        <details className="rounded-2xl bg-white/10 shadow-lg p-4 backdrop-blur-md">
          <summary className="text-white font-semibold cursor-pointer mb-2">Atividade Recente</summary>
          <div className="space-y-2 mt-2">
            {recentActivity.map((activity, index) => (
              <EnhancedCard key={index} className="flex items-center gap-3 py-3 bg-transparent shadow-none">
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
        </details>
      </section>
    </div>
  )
}
