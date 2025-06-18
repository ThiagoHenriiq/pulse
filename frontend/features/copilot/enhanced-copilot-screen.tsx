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
    <div className="flex-1 p-2 sm:p-4 space-y-4 bg-gradient-to-br from-neutral-900 via-blue-950 to-neutral-900 max-w-md mx-auto w-full min-h-screen animate-fade-in">
      {/* Cabeçalho visual marcante */}
      <div className="flex flex-col items-center justify-center mb-4 mt-2">
        <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center">
          <img src="/placeholder-logo.png" alt="PulseApp" className="object-contain aspect-square w-full h-full" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight drop-shadow-md animate-fade-in">PulseApp Copilot</h1>
        <p className="text-blue-300 text-xs font-medium animate-fade-in">Seu assistente inteligente</p>
      </div>
      {/* Formulário Copilot - Mobile First */}
      <form onSubmit={handleCopilotPrompt} className="flex gap-2 mb-4 sticky top-2 z-10 bg-neutral-900/90 rounded-xl shadow-md p-2 animate-fade-in">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 rounded-lg px-3 py-2 bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          placeholder="Pergunte algo ao Copilot..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          disabled={copilotLoading}
          autoFocus
        />
        <Button type="submit" size="sm" className="min-w-[80px]" disabled={copilotLoading || !prompt}>
          {copilotLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
      {copilotResult && (
        <EnhancedCard className="mb-3 bg-neutral-800 text-white border border-blue-500 animate-fade-in text-base break-words p-3 animate-pop-in">
          <div className="font-semibold mb-1 text-blue-300">Resposta do Copilot:</div>
          <div className="whitespace-pre-line text-blue-200 text-base">{copilotResult}</div>
        </EnhancedCard>
      )}
      {/* Stats Dashboard - Mobile Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <EnhancedCard className="text-center py-2 animate-pop-in">
          <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-400" />
          <div className="text-lg font-bold text-white">{stats.productivityScore}</div>
          <div className="text-xs text-neutral-400">Produtividade</div>
        </EnhancedCard>
        <EnhancedCard className="text-center py-2 animate-pop-in">
          <Activity className="w-5 h-5 mx-auto mb-1 text-blue-400" />
          <div className="text-lg font-bold text-white">{stats.acceptedToday}</div>
          <div className="text-xs text-neutral-400">Ações Hoje</div>
        </EnhancedCard>
      </div>
      {/* Sugestões Inteligentes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-white">Sugestões Inteligentes</h2>
          <Badge variant="secondary">{suggestions.length} ativas</Badge>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="studio">Studio</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : getFilteredSuggestions().length > 0 ? (
              <div className="space-y-3">
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
              <EnhancedCard className="text-center py-6">
                <div className="text-neutral-400 mb-2">Nenhuma sugestão disponível</div>
                <div className="text-sm text-neutral-500">
                  {activeTab === "all"
                    ? "Seu assistente está analisando seus padrões..."
                    : `Nenhuma sugestão para ${activeTab}`}
                </div>
              </EnhancedCard>
            )}
          </TabsContent>
        </Tabs>
      </div>
      {/* Seções colapsáveis para ações rápidas e atividades recentes */}
      <details className="mb-2">
        <summary className="text-white font-semibold cursor-pointer">Ações Rápidas</summary>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {quickActions.map((action, index) => (
            <EnhancedCard key={index} className="text-center cursor-pointer hover:scale-105 transition-transform">
              <action.icon className={`w-6 h-6 mx-auto mb-2 ${action.color}`} />
              <div className="text-sm font-medium text-white">{action.title}</div>
              <div className="text-xs text-neutral-400">{action.subtitle}</div>
            </EnhancedCard>
          ))}
        </div>
      </details>
      <details>
        <summary className="text-white font-semibold cursor-pointer">Atividade Recente</summary>
        <div className="space-y-2 mt-2">
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
      </details>
    </div>
  )
}
