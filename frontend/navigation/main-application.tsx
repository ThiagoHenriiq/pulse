"use client"

import { useState, useRef } from "react"
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
  const [animating, setAnimating] = useState(false)
  const [nextTab, setNextTab] = useState<TabType | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Notas para aba Learn
  const [notes, setNotes] = useState<string[]>([])
  const [newNote, setNewNote] = useState("")
  // Treinos para aba Health
  const [workouts, setWorkouts] = useState<string[]>([])
  const [newWorkout, setNewWorkout] = useState("")

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab || animating) return
    setAnimating(true)
    setNextTab(tab)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveTab(tab)
      setAnimating(false)
      setNextTab(null)
    }, 250)
  }

  const renderTabContent = (tab: TabType) => {
    switch (tab) {
      case "home":
        return <EnhancedCopilotScreen />
      case "learn":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Aprendizado</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md mb-2">
              <div className="font-semibold mb-1">Notas do dia</div>
              {notes.length === 0 ? (
                <div className="text-sm text-neutral-300 mb-2">Nenhuma nota salva hoje.</div>
              ) : (
                <ul className="mb-2 space-y-1">
                  {notes.map((note, idx) => (
                    <li key={idx} className="text-neutral-200 text-sm bg-neutral-700 rounded px-2 py-1 flex justify-between items-center">
                      {note}
                      <button onClick={() => setNotes(notes.filter((_, i) => i !== idx))} className="ml-2 text-red-400 text-xs">remover</button>
                    </li>
                  ))}
                </ul>
              )}
              <form className="flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); if (newNote) { setNotes([newNote, ...notes]); setNewNote("") } }}>
                <input
                  className="flex-1 rounded-lg px-2 py-1 bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                  placeholder="Nova nota..."
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  maxLength={120}
                />
                <Button type="submit" size="sm" className="min-w-[80px]">Salvar</Button>
              </form>
            </div>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
              <div className="font-semibold mb-1">Progresso</div>
              <div className="text-sm text-neutral-300">Você estudou {notes.length} nota(s) hoje.</div>
            </div>
          </div>
        )
      case "studio":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Estúdio</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
              <div className="font-semibold mb-1">Projetos recentes</div>
              <div className="text-sm text-neutral-300 mb-2">Nenhum projeto salvo.</div>
              <Button className="w-full">Novo Projeto</Button>
            </div>
          </div>
        )
      case "finance":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Finanças</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
              <div className="font-semibold mb-1">Resumo financeiro</div>
              <div className="text-sm text-neutral-300 mb-2">Nenhuma transação recente.</div>
              <Button className="w-full">Adicionar Transação</Button>
            </div>
          </div>
        )
      case "health":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Saúde</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md mb-2">
              <div className="font-semibold mb-1">Treinos registrados</div>
              {workouts.length === 0 ? (
                <div className="text-sm text-neutral-300 mb-2">Nenhum treino registrado.</div>
              ) : (
                <ul className="mb-2 space-y-1">
                  {workouts.map((w, idx) => (
                    <li key={idx} className="text-neutral-200 text-sm bg-neutral-700 rounded px-2 py-1 flex justify-between items-center">
                      {w}
                      <button onClick={() => setWorkouts(workouts.filter((_, i) => i !== idx))} className="ml-2 text-red-400 text-xs">remover</button>
                    </li>
                  ))}
                </ul>
              )}
              <form className="flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); if (newWorkout) { setWorkouts([newWorkout, ...workouts]); setNewWorkout("") } }}>
                <input
                  className="flex-1 rounded-lg px-2 py-1 bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                  placeholder="Novo treino..."
                  value={newWorkout}
                  onChange={e => setNewWorkout(e.target.value)}
                  maxLength={80}
                />
                <Button type="submit" size="sm" className="min-w-[80px]">Registrar</Button>
              </form>
            </div>
          </div>
        )
      case "flow":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Flow</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
              <div className="font-semibold mb-1">Modo Foco</div>
              <div className="text-sm text-neutral-300 mb-2">Nenhuma sessão ativa.</div>
              <Button className="w-full">Iniciar Foco</Button>
            </div>
          </div>
        )
      case "playground":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Playground</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
              <div className="font-semibold mb-1">Testes e protótipos</div>
              <div className="text-sm text-neutral-300 mb-2">Nada por aqui ainda.</div>
              <Button className="w-full">Novo Teste</Button>
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="flex flex-col gap-3 p-2 sm:p-4 bg-neutral-900 text-white min-h-[60vh]">
            <h2 className="text-lg font-bold mb-2">Perfil</h2>
            <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
              <div className="font-semibold mb-1">Seus dados</div>
              <div className="text-sm text-neutral-300 mb-2">Personalize seu perfil.</div>
              <Button className="w-full">Editar Perfil</Button>
            </div>
          </div>
        )
      default:
        return <EnhancedCopilotScreen />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white relative">
      {/* Main Content Area with animation */}
      <div className="flex-1 overflow-auto relative">
        <div
          key={activeTab}
          className={`absolute inset-0 transition-all duration-300 ${animating ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'} z-10`}
        >
          {renderTabContent(activeTab)}
        </div>
        {animating && nextTab && (
          <div
            key={nextTab}
            className="absolute inset-0 opacity-100 translate-x-0 transition-all duration-300 z-20 animate-fade-in"
          >
            {renderTabContent(nextTab)}
          </div>
        )}
      </div>
      {/* Enhanced Bottom Navigation */}
      <div className="border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-sm sticky bottom-0 z-20">
        <div className="flex justify-around items-center py-2 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id && !animating
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="icon"
                onClick={() => handleTabChange(tab.id as TabType)}
                className={`flex flex-col items-center gap-0 h-auto py-1 px-2 rounded-full transition-all duration-200 focus:ring-2 focus:ring-blue-500 active:scale-95 ${
                  isActive
                    ? `text-white bg-neutral-800 ${tab.color} shadow-lg`
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/70"
                }`}
                style={{ minWidth: 56 }}
                aria-label={tab.label}
              >
                <Icon className={`w-7 h-7 mb-0.5 ${isActive ? tab.color : ""}`} />
                <span className="text-[11px] font-medium leading-none">{tab.label}</span>
                {isActive && <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${tab.color.replace("text-", "bg-")}`}/>} 
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
