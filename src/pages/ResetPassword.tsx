import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Zap, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { authService } from '@/services/auth'
import { Button } from '@/components/ui/button'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!token) {
      setErrorMsg('Token de redefinição inválido ou ausente no link.')
      return
    }

    if (password.length < 8) {
      setErrorMsg('A nova senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.')
      return
    }

    setIsLoading(true)

    try {
      await authService.confirmPasswordReset(token, password)
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    } catch (err: unknown) {
      console.error('Erro na redefinição:', err)
      const msg =
        err instanceof Error
          ? err.message
          : 'Não foi possível redefinir. O token pode ter expirado.'
      setErrorMsg(msg)
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Redefinir Senha</h1>
          <p className="text-xs text-[#A1A6B3]">Crie uma nova senha de segurança para sua conta.</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#F87171]/15 border border-[#F87171]/30 text-[#F87171] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-4 text-center py-4 animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Senha alterada com sucesso!</h3>
              <p className="text-xs text-[#A1A6B3]">Redirecionando para a tela de login...</p>
            </div>
            <div className="pt-2">
              <Button asChild className="rounded-full bg-[#8B5CF6] text-white">
                <Link to="/login">Fazer Login agora</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white">Nova senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white">Confirmar nova senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  required
                  minLength={8}
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
                  Atualizando...
                </>
              ) : (
                <>
                  Salvar nova senha
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
