import React, { useState } from 'react'
import { LogOut, ExternalLink, X, Home } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ExitSiteButtonProps {
  /** Estilo variante: discreto (link no header/footer) ou botão arredondado */
  variant?: 'header' | 'footer' | 'pill'
  className?: string
}

/**
 * Botão "Sair do site":
 * Atende à diretriz do usuário:
 * "e também se ele quiser sair, nada de esconder como alguns fazem, deixe ele muito à vontade se quiser sair do site."
 * Sem armadilhas de retenção, sem interstitials insistentes.
 * Oferece fechamento da aba ou redirecionamento direto, sem bloqueios.
 */
export function ExitSiteButton({ variant = 'header', className = '' }: ExitSiteButtonProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDirectExit = () => {
    // Tenta fechar a aba atual; se bloqueado pelo navegador (porque não foi aberta via window.open),
    // redireciona para a página em branco / histórico anterior ou google de forma limpa.
    try {
      window.close()
    } catch {
      // Ignora erro do window.close
    }
    // Fallback limpo imediato se a janela não fechou
    window.location.href = 'about:blank'
  }

  if (variant === 'pill') {
    return (
      <>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          title="Sair do site a qualquer momento"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#94A3B8] hover:text-white bg-[#151923] hover:bg-[#1E293B] border border-[#232B3A] hover:border-[#64748B] transition-all ${className}`}
        >
          <LogOut className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span>Sair do site</span>
        </button>

        <ExitConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirmExit={handleDirectExit}
        />
      </>
    )
  }

  if (variant === 'footer') {
    return (
      <>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={`inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors underline-offset-4 hover:underline ${className}`}
          title="Deseja sair do site?"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sair do site</span>
        </button>

        <ExitConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirmExit={handleDirectExit}
        />
      </>
    )
  }

  // Header padrão: botão compacto e nítido
  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        title="Sair do site quando quiser"
        aria-label="Sair do site"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-[#94A3B8] hover:text-white bg-[#151923]/90 hover:bg-[#1E293B] border border-[#232B3A] hover:border-[#475569] transition-all ${className}`}
      >
        <LogOut className="w-3.5 h-3.5 text-[#94A3B8]" />
        <span className="hidden sm:inline">Sair do site</span>
      </button>

      <ExitConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirmExit={handleDirectExit}
      />
    </>
  )
}

interface ExitConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmExit: () => void
}

function ExitConfirmDialog({ open, onOpenChange, onConfirmExit }: ExitConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121620] border-[#232B3A] text-white sm:max-w-md rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#1B212D] border border-[#232B3A] flex items-center justify-center text-[#94A3B8]">
            <LogOut className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold text-white">Deseja sair do site?</DialogTitle>
          <DialogDescription className="text-xs text-[#94A3B8] leading-relaxed">
            Fique totalmente à vontade. Seus itens no carrinho continuam salvos neste navegador se
            você quiser voltar mais tarde.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t border-[#232B3A]/80">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto rounded-full border-[#232B3A] bg-[#151923] hover:bg-[#1B212D] text-white text-xs h-10 px-5"
          >
            Continuar navegando
          </Button>

          <Button
            type="button"
            onClick={onConfirmExit}
            className="w-full sm:w-auto rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs h-10 px-5 shadow-lg shadow-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Sair agora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
