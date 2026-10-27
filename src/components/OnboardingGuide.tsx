import React, { useState, useEffect } from 'react'
import {
  Compass,
  X,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  ShoppingCart,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'vendatech_onboarding_dismissed'

interface Step {
  number: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
}

const ONBOARDING_STEPS: Step[] = [
  {
    number: '01',
    title: 'Explore o catálogo',
    description: 'Filtre por categoria ou cilindrada (núcleo até 250cc ou 250–450cc).',
    icon: ShoppingBag,
    badge: 'Passo 1',
  },
  {
    number: '02',
    title: 'Veja detalhes da peça',
    description: 'Confira compatibilidade da moto, marca nacional paralela TOP e garantia com NF.',
    icon: Eye,
    badge: 'Passo 2',
  },
  {
    number: '03',
    title: 'Monte o carrinho',
    description: 'Adicione itens e informe o endereço de entrega do cliente.',
    icon: ShoppingCart,
    badge: 'Passo 3',
  },
  {
    number: '04',
    title: 'Finalize e acompanhe',
    description: 'Pedido registrado na hora, pronto para despacho e controle no painel.',
    icon: CheckCircle2,
    badge: 'Passo 4',
  },
]

interface OnboardingGuideProps {
  /** Se deve forçar a abertura programática (ex: via botão "Como funciona") */
  forceOpen?: boolean
  onClose?: () => void
}

export function OnboardingGuide({ forceOpen, onClose }: OnboardingGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true)
      return
    }
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Primeira visita: abre automaticamente
      setIsOpen(true)
    }
  }, [forceOpen])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsOpen(false)
    if (onClose) onClose()
  }

  const handleReopen = () => {
    setIsOpen(true)
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={handleReopen}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#22D3EE] bg-[#151923] hover:bg-[#1B212D] border border-[#22D3EE]/30 hover:border-[#22D3EE] transition-all shadow-sm group"
        title="Ver o passo a passo da loja"
      >
        <HelpCircle className="w-3.5 h-3.5 text-[#22D3EE] group-hover:rotate-12 transition-transform" />
        <span>Como funciona a loja? (4 passos)</span>
      </button>
    )
  }

  const activeStep = ONBOARDING_STEPS[activeStepIndex]
  const Icon = activeStep.icon

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121622] via-[#151923] to-[#0E1118] border border-[#22D3EE]/30 p-5 sm:p-6 shadow-2xl animate-fade-up">
      {/* Brilho sutil no canto */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cabeçalho do Guia */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-[#232B3A]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] flex items-center justify-center font-black shadow-md shadow-[#8B5CF6]/30">
            <Compass className="w-4 h-4 text-[#0B0D12]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded-full border border-[#22D3EE]/20">
                Guia de Bordo
              </span>
              <span className="text-xs text-[#94A3B8]">4 passos simples</span>
            </div>
            <h3 className="text-base font-extrabold text-white">Como comprar no Terrenotech</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#1E293B] border border-transparent hover:border-[#232B3A] transition-colors"
          title="Fechar guia (você pode reabrir quando quiser)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Grade com os 4 passos visíveis e auto-explicativos */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
        {ONBOARDING_STEPS.map((step, idx) => {
          const StepIcon = step.icon
          const isSelected = idx === activeStepIndex

          return (
            <div
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#182030] border-[#22D3EE]/60 shadow-lg shadow-[#22D3EE]/10 ring-1 ring-[#22D3EE]/30'
                  : 'bg-[#0B0D12]/70 border-[#232B3A] hover:border-[#38BDF8]/40 hover:bg-[#121622]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#22D3EE] text-[#0B0D12]'
                      : 'bg-[#151923] text-[#94A3B8] border border-[#232B3A]'
                  }`}
                >
                  {step.number} • {step.badge}
                </span>
                <StepIcon
                  className={`w-4 h-4 ${isSelected ? 'text-[#22D3EE]' : 'text-[#64748B]'}`}
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white leading-snug">{step.title}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed mt-1">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rodapé com botão de dispensar limpo */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-[#232B3A] text-xs">
        <span className="text-[#94A3B8] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
          <span>Fácil, direto e transparente. Quando quiser sair, use o botão no topo.</span>
        </span>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handleDismiss}
            className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold text-xs h-8 px-4 shadow-sm"
          >
            Entendido, começar a navegar
          </Button>
        </div>
      </div>
    </div>
  )
}
