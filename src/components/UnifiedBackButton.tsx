import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface UnifiedBackButtonProps {
  /** Rota explícita para onde voltar. Se não fornecida, usa history.back() com fallback para '/' */
  to?: string
  /** Texto do botão (padrão: "Voltar") */
  label?: string
  /** Texto contextual complementar (ex: "ao catálogo") */
  contextLabel?: string
  className?: string
}

/**
 * Botão unificado e previsível de "Voltar".
 * Sempre no mesmo padrão visual e posicionado no topo da tela do fluxo.
 * Garante que "quando é para voltar só tem um caminho, mas tem que ser fácil voltar".
 */
export function UnifiedBackButton({
  to,
  label = 'Voltar',
  contextLabel,
  className = '',
}: UnifiedBackButtonProps) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    if (!to) {
      e.preventDefault()
      if (window.history.length > 1) {
        navigate(-1)
      } else {
        navigate('/')
      }
    }
  }

  const content = (
    <>
      <span className="w-6 h-6 rounded-full bg-[#1B212D] border border-[#232B3A] flex items-center justify-center group-hover:border-[#22D3EE]/50 group-hover:bg-[#22D3EE]/10 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5 text-[#A1A6B3] group-hover:text-[#22D3EE] transition-colors" />
      </span>
      <span className="text-xs font-semibold text-[#CBD5E1] group-hover:text-white transition-colors">
        {label}
        {contextLabel && <span className="text-[#64748B] font-normal ml-1">({contextLabel})</span>}
      </span>
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11141C] border border-[#232B3A] hover:border-[#22D3EE]/50 hover:bg-[#151923] transition-all shadow-sm ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11141C] border border-[#232B3A] hover:border-[#22D3EE]/50 hover:bg-[#151923] transition-all shadow-sm ${className}`}
    >
      {content}
    </button>
  )
}
