"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const steps = [
	{
		title: "Bem-vindo ao PulseApp!",
		desc: "Seu assistente inteligente para produtividade, saúde e finanças.",
		img: "/placeholder-logo.png",
	},
	{
		title: "Organize sua rotina",
		desc: "Gerencie estudos, finanças e saúde em um só lugar.",
		img: "/placeholder-user.jpg",
	},
	{
		title: "Conte com IA de verdade",
		desc: "Use o Copilot para sugestões inteligentes e automações.",
		img: "/placeholder-logo.svg",
	},
]

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
	const [step, setStep] = useState(0)
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-neutral-900 animate-fade-in p-4">
			<div className="w-24 h-24 mb-6 rounded-xl shadow-lg overflow-hidden flex items-center justify-center bg-neutral-800">
				<img
					src={steps[step].img}
					alt="Onboarding"
					className="object-cover aspect-square w-full h-full"
				/>
			</div>
			<h2 className="text-2xl font-bold text-white mb-2 text-center">
				{steps[step].title}
			</h2>
			<p className="text-neutral-400 text-base mb-6 text-center">
				{steps[step].desc}
			</p>
			{step < steps.length - 1 ? (
				<Button className="w-full" onClick={() => setStep(step + 1)}>
					P próximo
				</Button>
			) : (
				<Button className="w-full" onClick={onFinish}>
					Começar a usar
				</Button>
			)}
		</div>
	)
}
