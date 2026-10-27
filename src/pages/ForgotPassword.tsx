import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Mail, ArrowRight, Loader2, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react'
import { authService } from '@/services/auth'
import { Button } from '@/components/ui/button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim()) {
      setErrorMsg('Informe seu e-mail cadastrado.')
      return
    }

    setIsLoading(true)

    try {
      await authService.requestPasswordReset(email.trim())
      setIsSent(true)
    } catch (err: unknown) {
      console.error('Erro ao solicitar recuperação:', err)
      // Por segurança, mostramos sucesso ou aviso amigável
      setIsSent(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 animate-fade-up">
      <div className="w-full max-w-md bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
            <div className="w-full h-full bg-[#0B0D12] rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#22D3EE]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Recuperar Senha</h1>
          <p className="text-xs text-[#A1A6B3]">
            Informe seu e-mail para receber as instruções de redefinição de acesso.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#F87171]/15 border border-[#F87171]/30 text-[#F87171] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSent ? (
          <div className="space-y-4 text-center py-4 animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">E-mail de redefinição enviado!</h3>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Se o e-mail <span className="text-white font-medium">{email}</span> estiver
                cadastrado, você receberá um link com o token de redefinição.
              </p>
            </div>
            <div className="pt-2">
              <Button
                asChild
                className="rounded-full bg-[#1B212D] text-white hover:bg-[#232B3A] text-xs px-6"
              >
                <Link to="/login">Voltar para o login</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white">E-mail cadastrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full h-11 text-sm font-bold bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] hover:opacity-95 text-[#0B0D12] shadow-lg shadow-[#8B5CF6]/30 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#0B0D12]" />
                  Enviando instruções...
                </>
              ) : (
                <>
                  Enviar link de redefinição
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        )}

        <div className="pt-2 border-t border-[#232B3A] text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#A1A6B3] hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Lembrou da senha? Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
