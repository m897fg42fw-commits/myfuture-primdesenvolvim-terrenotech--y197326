import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Check, ShoppingBag, Eye, ShoppingCart, FileCheck, CheckCircle2 } from 'lucide-react'

export type FlowStepId = 'catalogo' | 'produto' | 'carrinho' | 'confirmacao'

interface StepConfig {
  id: FlowStepId
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
  path?: string
}

const STEPS: StepConfig[] = [
  { id: 'catalogo', label: 'Catálogo', shortLabel: 'Catálogo', icon: ShoppingBag, path: '/' },
  { id: 'produto', label: 'Produto', shortLabel: 'Produto', icon: Eye },
  {
    id: 'carrinho',
    label: 'Carrinho & Entrega',
    shortLabel: 'Carrinho',
    icon: ShoppingCart,
    path: '/carrinho',
  },
  { id: 'confirmacao', label: 'Confirmação', shortLabel: 'Sucesso', icon: CheckCircle2 },
]

interface FlowStepsProps {
  currentStep: FlowStepId
  className?: string
}

export function FlowSteps({ currentStep, className = '' }: FlowStepsProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <nav
      aria-label="Progresso da compra"
      className={`w-full bg-[#11141C]/80 border border-[#232B3A] rounded-2xl px-3 sm:px-4 py-2.5 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex
          const Icon = step.icon

          const content = (
            <div className="flex items-center gap-2 group">
              {/* Círculo do passo */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-[#10B981] text-[#0B0D12] shadow-sm shadow-[#10B981]/30'
                    : isCurrent
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] ring-2 ring-[#22D3EE]/50 shadow-md shadow-[#8B5CF6]/30'
                      : 'bg-[#151923] text-[#64748B] border border-[#232B3A]'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span>{index + 1}</span>}
              </div>

              {/* Rótulo */}
              <div className="hidden sm:flex flex-col">
                <span
                  className={`text-xs font-semibold leading-none ${
                    isCurrent ? 'text-white' : isDone ? 'text-[#34D399]' : 'text-[#64748B]'
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="text-[10px] text-[#22D3EE] font-mono mt-0.5">
                    Você está aqui
                  </span>
                )}
              </div>
              <span
                className={`sm:hidden text-[11px] font-semibold ${
                  isCurrent ? 'text-white' : 'text-[#64748B]'
                }`}
              >
                {step.shortLabel}
              </span>
            </div>
          )

          return (
            <React.Fragment key={step.id}>
              {/* Linha de conexão entre passos */}
              {index > 0 && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-colors ${
                    index <= currentIndex ? 'bg-[#10B981]' : 'bg-[#232B3A]'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Link clicável se já foi concluído e tem caminho */}
              {isDone && step.path ? (
                <Link
                  to={step.path}
                  className="hover:opacity-80 transition-opacity focus:outline-none"
                  title={`Voltar para ${step.label}`}
                >
                  {content}
                </Link>
              ) : (
                <div>{content}</div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </nav>
  )
}
