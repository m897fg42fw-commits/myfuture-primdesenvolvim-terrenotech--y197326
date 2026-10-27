import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Zap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { authService } from '@/services/auth'
import { Button } from '@/components/ui/button'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function verify() {
      if (!token) {
        setIsLoading(false)
        setErrorMsg('Nenhum token de verificação foi informado na URL.')
        return
      }

      try {
        await authService.confirmVerification(token)
        setIsSuccess(true)
      } catch (err: unknown) {
        console.error('Erro na verificação de e-mail:', err)
        setErrorMsg('O link de verificação expirou ou é inválido.')
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [token])

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 animate-fade-up">
      <div className="w-full max-w-md bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
          <div className="w-full h-full bg-[#0B0D12] rounded-[14px] flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#22D3EE]" />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-6">
            <Loader2 className="w-8 h-8 text-[#8B5CF6] animate-spin mx-auto" />
            <h2 className="text-lg font-bold text-white">Validando seu e-mail...</h2>
            <p className="text-xs text-[#A1A6B3]">
              Aguarde enquanto confirmamos sua conta no servidor.
            </p>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4 py-4 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">E-mail verificado com sucesso!</h2>
              <p className="text-xs text-[#A1A6B3] leading-relaxed">
                Sua conta está 100% ativa. Você já pode fazer login e utilizar todos os recursos do
                Terrenotech.
              </p>
            </div>
            <div className="pt-2">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0B0D12] font-bold px-8"
              >
                <Link to="/login">Ir para o Login</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40 flex items-center justify-center mx-auto">
              <AlertCircle className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Falha na verificação</h2>
              <p className="text-xs text-[#F87171] leading-relaxed">{errorMsg}</p>
            </div>
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#232B3A] text-white"
              >
                <Link to="/login">Voltar ao Login</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
