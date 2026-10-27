import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, User, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Informe seu nome completo.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Informe um e-mail válido.')
      return
    }
    if (password.length < 8) {
      setErrorMsg('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setErrorMsg('A confirmação de senha não confere.')
      return
    }

    setIsLoading(true)

    try {
      await register(name.trim(), email.trim(), password)

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Bem-vindo ao Terrenotech. Sua sessão já está ativa.',
        className: 'bg-[#151923] border-[#34D399] text-white',
      })

      navigate('/')
    } catch (err: unknown) {
      console.error('Erro de cadastro:', err)
      let msg = 'Não foi possível criar a conta. Talvez o e-mail já esteja em uso.'
      if (err instanceof Error && err.message) {
        if (
          err.message.includes('Failed to create record') ||
          err.message.includes('already in use')
        ) {
          msg = 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.'
        } else {
          msg = err.message
        }
      }
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 animate-fade-up">
      <div className="w-full max-w-md bg-[#151923] border border-[#232B3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -left-16 w-44 h-44 bg-[#22D3EE]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
            <div className="w-full h-full bg-[#0B0D12] rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#22D3EE]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Criar conta na Terrenotech
          </h1>
          <p className="text-xs text-[#A1A6B3]">
            Cadastre-se para gerenciar vendas, pedidos e estatísticas.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#F87171]/15 border border-[#F87171]/30 text-[#F87171] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white">Nome completo</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu Nome ou Empresa"
                required
                className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white">E-mail</label>
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white">Senha (mínimo 8 caracteres)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full bg-[#0B0D12] border border-[#232B3A] focus:border-[#8B5CF6] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A1A6B3]/60 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white">Confirmar senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1A6B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
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
                Criando conta...
              </>
            ) : (
              <>
                Criar conta e entrar
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </>
            )}
          </Button>
        </form>

        <div className="pt-2 border-t border-[#232B3A] text-center text-xs text-[#A1A6B3]">
          Já possui uma conta?{' '}
          <Link to="/login" className="text-[#22D3EE] font-bold hover:underline">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  )
}
